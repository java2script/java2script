package j2s.jmol;

import java.io.File;
import java.util.Date;

import org.eclipse.core.resources.IFile;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.CompilationUnit;

import j2s.CorePlugin;
import j2s.core.Java2ScriptCompiler;
import j2s.jmol.common.ASTScriptVisitor;
import j2s.jmol.common.DependencyASTVisitor;

public class Java2ScriptLegacyCompiler extends Java2ScriptCompiler {

	private final static String J2S_PACKAGE_FIXES = "j2s.package.fixes";

	private final static String J2S_STRING_FIXES = "j2s.string.fixes";

	private String[] stringFixes;

	private int nResources;

	public Java2ScriptLegacyCompiler(File f) {
		super(false, f);
	}

	@SuppressWarnings("deprecation")
	public boolean initializeProject(IJavaProject project, boolean isCleanBuild) {
		if (!super.initializeProject(project, isCleanBuild, AST.JLS4)) {
			return false;
		}
		
		String s = getProperty(J2S_STRING_FIXES, null);
		if (s != null) {
			stringFixes = s.split(",");
			fixRegex(stringFixes);
			System.out.println(stringFixes.length + " string fixes");
		}
		s = getProperty(J2S_PACKAGE_FIXES, null);
		if (s != null) {
			packageFixes = s.split(",");
			fixRegex(packageFixes);
			System.out.println(packageFixes.length + " package fixes");
		}
		nResources = 0;
		j2sPath = siteFolder + "/jsmol/j2s";
		System.out.println("J2S site folder is " + j2sPath);
		return true;
	}

	private void fixRegex(String[] a) {
		for (int i = 0; i < a.length; i++) {
		      a[i] = a[i].replaceAll("\\.", "\\\\.");
		}
	}

	public void startBuild(boolean isClean) {
		super.startBuild(isClean);
	}

	/**
	 * From the CompilationParticipant, not the old builder
	 * 
	 * @param javaSource
	 * @return
	 */
	
	public boolean compileToJavaScript(IFile javaSource, String trailer) {
//		nSources++;
		ICompilationUnit createdUnit = JavaCore.createCompilationUnitFrom(javaSource);
		String sourceLocation = javaSource.getLocation().toString();
		String outputPath = j2sPath;
		astParser.setResolveBindings(true);
		astParser.setSource(createdUnit);
		CompilationUnit root = (CompilationUnit) astParser.createAST(null);
		DependencyASTVisitor dvisitor = new DependencyASTVisitor();
		boolean errorOccurs = false;
		try {
			root.accept(dvisitor);
		} catch (Throwable e) {
			e.printStackTrace();
			errorOccurs = true;
		}
		if (errorOccurs) {
			String elementName = root.getJavaElement().getElementName();
			// if (elementName.endsWith(".class") || elementName.endsWith(".java")) {
			// //$NON-NLS-1$//$NON-NLS-2$
			elementName = elementName.substring(0, elementName.lastIndexOf('.'));
			// } /* maybe ended with other customized extension
			String packageName = dvisitor.getPackageName();
			if (packageName != null) {
				File folder = new File(outputPath, packageName.replace('.', File.separatorChar));
				outputPath = folder.getAbsolutePath();
				File jsFile = new File(outputPath, elementName + ".js"); //$NON-NLS-1$
				if (jsFile.exists()) {
					jsFile.delete();
				}
			}
			return false;
		}

		ASTScriptVisitor visitor = new ASTScriptVisitor();
		
		System.out.println("J2SL109 " + visitor.supportsObjectStaticFields);

		
		isDebugging = "debug".equals(props.getProperty("j2s.compiler.mode"));
 		visitor.setDebugging(isDebugging);
		dvisitor.setDebugging(isDebugging);
		errorOccurs = false;
		try {
			root.accept(visitor);
		} catch (Throwable e) {
			e.printStackTrace();
			errorOccurs = true;
		}
		if (!errorOccurs) {
			outputJavaScript(visitor, dvisitor, root, outputPath, trailer, sourceLocation);
			return true;
		}
		String folderPath = outputPath;
		String elementName = root.getJavaElement().getElementName();
		// if (elementName.endsWith(".class") || elementName.endsWith(".java")) {
		// //$NON-NLS-1$//$NON-NLS-2$
		elementName = elementName.substring(0, elementName.lastIndexOf('.'));
		// } /* maybe ended with other customized extension
		String packageName = visitor.getPackageName();
		if (packageName != null) {
			File folder = new File(folderPath, packageName.replace('.', File.separatorChar));
			folderPath = folder.getAbsolutePath();
			File jsFile = new File(folderPath, elementName + ".js"); //$NON-NLS-1$
			if (jsFile.exists()) {
				jsFile.delete();
			}
		}
		return false;
	}

	private void outputJavaScript(ASTScriptVisitor visitor, DependencyASTVisitor dvisitor, CompilationUnit fRoot,
			String outputPath, String trailer, String sourceLocation) {
		String js = finalFixes(dvisitor.getDependencyScript(visitor.getBuffer()));
		String elementName = fRoot.getJavaElement().getElementName();
		// if (elementName.endsWith(".class") || elementName.endsWith(".java")) {
		// //$NON-NLS-1$//$NON-NLS-2$
		elementName = elementName.substring(0, elementName.lastIndexOf('.'));
		// } /* maybe ended with other customized extension
		String packageName = visitor.getPackageName();
		if (packageName != null) {
			String dir = packageName.replace('.', '/');
			dir = fixPackageName(dir);
			File folder = new File(outputPath, dir);
			outputPath = folder.getAbsolutePath();
			if (!folder.exists() || !folder.isDirectory()) {
				if (!folder.mkdirs()) {
					System.out.println("J2SC.outputJavaScript " + outputPath + " failed to write");
					throw new RuntimeException("Failed to create folder " + outputPath); //$NON-NLS-1$
				}
			}
		}
		elementName = fixPackageName(elementName);
		File jsFile = new File(outputPath, elementName + ".js"); // $NON-NLS-1
		writeToFile(jsFile, js + ";//" + trailer);
		
		if (packageName != null) {
			nResources += checkCopiedResources(packageName, sourceLocation, j2sPath);
		}

		// this was for class files with multiple non-private additional classes.
		// specifically StateManager.Connections, ActionManager.Gesture, and Int2IntHash.Int2IntHashEntry
		// these should have been private to those classes.
//		String[] classNameSet = dvisitor.getClassNames();
//		if (classNameSet.length > 1) {
//			addPackageJS(packageName, elementName, classNameSet, outputPath);
//		}
	}

//	private void addPackageJS(String packageName, String elementName, String[] classNameSet, String outputPath) {
//		StringBuffer buffer = new StringBuffer();
//		String key = "ClazzLoader.jarClasspath (path + \"" + elementName + ".js\", [";
//		buffer.append(key + "\r\n");
//		DependencyASTVisitor.joinArrayClasses(buffer, classNameSet, null, ",\r\n");
//
//		buffer.append("]);\r\n");
//		String s = props.getProperty("package.js");
//		if (s == null || s.length() == 0) {
//			s = "package.js";
//		}
//		File f = new File(outputPath, s);
//		String source = null;
//		if (f.exists()) {
//			source = FileUtil.readSource(f);
//			int index = source.indexOf(key);
//			boolean updated = false;
//			if (index != -1) {
//				int index2 = source.indexOf("]);", index + key.length());
//				if (index2 != -1) {
//					source = source.substring(0, index) + buffer.toString() + source.substring(index2 + 5);
//					updated = true;
//				}
//			}
//			if (!updated) {
//				source += buffer.toString();
//			}
//		}
//		if (source == null) {
//			String pkgName = null;
//			if (packageName == null || packageName.length() == 0) {
//				pkgName = "package";
//			} else {
//				pkgName = packageName + ".package";
//			}
//			source = "var path = ClazzLoader.getClasspathFor (\"" + pkgName + "\");\r\n"
//					+ "path = path.substring (0, path.lastIndexOf (\"package.js\"));\r\n";
//			source += buffer.toString();
//		}
//		try {
//			FileOutputStream fos = new FileOutputStream(f);
//			fos.write(source.getBytes());
//			fos.close();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//	}

	private String finalFixes(String js) {
		js = js.replaceAll("cla\\$\\$", "c\\$").replaceAll("innerThis", "i\\$").replaceAll("finalVars", "v\\$")
				.replaceAll("\\.callbacks", "\\.b\\$").replaceAll("\\.\\$finals", "\\.f\\$")
				// BH 2023.11.10 added
				.replaceAll("Class\\.forName", "Clazz\\._4Name");
		if (stringFixes != null) {
			for (int i = 0; i < stringFixes.length; i++) {
				js = js.replaceAll(stringFixes[i++], stringFixes[i]);
			}
		}
		return js;
	}
	
	@Override
	protected String getDefaultJ2SFile() {
		return "#j2sjmol default configuration file created by j2s.core plugin " + CorePlugin.VERSION + " " + new Date()
				+ "\n\n" + "#enable the Java2Script transpiler -- set to \"disabled\" to disable\n"
				+ "# default is \"enabled\".\n" + "j2s.compiler.status=enabled\n\n"
				+ "# destination directory for all JavaScript\n" + "j2s.site.directory=site\n\n"
				+ "# uncomment j2s.* lines to process:\n\n"
				+ "# a semicolon-separated list of package-level file paths to be excluded "
				+ "# by matching anywhere in the string (default \"<none>\")\n" + "#j2s.excluded.paths=test;testng\n\n"
				+ "# uncomment to add debugging output. Start eclipse with the -consoleLog option to see output.\n"
				+ "#j2s.compiler.mode=debug\n";
	}

	@Override
	public void finalizeProject() {
		System.out.println("J2S Jmol finalized for " + projectFolder + " " + nResources + " resources copied");
	}

}
