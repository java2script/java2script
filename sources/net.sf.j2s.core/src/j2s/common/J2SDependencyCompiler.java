package j2s.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import j2s.common.DependencyASTVisitor;
import net.sf.j2s.core.builder.SourceFile;
import net.sf.j2s.core.builder.SourceFileProxy;
import net.sf.j2s.core.compiler.IExtendedCompiler;

import org.eclipse.core.resources.IContainer;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTParser;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.internal.compiler.env.ICompilationUnit;

public class J2SDependencyCompiler implements IExtendedCompiler {

	public void process(ICompilationUnit sourceUnit, IContainer binaryFolder) {
		String prjFolder = binaryFolder.getProject().getLocation().toOSString();
		File file = new File(prjFolder, ".j2s"); //$NON-NLS-1$
		if (!file.exists()) {
			/*
			 * The file .j2s is a marker for Java2Script to compile JavaScript
			 */
			return;
		}
		Properties props = new Properties();
		try {
			props.load(new FileInputStream(file));
			String status = props.getProperty("j2s.compiler.status");
			if (!"enable".equals(status)) {
				/*
				 * Not enabled!
				 */
				return;
			}
			String dependencyStatus = props
					.getProperty("j2s.compiler.dependency.status");
			if (dependencyStatus != null && !"enable".equals(status)) {
				/*
				 * Not enabled!
				 */
				return;
			}
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}

		String binFolder = binaryFolder.getLocation().toOSString();

		List list = null;
		String resPaths = props.getProperty("j2s.resources.list");
		if (resPaths == null || resPaths.trim().length() == 0) {
			list = new ArrayList();
		} else {
			String[] splits = resPaths.split(",");
			list = new ArrayList();
			for (int i = 0; i < splits.length; i++) {
				list.add(splits[i]);
			}
		}
		List abandonedList = null;
		String abandonedPaths = props.getProperty("j2s.abandoned.resources.list");
		if (abandonedPaths == null || abandonedPaths.trim().length() == 0) {
			abandonedList = new ArrayList();
		} else {
			String[] splits = abandonedPaths.split(",");
			abandonedList = new ArrayList();
			for (int i = 0; i < splits.length; i++) {
				abandonedList.add(splits[i]);
			}
		}
		if (sourceUnit instanceof SourceFile) {
			SourceFile unitSource = (SourceFile) sourceUnit;
			String fileName = new String(unitSource.getFileName());
			int idx = fileName.lastIndexOf('/');
			String className = fileName.substring(idx + 1, fileName.lastIndexOf('.'));
			StringBuffer path = new StringBuffer();
			char[][] pkgs = unitSource.getPackageName();
			for (int j = 0; j < pkgs.length; j++) {
				path.append(new String(pkgs[j]));
				path.append("/");
			}
			path.append(className);
			path.append(".js");
			String jsPath = binaryFolder.getProjectRelativePath().toPortableString()
					+ "/" + path.toString();
			if (!list.contains(jsPath) && !abandonedList.contains(jsPath)) {
				list.add(jsPath);
			}
		}
		StringBuffer buf = new StringBuffer();
		for (Iterator iter = list.iterator(); iter.hasNext();) {
			String path = (String) iter.next();
			buf.append(path);
			if (iter.hasNext()) {
				buf.append(",");
			}
		}

		CompilationUnit root;
		ASTParser astParser = ASTParser.newParser(AST.JLS3);
		if (sourceUnit instanceof SourceFile) {
			SourceFile unitSource = (SourceFile) sourceUnit;
			org.eclipse.jdt.core.ICompilationUnit createdUnit = JavaCore
					.createCompilationUnitFrom(new SourceFileProxy(unitSource)
							.getResource());
			astParser.setResolveBindings(true);
			astParser.setSource(createdUnit);
			root = (CompilationUnit) astParser.createAST(null);

			DependencyASTVisitor visitor = new DependencyASTVisitor();
			boolean errorOccurs = false;
			try {
				root.accept(visitor);
			} catch (Throwable e) {
				e.printStackTrace();
				errorOccurs = true;
			}
			if (!errorOccurs) {
				J2SDependencyCompiler.outputJavaScript(visitor, root, binFolder);
			} else {
				String folderPath = binFolder;
				String elementName = root.getJavaElement().getElementName();
				elementName = elementName.substring(0, elementName.lastIndexOf('.'));
				String packageName = visitor.getPackageName();
				if (packageName != null) {
					File folder = new File(folderPath, packageName.replace('.',
							File.separatorChar));
					folderPath = folder.getAbsolutePath();
					File jsFile = new File(folderPath, elementName + ".jz"); //$NON-NLS-1$
					if (jsFile.exists()) {
						jsFile.delete();
					}
				}
			}
		}
	}

	public static void outputJavaScript(DependencyASTVisitor visitor, CompilationUnit fRoot, String folderPath) {
		String js = visitor.getBuffer().toString();
		String elementName = fRoot.getJavaElement().getElementName();
			elementName = elementName.substring(0, elementName.lastIndexOf('.'));
		String packageName = visitor.getPackageName();
		if (packageName != null) {
			File folder = new File(folderPath, packageName.replace('.', File.separatorChar));
			folderPath = folder.getAbsolutePath();
			if (!folder.exists() || !folder.isDirectory()) {
				if (!folder.mkdirs()) {
					throw new RuntimeException("Failed to create folder " + folderPath); //$NON-NLS-1$
				}
			}
		}
		File jsFile = new File(folderPath, elementName + ".jz"); //$NON-NLS-1$
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(jsFile);
			fileWriter.write(js);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fileWriter != null) {
				try {
					fileWriter.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

}
