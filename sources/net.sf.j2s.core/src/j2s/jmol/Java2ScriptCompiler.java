package j2s.jmol;

import j2s.common.ASTScriptVisitor;
import j2s.common.ASTVariableVisitor;
import j2s.common.DependencyASTVisitor;
import j2s.common.FileUtil;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.runtime.IPath;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTParser;
import org.eclipse.jdt.core.dom.CompilationUnit;

public class Java2ScriptCompiler {
	
	/**
	 * The name of the J2S options file, aka as the "Dot-j2s" file. Please do not change this value.
	 */
	private static final String J2S_OPTIONS_FILE_NAME = ".j2sjmol";

	private final static String J2S_COMPILER_STATUS = "j2s.compiler.status";
	private final static String J2S_COMPILER_STATUS_ENABLE = "enable";
	private final static String J2S_COMPILER_STATUS_ENABLED = "enabled";
	private final static String J2S_COMPILER_STATUS_DEBUG = "debug";
	private final static String J2S_OUTPUT_PATH = "j2s.output.path";
	private final static String J2S_OUTPUT_PATH_DEFAULT = null;
	private static final String J2S_EXCLUDED_PATHS = "j2s.excluded.paths";
	private static final String J2S_EXCLUDED_PATHS_DEFAULT = "<none>";
	private static final String J2S_COMPILER_MODE = "j2s.compiler.mode";
	private static final String J2S_COMPILER_MODE_DEFAULT = "nodebug";
	private static final String J2S_COMPILER_MODE_DEBUG = "debug";

	private Properties props;
	private String projectFolder;
	private String projectPath;
	private String excludedPaths;
  private String outputPath;
	private List lstExcludedPaths;
	private ASTParser astParser;
	public static boolean isDebugging;

	public boolean doBreakOnError() {
		return false;//breakOnError;
	}

	public static boolean isActive(IJavaProject project) {
		try {
			return new File(project.getProject().getLocation().toOSString(), J2S_OPTIONS_FILE_NAME).exists();
		} catch (Exception e) {
			return false;
		}
	}

	public Java2ScriptCompiler() {
	  // for debugging	
	}
	
	public boolean oldProcess(ASTParser astParser,
			org.eclipse.jdt.core.ICompilationUnit createdUnit, String outputPath, String trailer) {

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
			//if (elementName.endsWith(".class") || elementName.endsWith(".java")) {  //$NON-NLS-1$//$NON-NLS-2$
			elementName = elementName.substring(0, elementName.lastIndexOf('.'));
			// } /* maybe ended with other customized extension
			String packageName = dvisitor.getPackageName();
			if (packageName != null) {
				File folder = new File(outputPath, packageName.replace('.',
						File.separatorChar));
				outputPath = folder.getAbsolutePath();
				File jsFile = new File(outputPath, elementName + ".js"); //$NON-NLS-1$
				if (jsFile.exists()) {
					jsFile.delete();
				}
			}
			return false;
		}

		ASTScriptVisitor visitor = new ASTScriptVisitor();
		boolean objectStaticFields = "enable".equals(props
				.getProperty("j2s.compiler.static.quirks"));
		visitor.setSupportsObjectStaticFields(objectStaticFields);
		isDebugging = "debug"
				.equals(props.getProperty("j2s.compiler.mode"))
				|| "debug".equals(props.getProperty("j2s.compiler.status"));
		
		visitor.setDebugging(isDebugging);
		dvisitor.setDebugging(isDebugging);
		boolean toCompress = "release".equals(props
				.getProperty("j2s.compiler.mode"));
		((ASTVariableVisitor) visitor.getAdaptable(ASTVariableVisitor.class))
				.setToCompileVariableName(toCompress);
		dvisitor.setToCompileVariableName(toCompress);
		errorOccurs = false;
		try {
			root.accept(visitor);
		} catch (Throwable e) {
			e.printStackTrace();
			errorOccurs = true;
		}
		if (!errorOccurs) {
			Java2ScriptCompiler.outputJavaScript(visitor, dvisitor, root, outputPath,
					props, trailer);
			return true;
		}
		String folderPath = outputPath;
		String elementName = root.getJavaElement().getElementName();
		//if (elementName.endsWith(".class") || elementName.endsWith(".java")) {  //$NON-NLS-1$//$NON-NLS-2$
		elementName = elementName.substring(0, elementName.lastIndexOf('.'));
		// } /* maybe ended with other customized extension
		String packageName = visitor.getPackageName();
		if (packageName != null) {
			File folder = new File(folderPath, packageName.replace('.',
					File.separatorChar));
			folderPath = folder.getAbsolutePath();
			File jsFile = new File(folderPath, elementName + ".js"); //$NON-NLS-1$
			if (jsFile.exists()) {
				jsFile.delete();
			}
		}
		return false;
	}

	public static void outputJavaScript(ASTScriptVisitor visitor,
			DependencyASTVisitor dvisitor, CompilationUnit fRoot, String outputPath,
			Properties props, String trailer) {
		String js = dvisitor.getDependencyScript(visitor.getBuffer());
		js = js.replaceAll("cla\\$\\$", "c\\$").replaceAll("innerThis", "i\\$")
				.replaceAll("finalVars", "v\\$").replaceAll("\\.callbacks", "\\.b\\$")
				.replaceAll("\\.\\$finals", "\\.f\\$");
		String elementName = fRoot.getJavaElement().getElementName();
		//if (elementName.endsWith(".class") || elementName.endsWith(".java")) {  //$NON-NLS-1$//$NON-NLS-2$
		elementName = elementName.substring(0, elementName.lastIndexOf('.'));
		// } /* maybe ended with other customized extension
		String packageName = visitor.getPackageName();
		if (packageName != null) {
			File folder = new File(outputPath, packageName.replace('.',
					File.separatorChar));
			outputPath = folder.getAbsolutePath();
			if (!folder.exists() || !folder.isDirectory()) {
				if (!folder.mkdirs()) {
					System.out.println("J2SC.outputJavaScript " + outputPath
							+ " failed to write");
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
			DependencyASTVisitor
					.joinArrayClasses(buffer, classNameSet, null, ",\r\n");

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
						source = source.substring(0, index) + buffer.toString()
								+ source.substring(index2 + 5);
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
				source = "var path = ClazzLoader.getClasspathFor (\""
						+ pkgName
						+ "\");\r\n"
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

	public boolean excludeFile(IFile javaSource) {
		return excludeFile(javaSource.getFullPath().toString());
	}

	private boolean excludeFile(String filePath) {
		if (lstExcludedPaths != null) {
			for (int i = lstExcludedPaths.size(); --i >= 0;) {
				String s = (String) lstExcludedPaths.get(i);
				if (filePath.indexOf(s) >= 0) {
					return true;
				}
			}
		}
		return false;
	}

	public void finalizeProject() {
		System.out.println(
				"J2S processed - finalizeProject");
	}

	public void startBuild(boolean isClean) {
		// at the beginning of a clean build, clear data
//		isCleanBuild = isClean;
//		if (isClean) {
//			copyResources.clear();
//			lstMethodsDeclared = null;
//			htMethodsCalled = null;
//		}
	}

	public boolean initializeProject(IJavaProject project) {

		//nSources = 0;
		//nResources = nSources = nJS = nHTML = 0;
		//this.project = project;
		if (!isActive(project)) {
			// the file .j2s does not exist in the project directory -- skip this project
			return false;
		}
		projectPath = "/" + project.getProject().getName() + "/";
		projectFolder = project.getProject().getLocation().toOSString();
		File j2sFile = new File(projectFolder, J2S_OPTIONS_FILE_NAME);
		initializeUsing(j2sFile, 0);
		if (props == null)
			props = new Properties();
		try {
			String status = getProperty(J2S_COMPILER_STATUS, J2S_COMPILER_STATUS_ENABLED);
			if (!J2S_COMPILER_STATUS_ENABLE.equalsIgnoreCase(status)
					&& !J2S_COMPILER_STATUS_ENABLED.equalsIgnoreCase(status)
					&& !J2S_COMPILER_STATUS_DEBUG.equalsIgnoreCase(status)) {
				if (getFileContents(j2sFile).trim().length() == 0) {
//					writeToFile(j2sFile, getDefaultJ2SFile());
				} else {
					// not enabled
					return false;
				}
			}

			int jslLevel = AST.JLS4;
//			try {
//				String ver = getProperty(J2S_COMPILER_JAVA_VERSION, J2S_COMPILER_JAVA_VERSION_DEFAULT);
//				jslLevel = Integer.parseInt(ver);
//			} catch (Exception e) {
//				// ignore
//			}
//			if (jslLevel > 8) {
//				System.out.println("J2S compiler version > 8 is experimental only");
//			}
			try {
				astParser = ASTParser.newParser(jslLevel);
				System.out.println("J2S compiler version set to " + jslLevel);
			} catch (Exception e) {
				System.out.println("J2S compiler version " + jslLevel + " could not be set; using 8");
				astParser = ASTParser.newParser(AST.JLS4);
			}

//			breakOnError = !"false".equalsIgnoreCase(getProperty(J2S_BREAK_ON_ERROR, J2S_BREAK_ON_ERROR_DEFAULT));
//
//			exactLong = "true".equalsIgnoreCase(getProperty(J2S_EXACT_LONG, J2S_EXACT_LONG_DEFAULT));
//
//			allowAsyncThread = "true".equalsIgnoreCase(getProperty(J2S_ALLOW_ASYNC_THREAD, J2S_ALLOW_ASYNC_THREAD_DEFAULT));


			// includes @j2sDebug blocks
			isDebugging = J2S_COMPILER_MODE_DEBUG
					.equalsIgnoreCase(getProperty(J2S_COMPILER_MODE, J2S_COMPILER_MODE_DEFAULT));

			outputPath = getProperty(J2S_OUTPUT_PATH, J2S_OUTPUT_PATH_DEFAULT);
			if (outputPath == null) {
		    outputPath = "bin";
				try {
					IPath loc = project.getOutputLocation();
					outputPath = loc.toString().substring(loc.toString().lastIndexOf('/') + 1);
				} catch (JavaModelException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				} 
			}
//			siteFolder = getProperty(J2S_SITE_DIRECTORY, J2S_SITE_DIRECTORY_DEFAULT);
//			siteFolder = projectFolder + "/" + siteFolder;
//			j2sPath = siteFolder + "/swingjs/j2s";
//			System.out.println("J2S writing to " + j2sPath);
//			// method declarations and invocations are only logged
//			// when the designated files are deleted prior to building
//
//			logDeclared = (isCompilationParticipant && !isCleanBuild ? null
//					: getProperty(J2S_LOG_METHODS_DECLARED, J2S_LOG_METHODS_DECLARED_DEFAULT));
//			File file;
//			if (logDeclared != null) {
//				if (!(file = new File(projectFolder, logDeclared)).exists()) {
//					lstMethodsDeclared = new ArrayList();
//					System.err.println("logging methods declared to " + file);
//				}
//				logDeclared = projectFolder + "/" + logDeclared;
//			}
//			logAllCalls = false;
//
//			logCalled = (isCompilationParticipant && !isCleanBuild ? null
//					: getProperty(J2S_LOG_METHODS_CALLED, J2S_LOG_METHODS_CALLED_DEFAULT));
//			if (logCalled != null) {
//				if (!(file = new File(projectFolder, logCalled)).exists()) {
//					htMethodsCalled = new Hashtable();
//					System.err.println("logging methods called to " + file);
//				}
//				logCalled = projectFolder + "/" + logCalled;
//				logAllCalls = "true".equalsIgnoreCase(getProperty(J2S_LOG_ALL_CALLS, J2S_LOG_ALL_CALLS_DEFAULT));
//			}
//
			excludedPaths = getProperty(J2S_EXCLUDED_PATHS, J2S_EXCLUDED_PATHS_DEFAULT);

			lstExcludedPaths = null;

			if (excludedPaths != null) {
				lstExcludedPaths = new ArrayList();
				String[] paths = excludedPaths.split(";");
				for (int i = 0; i < paths.length; i++)
					if (paths[i].trim().length() > 0)
						lstExcludedPaths.add(projectPath + paths[i].trim() + "/");
				if (lstExcludedPaths.size() == 0)
					lstExcludedPaths = null;
			}

//			boolean readAnnotations = !"false"
//					.equals(getProperty(J2S_COMPILER_READ_ANNOTATIONS, J2S_COMPILER_READ_ANNOTATIONS_DEFAULT));
//
//			ignoredAnnotations = (readAnnotations
//					? getProperty(J2S_COMPILER_IGNORED_ANNOTATIONS, J2S_COMPILER_IGNORED_ANNOTATIONS_DEFAULT)
//					: null);

			//testing = "true".equalsIgnoreCase(getProperty(J2S_TESTING, J2S_TESTING_DEFAULT));

//			String prop = getProperty(J2S_COMPILER_NONQUALIFIED_PACKAGES, J2S_COMPILER_NONQUALIFIED_PACKAGES_DEFAULT);
//			// older version of the name
//			String nonqualifiedPackages = getProperty(J2S_COMPILER_NONQUALIFIED_CLASSES,
//					J2S_COMPILER_NONQUALIFIED_CLASSES_DEFAULT);
//			nonqualifiedPackages = (prop == null ? "" : prop)
//					+ (nonqualifiedPackages == null ? "" : (prop == null ? "" : ";") + nonqualifiedPackages);
//			if (nonqualifiedPackages.length() == 0)
//				nonqualifiedPackages = null;
//
//			String classReplacements = getProperty(J2S_CLASS_REPLACEMENTS, J2S_CLASS_REPLACEMENTS_DEFAULT);
//
//			String htmlTemplateFile = getProperty(J2S_TEMPLATE_HTML, J2S_TEMPLATE_HTML_DEFAULT);
//			if (htmlTemplate == null) {
//				file = new File(projectFolder, htmlTemplateFile);
//				if (!file.exists()) {
//					String html = getDefaultHTMLTemplate();
//					System.out.println("J2S creating new htmltemplate file " + file);
//					writeToFile(file, html);
//				}
//				htmlTemplate = getFileContents(file);
//				System.out.println("J2S using HTML template " + file);
//			}

//			Java2ScriptVisitor.setAnnotating(ignoredAnnotations);
//			Java2ScriptVisitor.setDebugging(isDebugging);
//			Java2ScriptVisitor.setExactLong(exactLong);
//			Java2ScriptVisitor.setAllowAsyncThread(allowAsyncThread);
//			Java2ScriptVisitor.setLogging(lstMethodsDeclared, htMethodsCalled, logAllCalls);
//
//			Java2ScriptVisitor.NameMapper.setNonQualifiedNamePackages(nonqualifiedPackages);
//			Java2ScriptVisitor.NameMapper.setClassReplacements(classReplacements);

//			if (isCleanBuild)
//				Java2ScriptVisitor.startCleanBuild();

		} catch (Exception e) {
			System.out.println("error " + e + "  " + e.getStackTrace());
			e.printStackTrace();
			return false;
		}

		return true;
	}

	/**
	 * From the CompilationParticipant, not the old builder
	 * @param javaSource
	 * @return
	 */
	public boolean compileToJavaScript(IFile javaSource, String trailer) {
//		nSources++;
		org.eclipse.jdt.core.ICompilationUnit createdUnit = JavaCore.createCompilationUnitFrom(javaSource);		
		return oldProcess(astParser, createdUnit, projectFolder + "/" + outputPath, trailer);
	}
	
	private String getProperty(String key, String def) {
		String val = props.getProperty(key);
		if (val == null)
			val = def;
		System.out.println(key + " = " + val);
		if (val != null && val.indexOf("<") == 0)
			val = null;
		return val;
	}

	private String getFileContents(File file) {
		try {
			StringBuilder sb = new StringBuilder();
			FileInputStream is = new FileInputStream(file);
			BufferedReader reader = new BufferedReader(new InputStreamReader(is));
			String line = null;
			while ((line = reader.readLine()) != null) {
				sb.append(line).append("\n");
			}
			reader.close();
			return sb.toString();
		} catch (IOException e) {
			//
		}
		return null;
	}

	private static void writeToFile(File file, String data) {
		if (data == null)
			return;
		try {
			if (isDebugging)
				System.out.println("J2SC.writeToFile " + data.length() + " " + file);
			FileOutputStream os = new FileOutputStream(file);
			os.write(data.getBytes("UTF-8"));
			os.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private String getDefaultJ2SFile() {
		return null;
	}

	/**
	 * Iteratively look for a .j2s file to use for configuration information. Up to
	 * five iterations are allowed.
	 * 
	 * @param j2sFile
	 * @param level
	 */
	private void initializeUsing(File j2sFile, int level) {
		try {
			FileInputStream os = new FileInputStream(j2sFile);
			Properties newProps = new Properties();
			newProps.load(os);
			os.close();
			props = newProps;
		} catch (Exception e) {
			System.out.println("J2S Exception opening " + j2sFile + " " + e.getMessage());
		}
	}

}
