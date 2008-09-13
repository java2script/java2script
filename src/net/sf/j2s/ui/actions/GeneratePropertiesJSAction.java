package net.sf.j2s.ui.actions;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IFolder;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.internal.core.PackageFragmentRoot;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.ui.IActionDelegate;
import org.eclipse.ui.IObjectActionDelegate;
import org.eclipse.ui.IWorkbenchPart;

public class GeneratePropertiesJSAction implements IObjectActionDelegate {

	ISelection selection;
	
	/**
	 * Constructor for Action1.
	 */
	public GeneratePropertiesJSAction() {
		super();
	}

	/**
	 * @see IObjectActionDelegate#setActivePart(IAction, IWorkbenchPart)
	 */
	public void setActivePart(IAction action, IWorkbenchPart targetPart) {
	}

	/**
	 * @see IActionDelegate#run(IAction)
	 */
	public void run(IAction action) {
		if (selection instanceof IStructuredSelection) {
			IStructuredSelection structSelection = (IStructuredSelection) selection;
			Set parents = new HashSet();
			Object[] files = structSelection.toArray();
			for (int i = 0; i < files.length; i++) {
				IFile fileRes = (IFile) files[i];
		        //Message2PropertiesUtils.msg2properties(file);
				IContainer parentContainer = fileRes.getParent();
				IJavaElement parent = JavaCore.create(parentContainer);
				//if (parentContainer instanceof IJavaElement) {
					//IJavaElement parent = (IJavaElement) parentContainer;
					while (parent != null) {
						if (parent instanceof PackageFragmentRoot) {
							PackageFragmentRoot pkgRoot = (PackageFragmentRoot) parent;
							String base = pkgRoot.getJavaModel()
									.getResource().getLocation().toOSString();
							String basePath = pkgRoot.getPath().toOSString();
							String relativePath = fileRes.getFullPath().toPortableString()
									.substring(
											parent.getPath().toPortableString()
													.length());
							String bundleName = relativePath.substring(0, relativePath.indexOf('.'))
									.replace(File.pathSeparatorChar, '.').replace('/', '.');
							if (bundleName.charAt(0) == '.') {
								bundleName = bundleName.substring(1);
							}
							if (!basePath.startsWith(base)) {
								basePath = new File(base, basePath).getAbsolutePath();
							}
							try {
								Bundle2StringUtil.convert(basePath, bundleName);
							} catch (FileNotFoundException e) {
								e.printStackTrace();
							}
							break;
						}
						parent = parent.getParent();
					}
				//}

		        parents.add(parentContainer);
			}
			for (Iterator iter = parents.iterator(); iter.hasNext();) {
				IContainer parent = (IContainer) iter.next();
		        try {
		            parent.refreshLocal(1, null);
		        } catch (CoreException e) {
		            e.printStackTrace();
		        }
			}
	        MessageDialog.openInformation(null,
	        		"Finished",
	                "*.properties are converted into equivalent *.js!");  //$NON-NLS-1$//$NON-NLS-2$
		}
	}



	/**
	 * @see IActionDelegate#selectionChanged(IAction, ISelection)
	 */
	public void selectionChanged(IAction action, ISelection selection) {
		this.selection = selection;
	}

}
