package net.sf.j2s.core.compiler;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.IExtension;
import org.eclipse.core.runtime.IExtensionPoint;
import org.eclipse.core.runtime.IExtensionRegistry;
import org.eclipse.core.runtime.Platform;
import org.eclipse.jdt.internal.compiler.env.ICompilationUnit;

public class ExtendedCompilers {

	public static Map compilers = new HashMap();

	private static boolean isExtensionPointsChecked = false;

	private static void checkExtensionPoints() {
		if (isExtensionPointsChecked) {
			return;
		}
		isExtensionPointsChecked = true;
		IExtensionRegistry extensionRegistry = Platform.getExtensionRegistry();
		IExtensionPoint extensionPoint = extensionRegistry
				.getExtensionPoint("net.sf.j2s.core.extendedCompiler"); //$NON-NLS-1$
		if (extensionPoint == null) {
			return;
		}
		IExtension[] extensions = extensionPoint.getExtensions();
		// For each extension ...
		for (int i = 0; i < extensions.length; i++) {
			IExtension extension = extensions[i];
			IConfigurationElement[] elements = extension
					.getConfigurationElements();
			// For each member of the extension ...
			for (int j = 0; j < elements.length; j++) {
				IConfigurationElement element = elements[j];
				if ("extendedCompiler".equals(element.getName())) { //$NON-NLS-1$
					String className = element.getAttribute("class"); //$NON-NLS-1$
					String id = element.getAttribute("id"); //$NON-NLS-1$
					if (className != null && className.trim().length() != 0
							&& id != null && id.trim().length() != 0) {
						try {
							Object callback = element
									.createExecutableExtension("class");
							if (callback instanceof IExtendedCompiler) {
								compilers.put(id.trim(), callback);
							}
						} catch (CoreException e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
	}

	public static void register(String compilerID, IExtendedCompiler compiler) {
		if (compilerID != null && compilerID.trim().length() != 0
				&& compiler != null) {
			compilers.put(compilerID, compiler);
		}
	}

	public static IExtendedCompiler deregister(String compilerID) {
		if (compilerID != null && compilerID.trim().length() != 0) {
			return (IExtendedCompiler) compilers.remove(compilerID);
		}
		return null;
	}

	public static void process(ICompilationUnit sourceUnit,
			IContainer binFolder) {
		checkExtensionPoints();
		if (!compilers.isEmpty()) {
			for (Iterator iter = compilers.values().iterator(); iter.hasNext();) {
				IExtendedCompiler compiler = (IExtendedCompiler) iter.next();
				try {
					compiler.process(sourceUnit, binFolder);
				} catch (Throwable e) {
					e.printStackTrace();
				}
			}
		}
	}
}
