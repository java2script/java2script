package net.sf.j2s.core;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTParser;
import org.eclipse.jdt.core.dom.CompilationUnit;

/**
 * The main (and currently only operational) Java2Script compiler.
 * 
 * @author Bob Hanson
 *
 */
class Java2ScriptCompiler {
	/**
	 * The name of the J2S options file, aka as the "Dot-j2s" file.
	 */
	private static final String J2S_OPTIONS_FILE_NAME = ".j2s";
	
	// BH: added "true".equals(getProperty(props,
	// "j2s.compiler.allow.compression")) to ensure compression only occurs when
	// desired
	private static final int JSL_LEVEL = AST.JLS8; // deprecation just because Java has moved on
	private boolean showJ2SSettings = true;

	// We copy all non .java files from any directory from which we loaded a
	// java file into the site directory
	private final HashSet<String> copyResources = new HashSet<String>();
	private Map<String, String> htMethodsCalled;
	private List<String> lstMethodsDeclared;

	private final static String J2S_COMPILER_STATUS = "j2s.compiler.status";
	private final static String J2S_COMPILER_STATUS_ENABLE = "enable";
	private final static String J2S_COMPILER_STATUS_ENABLED = "enabled";

	private static final String J2S_SITE_DIRECTORY = "j2s.site.directory";

	/**
	 * log file name for methods declared
	 */
	private static final String J2S_LOG_METHODS_DECLARED = "j2s.log.methods.declared";

	/**
	 * log file name for methods called
	 */
	private static final String J2S_LOG_METHODS_CALLED = "j2s.log.methods.called";

	private static final String J2S_LOG_ALL_CALLS = "j2s.log.all.calls";

	private static final String J2S_LOG_ALL_CALLS_TRUE = "true";

	private static final String J2S_EXCLUDED_PATHS = "j2s.excluded.paths";

	private static final String J2S_TESTING = "j2s.testing";

	private static final String J2S_TESTING_TRUE = "true";

	private static final String J2S_COMPILER_NONQUALIFIED_PACKAGES = "j2s.compiler.nonqualified.packages";

	private static final String J2S_COMPILER_NONQUALIFIED_CLASSES = "j2s.compiler.nonqualified.classes";

	private static final String J2S_COMPILER_MODE = "j2s.compiler.mode";

	private static final String J2S_COMPILER_MODE_DEBUG = "debug";

	private static final String J2S_CLASS_REPLACEMENTS = "j2s.class.replacements";

	private static final String J2S_TEMPLATE_HTML = "j2s.template.html";
	
	
	private Properties props;
	private String htmlTemplate = null;

	private String projectFolder;

	private String j2sPath;

	private String logDeclared;

	private boolean logAllCalls;

	private String logCalled;

	private String excludedPaths;

	private String siteFolder;

	private boolean testing;
	
	private List<String> lstExcludedPaths;

	private boolean isCleanBuild;

	boolean isCompilationParticipant;

	private ASTParser astParser;

	private IJavaProject project;

	private boolean isDebugging;

	static boolean isActive(IJavaProject project) {
		try {
			return new File(project.getProject().getLocation().toOSString(), J2S_OPTIONS_FILE_NAME).exists();
		} catch (@SuppressWarnings("unused") Exception e) {
			return false;
		}
	}

	Java2ScriptCompiler() {
		// initialized only once using CompilationParticipant; every time using
		// older Builder idea
	}

	/**
	 * only for CompilationParticipant
	 * @param isClean
	 */
	void startBuild(boolean isClean) {
		// at the beginning of a clean build, clear data
		isCleanBuild = isClean;
		htmlTemplate = null;
		if (isClean) {
			copyResources.clear();
			lstMethodsDeclared = null;
			htMethodsCalled = null;
		}

	}

 	/**
	 * from Java2ScriptCompilationParticipant.java
	 * 
	 * get all necessary .j2s params for a build
	 * 
	 * @param project
	 * @param isCompilationParticipant
	 * @return true if this is a j2s project and is enabled
	 * 
	 */
	boolean initializeProject(IJavaProject project, boolean isCompilationParticipant) {
		this.project = project;
		this.isCompilationParticipant = isCompilationParticipant;
		if (!isActive(project)) {
			// the file .j2s does not exist in the project directory -- skip this project
			return false;
		}
		projectFolder = project.getProject().getLocation().toOSString();
		props = new Properties();
		try {
			File j2sFile = new File(projectFolder, J2S_OPTIONS_FILE_NAME);
			props.load(new FileInputStream(j2sFile));
			String status = getProperty(J2S_COMPILER_STATUS);
			if (!J2S_COMPILER_STATUS_ENABLE.equalsIgnoreCase(status) && !J2S_COMPILER_STATUS_ENABLED.equalsIgnoreCase(status)) {
				if (getFileContents(j2sFile).trim().length() == 0) {
				  writeToFile(j2sFile, getDefaultJ2SFile());
				} else {
				 // not enabled
				return false;
				}
			}
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}

		File file;
		siteFolder = getProperty(J2S_SITE_DIRECTORY);
		if (siteFolder == null)
			siteFolder = "site";
		siteFolder = projectFolder + "/" + siteFolder;
		j2sPath = siteFolder + "/swingjs/j2s";

		if (isDebugging)
			System.out.println("Java2ScriptCompiler writing to " + j2sPath);
		// method declarations and invocations are only logged
		// when the designated files are deleted prior to building

		logDeclared = (isCompilationParticipant && !isCleanBuild ? null : getProperty(J2S_LOG_METHODS_DECLARED));
		if (logDeclared != null) {
			if (!(file = new File(projectFolder, logDeclared)).exists()) {
				lstMethodsDeclared = new ArrayList<String>();
				System.err.println("logging methods declared to " + file);
			}
			logDeclared = projectFolder + "/" + logDeclared;
		}
		logAllCalls = false;

		logCalled = (isCompilationParticipant && !isCleanBuild ? null : getProperty(J2S_LOG_METHODS_CALLED));
		if (logCalled != null) {
			if (!(file = new File(projectFolder, logCalled)).exists()) {
				htMethodsCalled = new Hashtable<String, String>();
				System.err.println("logging methods called to " + file);
			}
			logCalled = projectFolder + "/" + logCalled;
			logAllCalls = J2S_LOG_ALL_CALLS_TRUE.equalsIgnoreCase(getProperty(J2S_LOG_ALL_CALLS));
		}

		excludedPaths = getProperty(J2S_EXCLUDED_PATHS);

		lstExcludedPaths = null;

		if (excludedPaths != null) {
			lstExcludedPaths = new ArrayList<String>();
			String[] paths = excludedPaths.split(";");
			for (int i = 0; i < paths.length; i++)
				if (paths[i].trim().length() > 0)
					lstExcludedPaths.add(paths[i].trim() + "/");
			if (lstExcludedPaths.size() == 0)
				lstExcludedPaths = null;
		}

		testing = J2S_TESTING_TRUE.equalsIgnoreCase(getProperty(J2S_TESTING));

		String prop = getProperty(J2S_COMPILER_NONQUALIFIED_PACKAGES);
		// older version of the name
		String nonqualifiedPackages = getProperty(J2S_COMPILER_NONQUALIFIED_CLASSES);
		nonqualifiedPackages = (prop == null ? "" : prop)
			+ (nonqualifiedPackages == null ? "" : (prop == null ? "" : ";") + nonqualifiedPackages);
	    if (nonqualifiedPackages.length() == 0)
	    	nonqualifiedPackages = null;
		// includes @j2sDebug blocks
		isDebugging = J2S_COMPILER_MODE_DEBUG.equalsIgnoreCase(getProperty(J2S_COMPILER_MODE));

		String classReplacements = getProperty(J2S_CLASS_REPLACEMENTS);

		String htmlTemplateFile = getProperty(J2S_TEMPLATE_HTML);
		if (htmlTemplateFile == null)
			htmlTemplateFile = "template.html";

		if (htmlTemplate == null) {
			file = new File(projectFolder, htmlTemplateFile);
			if (!file.exists()) {
				String html = getDefaultHTMLTemplate();
				System.err.println("creating new htmltemplate\n" + html);
				writeToFile(file, html);
			}
			htmlTemplate = getFileContents(file);
			if (showJ2SSettings)
				System.err.println("using HTML template " + file);
		}

		Java2ScriptVisitor.setDebugging(isDebugging);
		Java2ScriptVisitor.setLogging(lstMethodsDeclared, htMethodsCalled, logAllCalls);

		Java2ScriptVisitor.NameMapper.setNonQualifiedNamePackages(nonqualifiedPackages);
		Java2ScriptVisitor.NameMapper.setClassReplacements(classReplacements);
		
		astParser = ASTParser.newParser(JSL_LEVEL);
	
		return true;
	}

	/**
	 * from Java2ScriptCompilationParticipant.java
	 * 
	 * process the source file into JavaScript using the JDT abstract syntax
	 * tree parser and visitor
	 * 
	 * @param javaSource
	 */
	boolean compileToJavaScript(IFile javaSource) {

		String fileName = new String(javaSource.getName());
		if (lstExcludedPaths != null) {
			for (int i = lstExcludedPaths.size(); --i >= 0;)
				if (fileName.startsWith(lstExcludedPaths.get(i)))
					return true;
		}
		org.eclipse.jdt.core.ICompilationUnit createdUnit = JavaCore.createCompilationUnitFrom(javaSource);
		astParser.setSource(createdUnit);
		// note: next call must come before each createAST call
		astParser.setResolveBindings(true); 
		CompilationUnit root = (CompilationUnit) astParser.createAST(null);
		// If the Java2ScriptVisitor is ever extended, it is important to set the project.
		// Java2ScriptVisitor#addClassOrInterface uses getClass().newInstance().setproject(project). 
		Java2ScriptVisitor visitor = new Java2ScriptVisitor().setProject(project, testing);

		try {

			// transpile the code

			root.accept(visitor);

			// generate the .js file(s) in the site directory

			outputJavaScript(visitor, j2sPath);

			logMethods(logCalled, logDeclared, logAllCalls);

			// add the HTML files in the site directory

			addHTML(visitor.getAppList(true), siteFolder, htmlTemplate, true);
			addHTML(visitor.getAppList(false), siteFolder, htmlTemplate, false);
		} catch (Throwable e) {
			e.printStackTrace();
			e.printStackTrace(System.out);
			// find the file and delete it.
			String filePath = j2sPath;
			String rootName = root.getJavaElement().getElementName();
			rootName = rootName.substring(0, rootName.lastIndexOf('.'));
			String packageName = visitor.getMyPackageName();
			if (packageName != null) {
				File folder = new File(filePath, packageName.replace('.', File.separatorChar));
				filePath = folder.getAbsolutePath();
				File jsFile = new File(filePath, rootName + ".js"); //$NON-NLS-1$
				if (jsFile.exists()) {
					System.out.println("Java2ScriptCompiler deleting " + jsFile);
					jsFile.delete();
				}
			}
			return false;
		}
		String packageName = visitor.getMyPackageName();
		if (packageName != null) {
			int pt = packageName.indexOf(".");
			if (pt >= 0)
				packageName = packageName.substring(0, pt);
			if (!copyResources.contains(packageName)) {
				copyResources.add(packageName);
				File src = new File(projectFolder + "/src", packageName);
				File dest = new File(j2sPath, packageName);
				copySiteResources(src, dest);
			}
		}
		return true;
	}

	//// private methods ////
	
	
	private void logMethods(String logCalled, String logDeclared, boolean doAppend) {
		if (htMethodsCalled != null)
			try {
				File file = new File(logCalled);
				file.createNewFile();
				FileOutputStream fos = new FileOutputStream(file, doAppend);
				for (String key : htMethodsCalled.keySet()) {
					String val = htMethodsCalled.get(key);
					fos.write(key.getBytes());
					if (!val.equals("-")) {
						fos.write(',');
						fos.write(val.getBytes());
					}
					fos.write('\n');
				}
				fos.close();
			} catch (Exception e) {
				System.err.println("Cannot log to " + logCalled + " " + e.getMessage());
			}
		if (lstMethodsDeclared != null)
			try {
				File file = new File(logDeclared);
				file.createNewFile();
				FileOutputStream fos = new FileOutputStream(file, true);
				for (int i = 0, n = lstMethodsDeclared.size(); i < n; i++) {
					fos.write(lstMethodsDeclared.get(i).getBytes());
					fos.write('\n');
				}
				fos.close();
			} catch (Exception e) {
				System.err.println("Cannot log to " + logDeclared + " " + e.getMessage());
			}
	}

	private String getProperty(String key) {
		String val = props.getProperty(key);
		if (showJ2SSettings)
			System.err.println(key + " = " + val);
		return val;
	}

	private void outputJavaScript(Java2ScriptVisitor visitor, String j2sPath) {

		// fragments[0] is package]
		List<String> elements = visitor.getElementList();

		// BH all compression is deprecated --- use Google Closure Compiler

		String packageName = visitor.getMyPackageName();
		for (int i = 0; i < elements.size();) {
			String elementName = elements.get(i++);
			String element = elements.get(i++);
			createJSFile(j2sPath, packageName, elementName, element);
		}
		showJ2SSettings = false; // just once per compilation run
	}

	private void createJSFile(String j2sPath, String packageName, String elementName, String js) {
		if (packageName != null) {
			File folder = new File(j2sPath, packageName.replace('.', File.separatorChar));
			j2sPath = folder.getAbsolutePath();
			if (!folder.exists() || !folder.isDirectory()) {
				if (!folder.mkdirs()) {
					throw new RuntimeException("Failed to create folder " + j2sPath); //$NON-NLS-1$
				}
			}
		}
		File f = new File(j2sPath, elementName + ".js");
		if (isDebugging)
			System.out.println("Java2ScriptCompiler creating " + f);
		writeToFile(f, js);
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
		} catch (@SuppressWarnings("unused") IOException e) {
			//
		}
		return null;
	}

	private void writeToFile(File file, String data) {
		if (data == null)
			return;
		try {
			FileOutputStream os = new FileOutputStream(file);
			os.write(data.getBytes("UTF-8"));
			os.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
    }

	/**
	 * The default .j2s file. Replaces .j2s only if it is found but is empty.
	 * 
	 * OK, I know this should be a resource.
	 * 
	 * 
	 * 
	 */
	
	private String getDefaultJ2SFile() {

		return "#j2s default configuration file created by net.sf.java2script_" 
        + CorePlugin.VERSION + " " + new Date() + "\n\n" +
        "#enable the Java2Script transpiler -- comment out to disable\n" + 
		"j2s.compiler.status=enable\n" + 
		"\n" + 
		"\n" + 
		"# destination directory for all JavaScript\n" + 
		"j2s.site.directory=site\n" + 
		"\n" + 
		"# uncomment j2s.* lines to process:\n" + 
		"\n" + 
		"# a semicolon-separated list of package-level file paths to be excluded\n" + 
		"#j2s.excluded.paths=test;testng\n" + 
		"\n" + 
		"# output file name for logging methods declared - delete the file to regenerate a listing \n" + 
		"#j2s.log.methods.declared=methodsDeclared.csv\n" + 
		"\n" + 
		"#output file name for logging methods called - delete the file to regenerate a listing\n" + 
		"#j2s.log.methods.called=methodsCalled.csv\n" + 
		"\n" + 
		"#if set, every instance of methods called will be logged\n" + 
		"#otherwise, only the first call to a method will be logged \n" + 
		"#output will be comma-separated: called method,caller class \n" + 
		"#j2s.log.all.calls=true\n" + 
		"\n" + 
		"# a semicolon-separated list of packages that contain classes for which the method names\n" + 
		"# in their classes should not be \"qualified\" to indicate their parameter types. \n" + 
		"# This option is useful if you have an API interface in Java that refers to JavaScript \n" + 
		"# methods such as calling window or jQuery functions or the methods in Clazz or J2S. \n" + 
		"# The classes must not have any methods that are overloaded - with the\n" + 
		"# same name but different paramater type, as JavaScript will only see the last one.\n" + 
		"#j2s.compiler.nonqualified.packages=org.jmol.api.js;jspecview.api.js\n" + 
		"\n" + 
		"# uncomment to add debugging output. Start eclipse with the -consoleLog option to see output.\n" + 
		"#j2s.compiler.mode=debug\n" + 
		"\n" + 
		"# a semicolon-separated list of from->to listings of package (foo.) or class (foo.bar) \n" + 
		"# replacements to be made. This option allows for having one class or package used in Java\n" + 
		"# and another used in JavaScript. Take care with this. All methods in both packages must\n" + 
		"# have exactly the same parameter signature. We use it in Jalview to provide a minimal\n" + 
		"# JavaScript implementation of a large third-party library while still using that library's\n" + 
		"# jar file in Java.\n" + 
		"#j2s.class.replacements=org.apache.log4j.->jalview.javascript.log4j.\n" + 
		"\n" + 
		"# uncomment and change if you do not want to use the template.html file created for you\n" + 
		"# in your project directory. A default template file will be created by the transpiler \n" + 
		"# directory if there is none there already.\n" + 
		"#j2s.template.html=template.html\n";
	}
	/**
	 * The default template file. The user can specify another in the .j2s file
	 * using template.html=.....
	 * 
	 * @return default template with _NAME_, _CODE_, and _MAIN_ to fill in.
	 */
	private String getDefaultHTMLTemplate() {
		return "<!DOCTYPE html>\n" + 
				"<html>\n" + 
				"<head>\n" + 
				"<title>SwingJS test _NAME_</title><meta charset=\"utf-8\" />\n" + 
				"<script src=\"swingjs/swingjs2.js\"></script>\n" + 
				"<script>\n" + 
				"if (!self.SwingJS)alert('swingjs2.js was not found. It needs to be in swingjs folder in the same directory as ' + document.location.href)\n" + 
				"Info = {\n" + 
				"  code: _CODE_,\n" + 
				"  main: _MAIN_,\n" + 
				"  core: \"NONE\",\n" + 
				"	width: 850,\n" + 
				"	height: 550,\n" + 
				"  readyFunction: null,\n" + 
				"	serverURL: 'https://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php',\n" + 
				"	j2sPath: 'swingjs/j2s',\n" + 
				"	console:'sysoutdiv',\n" + 
				"	allowjavascript: true\n" + 
				"}\n" + 
				"</script>\n" + 
				"</head>\n" + 
				"<body>\n" + 
				"<script>\n" + 
				"SwingJS.getApplet('testApplet', Info)\n" + 
				"getClassList = function(){J2S._saveFile('_j2sclasslist.txt', Clazz.ClassFilesLoaded.sort().join('\\n'))}\n" + 
				"</script>\n" + 
				"<div style=\"position:absolute;left:900px;top:30px;width:600px;height:300px;\">\n" + 
				"<div id=\"sysoutdiv\" contentEditable=\"true\" style=\"border:1px solid green;width:100%;height:95%;overflow:auto\"></div>\n" + 
				"This is System.out. <a href=\"javascript:testApplet._clearConsole()\">clear it</a> <br>Add ?j2snocore to URL to see full class list; ?j2sdebug to use uncompressed j2s/core files <br><a href=\"javascript:getClassList()\">get _j2sClassList.txt</a>\n" + 
				"</div>\n" + 
				"</body>\n" + 
				"</html>\n";
	}

	/**
	 * Create a test HTML file for the applet or application. It will go into
	 * <project>/site.
	 * 
	 * @param appList
	 * @param siteFolder
	 * @param template
	 * @param isApplet
	 */
	private void addHTML(ArrayList<String> appList, String siteFolder, String template, boolean isApplet) {
		if (appList == null || template == null)
			return;
		for (int i = appList.size(); --i >= 0;) {
			String cl = appList.get(i);
			String _NAME_ = cl.substring(cl.lastIndexOf(".") + 1);
			String fname = cl.replaceAll("\\.", "_") + (isApplet ? "_applet" : "") + ".html";
			cl = "\"" + cl + "\"";
			String _MAIN_ = (isApplet ? "null" : cl);
			String _CODE_ = (isApplet ? cl : "null");
			template = template.replace("_NAME_", _NAME_).replace("_CODE_", _CODE_).replace("_MAIN_", _MAIN_);
			System.err.println("Java2Script creating " + siteFolder + "/" + fname);
			writeToFile(new File(siteFolder, fname), template);
		}
	}

	private FileFilter filter = new FileFilter() {

		@Override
		public boolean accept(File pathname) {
			return pathname.isDirectory() || !pathname.getName().endsWith(".java");
		}

	};

	private void copySiteResources(File from, File dest) {
		copyNonclassFiles(from, dest);
	}

	private void copyNonclassFiles(File dir, File target) {
		if (dir.equals(target))
			return;
		File[] files = dir.listFiles(filter);
		File f = null;
		if (files != null) 
			try {
				if (!target.exists())
					Files.createDirectories(target.toPath());
				for (int i = 0; i < files.length; i++) {
					f = files[i];
					if (f == null) {
						//
					} else if (f.isDirectory()) {
						copyNonclassFiles(f, new File(target, f.getName()));
					} else {
						Files.copy(f.toPath(), new File(target, f.getName()).toPath(),
								StandardCopyOption.REPLACE_EXISTING);
						System.err.println("copied to site: " + f.toPath());
					}
				}
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				System.err.println("error copying " + f + " to " + target);
				e1.printStackTrace();
			}
	}

}
