package j2s.swingjs;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.eclipse.core.resources.IFile;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.CompilationUnit;

import j2s.CorePlugin;
import j2s.core.Java2ScriptCompilationParticipant;
import j2s.core.Java2ScriptCompiler;

/**
 * The main (and currently only operational) Java2Script compiler.
 * 
 * @author Bob Hanson
 *
 */
public class Java2ScriptSwingJSCompiler extends Java2ScriptCompiler {

	private int nResources, nSources, nJS, nHTML;

	private Map<String, String> htMethodsCalled;
	private List<String> lstMethodsDeclared;
	private String ignoredAnnotations;

	/**
	 * allow async for Runnable.run (experimental)
	 * 
	 */
	private static final String J2S_ALLOW_ASYNC_THREAD = "j2s.async.thread";
	private static final String J2S_ALLOW_ASYNC_THREAD_DEFAULT = "false";

	/**
	 * log file name for methods declared
	 */
	private static final String J2S_LOG_METHODS_DECLARED = "j2s.log.methods.declared";
	private static final String J2S_LOG_METHODS_DECLARED_DEFAULT = "<no log file>";

	/**
	 * log file name for methods called
	 */
	private static final String J2S_LOG_METHODS_CALLED = "j2s.log.methods.called";
	private static final String J2S_LOG_METHODS_CALLED_DEFAULT = "<no log file>";

	private static final String J2S_LOG_ALL_CALLS = "j2s.log.all.calls";
	private static final String J2S_LOG_ALL_CALLS_DEFAULT = "false";

	/**
	 * Added 3.2.6
	 */
	private static final String J2S_COMPILER_READ_ANNOTATIONS = "j2s.compiler.read.annotations";
	private static final String J2S_COMPILER_READ_ANNOTATIONS_DEFAULT = "true";
	private static final String J2S_COMPILER_IGNORED_ANNOTATIONS = "j2s.compiler.ignored.annotations";
	public static final String J2S_COMPILER_IGNORED_ANNOTATIONS_DEFAULT = "CallerSensitive;" + "ConstructorProperties;"
			+ "Deprecated;" + "Override;" + "SafeVarargs;" + "SuppressWarnings;" + "FunctionalInterface;"
			+ "Documented;" + "Inherited;" + "Native;" + "Repeatable;" + "Retention;" + "Transient;";

	private static final String J2S_COMPILER_NONQUALIFIED_PACKAGES = "j2s.compiler.nonqualified.packages";
	private static final String J2S_COMPILER_NONQUALIFIED_PACKAGES_DEFAULT = "<none>";

	private static final String J2S_COMPILER_NONQUALIFIED_CLASSES = "j2s.compiler.nonqualified.classes";
	private static final String J2S_COMPILER_NONQUALIFIED_CLASSES_DEFAULT = "<none>";

	private static final String J2S_TEMPLATE_HTML = "j2s.template.html";
	private static final String J2S_TEMPLATE_HTML_DEFAULT = "template.html";

	private static final String J2S_CLASS_REPLACEMENTS = "j2s.class.replacements";
	private static final String J2S_CLASS_REPLACEMENTS_DEFAULT = "<none>";

	/**
	 * An alternative .j2s config file somewhere else on the system. For example,
	 * 
	 * j2s.config.altfileproperty=j2s.config.file.to.use
	 * 
	 * will use
	 * 
	 * System.getProperty("j2s.config.file.to.use")
	 * 
	 * to get the path to a different .j2s file rather than the one being read.
	 * 
	 */
	protected static final String J2S_OPTIONS_ALTFILEPROPERTY = "j2s.config.altfileproperty";

	private String htmlTemplate = null;

	private String logDeclared;

	private boolean logAllCalls;

	private String logCalled;

	private boolean allowAsyncThread;

	public boolean doBreakOnError() {
		return breakOnError;
	}

	public Java2ScriptSwingJSCompiler() {
		super(true, J2S_CONFIG_SWINGJS);
	}

	/**
	 * only for CompilationParticipant
	 * 
	 * @param isClean
	 */
	public void startBuild(boolean isClean) {
		// at the beginning of a clean build, clear data
		super.startBuild(isClean);
		htmlTemplate = null;
		if (isClean) {
			lstMethodsDeclared = null;
			htMethodsCalled = null;
		}
	}

	/**
	 * Iteratively look for a .j2s file to use for configuration information. Up to
	 * five iterations are allowed.
	 * 
	 * @param j2sFile
	 * @param level
	 */
	protected Properties initializeUsing(File j2sFile, int altLevel) {
		Properties props = super.initializeUsing(j2sFile, altLevel);
		if (++altLevel > 5) {
			System.out.println("J2S maximum number of levels using " + J2S_OPTIONS_ALTFILEPROPERTY + " exceeded");
			// in case these are self-referencing
		}
		if (props == this.props) {
			// file load failed
			return props;
		}
		String j2sAltFileProperty = props.getProperty(J2S_OPTIONS_ALTFILEPROPERTY);
		if (j2sAltFileProperty != null) {
			System.out.println(J2S_OPTIONS_ALTFILEPROPERTY + " = " + j2sAltFileProperty);
			String j2sAltFileName = System.getProperty(j2sAltFileProperty);
			System.out.println("J2S System.getProperty(\"" + j2sAltFileProperty + "\") = " + j2sAltFileName);
			if (j2sAltFileName != null && j2sAltFileName.length() > 0) {
				return initializeUsing(new File(projectFolder, j2sAltFileName), altLevel);
			}
		}
		return props;
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
	@SuppressWarnings({ "unused", "deprecation" })
	public boolean initializeProject(IJavaProject project) {
		if (!super.initializeProject(project, AST.JLS8))
			return false;

		nResources = nSources = nJS = nHTML = 0;
 
		allowAsyncThread = "true".equalsIgnoreCase(getProperty(J2S_ALLOW_ASYNC_THREAD, J2S_ALLOW_ASYNC_THREAD_DEFAULT));

		j2sPath = siteFolder + "/swingjs/j2s";
		System.out.println("J2S writing to " + j2sPath);
		// method declarations and invocations are only logged
		// when the designated files are deleted prior to building

		logDeclared = (!isCleanBuild ? null : getProperty(J2S_LOG_METHODS_DECLARED, J2S_LOG_METHODS_DECLARED_DEFAULT));
		File file;
		if (logDeclared != null) {
			if (!(file = new File(projectFolder, logDeclared)).exists()) {
				lstMethodsDeclared = new ArrayList<String>();
				System.err.println("logging methods declared to " + file);
			}
			logDeclared = projectFolder + "/" + logDeclared;
		}
		logAllCalls = false;

		logCalled = (!isCleanBuild ? null : getProperty(J2S_LOG_METHODS_CALLED, J2S_LOG_METHODS_CALLED_DEFAULT));
		if (logCalled != null) {
			if (!(file = new File(projectFolder, logCalled)).exists()) {
				htMethodsCalled = new Hashtable<String, String>();
				System.err.println("logging methods called to " + file);
			}
			logCalled = projectFolder + "/" + logCalled;
			logAllCalls = "true".equalsIgnoreCase(getProperty(J2S_LOG_ALL_CALLS, J2S_LOG_ALL_CALLS_DEFAULT));
		}

		boolean readAnnotations = !"false"
				.equals(getProperty(J2S_COMPILER_READ_ANNOTATIONS, J2S_COMPILER_READ_ANNOTATIONS_DEFAULT));

		ignoredAnnotations = (readAnnotations
				? getProperty(J2S_COMPILER_IGNORED_ANNOTATIONS, J2S_COMPILER_IGNORED_ANNOTATIONS_DEFAULT)
				: null);

		String prop = getProperty(J2S_COMPILER_NONQUALIFIED_PACKAGES, J2S_COMPILER_NONQUALIFIED_PACKAGES_DEFAULT);
		// older version of the name
		String nonqualifiedPackages = getProperty(J2S_COMPILER_NONQUALIFIED_CLASSES,
				J2S_COMPILER_NONQUALIFIED_CLASSES_DEFAULT);
		nonqualifiedPackages = (prop == null ? "" : prop)
				+ (nonqualifiedPackages == null ? "" : (prop == null ? "" : ";") + nonqualifiedPackages);
		if (nonqualifiedPackages.length() == 0)
			nonqualifiedPackages = null;

		String classReplacements = getProperty(J2S_CLASS_REPLACEMENTS, J2S_CLASS_REPLACEMENTS_DEFAULT);

		String htmlTemplateFile = getProperty(J2S_TEMPLATE_HTML, J2S_TEMPLATE_HTML_DEFAULT);
		if (htmlTemplate == null) {
			file = new File(projectFolder, htmlTemplateFile);
			if (!file.exists()) {
				String html = getDefaultHTMLTemplate();
				System.out.println("J2S creating new htmltemplate file " + file);
				writeToFile(file, html);
			}
			htmlTemplate = getFileContents(file);
			System.out.println("J2S using HTML template " + file);
		}

		Java2ScriptVisitor.setAnnotating(ignoredAnnotations);
		Java2ScriptVisitor.setDebugging(isDebugging);
		Java2ScriptVisitor.setExactLong(true); // no other option anymore; exactLong is great!
		Java2ScriptVisitor.setAllowAsyncThread(allowAsyncThread);
		Java2ScriptVisitor.setLogging(lstMethodsDeclared, htMethodsCalled, logAllCalls);

		Java2ScriptVisitor.NameMapper.setNonQualifiedNamePackages(nonqualifiedPackages);
		Java2ScriptVisitor.NameMapper.setClassReplacements(classReplacements);

		if (isCleanBuild)
			Java2ScriptVisitor.startCleanBuild();

		return true;
	}

	/**
	 * from Java2ScriptCompilationParticipant.java
	 * 
	 * process the source file into JavaScript using the JDT abstract syntax tree
	 * parser and visitor
	 * 
	 * @param javaSource
	 */
	public boolean compileToJavaScript(IFile javaSource, String trailer) {
		nSources++;
		String sourceLocation = javaSource.getLocation().toString();
		org.eclipse.jdt.core.ICompilationUnit createdUnit = JavaCore.createCompilationUnitFrom(javaSource);
		astParser.setSource(createdUnit);
		// note: next call must come before each createAST call
		astParser.setResolveBindings(true);
		CompilationUnit root = (CompilationUnit) astParser.createAST(null);
		// If the Java2ScriptVisitor is ever extended, it is important to set the
		// project.
		// Java2ScriptVisitor#addClassOrInterface uses
		// getClass().newInstance().setproject(project).
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
			String packageName = visitor.getMyPackageName();
			if (packageName != null) {
				nResources += checkCopiedResources(packageName, sourceLocation);
			}
			return true;
		} catch (Throwable e) {
			e.printStackTrace();
			e.printStackTrace(System.out);
			// find the file and delete it.
			String outPath = j2sPath;
			String rootName = root.getJavaElement().getElementName();
			rootName = rootName.substring(0, rootName.lastIndexOf('.'));
			String packageName = visitor.getMyPackageName();
			if (packageName != null) {
				File folder = new File(outPath, packageName.replace('.', File.separatorChar));
				outPath = folder.getAbsolutePath();
				File jsFile = new File(outPath, rootName + ".js"); //$NON-NLS-1$
				if (jsFile.exists()) {
					System.out.println("J2S deleting " + jsFile);
					jsFile.delete();
				}
			}
			return false;
		}
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

	private void outputJavaScript(Java2ScriptVisitor visitor, String j2sPath) {
		List<String> elements = visitor.getElementList();
		String packageName = visitor.getMyPackageName();
		for (int i = 0; i < elements.size();) {
			String elementName = elements.get(i++);
			String js = elements.get(i++);
			createJSFile(j2sPath, packageName, elementName, js);
		}
	}

	/**
	 * The default .j2s file. Replaces .j2s only if it is found but is empty.
	 * 
	 */

	@Override
	protected String getDefaultJ2SFile() {

		return "#j2s default configuration file created by net.sf.java2script_" + CorePlugin.VERSION + " " + new Date()
				+ "\n\n" + "#enable the Java2Script transpiler -- comment out to disable\n"
				+ "# default is \"enabled\".\n" + "j2s.compiler.status=enable\n" + "\n" + "\n"
				+ "# destination directory for all JavaScript\n" + "j2s.site.directory=site\n" + "\n"
				+ "# uncomment j2s.* lines to process:\n" + "\n"
				+ "# a semicolon-separated list of package-level file paths to be excluded (default \"<none>\")\n"
				+ "#j2s.excluded.paths=test;testng\n" + "\n" + "# whether to read annotations\n"
				+ "#j2s.compiler.read.annotations=" + J2S_COMPILER_READ_ANNOTATIONS_DEFAULT + "\n" + "\n"
				+ "# a semicolon-separated list of annotations to ignore, if reading annotations\n"
				+ "#j2s.compiler.ignored.annotations=" + J2S_COMPILER_IGNORED_ANNOTATIONS_DEFAULT + "\n" + "\n"
				+ "# output file name for logging methods declared - delete the file to regenerate a listing \n"
				+ "#j2s.log.methods.declared=methodsDeclared.csv\n" + "\n"
				+ "#output file name for logging methods called - delete the file to regenerate a listing\n"
				+ "#j2s.log.methods.called=methodsCalled.csv\n" + "\n"
				+ "#if set, every instance of methods called will be logged\n"
				+ "#otherwise, only the first call to a method will be logged \n"
				+ "#output will be comma-separated: called method,caller class \n" + "#j2s.log.all.calls=true\n" + "\n"
				+ "# a semicolon-separated list of packages that contain classes for which the method names\n"
				+ "# in their classes should not be \"qualified\" to indicate their parameter types. \n"
				+ "# This option is useful if you have an API interface in Java that refers to JavaScript \n"
				+ "# methods such as calling window or jQuery functions or the methods in Clazz or J2S. \n"
				+ "# The classes must not have any methods that are overloaded - with the\n"
				+ "# same name but different paramater type, as JavaScript will only see the last one.\n"
				+ "# default is \"<none>\".\n"
				+ "#j2s.compiler.nonqualified.packages=org.jmol.api.js;jspecview.api.js\n" + "\n"
				+ "# uncomment to add debugging output. Start eclipse with the -consoleLog option to see output.\n"
				+ "#j2s.compiler.mode=debug\n\n"
				+ "# a semicolon-separated list of from->to listings of package (foo.) or class (foo.bar) \n"
				+ "# replacements to be made. This option allows for having one class or package used in Java\n"
				+ "# and another used in JavaScript. Take care with this. All methods in both packages must\n"
				+ "# have exactly the same parameter signature. We use it in Jalview to provide a minimal\n"
				+ "# JavaScript implementation of a large third-party library while still using that library's\n"
				+ "# jar file in Java.\n# default is \"<none>\".\n"
				+ "#j2s.class.replacements=org.apache.log4j.->jalview.javascript.log4j.\n" + "\n"
				+ "# uncomment and change if you do not want to use the template.html file created for you\n"
				+ "# in your project directory. A default template file will be created by the transpiler \n"
				+ "# directory if there is none there already.\n" + "#j2s.template.html=template.html\n\n"
				+ "# a System.property of your choice that points to an alternative .j2s configuration file\n"
				+ "# that can be used in place of this .j2s file for ALL configuration settings.\n"
				+ "# This look-up can be iterated at most 5 times.\n"
				+ "#j2s.config.altfileproperty=j2s.config.filename\n";
	}

	/**
	 * The default template file. The user can specify another in the .j2s file
	 * using template.html=.....
	 * 
	 * @return default template with _NAME_, _CODE_, and _MAIN_ to fill in.
	 */
	private String getDefaultHTMLTemplate() {
		return "<!DOCTYPE html>\n" + "<html>\n" + "<head>\n"
				+ "<title>SwingJS test _NAME_</title><meta charset=\"utf-8\" />\n"
				+ "<script src=\"swingjs/swingjs2.js\"></script>\n" + "<script>\n"
				+ "if (!self.SwingJS)alert('swingjs2.js was not found. It needs to be in swingjs folder in the same directory as ' + document.location.href)\n"
				+ "Info = {\n" + "  code: _CODE_,\n" + "  main: _MAIN_,\n" + "  core: \"NONE\",\n" + "	width: 850,\n"
				+ "	height: 550,\n" + "  readyFunction: null,\n"
				+ "	serverURL: 'https://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php',\n"
				+ "	j2sPath: 'swingjs/j2s',\n" + "	console:'sysoutdiv',\n" + "	allowjavascript: true\n" + "}\n"
				+ "</script>\n" + "</head>\n" + "<body>\n" + "<script>\n" + "SwingJS.getApplet('testApplet', Info)\n"
				+ "getClassList = function(){J2S._saveFile('_j2sclasslist.txt', Clazz.ClassFilesLoaded.sort().join('\\n'))}\n"
				+ "</script>\n" + "<div style=\"position:absolute;left:900px;top:30px;width:600px;height:300px;\">\n"
				+ "<div id=\"sysoutdiv\" contentEditable=\"true\" style=\"border:1px solid green;width:100%;height:95%;overflow:auto\"></div>\n"
				+ "This is System.out. <a href=\"javascript:testApplet._clearConsole()\">clear it</a>  <a href='javascript:J2S.getProfile()'>start/stop profiling</a><br>see <a href=___j2sflags.htm>___j2sflags.htm</a> for SwingJS URL command-line options<br><a href=\"javascript:getClassList()\">get _j2sClassList.txt</a>\n"
				+ "</div>\n" + "</body>\n" + "</html>\n";
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
			System.out.println("J2S creating " + siteFolder + "/" + fname);
			writeToFile(new File(siteFolder, fname), template);
			nHTML++;
		}
	}

	@Override
	public void finalizeProject() {
		System.out.println(
				"J2S SwingJS plugin processed " + nSources + " .java file" + Java2ScriptCompilationParticipant.plural(nSources)
						+ ", created " + nJS + " .js file" + Java2ScriptCompilationParticipant.plural(nJS) + " and "
						+ nHTML + " .html file" + Java2ScriptCompilationParticipant.plural(nHTML) + ", copied "
						+ nResources + " resource" + Java2ScriptCompilationParticipant.plural(nResources));
	}

}
