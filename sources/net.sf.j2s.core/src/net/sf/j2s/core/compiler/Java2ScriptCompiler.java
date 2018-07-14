package net.sf.j2s.core.compiler;

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
import java.util.HashSet;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTParser;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.internal.compiler.env.ICompilationUnit;
import org.eclipse.jdt.internal.core.builder.SourceFile;

import net.sf.j2s.core.astvisitors.Java2ScriptVisitor;
//import net.sf.j2s.core.builder.SourceFile;
//import net.sf.j2s.core.builder.SourceFileProxy;
//import net.sf.j2s.core.hotspot.InnerHotspotServer;

/**
 * The main (and currently only operational) Java2Script compiler.
 * 
 * @author Bob Hanson
 *
 */
@SuppressWarnings("restriction")
public class Java2ScriptCompiler {

	// BH: added "true".equals(getProperty(props,
	// "j2s.compiler.allow.compression")) to ensure compression only occurs when
	// desired
	private static final int JSL_LEVEL = AST.JLS8; // BH can we go to JSL 8?

	private boolean showJ2SSettings = true;

	// We copy all non .java files from any directory from which we loaded a
	// java file into the site directory
	private final HashSet<String> copyResources = new HashSet<String>();
	private Map<String, String> htMethodsCalled;
	private List<String> lstMethodsDeclared;

	private Properties props;
	private String htmlTemplate = null;

	private String projectFolder;

	private String j2sPath;

	private String logDeclared;

	private boolean logAllCalls;

	private String logCalled;

	private String excludedPaths;

	private String siteFolder;

	private List<String> lstExcludedPaths;

	private boolean isCleanBuild;

	private boolean isCompilationParticipant;

	public static boolean isActive(IProject project) {
		return new File(project.getProject().getLocation().toOSString(), ".J2S").exists();
	}

	public Java2ScriptCompiler() {
		// initialized only once using CompilationParticipant; every time using
		// older Builder idea
	}

	/**
	 * only for CompilationParticipant
	 * @param isClean
	 */
	public void startBuild(boolean isClean) {
		// at the beginning of a clean build, clear data
		isCleanBuild = isClean;
		htmlTemplate = null;
		if (isClean) {
			copyResources.clear();
			lstMethodsDeclared = null;
			htMethodsCalled = null;
		}
	}

//	/**
//	 * old way from original builder
//	 * 
//	 */
//	public void process(ICompilationUnit sourceUnit, IContainer binaryFolder) {
//		if (!(sourceUnit instanceof SourceFile))
//			return;
//		if (!initializeProject(binaryFolder.getProject(), false))
//			return;
//		compileToJavaScript(((SourceFile) sourceUnit).resource);
//	}

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
	public boolean initializeProject(IProject project, boolean isCompilationParticipant) {
		this.isCompilationParticipant = isCompilationParticipant;
		if (!isActive(project)) {
			/*
			 * The file .j2s is a marker for Java2Script to compile JavaScript
			 */
			return false;
		}
		projectFolder = project.getLocation().toOSString();
		props = new Properties();
		try {
			props.load(new FileInputStream(new File(projectFolder, ".j2s")));
			String status = getProperty("j2s.compiler.status");
			if (!"enable".equals(status)) {
				/*
				 * Not enabled!
				 */
				return false;
			}
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}

		File file;
		siteFolder = getProperty("j2s.site.directory");
		if (siteFolder == null)
			siteFolder = "site";
		siteFolder = projectFolder + "/" + siteFolder;
		j2sPath = siteFolder + "/swingjs/j2s";

		// method declarations and invocations are only logged
		// when the designated files are deleted prior to building

		logDeclared = (isCompilationParticipant && !isCleanBuild ? null : getProperty("j2s.log.methods.declared"));
		if (logDeclared != null) {
			if (!(file = new File(projectFolder, logDeclared)).exists()) {
				lstMethodsDeclared = new ArrayList<String>();
				System.err.println("logging methods declared to " + file);
			}
			logDeclared = projectFolder + "/" + logDeclared;
		}
		logAllCalls = false;

		logCalled = (isCompilationParticipant && !isCleanBuild ? null : getProperty("j2s.log.methods.called"));
		if (logCalled != null) {
			if (!(file = new File(projectFolder, logCalled)).exists()) {
				htMethodsCalled = new Hashtable<String, String>();
				System.err.println("logging methods called to " + file);
			}
			logCalled = projectFolder + "/" + logCalled;
			logAllCalls = "true".equals(getProperty("j2s.log.all.calls"));
		}

		excludedPaths = getProperty("j2s.excluded.paths");

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

		String nonqualifiedClasses = getProperty("j2s.compiler.nonqualified.classes");

		// includes @j2sDebug blocks
		boolean isDebugging = "debug".equals(getProperty("j2s.compiler.mode"));

		String classReplacements = getProperty("j2s.class.replacements");

		String htmlTemplateFile = getProperty("j2s.template.html");
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

		Java2ScriptVisitor.setNoQualifiedNamePackages(nonqualifiedClasses);
		Java2ScriptVisitor.setDebugging(isDebugging);
		Java2ScriptVisitor.setClassReplacements(classReplacements);
		Java2ScriptVisitor.setLogging(lstMethodsDeclared, htMethodsCalled, logAllCalls);
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
	public void compileToJavaScript(IFile javaSource) {

		CompilationUnit root;
		ASTParser astParser = ASTParser.newParser(JSL_LEVEL);

		String fileName = new String(javaSource.getName());
		if (lstExcludedPaths != null) {
			for (int i = lstExcludedPaths.size(); --i >= 0;)
				if (fileName.startsWith(lstExcludedPaths.get(i)))
					return;
		}

		org.eclipse.jdt.core.ICompilationUnit createdUnit = JavaCore.createCompilationUnitFrom(javaSource);
		astParser.setResolveBindings(true);
		astParser.setSource(createdUnit);
		root = (CompilationUnit) astParser.createAST(null);
		Java2ScriptVisitor visitor = new Java2ScriptVisitor();

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
			// find the file and delete it.
			String filePath = j2sPath;
			String rootName = root.getJavaElement().getElementName();
			rootName = rootName.substring(0, rootName.lastIndexOf('.'));
			String packageName = visitor.getPackageName();
			if (packageName != null) {
				File folder = new File(filePath, packageName.replace('.', File.separatorChar));
				filePath = folder.getAbsolutePath();
				File jsFile = new File(filePath, rootName + ".js"); //$NON-NLS-1$
				if (jsFile.exists()) {
					System.out.println("Java2ScriptCompiler deleting " + jsFile);
					jsFile.delete();
				}
			}
		}
		String packageName = visitor.getPackageName();
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
	}

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

	public void outputJavaScript(Java2ScriptVisitor visitor,
			// DependencyASTVisitor dvisitor, CompilationUnit fRoot,
			String j2sPath) {

		// fragments[0] is package]
		List<String> elements = visitor.getElementList();// dvisitor.getDependencyScript(visitor.getBuffer());

		// BH all compression is deprecated --- use Google Closure Compiler

		String packageName = visitor.getPackageName();
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
			// InnerHotspotServer.addCompiledItem(packageName + "." +
			// elementName);
		} else {
			// InnerHotspotServer.addCompiledItem(elementName);
		}
		writeToFile(new File(j2sPath, elementName + ".js"), js);
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
	 * The default template file. The user can specify another in the .j2s file
	 * using template.html=.....
	 * 
	 * @return default template with _NAME_, _CODE_, and _MAIN_ to fill in.
	 */
	private String getDefaultHTMLTemplate() {
		String ret = "<!DOCTYPE html>\n<html>\n" + "<head>\n" + "<title>SwingJS test _NAME_</title>"
				+ "<meta charset=\"utf-8\" />\n" + "<script src=\"swingjs/swingjs2.js\"></script>\n" + "<script>\n"
				+ "if (!self.SwingJS)alert('swingjs2.js was not found. It needs to be in swingjs folder in the same directory as ' + document.location.href)\n"
				+ "Info = {\n" + "  code: _CODE_,\n" + "  main: _MAIN_,\n" + "	width: 850,\n" + "	height: 550,\n"
				+ "  readyFunction: null,\n"
				+ "	serverURL: 'https://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php',\n"
				+ "	j2sPath: 'swingjs/j2s',\n" + "	console:'sysoutdiv',\n" + "	allowjavascript: true\n" + "}\n"
				+ "</script>\n</head>\n<body>\n<script>\n" + "SwingJS.getApplet('testApplet', Info)\n"
				+ "getClassList = function(){J2S._saveFile('_j2sclasslist.txt', Clazz.ClassFilesLoaded.sort().join('\\n'))}\n"
				+ "</script>\n" + "<div style=\"position:absolute;left:900px;top:30px;width:600px;height:300px;\">\n"
				+ "<div id=\"sysoutdiv\" style=\"border:1px solid green;width:100%;height:95%;overflow:auto\"></div>\n"
				+ "This is System.out. <a href=\"javascript:testApplet._clearConsole()\">clear it</a> <br>Add ?j2snocore to URL to see full class list; ?j2sdebug to use uncompressed j2s/core files <br><a href=\"javascript:getClassList()\">get _j2sClassList.txt</a>\n"
				+ "</div>\n" + "</body>\n" + "</html>\n";
		return ret;
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
		System.err.println(
				"copy nonclassFiles " + dir + " to " + target + " [" + (files != null ? "" + files.length : "") + "]");
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
						System.err.println("copied " + f + " to " + target);
					}
				}
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				System.err.println("error copying " + f + " to " + target);
				e1.printStackTrace();
			}
	}

}
