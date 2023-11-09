package j2s.jmol;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.Properties;

import org.eclipse.core.resources.IFile;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTParser;
import org.eclipse.jdt.core.dom.CompilationUnit;

import j2s.CorePlugin;
import j2s.core.Java2ScriptCompiler;
import j2s.jmol.common.ASTScriptVisitor;
import j2s.jmol.common.ASTVariableVisitor;
import j2s.jmol.common.DependencyASTVisitor;
import j2s.jmol.common.FileUtil;

public class Java2ScriptLegacyCompiler extends Java2ScriptCompiler {

	public Java2ScriptLegacyCompiler() {
		super(false, J2S_CONFIG_JMOL);
	}

	@SuppressWarnings("deprecation")
	public boolean initializeProject(IJavaProject project) {
		if (!super.initializeProject(project, AST.JLS4)) {
			return false;
		}
		j2sPath = siteFolder + "/j2s";
		System.out.println("J2S site path is " + j2sPath);
		return true;
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
		org.eclipse.jdt.core.ICompilationUnit createdUnit = JavaCore.createCompilationUnitFrom(javaSource);
		return oldProcess(astParser, createdUnit, projectFolder + "/" + outputPath, trailer);
	}

	public boolean oldProcess(ASTParser astParser, org.eclipse.jdt.core.ICompilationUnit createdUnit, String outputPath,
			String trailer) {

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
		if (!errorOccurs) {
			// J2SDependencyCompiler.outputJavaScript(dvisitor, root, binFolder);
		} else {
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
		boolean objectStaticFields = "enable".equals(props.getProperty("j2s.compiler.static.quirks"));
		visitor.setSupportsObjectStaticFields(objectStaticFields);
		isDebugging = "debug".equals(props.getProperty("j2s.compiler.mode"))
				|| "debug".equals(props.getProperty("j2s.compiler.status"));

		visitor.setDebugging(isDebugging);
		dvisitor.setDebugging(isDebugging);
		boolean toCompress = "release".equals(props.getProperty("j2s.compiler.mode"));
		((ASTVariableVisitor) visitor.getAdaptable(ASTVariableVisitor.class)).setToCompileVariableName(toCompress);
		dvisitor.setToCompileVariableName(toCompress);
		errorOccurs = false;
		try {
			root.accept(visitor);
		} catch (Throwable e) {
			e.printStackTrace();
			errorOccurs = true;
		}
		if (!errorOccurs) {
			Java2ScriptLegacyCompiler.outputJavaScript(visitor, dvisitor, root, outputPath, props, trailer);
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

	public static void outputJavaScript(ASTScriptVisitor visitor, DependencyASTVisitor dvisitor, CompilationUnit fRoot,
			String outputPath, Properties props, String trailer) {
		String js = dvisitor.getDependencyScript(visitor.getBuffer());
		js = js.replaceAll("cla\\$\\$", "c\\$").replaceAll("innerThis", "i\\$").replaceAll("finalVars", "v\\$")
				.replaceAll("\\.callbacks", "\\.b\\$").replaceAll("\\.\\$finals", "\\.f\\$");
		String elementName = fRoot.getJavaElement().getElementName();
		// if (elementName.endsWith(".class") || elementName.endsWith(".java")) {
		// //$NON-NLS-1$//$NON-NLS-2$
		elementName = elementName.substring(0, elementName.lastIndexOf('.'));
		// } /* maybe ended with other customized extension
		String packageName = visitor.getPackageName();
		if (packageName != null) {
			File folder = new File(outputPath, packageName.replace('.', File.separatorChar));
			outputPath = folder.getAbsolutePath();
			if (!folder.exists() || !folder.isDirectory()) {
				if (!folder.mkdirs()) {
					System.out.println("J2SC.outputJavaScript " + outputPath + " failed to write");
					throw new RuntimeException("Failed to create folder " + outputPath); //$NON-NLS-1$
				}
			}
		}
		File jsFile = new File(outputPath, elementName + ".js"); //$NON-NLS-1$
		writeToFile(jsFile, js + ";//" + trailer);

		String[] classNameSet = dvisitor.getClassNames();
		if (classNameSet.length > 1) {
			StringBuffer buffer = new StringBuffer();
			String key = "ClazzLoader.jarClasspath (path + \"" + elementName + ".js\", [";
			buffer.append(key + "\r\n");
			DependencyASTVisitor.joinArrayClasses(buffer, classNameSet, null, ",\r\n");

			buffer.append("]);\r\n");
			String s = props.getProperty("package.js");
			if (s == null || s.length() == 0) {
				s = "package.js";
			}
			File f = new File(outputPath, s);
			String source = null;
			if (f.exists()) {
				source = FileUtil.readSource(f);
				int index = source.indexOf(key);
				boolean updated = false;
				if (index != -1) {
					int index2 = source.indexOf("]);", index + key.length());
					if (index2 != -1) {
						source = source.substring(0, index) + buffer.toString() + source.substring(index2 + 5);
						updated = true;
					}
				}
				if (!updated) {
					source += buffer.toString();
				}
			}
			if (source == null) {
				String pkgName = null;
				if (packageName == null || packageName.length() == 0) {
					pkgName = "package";
				} else {
					pkgName = packageName + ".package";
				}
				source = "var path = ClazzLoader.getClasspathFor (\"" + pkgName + "\");\r\n"
						+ "path = path.substring (0, path.lastIndexOf (\"package.js\"));\r\n";
				source += buffer.toString();
			}
			try {
				FileOutputStream fos = new FileOutputStream(f);
				fos.write(source.getBytes());
				fos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	protected String getDefaultJ2SFile() {
		return "#j2sjmol default configuration file created by j2s.core plugin " + CorePlugin.VERSION + " " + new Date()
				+ "\n\n" + "#enable the Java2Script transpiler -- comment out to disable\n"
				+ "# default is \"enabled\".\n" 
				+ "j2s.compiler.status=enable\n\n"
				+ "# destination directory for all JavaScript\n" 
				+ "j2s.site.directory=site\n\n"
				+ "# uncomment j2s.* lines to process:\n\n"
				+ "# a semicolon-separated list of package-level file paths to be excluded "
				+ "# by matching anywhere in the string (default \"<none>\")\n"
				+ "#j2s.excluded.paths=test;testng\n\n" 
				+ "# uncomment to add debugging output. Start eclipse with the -consoleLog option to see output.\n"
				+ "#j2s.compiler.mode=debug\n";
	}

	@Override
	public void finalizeProject() {
		System.out.println("J2S Jmol finalized for " + projectPath);
	}

}
