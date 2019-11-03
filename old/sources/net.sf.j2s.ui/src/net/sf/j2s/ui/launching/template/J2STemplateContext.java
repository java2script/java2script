package net.sf.j2s.ui.launching.template;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import net.sf.j2s.ui.launching.ArgsUtil;
import net.sf.j2s.ui.launching.IJ2SLauchingConfiguration;
import net.sf.j2s.ui.launching.J2SCyclicProjectUtils;
import net.sf.j2s.ui.launching.J2SLaunchingUtil;
import net.sf.j2s.ui.preferences.PreferenceConstants;
import net.sf.j2s.ui.property.FileUtil;
import net.sf.j2s.ui.resources.ExternalResources;

import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants;
import org.eclipse.jface.dialogs.MessageDialog;


/**
 * This class represent the format of J2S template object. Each template implementation plugin
 * can use this object to "feed" its template engine with a context. 
 * 
 * TODO: methods that print the script loading stuff more high level.
 * 
 * @author sgurin
 *
 */
public class J2STemplateContext {
	
	//context variable names
	public static final String 
		NAME_USEXHMLHEADER = "useXhtmlHeader", 
		NAME_MOZILLAADDONCOMPATIBLE = "mozillaAddonCompatible", 
		NAME_J2SMOZILLAADDONCOMPATIBLE = "j2sMozillaAddonCompatible", 
		
		NAME_USEGLOBALJ2SLIBURL = "useGlobalJ2slibUrl", 
		NAME_GLOBALJ2SLIBURL = "globalJ2slibUrl", 
		NAME_DEFAULTJ2SLIBURL = "defaultJ2slibUrl",
		NAME_J2SLIBURL="j2slibUrl",
	
		NAME_J2SCLASSPATH = "j2sClassPath",
		NAME_J2SABANDONCLASSPATH = "j2sAbandonClassPath",
		
		NAME_OUTPUTFILECODE = "outputFileCode",
		NAME_OUTPUT_FILE_NAME = "outputFileName",
		NAME_OUTPUT_FILE_ABSOLUTE_PATH = "outputFileAbsolutePath",
		
		NAME_PROJECTNAME = "projectName", 
		NAME_MAINTYPE = "mainType", 
		NAME_WORKINGDIR = "workingDir", 
		NAME_BINURL = "binUrl", 
		NAME_ARGUMENTS = "arguments", 
		NAME_HTMLHEADOFHEADER = "htmlHeadOfHeader", 
		NAME_HTMLTAILOFHEADER = "htmlTailOfHeader", 
		NAME_HTMLHEADOFBODY = "htmlHeadOfBody", 	
			NAME_HTMLTAILOFBODY = "htmlTailOfBody";

	public static String[] VARIABLE_NAMES = new String[] { 
		NAME_USEXHMLHEADER,
		NAME_MOZILLAADDONCOMPATIBLE, NAME_J2SMOZILLAADDONCOMPATIBLE,
		NAME_USEGLOBALJ2SLIBURL, NAME_GLOBALJ2SLIBURL,
		NAME_DEFAULTJ2SLIBURL, NAME_J2SLIBURL,

		NAME_J2SCLASSPATH, NAME_J2SABANDONCLASSPATH,

		NAME_OUTPUTFILECODE, NAME_OUTPUT_FILE_NAME,
		NAME_OUTPUT_FILE_ABSOLUTE_PATH,

		NAME_PROJECTNAME, NAME_MAINTYPE, NAME_WORKINGDIR, NAME_BINURL,
		NAME_ARGUMENTS, NAME_HTMLHEADOFHEADER, NAME_HTMLTAILOFHEADER,
		NAME_HTMLHEADOFBODY, NAME_HTMLTAILOFBODY 
	};

	public boolean useXHMLHeader;
	public boolean mozillaAddonCompatible;
	public boolean j2sMozillaAddonCompatible;

	//j2slib path
	public String defaultJ2slibUrl;
	public boolean useGlobalJ2slibUrl;
	public String globalJ2slibUrl;
	/**the computed j2slibUrl to use. you probably want to use this in your templates! */
	public String j2slibUrl; 
	
	
	public String projectName;
	public String mainType;
	public String workingDir;
	public String binUrl;		
	public String arguments;
	
	/** the user can write a velocity template as the outputfilename. This field contains the computed filename */
//	public String outputFileName;
	/** output file velocity code entried by the user */
	public String outputFileCode;
	public String templateCode ;
	
	public String j2sClassPath;
	public String j2sAbandonClassPath;
	
	public String htmlHeadOfHeader;
	public String htmlTailOfHeader;
	public String htmlHeadOfBody;
	public String htmlTailOfBody;		
	
	//html
	public String htmlConsoleId, htmlClazzloaderStatusId;

	public ILaunchConfiguration conf;

	public String J2SClasspathHTML;
	public String J2SClasspathIgnoredClasses;
	public String J2SClasspathExistingClasses;
	public String J2SClasspathJ2X;
	public String J2sMainClassLoadCode;
	public String J2SSetPrimaryFolder;
	
	public J2STemplateContext(ILaunchConfiguration c) throws CoreException {
		this.conf=c;
		useXHMLHeader=c.getAttribute(IJ2SLauchingConfiguration.USE_XHTML_HEADER, false);
		mozillaAddonCompatible=c.getAttribute(PreferenceConstants.ADDON_COMPATIABLE, false);
		j2sMozillaAddonCompatible=c.getAttribute(IJ2SLauchingConfiguration.J2S_MOZILLA_ADDON_COMPATIABLE, false);
		
		useGlobalJ2slibUrl=c.getAttribute(IJ2SLauchingConfiguration.USE_GLOBAL_ALAA_URL, false);
		globalJ2slibUrl=c.getAttribute(IJ2SLauchingConfiguration.GLOBAL_J2SLIB_URL, "");
		
		projectName=c.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, "");
		mainType=  J2SLaunchingUtil.getMainType(c);//c.getAttribute(IJavaLaunchConfigurationConstants.ATTR_MAIN_TYPE_NAME, "");//
		
		outputFileCode=c.getAttribute(IJ2SLauchingConfiguration.OUTPUT_FILE_NAME, "");
//		outputFileName = c.getAttribute(Constants.OUTPUT_FILE_NAME, "");
		
		templateCode = c.getAttribute(IJ2SLauchingConfiguration.VELOCITY_CODE, "");
//		String of = "of: "+c.getAttribute(Constants.OUTPUT_FILE_NAME, "");
//		public static final String VIEW_IN_INNER_J2S_CONSOLE = "view.in.j2s.console";
//		public static final String FAST_VIEW_J2S_CONSOLE = "fast.view.j2s.console";
		
		j2sClassPath = c.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, "");
		j2sAbandonClassPath = c.getAttribute(IJ2SLauchingConfiguration.J2S_ABANDON_CLASS_PATH, "");
		
		
		htmlConsoleId="_console_";
		htmlClazzloaderStatusId="clazzloader-status";
		

		//args passed to main
		arguments = c.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, "");
		
		//the ClazzLoader.packageClasspath ... complete call :
		//J2SLaunchingUtil.generateClasspathExistedClasses(configuration, mainType, workingDir, "")
		
		//bin url
		IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());			
		IJavaProject javaProject = javaModel.getJavaProject(projectName);
		if ((javaProject == null) || !javaProject.exists()) {
			MessageDialog.openError(null, "Project Error", "The selected project is not a Java2Script project.");
			return;
		}			
		String path = javaProject.getOutputLocation().toString();
		int idx = path.indexOf('/', 2);
		String relativePath = "";
		if (idx != -1) 
			relativePath = path.substring(idx + 1);
		binUrl = relativePath;
		if (useGlobalJ2slibUrl) {
			binUrl = c.getAttribute(IJ2SLauchingConfiguration.GLOBAL_BINARY_URL, relativePath);
			if (binUrl.length() == 0) 
				binUrl = "./";				
			if (!binUrl.endsWith("/")) 
				binUrl += "/";				
		}		
		
		File workingDirFile = J2SLaunchingUtil.getWorkingDirectory(c);
		//how to obtain the dependencies and other data also can be found on  J2SLaunchingUtil.generateClasspathExistedClasses
		J2SClasspathHTML = J2SLaunchingUtil.generateClasspathHTML(c, NAME_MAINTYPE, workingDirFile);
		
		J2SCyclicProjectUtils.emptyTracks();
		J2SClasspathIgnoredClasses = J2SLaunchingUtil.generateClasspathIgnoredClasses(c, NAME_MAINTYPE, workingDirFile, "");
				
		J2SCyclicProjectUtils.emptyTracks();
		J2SClasspathExistingClasses = J2SLaunchingUtil.generateClasspathExistedClasses(c, NAME_MAINTYPE, workingDirFile, "");
				
		J2SClasspathJ2X = J2SLaunchingUtil.generateClasspathJ2X(c, null, workingDirFile);
		J2sMainClassLoadCode = J2sMainClassLoadCode(mainType, arguments);
		J2SSetPrimaryFolder = J2SSetPrimaryFolder(binUrl);
		workingDir = workingDirFile.getAbsolutePath();
		
		//finding defaultJ2slibUrl, code taken from net.sf.j2s.ui.launching.J2SLaunchingUtil.launchingJ2SApp(ILaunchConfiguration, String, String)
		String[][] allResources = ExternalResources.getAllResources();
		if (allResources != null && allResources.length != 0 && allResources[0].length != 0) {
			if ((allResources[0][0]).startsWith("|")) {
				allResources[0][0] = FileUtil.toRelativePath(allResources[0][0].substring(1), workingDir);
			}
			defaultJ2slibUrl = allResources[0][0].substring(0, allResources[0][0].lastIndexOf("/") + 1);
		} else {
			defaultJ2slibUrl = "../net.sf.j2s.lib/j2slib/";
		}
		
		htmlHeadOfHeader=c.getAttribute(IJ2SLauchingConfiguration.HEAD_HEADER_HTML, "");
		htmlTailOfHeader=c.getAttribute(IJ2SLauchingConfiguration.TAIL_HEADER_HTML, "");
		htmlHeadOfBody=c.getAttribute(IJ2SLauchingConfiguration.HEAD_BODY_HTML, "");
		htmlTailOfBody=c.getAttribute(IJ2SLauchingConfiguration.TAIL_BODY_HTML, "");
		
		if(useGlobalJ2slibUrl)
			j2slibUrl=globalJ2slibUrl;
		else
			j2slibUrl=defaultJ2slibUrl;
		
		
//		outputFileName
	}		
	

	public String getRealJ2slibUrl() {
		if(useGlobalJ2slibUrl)
			return globalJ2slibUrl;
		else return defaultJ2slibUrl;
	}
	public String getBinUrl() {
		return binUrl;
	}
	public String getArguments() {
		return arguments;
	}
	public String getHtmlHeadOfHeader() {
		return htmlHeadOfHeader;
	}
	public String getHtmlTailOfHeader() {
		return htmlTailOfHeader;
	}
	public String getHtmlHeadOfBody() {
		return htmlHeadOfBody;
	}
	public String getHtmlTailOfBody() {
		return htmlTailOfBody;
	}
	public String getHtmlConsoleId() {
		return htmlConsoleId;
	}
	public String getHtmlClazzloaderStatusId() {
		return htmlClazzloaderStatusId;
	}
	public boolean isUseXHMLHeader() {
		return useXHMLHeader;
	}
	public void setUseXHMLHeader(boolean useXHMLHeader) {
		this.useXHMLHeader = useXHMLHeader;
	}
	public boolean isMozillaAddonCompatible() {
		return mozillaAddonCompatible;
	}
	public void setMozillaAddonCompatible(boolean mozillaAddonCompatible) {
		this.mozillaAddonCompatible = mozillaAddonCompatible;
	}
	public boolean isJ2sMozillaAddonCompatible() {
		return j2sMozillaAddonCompatible;
	}
	public void setJ2sMozillaAddonCompatible(boolean j2sMozillaAddonCompatible) {
		this.j2sMozillaAddonCompatible = j2sMozillaAddonCompatible;
	}
	public boolean isUseGlobalJ2slibUrl() {
		return useGlobalJ2slibUrl;
	}
	public void setUseGlobalJ2slibUrl(boolean useGlobalJ2slibUrl) {
		this.useGlobalJ2slibUrl = useGlobalJ2slibUrl;
	}
	public String getGlobalJ2slibUrl() {
		return globalJ2slibUrl;
	}
	public void setGlobalJ2slibUrl(String globalJ2slibUrl) {
		this.globalJ2slibUrl = globalJ2slibUrl;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getMainType() {
		return mainType;
	}
	public void setMainType(String mainType) {
		this.mainType = mainType;
	}
	public String getDefaultJ2slibUrl() {
		return defaultJ2slibUrl;
	}
	public void setDefaultJ2slibUrl(String defaultJ2slibUrl) {
		this.defaultJ2slibUrl = defaultJ2slibUrl;
	}
	public String getWorkingDir() {
		return workingDir;
	}
	public void setWorkingDir(String workingDir) {
		this.workingDir = workingDir;
	}				
	
//	/**
//	 * 
//	 * @return
//	 */
//	public Map getDefaultValues() {
//		Map m = new HashMap();
//		m.put(NAME_USEXHMLHEADER, );
//		m.put(NAME_MOZILLAADDONCOMPATIBLE, );
//		m.put(NAME_J2SMOZILLAADDONCOMPATIBLE, );
//		m.put(NAME_USEGLOBALJ2SLIBURL, );
//		m.put(NAME_GLOBALJ2SLIBURL, );
//		m.put(NAME_DEFAULTJ2SLIBURL, );
//		m.put(NAME_J2SLIBURL, );
//		m.put(NAME_J2SCLASSPATH, );
//		m.put(NAME_J2SABANDONCLASSPATH, );
//		m.put(NAME_OUTPUTFILECODE, );
//		m.put(NAME_OUTPUT_FILE_NAME, );
//		m.put(NAME_OUTPUT_FILE_ABSOLUTE_PATH, );
//		m.put(NAME_PROJECTNAME, );
//		m.put(, );
//		m.put(, );
//		m.put(, );
//		m.put(, );
//		m.put(, );
//		m.put(, );
//		m.put(, );
//		
//		public static final String 
//		NAME_USEXHMLHEADER = "useXhtmlHeader", 
//		NAME_MOZILLAADDONCOMPATIBLE = "mozillaAddonCompatible", 
//		NAME_J2SMOZILLAADDONCOMPATIBLE = "j2sMozillaAddonCompatible", 
//		
//		NAME_USEGLOBALJ2SLIBURL = "useGlobalJ2slibUrl", 
//		NAME_GLOBALJ2SLIBURL = "globalJ2slibUrl", 
//		NAME_DEFAULTJ2SLIBURL = "defaultJ2slibUrl",
//		NAME_J2SLIBURL="j2slibUrl",
//	
//		NAME_J2SCLASSPATH = "j2sClassPath",
//		NAME_J2SABANDONCLASSPATH = "j2sAbandonClassPath",
//		
//		NAME_OUTPUTFILECODE = "outputFileCode",
//		NAME_OUTPUT_FILE_NAME = "outputFileName",
//		NAME_OUTPUT_FILE_ABSOLUTE_PATH = "outputFileAbsolutePath",
//		
//		NAME_PROJECTNAME = "projectName", 
//		NAME_MAINTYPE = "mainType", 
//		NAME_WORKINGDIR = "workingDir", 
//		NAME_BINURL = "binUrl", 
//		NAME_ARGUMENTS = "arguments", 
//		NAME_HTMLHEADOFHEADER = "htmlHeadOfHeader", 
//		NAME_HTMLTAILOFHEADER = "htmlTailOfHeader", 
//		NAME_HTMLHEADOFBODY = "htmlHeadOfBody", 	
//		NAME_HTMLTAILOFBODY = "htmlTailOfBody";
//	}
	
	
	//launching generation code utilities
	public static String J2sMainClassLoadCode(String mainType, String args) {
		return "ClazzLoader.loadClass (\"" + mainType + "\", function () {\r\n"+
			"\t" + mainType + ".main(" + ArgsUtil.wrapAsArgumentArray(args, true) + ");\r\n"+
			"});\r\n";
	}	
	public static String J2SSetPrimaryFolder(String binUrl) {
		return "ClazzLoader.setPrimaryFolder (\""+binUrl+"\");\r\n";
	}
	
}
