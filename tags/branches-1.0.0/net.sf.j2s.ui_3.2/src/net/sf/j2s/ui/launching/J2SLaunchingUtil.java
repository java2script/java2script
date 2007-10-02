package net.sf.j2s.ui.launching;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;

import net.sf.j2s.core.astvisitors.DependencyASTVisitor;
import net.sf.j2s.core.hotspot.InnerHotspotServer;
import net.sf.j2s.ui.Java2ScriptUIPlugin;
import net.sf.j2s.ui.classpath.CompositeResources;
import net.sf.j2s.ui.classpath.ContactedClasses;
import net.sf.j2s.ui.classpath.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpath.Resource;
import net.sf.j2s.ui.classpath.UnitClass;
import net.sf.j2s.ui.preferences.PreferenceConstants;
import net.sf.j2s.ui.property.FileUtil;
import net.sf.j2s.ui.resources.ExternalResources;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Platform;
import org.eclipse.core.variables.VariablesPlugin;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IMethod;
import org.eclipse.jdt.core.IType;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.internal.corext.util.JavaModelUtil;
import org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.osgi.service.datalocation.Location;
import org.eclipse.swt.widgets.Display;

public class J2SLaunchingUtil {

	public static void launchingJ2SUnit(ILaunchConfiguration configuration, String mode, String extensionName)
			throws CoreException {
		boolean isJUnit = true;
		String mainType = J2SLaunchingUtil.getMainType(configuration);
		if (mainType == null) {
			return;
		}

		File workingDir = J2SLaunchingUtil.getWorkingDirectory(configuration);

		if (workingDir != null) {
			StringBuffer buf = new StringBuffer();
			boolean useXHTMLHeader = configuration.getAttribute(
					IJ2SLauchingConfiguration.USE_XHTML_HEADER, true);

			IPreferenceStore store = Java2ScriptUIPlugin.getDefault().getPreferenceStore();

			boolean preferred = store.getBoolean(PreferenceConstants.ADDON_COMPATIABLE);
			
			boolean addonCompatiable = configuration.getAttribute(
					IJ2SLauchingConfiguration.J2S_MOZILLA_ADDON_COMPATIABLE, preferred);
			//boolean addonCompatiable = true;
			
			String[][] allResources = ExternalResources.getAllResources();
			String j2sLibPath = null;
			if (allResources != null && allResources.length != 0 && allResources[0].length != 0) {
				if ((allResources[0][0]).startsWith("|")) {
					allResources[0][0] = FileUtil.toRelativePath(allResources[0][0].substring(1), 
							workingDir.getAbsolutePath());;
				}
				j2sLibPath = allResources[0][0].substring(0, allResources[0][0].lastIndexOf("/") + 1);
			} else {
				j2sLibPath = "../net.sf.j2s.lib/j2slib/";
			}

			boolean isUseGlobalURL = configuration.getAttribute(IJ2SLauchingConfiguration.USE_GLOBAL_ALAA_URL, false);
			String gj2sLibPath = j2sLibPath;
			if (isUseGlobalURL) {
				gj2sLibPath = configuration.getAttribute(IJ2SLauchingConfiguration.GLOBAL_J2SLIB_URL, j2sLibPath);
				if (gj2sLibPath.length() == 0) {
					gj2sLibPath = "./";
				}
				if (!gj2sLibPath.endsWith("/")) {
					gj2sLibPath += "/";
				}
			}
			
			IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
			String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
			if ((projectName == null) || (projectName.trim().length() < 1)) {
				MessageDialog.openError(null, "Project Error", "No Java2Script project is selected.");
				return;
			}			
			IJavaProject javaProject = javaModel.getJavaProject(projectName);
			if ((javaProject == null) || !javaProject.exists()) {
				MessageDialog.openError(null, "Project Error", "The selected project is not a Java2Script project.");
				return;
			}
			String path = javaProject.getOutputLocation().toString();
			int idx = path.indexOf('/', 2);
			String relativePath = "";
			if (idx != -1) {
				relativePath = path.substring(idx + 1); 
			}
			String grelativePath = relativePath;
			if (isUseGlobalURL) {
				grelativePath = configuration.getAttribute(IJ2SLauchingConfiguration.GLOBAL_BINARY_URL, relativePath);
				if (grelativePath.length() == 0) {
					grelativePath = "./";
				}
				if (!grelativePath.endsWith("/")) {
					grelativePath += "/";
				}
			}

			String args = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, (String) null);

			generateJ2SHeaderHTML(buf, useXHTMLHeader, addonCompatiable,
					gj2sLibPath, mainType, workingDir, configuration);

			String j2xStr = generatePreJavaScript(buf, args, 
					grelativePath, gj2sLibPath, isJUnit, mode, mainType, workingDir,
					configuration);
			
			if (addonCompatiable) {
				generateFirefoxAddonPreJavaScript(buf, j2sLibPath, gj2sLibPath,
						grelativePath, mainType, workingDir, configuration);
				
				buf.append("\t\tClazzLoader.loadClass (\"junit.textui.TestRunner\", function () {\r\n");
				buf.append("\t\t\tClazzLoader.loadClass (\"" + mainType + "\", function () {\r\n");
				IType mType = JavaModelUtil.findType(javaProject, mainType);
				boolean isTestSuite = false;
				if (mType != null) {
					IMethod suiteMethod = JavaModelUtil.findMethod("suite", new String[0], false, mType);
					if (suiteMethod != null) {
						String returnType = suiteMethod.getReturnType();
						if ("QTest;".equals(returnType) 
								|| "Qjunit.framework.Test;".equals(returnType) ) {
							isTestSuite = true;
						}
					}
				}
				if (isTestSuite) {
					buf.append("\t\t\t\tjunit.textui.TestRunner.run (" + mainType + ".suite ());\r\n");
				} else {
					buf.append("\t\t\t\tjunit.textui.TestRunner.run (" + mainType + ");\r\n");
				}
				buf.append("\t\t\t});\r\n");
				buf.append("\t\t});\r\n");

				buf.append("\t}\r\n");
				buf.append("};\r\n");

				generateFirefoxAddonPostJavaScript(buf, j2sLibPath, gj2sLibPath,
						workingDir, configuration);
			} else {
				generatePreLoadingJavaScript(buf, j2xStr, mainType, gj2sLibPath,
						isJUnit, grelativePath, workingDir, configuration);
				
				buf.append("ClazzLoader.loadClass (\"junit.textui.TestRunner\", function () {\r\n");
				buf.append("\tClazzLoader.loadClass (\"" + mainType + "\", function () {\r\n");
				IType mType = JavaModelUtil.findType(javaProject, mainType);
				boolean isTestSuite = false;
				if (mType != null) {
					IMethod suiteMethod = JavaModelUtil.findMethod("suite", new String[0], false, mType);
					if (suiteMethod != null) {
						String returnType = suiteMethod.getReturnType();
						if ("QTest;".equals(returnType) 
								|| "Qjunit.framework.Test;".equals(returnType) ) {
							isTestSuite = true;
						}
					}
				}
				if (isTestSuite) {
					buf.append("\t\tjunit.textui.TestRunner.run (" + mainType + ".suite ());\r\n");
				} else {
					buf.append("\t\tjunit.textui.TestRunner.run (" + mainType + ");\r\n");
				}
				buf.append("\t});\r\n");
				buf.append("});\r\n");
			}

			generatePostJavaScript(buf, configuration);

			String url = writeBufferToFile(buf, mainType, workingDir, extensionName);

			Display.getDefault().asyncExec(
					new J2SApplicationRunnable(configuration, url));
		} else {
			MessageDialog.openError(null, "Project Error", "The selected J2S's working folder is not found.");
		}
	}

	public static void launchingJ2SApp(ILaunchConfiguration configuration, String mode, String extensionName)
			throws CoreException {
		boolean isJUnit = false;
		String mainType = J2SLaunchingUtil.getMainType(configuration);
		if (mainType == null) {
			return;
		}

		File workingDir = J2SLaunchingUtil.getWorkingDirectory(configuration);

		if (workingDir != null) {
			StringBuffer buf = new StringBuffer();
			boolean useXHTMLHeader = configuration.getAttribute(
					IJ2SLauchingConfiguration.USE_XHTML_HEADER, true);

			IPreferenceStore store = Java2ScriptUIPlugin.getDefault().getPreferenceStore();

			boolean preferred = store.getBoolean(PreferenceConstants.ADDON_COMPATIABLE);
			
			boolean addonCompatiable = configuration.getAttribute(
					IJ2SLauchingConfiguration.J2S_MOZILLA_ADDON_COMPATIABLE, preferred);
			//boolean addonCompatiable = true;
			
			String[][] allResources = ExternalResources.getAllResources();
			String j2sLibPath = null;
			if (allResources != null && allResources.length != 0 && allResources[0].length != 0) {
				if ((allResources[0][0]).startsWith("|")) {
					allResources[0][0] = FileUtil.toRelativePath(allResources[0][0].substring(1), 
							workingDir.getAbsolutePath());;
				}
				j2sLibPath = allResources[0][0].substring(0, allResources[0][0].lastIndexOf("/") + 1);
			} else {
				j2sLibPath = "../net.sf.j2s.lib/j2slib/";
			}

			boolean isUseGlobalURL = configuration.getAttribute(IJ2SLauchingConfiguration.USE_GLOBAL_ALAA_URL, false);
			String gj2sLibPath = j2sLibPath;
			if (isUseGlobalURL) {
				gj2sLibPath = configuration.getAttribute(IJ2SLauchingConfiguration.GLOBAL_J2SLIB_URL, j2sLibPath);
				if (gj2sLibPath.length() == 0) {
					gj2sLibPath = "./";
				}
				if (!gj2sLibPath.endsWith("/")) {
					gj2sLibPath += "/";
				}
			}
			
			IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
			String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
			if ((projectName == null) || (projectName.trim().length() < 1)) {
				MessageDialog.openError(null, "Project Error", "No Java2Script project is selected.");
				return;
			}			
			IJavaProject javaProject = javaModel.getJavaProject(projectName);
			if ((javaProject == null) || !javaProject.exists()) {
				MessageDialog.openError(null, "Project Error", "The selected project is not a Java2Script project.");
				return;
			}
			String path = javaProject.getOutputLocation().toString();
			int idx = path.indexOf('/', 2);
			String relativePath = "";
			if (idx != -1) {
				relativePath = path.substring(idx + 1); 
			}
			String grelativePath = relativePath;
			if (isUseGlobalURL) {
				grelativePath = configuration.getAttribute(IJ2SLauchingConfiguration.GLOBAL_BINARY_URL, relativePath);
				if (grelativePath.length() == 0) {
					grelativePath = "./";
				}
				if (!grelativePath.endsWith("/")) {
					grelativePath += "/";
				}
			}

			String args = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, (String) null);

			generateJ2SHeaderHTML(buf, useXHTMLHeader, addonCompatiable,
					gj2sLibPath, mainType, workingDir, configuration);

			String j2xStr = generatePreJavaScript(buf, args, 
					grelativePath, gj2sLibPath, isJUnit, mode, mainType, workingDir,
					configuration);
			
			if (addonCompatiable) {
				generateFirefoxAddonPreJavaScript(buf, j2sLibPath, gj2sLibPath,
						grelativePath, mainType, workingDir, configuration);
				
				buf.append("\t\tClazzLoader.loadClass (\"" + mainType + "\", function () {\r\n");
				buf.append("\t\t\t" + mainType + ".main(" + ArgsUtil.wrapAsArgumentArray(args, true) + ");\r\n");
				buf.append("\t\t});\r\n");

				buf.append("\t}\r\n");
				buf.append("};\r\n");

				generateFirefoxAddonPostJavaScript(buf, j2sLibPath, gj2sLibPath,
						workingDir, configuration);
			} else {
				generatePreLoadingJavaScript(buf, j2xStr, mainType, gj2sLibPath,
						isJUnit, grelativePath, workingDir, configuration);
				
				buf.append("ClazzLoader.loadClass (\"" + mainType + "\", function () {\r\n");
				buf.append("\t" + mainType + ".main(" + ArgsUtil.wrapAsArgumentArray(args, true) + ");\r\n");
				buf.append("});\r\n");
			}

			generatePostJavaScript(buf, configuration);

			String url = writeBufferToFile(buf, mainType, workingDir, extensionName);

			Display.getDefault().asyncExec(
					new J2SApplicationRunnable(configuration, url));
		} else {
			MessageDialog.openError(null, "Project Error", "The selected J2S's working folder is not found.");
		}
	}

	private static String writeBufferToFile(StringBuffer buf, String mainType,
			File workingDir, String extensionName) {
		String html = buf.toString();
		String rootPath = workingDir.getAbsolutePath();
		File file = new File(rootPath, mainType + "." + extensionName);
		J2SLaunchingUtil.writeMainHTML(file, html);
		String url = null;
		try {
			url = file.toURL().toExternalForm();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		return url;
	}

	private static void generatePostJavaScript(StringBuffer buf,
			ILaunchConfiguration configuration) throws CoreException {
		buf.append("</script>\r\n");

		buf.append(configuration.getAttribute(
				IJ2SLauchingConfiguration.TAIL_BODY_HTML, ""));
		buf.append("</body>\r\n");
		buf.append("</html>");
	}

	private static void generatePreLoadingJavaScript(StringBuffer buf,
			String j2xStr, String mainType, String gj2sLibPath, boolean isJUnit,
			String grelativePath, File workingDir,
			ILaunchConfiguration configuration) throws CoreException {
		if (j2xStr.indexOf("\"java\"") == -1) {
			buf.append("ClazzLoader.packageClasspath (\"java\", \"");
			buf.append(gj2sLibPath);
			buf.append("\", true);\r\n");
		}
		if (isJUnit && j2xStr.indexOf("\"junit\"") == -1) {
			buf.append("ClazzLoader.packageClasspath (\"junit\", \"");
			buf.append(gj2sLibPath);
			buf.append("\", true);\r\n");
		}
		buf.append(j2xStr);
		
		buf.append("ClazzLoader.setPrimaryFolder (\"");
		buf.append(grelativePath);
		buf.append("\");\r\n");
		
		J2SCyclicProjectUtils.emptyTracks();
		buf.append(J2SLaunchingUtil.generateClasspathIgnoredClasses(configuration, mainType, workingDir, ""));
		
		J2SCyclicProjectUtils.emptyTracks();
		buf.append(J2SLaunchingUtil.generateClasspathExistedClasses(configuration, mainType, workingDir, ""));
	}

	private static void generateFirefoxAddonPostJavaScript(StringBuffer buf,
			String j2sLibPath, String gj2sLibPath, File workingDir,
			ILaunchConfiguration configuration) throws CoreException {
		boolean addonCompatiableRawJS = configuration.getAttribute(
				IJ2SLauchingConfiguration.J2S_MOZILLA_ADDON_COMPATIABLE_RAW_JS, true);
		
		if (!addonCompatiableRawJS) {
			buf.append("</script>\r\n<script type=\"text/javascript\" src=\"" + gj2sLibPath + "mozilla.addon.js\">");
		} else {
			buf.append("\r\n");
			File folder = new File(workingDir.getAbsolutePath(), j2sLibPath);
			File file = new File(folder, "mozilla.addon.js");
			if (file.exists()) {
				try {
					String addonJS = J2SLaunchingUtil.readAFile(new FileInputStream(file));
					if (addonJS != null) {
						buf.append(addonJS);
					}
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				}
			}
		}
	}

	private static void generateFirefoxAddonPreJavaScript(StringBuffer buf,
			String j2sLibPath, String gj2sLibPath, String grelativePath,
			String mainType, File workingDir, ILaunchConfiguration configuration)
			throws CoreException {
		buf.append("window[\"j2s.lib\"] = {\r\n");
		File j2slibFolder = new File(workingDir.getAbsolutePath(), j2sLibPath);
		File j2sRelease = new File(j2slibFolder, ".release");
		Properties release = new Properties();
		String alias = "1.0.0";
		String version = "20071001";
		release.put("alias", alias);
		release.put("version", version);
		if (j2sRelease.exists()) {
			try {
				release.load(new FileInputStream(j2sRelease));
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			alias = release.getProperty("alias");
			version = release.getProperty("version");
		}
		
		String kPath = gj2sLibPath.trim();
		if (kPath.charAt(kPath.length() - 1) == '/') {
			kPath = kPath.substring(0, kPath.length() - 1);
		}
		int j2sIdx = kPath.lastIndexOf("/");
		if (j2sIdx != -1) {
			if (!"http://archive.java2script.org/".equals(kPath.substring(0, j2sIdx + 1))) {
				buf.append("\t/*base : \"http://archive.java2script.org/\",*/\r\n");
			}
			buf.append("\tbase : \"" + kPath.substring(0, j2sIdx + 1) + "\",\r\n");
			if (!alias.equals(kPath.substring(j2sIdx + 1))) {
				buf.append("\t/*alias : \"" + alias + "\",*/\r\n");
			}
			buf.append("\talias : \"" + kPath.substring(j2sIdx + 1) + "\",\r\n");
		} else {
			buf.append("\tbase : \"http://archive.java2script.org/\",\r\n");
			buf.append("\talias : \"" + alias + "\",\r\n");
		}
		buf.append("\tversion : \"" + version + "\",\r\n");
		buf.append("\t/*forward : true,*/\r\n");
		buf.append("\tmode : \"dailybuild\",\r\n");
		buf.append("\tonload : function () {\r\n");
		
		buf.append("\t\tClazzLoader.setPrimaryFolder (\"");
		buf.append(grelativePath);
		buf.append("\");\r\n");
		
		J2SCyclicProjectUtils.emptyTracks();
		buf.append(J2SLaunchingUtil.generateClasspathIgnoredClasses(configuration, mainType, workingDir, "\t\t"));
		
		J2SCyclicProjectUtils.emptyTracks();
		buf.append(J2SLaunchingUtil.generateClasspathExistedClasses(configuration, mainType, workingDir, "\t\t"));
	}

	private static String generatePreJavaScript(StringBuffer buf, String args, 
			String grelativePath, String gj2sLibPath, boolean isJUnit, String mode,
			String mainType, File workingDir, ILaunchConfiguration configuration)
			throws CoreException {
		buf.append("<a class=\"alaa\" href=\"javascript:if(a='");
		buf.append(mainType);
		buf.append('@');
		buf.append(grelativePath);
		buf.append("'");
		if (args != null && args.length() > 2) { // []
			buf.append(",r=");
			buf.append(J2SLaunchingUtil.toXMLString(ArgsUtil.wrapAsArgumentArray(args, false)));
		}
		buf.append(",window['ClazzLoader']!=null)" + (isJUnit ? "$u$" : "$w$") + "(a");
		if (args != null && args.length() > 2) { // []
			buf.append(",r");
		}
		buf.append(");else{var d=document,t='onreadystatechange',x=d.createElement('SCRIPT')," +
				"f=function(){var s=this.readyState;if(s==null||s=='loaded'||s=='complete'){" + (isJUnit ? "$u$" : "$w$") + "(a");
		if (args != null && args.length() > 2) { // []
			buf.append(",r");
		}
		buf.append(");}};x.src='");
		buf.append(gj2sLibPath);
		buf.append("j2slib.z.js';(typeof x[t]=='undefined')?x.onload=f:x[t]=f;" +
				"d.getElementsByTagName('HEAD')[0].appendChild(x);void(0);}\">");
		buf.append(mainType);
		buf.append("</a>\r\n\r\n");
		
		/*
		 * MainType Class may already included in the header section
		 */
		buf.append("<script type=\"text/javascript\">\r\n");

		J2SCyclicProjectUtils.emptyTracks();
		String j2xStr = J2SLaunchingUtil.generateClasspathJ2X(configuration, mainType, workingDir);
		
		if ("debug".equals(mode)) {
			buf.append("window[\"j2s.script.debugging\"] = true;\r\n");
			if (j2xStr.indexOf("swt") != -1) {
				buf.append("window[\"swt.debugging\"] = true;\r\n");
			}
			buf.append("window[\"j2s.hotspot.port\"] = ");
			buf.append(InnerHotspotServer.getHotspotPort());
			buf.append(";\r\n\r\n");
		}
		return j2xStr;
	}

	private static void generateJ2SHeaderHTML(StringBuffer buf,
			boolean useXHTMLHeader, boolean addonCompatiable,
			String gj2sLibPath, String mainType, File workingDir,
			ILaunchConfiguration configuration) throws CoreException {
		if (useXHTMLHeader) {
			buf.append("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"\r\n");
			buf.append("\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\r\n");
			buf.append("<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\">\r\n");
		} else {
			buf.append("<html>\r\n");
		}
		buf.append("<head>\r\n");
		buf.append("<title>");
		buf.append(mainType);
		buf.append("</title>\r\n");
		buf.append("<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"/>\r\n");
		buf.append(configuration.getAttribute(
				IJ2SLauchingConfiguration.HEAD_HEADER_HTML, ""));

		if (!addonCompatiable) {
			buf.append("<script type=\"text/javascript\" src=\"" + gj2sLibPath + "j2slib.z.js\"></script>\r\n");
		}
		
		J2SCyclicProjectUtils.emptyTracks();
		String extraHTML = J2SLaunchingUtil.generateClasspathHTML(configuration, mainType, workingDir);
		if (extraHTML.trim().length() != 0) { 
			buf.append(extraHTML);
		}

		buf.append(configuration.getAttribute(
				IJ2SLauchingConfiguration.TAIL_HEADER_HTML, ""));
		
		buf.append("<style text=\"text/css\">\r\n");
		buf.append("div.powered {\r\n");
		buf.append("\tposition:absolute;\r\n" +
				"\tright:0;\r\n" +
				"\ttop:0;\r\n" +
				"\tmargin:1em;\r\n");
		buf.append("}\r\n");
		buf.append("a.alaa {\r\n");
		buf.append("\tdisplay:block;\r\n" +
				"\twhite-space:nowrap;\r\n" +
				"\twidth:1em;\r\n" +
				"\toverflow-x:visible;\r\n" +
				"\ttext-decoration:none;\r\n" +
				"\tborder-left:1em solid rgb(57,61,254);\r\n" +
				"\tpadding-left:4px;\r\n" +
				"\tmargin:2em;\r\n" +
				"\tcolor:navy;\r\n" +
				"\tcursor:pointer;\r\n" +
				"\tcursor:hand;\r\n");
		buf.append("}\r\n");
		buf.append("</style>\r\n");
		buf.append("</head>\r\n");
		buf.append("<body>\r\n");
		buf.append(configuration.getAttribute(
				IJ2SLauchingConfiguration.HEAD_BODY_HTML, ""));
		
		// The following is a link for developers to load application for 
		// any times. And this link may be used as "A Link An Application"
		// if relative part
		buf.append("<!-- A Link An Application (ALAA) -->\r\n");
		buf.append("<div class=\"powered\">Powered by <a href=\"http://java2script.org/\">Java2Script</a></div>\r\n");
	}

	public static void writeMainHTML(File file, String html) {
		try {
			FileOutputStream fos = new FileOutputStream(file);
			fos.write(new byte[] {(byte) 0xef, (byte) 0xbb, (byte) 0xbf}); // UTF-8 header!
			fos.write(html.getBytes("utf-8"));
			fos.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/*
	 * Append the *.js in classpath
	 */
	static String generateClasspathHTML(
			ILaunchConfiguration configuration, String mainType, File workingDir)
			throws CoreException {
		StringBuffer buf = new StringBuffer();
		
		IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
		String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
		if ((projectName == null) || (projectName.trim().length() < 1)) {
			return buf.toString();
		}			
		IJavaProject javaProject = javaModel.getJavaProject(projectName);
		if ((javaProject == null) || !javaProject.exists()) {
			return buf.toString();
		}
		
		String path = javaProject.getOutputLocation().toString();
		int idx = path.indexOf('/', 2);
		String relativePath = null;
		if (idx != -1) {
			relativePath = path.substring(idx + 1); 
		}
	
		String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
		if (classpath == null || classpath.trim().length() == 0) {
			IRuntimeClasspathEntry[] paths = JavaRuntime.computeUnresolvedRuntimeClasspath(configuration);
			Set existed = new HashSet();
			for (int i = 0; i < paths.length; i++) {
				if (paths[i] instanceof Resource) {
					Resource res = (Resource) paths[i];
					if (!J2SCyclicProjectUtils.visit(res)) {
						continue;
					}
					if (!existed.contains(res.getName())) {
						existed.add(res.getName());
						buf.append(res.toHTMLString());
					}
				}
			}
		} else {
			CompositeResources fModel= new CompositeResources();
			fModel.setFolder(workingDir);
			fModel.setRelativePath(".j2s");
			
			fModel.setBinRelativePath(relativePath);
	
			if (classpath == null || classpath.trim().length() == 0) {
				fModel.load();
			} else {
				if (relativePath == null) {
					relativePath = "";
				}
				String propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
				fModel.load(new ByteArrayInputStream(propStr.getBytes()));
			}
			buf.append(fModel.toHTMLString());
		}
		
		String str = buf.toString();
		buf = new StringBuffer();
		String[] split = str.split("\r\n|\r|\n");
		Set set = new HashSet();
		for (int i = 0; i < split.length; i++) {
			if (set.contains(split[i])) {
				String line = split[i].toLowerCase();
				if (line.startsWith("<script ") && line.indexOf("src=") != -1) {
					continue;
				}
				if (line.startsWith("<link ") && line.indexOf("href=") != -1) {
					continue;
				}
			}
			set.add(split[i]);
			buf.append(split[i]);
			buf.append("\r\n");
		}
		return buf.toString();
	}

	/*
	 * Append the *.js in classpath
	 */
	static String generateClasspathJ2X(
			ILaunchConfiguration configuration, String mainType, File workingDir)
			throws CoreException {
		boolean isUseGlobalURL = configuration.getAttribute(IJ2SLauchingConfiguration.USE_GLOBAL_ALAA_URL, false);
		StringBuffer buf = new StringBuffer();
		
		IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
		String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
		if ((projectName == null) || (projectName.trim().length() < 1)) {
			return buf.toString();
		}			
		IJavaProject javaProject = javaModel.getJavaProject(projectName);
		if ((javaProject == null) || !javaProject.exists()) {
			return buf.toString();
		}
		
		String path = javaProject.getOutputLocation().toString();
		int idx = path.indexOf('/', 2);
		String relativePath = null;
		if (idx != -1) {
			relativePath = path.substring(idx + 1); 
		}
	
		String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
		if (classpath == null || classpath.trim().length() == 0) {
			IRuntimeClasspathEntry[] paths = JavaRuntime.computeUnresolvedRuntimeClasspath(configuration);
			Set existed = new HashSet();
			for (int i = 0; i < paths.length; i++) {
				if (paths[i] instanceof ContactedClasses) {
					ContactedClasses res = (ContactedClasses) paths[i];
					if (!existed.contains(res.getName())) {
						existed.add(res.getName());
						buf.append(res.toJ2XString());
						buf.append(',');
					}
				} else if (paths[i] instanceof CompositeResources) {
					CompositeResources c = (CompositeResources) paths[i];
					if (!existed.contains(c.getName())) {
						existed.add(c.getName());
						buf.append(c.toJ2XString());
						buf.append(',');
					}
				}
			}
		} else {
			CompositeResources fModel= new CompositeResources();
			fModel.setFolder(workingDir);
			fModel.setRelativePath(".j2s");
			
			fModel.setBinRelativePath(relativePath);
	
			if (classpath == null || classpath.trim().length() == 0) {
				fModel.load();
			} else {
				if (relativePath == null) {
					relativePath = "";
				}
				String propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
				fModel.load(new ByteArrayInputStream(propStr.getBytes()));
			}
			buf.append(fModel.toJ2XString());
		}
		
		String str = buf.toString();
		buf = new StringBuffer();
		String[] split = str.split("\r\n|\r|\n|,");
		Set set = new HashSet();
		Set keyPkg = new HashSet();
		for (int i = 0; i < split.length; i++) {
			if (set.contains(split[i])) {
				continue;
			}
			set.add(split[i]);
			if (split[i] != null && split[i].trim().length() != 0) {
				String j2xPath = split[i].trim();
				File f = new File(j2xPath);
				if (!f.exists() && j2xPath.indexOf("net.sf.j2s.lib") != -1) {
					if (j2xPath.matches(".*\\.v\\d{3}.*")) { // installed by update manager
						j2xPath = j2xPath.replaceAll("\\.v\\d{3}", "");
						f = new File(j2xPath);
					} else { // is normally installed but is importing incompatiable projects 
						Location location = Platform.getInstallLocation();
						URL url = location.getURL();
						File file = new File(url.getFile(), "plugins");
						File[] j2sFolders = file.listFiles(new FileFilter() {
							public boolean accept(File pathname) {
								String name = pathname.getName().toLowerCase();
								if (name.startsWith("net.sf.j2s.lib")) {
									return true;
								}
								return false;
							}
						});
						File j2slib = null;
						if (j2sFolders != null && j2sFolders.length != 0) {
							j2slib = j2sFolders[0];
							j2xPath = j2xPath.replaceAll("net\\.sf\\.j2s\\.lib([^\\/\\\\])*(\\/|\\\\)", j2slib.getName() + "$2");
							f = new File(j2xPath);
						}
					}
				}
				if (f.exists()) {
					Properties prop = new Properties();
					try {
						prop.load(new FileInputStream(f));
					} catch (FileNotFoundException e) {
						e.printStackTrace();
					} catch (IOException e) {
						e.printStackTrace();
					}
					String pkg = prop.getProperty("package.prefix");
					if (keyPkg.contains(pkg)) {
						continue;
					}
					keyPkg.add(pkg);
					buf.append("ClazzLoader.packageClasspath (\"");
					buf.append(pkg);
					buf.append("\", \"");
					String j2slibPath = FileUtil.toRelativePath(f.getParent(), workingDir.getAbsolutePath());
					String gj2sLibPath = j2slibPath;
					if (isUseGlobalURL) {
						gj2sLibPath = configuration.getAttribute(IJ2SLauchingConfiguration.GLOBAL_J2SLIB_URL, j2slibPath);
						if (gj2sLibPath.length() == 0) {
							gj2sLibPath = "./";
						}
						if (!gj2sLibPath.endsWith("/")) {
							gj2sLibPath += "/";
						}
					}
					buf.append(gj2sLibPath);
					buf.append("\"");
					File pkgFile = new File(f.getParentFile(), pkg.replace('.', '/') + "/package.js");
					if (pkgFile.exists()) {
						buf.append(", true");
					}
					buf.append(");\r\n");
				}
			}
		}
		return buf.toString();
	}

	/*
	 * Append the *.js in classpath
	 */
	static String generateClasspathExistedClasses (
			ILaunchConfiguration configuration, String mainType, File workingDir, String indent)
			throws CoreException {
		boolean isUseGlobalURL = configuration.getAttribute(IJ2SLauchingConfiguration.USE_GLOBAL_ALAA_URL, false);
		
		StringBuffer buf = new StringBuffer();
		
		IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
		String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
		if ((projectName == null) || (projectName.trim().length() < 1)) {
			return buf.toString();
		}			
		IJavaProject javaProject = javaModel.getJavaProject(projectName);
		if ((javaProject == null) || !javaProject.exists()) {
			return buf.toString();
		}
	
		String path = javaProject.getOutputLocation().toString();
		int idx = path.indexOf('/', 2);
		String relativePath = null;
		File srcFolder = null;
		if (idx != -1) {
			relativePath = path.substring(idx + 1);
			srcFolder = new File(workingDir, relativePath);
		} else {
			relativePath = "";
			srcFolder = workingDir;
		}
	
		buf.append('[');
		try {
			buf.append(srcFolder.getCanonicalPath());
		} catch (IOException e) {
			// should never run into these lines!
			e.printStackTrace();
			buf.append(relativePath);
		}
		buf.append("],");
		String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
		if (classpath == null || classpath.trim().length() == 0) {
			IRuntimeClasspathEntry[] paths = JavaRuntime.computeUnresolvedRuntimeClasspath(configuration);
			Set existed = new HashSet();
			for (int i = 0; i < paths.length; i++) {
				if (paths[i] instanceof UnitClass) {
					UnitClass unit = (UnitClass) paths[i];
					if (!J2SCyclicProjectUtils.visit(unit)) {
						continue;
					}
					buf.append(unit.getClassName());
					buf.append(',');
				}
			}
			for (int i = 0; i < paths.length; i++) {
				if (paths[i] instanceof CompositeResources) {
					CompositeResources c = (CompositeResources) paths[i];
					if (!existed.contains(c.getName())) {
						existed.add(c.getName());
						buf.append(c.existedClassesString());
						buf.append(',');
					}
				}
				if (!J2SCyclicProjectUtils.visit(paths[i])) {
					continue;
				}
			}
		} else {
			CompositeResources fModel= new CompositeResources();
			fModel.setFolder(workingDir);
			fModel.setRelativePath(".j2s");
			
			fModel.setBinRelativePath(relativePath);
	
			if (classpath == null || classpath.trim().length() == 0) {
				fModel.load();
			} else {
				if (relativePath == null) {
					relativePath = "";
				}
				String propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
				fModel.load(new ByteArrayInputStream(propStr.getBytes()));
			}
			buf.append(fModel.existedClassesString());
		}
		
		String str = buf.toString();
		buf = new StringBuffer();
		String[] split = str.split("\r\n|\r|\n|,");
		Set set = new HashSet();
		boolean existedPackages = false;
		String lastLocation = "";
		for (int i = 0; i < split.length; i++) {
			if (split[i] != null && split[i].trim().length() != 0) {
				String clazzName = split[i].trim();
				if (clazzName.startsWith("[") && clazzName.endsWith("]")) {
					if (existedPackages) {
						String[] arr = (String[]) set.toArray(new String[0]);
						if (arr.length > 0) {
							buf.append(indent);
							buf.append("ClazzLoader.packageClasspath (");
						}
						if (arr.length > 1) {
							buf.append('[');
						}
						DependencyASTVisitor.joinArrayClasses(buf, arr, null);
						if (arr.length > 1) {
							buf.append(']');
						}
						if (arr.length > 0) {
							buf.append(", \"");
							String glastLocation = lastLocation;
							if (isUseGlobalURL) {
								glastLocation = configuration.getAttribute(IJ2SLauchingConfiguration.GLOBAL_BINARY_URL, lastLocation);
								if (glastLocation.length() == 0) {
									glastLocation = "./";
								}
								if (!glastLocation.endsWith("/")) {
									glastLocation += "/";
								}
							}
							buf.append(glastLocation);
							buf.append("\");\r\n");
						}
						existedPackages = false;
						set.clear();
					}
					clazzName = clazzName.substring(1, clazzName.length() - 1);
					lastLocation = FileUtil.toRelativePath(clazzName, workingDir.getAbsolutePath());
					continue;
				}
				int idx2 = clazzName.lastIndexOf(".");
				if (idx2 != -1) {
					clazzName = clazzName.substring(0, idx2);
					set.add(clazzName);
					existedPackages = true;
				}
			}
		}
		if (existedPackages) {
			String[] arr = (String[]) set.toArray(new String[0]);
			if (arr.length > 0) {
				buf.append(indent);
				buf.append("ClazzLoader.packageClasspath (");
			}
			if (arr.length > 1) {
				buf.append('[');
			}
			DependencyASTVisitor.joinArrayClasses(buf, arr, null);
			if (arr.length > 1) {
				buf.append(']');
			}
			if (arr.length > 0) {
				buf.append(", \"");
				String glastLocation = lastLocation;
				if (isUseGlobalURL) {
					glastLocation = configuration.getAttribute(IJ2SLauchingConfiguration.GLOBAL_BINARY_URL, lastLocation);
					if (glastLocation.length() == 0) {
						glastLocation = "./";
					}
					if (!glastLocation.endsWith("/")) {
						glastLocation += "/";
					}
				}
				buf.append(glastLocation);
				buf.append("\");\r\n");
			}
			existedPackages = false;
			set.clear();
		}
		return buf.toString();
	}

	/*
	 * To generate ClazzLoader.ignore (...)
	 */
	static String generateClasspathIgnoredClasses (
			ILaunchConfiguration configuration, String mainType, File workingDir, String indent)
			throws CoreException {
		StringBuffer buf = new StringBuffer();
		
		IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
		String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
		if ((projectName == null) || (projectName.trim().length() < 1)) {
			return buf.toString();
		}			
		IJavaProject javaProject = javaModel.getJavaProject(projectName);
		if ((javaProject == null) || !javaProject.exists()) {
			return buf.toString();
		}
	
		String path = javaProject.getOutputLocation().toString();
		int idx = path.indexOf('/', 2);
		String relativePath = null;
		if (idx != -1) {
			relativePath = path.substring(idx + 1); 
		}
	
		String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_ABANDON_CLASS_PATH, (String) null);
		if (classpath == null || classpath.trim().length() == 0) {
			IRuntimeClasspathEntry[] paths = JavaRuntime.computeUnresolvedIgnoredClasses(configuration);
			Set existed = new HashSet();
			for (int i = 0; i < paths.length; i++) {
				if (paths[i] instanceof CompositeResources) {
					CompositeResources c = (CompositeResources) paths[i];
					if (!existed.contains(c.getName())) {
						existed.add(c.getName());
						buf.append(c.ignoredClassesString());
						buf.append(',');
					}
				}
			}
		} else {
			CompositeResources fModel= new CompositeResources();
			fModel.setFolder(workingDir);
			fModel.setRelativePath(".j2s");
			
			fModel.setBinRelativePath(relativePath);
	
			if (classpath == null || classpath.trim().length() == 0) {
				fModel.load();
			} else {
				if (relativePath == null) {
					relativePath = "";
				}
				String propStr = "j2s.output.path=" + relativePath + "\r\nj2s.abandoned.resources.list=" + classpath;
				fModel.load(new ByteArrayInputStream(propStr.getBytes()));
			}
			buf.append(fModel.ignoredClassesString());
		}
		
		classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
		if (classpath == null || classpath.trim().length() == 0) {
			IRuntimeClasspathEntry[] paths = JavaRuntime.computeUnresolvedRuntimeClasspath(configuration);
			Set existed = new HashSet();
			for (int i = 0; i < paths.length; i++) {
				if (paths[i] instanceof CompositeResources) {
					CompositeResources c = (CompositeResources) paths[i];
					if (!existed.contains(c.getName())) {
						existed.add(c.getName());
						buf.append(c.ignoredClassesString());
						buf.append(',');
					}
				}
			}
		} else {
			CompositeResources fModel= new CompositeResources();
			fModel.setFolder(workingDir);
			fModel.setRelativePath(".j2s");
			
			fModel.setBinRelativePath(relativePath);
	
			if (classpath == null || classpath.trim().length() == 0) {
				fModel.load();
			} else {
				if (relativePath == null) {
					relativePath = "";
				}
				String propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
				fModel.load(new ByteArrayInputStream(propStr.getBytes()));
			}
			buf.append(fModel.ignoredClassesString());
		}
	
		String str = buf.toString();
		buf = new StringBuffer();
		String[] split = str.split("\r\n|\r|\n|,");
		Set set = new HashSet();
		for (int i = 0; i < split.length; i++) {
			if (split[i] != null && split[i].trim().length() != 0) {
				set.add(split[i].trim());
			}
		}
		String[] arr = (String[]) set.toArray(new String[0]);
		if (arr.length > 0) {
			buf.append(indent);
			buf.append("ClazzLoader.ignore (");
			DependencyASTVisitor.joinArrayClasses(buf, arr, null);
			buf.append(");\r\n");
		}
		return buf.toString();
	}

	public static String wrapTypeJS(String className, String binFolder) {
		StringBuffer buf = new StringBuffer();
		buf.append("<script type=\"text/javascript\" src=\"");
		if (binFolder != null) {
			String binPath = binFolder.trim();
			if (binPath.length() != 0) {
				buf.append(binPath);
				if (!binPath.endsWith("/")) {
					buf.append("/");
				}
			}
		}
		buf.append(className.replace('.', '/'));
		buf.append(".js\"></script>\r\n");
		return buf.toString();
	}

	static String toXMLString(String str) {
		return str.replaceAll("&", "&amp;").replaceAll("\"", "&quot;").replaceAll(">", "&gt;").replaceAll("<", "&lt;");
	}

	public static String readAFile(InputStream res) {
		try {
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			boolean isUTF8 = false;
			byte[] utf8Header = new byte[3];
			byte[] buf = new byte[1024];
			int read = 0;
			// Try to ignore the UTF-8 header! And return string are considered as
			// UTF-8 encoded.
			int readLen = 0;
			while ((read = res.read(utf8Header, readLen, 3 - readLen)) != -1) {
				readLen += read;
				if (readLen == 3) {
					if (utf8Header[0] == (byte) 0xef
							&& utf8Header[1] == (byte) 0xbb
							&& utf8Header[2] == (byte) 0xbf) {
						// skip
						isUTF8 = true;
					} else {
						baos.write(utf8Header);
					}
					break;
				}
			}
			while ((read = res.read(buf)) != -1) {
				baos.write(buf, 0, read);
			}
			res.close();
			return isUTF8 ? baos.toString() : baos.toString("utf-8");
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	static File getWorkingDirectory(ILaunchConfiguration configuration)
			throws CoreException {
		File workingDir = null;
		String path = configuration.getAttribute(
				IJavaLaunchConfigurationConstants.ATTR_WORKING_DIRECTORY,
				(String) null);
		if (path != null) {
			path = VariablesPlugin.getDefault().getStringVariableManager()
					.performStringSubstitution(path);
			Path xpath = new Path(path);
			if (xpath.isAbsolute()) {
				File dir = new File(xpath.toOSString());
				if (dir.isDirectory()) {
					workingDir = dir;
				} else {
					// This may be a workspace relative path returned by a
					// variable.
					// However variable paths start with a slash and thus are
					// thought to
					// be absolute
					IResource res = ResourcesPlugin.getWorkspace().getRoot()
							.findMember(path);
					if (res instanceof IContainer && res.exists()) {
						workingDir = res.getLocation().toFile();
					}
				}
			} else {
				IResource res = ResourcesPlugin.getWorkspace().getRoot()
						.findMember(path);
				if (res instanceof IContainer && res.exists()) {
					workingDir = res.getLocation().toFile();
				}
			}
		}
		if (workingDir == null) {
			IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
			String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
			if ((projectName == null) || (projectName.trim().length() < 1)) {
				return null;
			}			
			IJavaProject javaProject = javaModel.getJavaProject(projectName);
			if ((javaProject == null) || !javaProject.exists()) {
				return null;
			}
	        IProject project = javaProject.getProject();
			String prjFolder = project.getLocation().toOSString();
			workingDir = new File(prjFolder);
		}
		return workingDir;
	}

	static String getMainType(ILaunchConfiguration configuration)
			throws CoreException {
		String mainType;
		mainType = configuration.getAttribute(
				IJavaLaunchConfigurationConstants.ATTR_MAIN_TYPE_NAME,
				(String) null);
		if (mainType == null) {
			return null;
		}
		mainType = VariablesPlugin.getDefault().getStringVariableManager()
				.performStringSubstitution(mainType);
		return mainType;
	}
}
