package net.sf.j2s.ui.launching;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;
import net.sf.j2s.core.astvisitors.DependencyASTVisitor;
import net.sf.j2s.ui.classpath.CompositeResources;
import net.sf.j2s.ui.classpath.ContactedClasses;
import net.sf.j2s.ui.classpath.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpath.Resource;
import net.sf.j2s.ui.classpath.UnitClass;
import net.sf.j2s.ui.property.FileUtil;
import net.sf.j2s.ui.resources.ExternalResources;
import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.variables.VariablesPlugin;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.swt.widgets.Display;

public class J2SUnitLaunchingUtil {

	public static void writeMainHTML(File file, String html) {
		try {
			FileOutputStream fos = new FileOutputStream(file);
			fos.write(html.getBytes());
			fos.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void launchingJ2SUnit(ILaunchConfiguration configuration)
			throws CoreException {
		String mainType = getMainType(configuration);
		if (mainType == null) {
			return;
		}

		File workingDir = getWorkingDirectory(configuration);

		if (workingDir != null) {
			String url = generateHTML(configuration, mainType, workingDir);
			Display.getDefault().asyncExec(
					new J2SApplicationRunnable(configuration, url));
		} else {
			MessageDialog.openError(null, "Project Error", "The selected J2S's working folder is not found.");
		}
	}

	/*
	 * Append the *.js in classpath
	 */
	private static String generateClasspathHTML(
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

//        IProject project = javaProject.getProject();
//		String prjFolder = project.getLocation().toOSString();
//		File workingDir = new File(prjFolder);
		
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

			//String classpath = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_CLASSPATH, (String) null);
			//String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
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
	private static String generateClasspathJ2X(
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

//        IProject project = javaProject.getProject();
//		String prjFolder = project.getLocation().toOSString();
//		File workingDir = new File(prjFolder);
		
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
//			buf.append(split[i]);
//			buf.append("\r\n");
			if (split[i] != null && split[i].trim().length() != 0) {
				File f = new File(split[i].trim());
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
					buf.append(FileUtil.toRelativePath(f.getParent(), workingDir.getAbsolutePath()));
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
	private static String generateClasspathExistedClasses (
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

		buf.append('[');
		try {
			buf.append(new File(workingDir, relativePath).getCanonicalPath());
		} catch (IOException e) {
			e.printStackTrace();
			buf.append(relativePath);
		}
		buf.append("],");
		String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
		if (classpath == null || classpath.trim().length() == 0) {
			IRuntimeClasspathEntry[] paths = JavaRuntime.computeUnresolvedRuntimeClasspath(configuration);
			Set existed = new HashSet();
			for (int i = 0; i < paths.length; i++) {
				Resource res = (Resource) paths[i];
				if (paths[i] instanceof CompositeResources) {
					CompositeResources c = (CompositeResources) paths[i];
					if (!existed.contains(c.getName())) {
						existed.add(c.getName());
						buf.append(c.existedClassesString());
						buf.append(',');
					}
				}
				if (!J2SCyclicProjectUtils.visit(res)) {
					continue;
				}
				if (res instanceof UnitClass) {
					UnitClass unit = (UnitClass) res;
					buf.append(unit.getClassName());
					buf.append(',');
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
		
//		if (buf.indexOf(relativePath + "/" + mainType.replace('.', '/') + ".js") == -1) {
//			buf.append(wrapTypeJS(mainType, relativePath));
//		}
		String str = buf.toString();
		buf = new StringBuffer();
//		System.out.println(str);
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
							buf.append(lastLocation);
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
				}
				set.add(clazzName);
				existedPackages = true;
			}
		}
		if (existedPackages) {
			String[] arr = (String[]) set.toArray(new String[0]);
			if (arr.length > 0) {
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
				buf.append(lastLocation);
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
	private static String generateClasspathIgnoredClasses (
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

			//String classpath = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_CLASSPATH, (String) null);
			//String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
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

	private static String generateHTML(ILaunchConfiguration configuration,
			String mainType, File workingDir) throws CoreException {
		StringBuffer buf = new StringBuffer();
		boolean useXHTMLHeader = configuration.getAttribute(
				IJ2SLauchingConfiguration.USE_XHTML_HEADER, true);
		boolean useInnerConsole = configuration.getAttribute(
				IJ2SLauchingConfiguration.INNER_CONSOLE, true);
		if (useXHTMLHeader) {
			buf
					.append("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"\r\n");
			buf
					.append("\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\r\n");
			buf
					.append("<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\">\r\n");
		} else {
			buf.append("<html>\r\n");
		}
		buf.append("<head>\r\n");
		buf.append("<title>");
		buf.append(mainType);
		buf.append("</title>\r\n");
		buf.append(configuration.getAttribute(
				IJ2SLauchingConfiguration.HEAD_HEADER_HTML, ""));

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
		buf.append("<script type=\"text/javascript\" src=\"" + j2sLibPath + "j2slib.z.js\"></script>\r\n");

		J2SCyclicProjectUtils.emptyTracks();
		buf.append(generateClasspathHTML(configuration, mainType, workingDir));

		buf.append(configuration.getAttribute(
				IJ2SLauchingConfiguration.TAIL_HEADER_HTML, ""));
		buf.append("</head>\r\n");
		buf.append("<body>\r\n");
		if (useInnerConsole) {
			//buf.append("<div id=\"_console_\" class=\"consolewindow\"></div>\r\n");
		}
		buf.append(configuration.getAttribute(
				IJ2SLauchingConfiguration.HEAD_BODY_HTML, ""));
		
		IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
		String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
		if ((projectName == null) || (projectName.trim().length() < 1)) {
			return null;
		}			
		IJavaProject javaProject = javaModel.getJavaProject(projectName);
		if ((javaProject == null) || !javaProject.exists()) {
			return null;
		}
		String path = javaProject.getOutputLocation().toString();
		int idx = path.indexOf('/', 2);
		String relativePath = "";
		if (idx != -1) {
			relativePath = path.substring(idx + 1); 
		}
		/*
		 * MainType Class may already included in the header section
		 */
		//buf.append(wrapTypeJS(mainType, relativePath));
		
		buf.append("<script type=\"text/javascript\">\r\n");
		/*
		buf.append("ClazzLoader.j2slibClasspath (\"");
		buf.append(j2sLibPath);
		buf.append("\");\r\n");
		*/

		J2SCyclicProjectUtils.emptyTracks();
		String j2xStr = generateClasspathJ2X(configuration, mainType, workingDir);
		if (j2xStr.indexOf("\"java\"") == -1) {
			buf.append("ClazzLoader.packageClasspath (\"java\", \"");
			buf.append(j2sLibPath);
			buf.append("\", true);\r\n");
		}
		if (j2xStr.indexOf("\"junit\"") == -1) {
			buf.append("ClazzLoader.packageClasspath (\"junit\", \"");
			buf.append(j2sLibPath);
			buf.append("\", true);\r\n");
		}
		buf.append(j2xStr);

		buf.append("ClazzLoader.setPrimaryFolder (\"");
		buf.append(relativePath);
		buf.append("\");\r\n");

		J2SCyclicProjectUtils.emptyTracks();
		buf.append(generateClasspathIgnoredClasses(configuration, mainType, workingDir));

		J2SCyclicProjectUtils.emptyTracks();
		buf.append(generateClasspathExistedClasses(configuration, mainType, workingDir));

		//String args = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, (String) null);
		
		//String args = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, (String) null);
		buf.append("ClazzLoader.loadClass (\"junit.textui.TestRunner\", function () {\r\n");
		buf.append("ClazzLoader.loadClass (\"" + mainType + "\", function () {\r\n");
		//buf.append("" + mainType + ".main(" + ArgsUtil.wrapAsArgumentArray(args) + ");\r\n");
		buf.append("junit.textui.TestRunner.run (" + mainType + ");\r\n");
		buf.append("});\r\n");
		buf.append("});\r\n");
		buf.append("</script>\r\n");

		buf.append(configuration.getAttribute(
				IJ2SLauchingConfiguration.TAIL_BODY_HTML, ""));
		buf.append("</body>\r\n");
		buf.append("</html>");

		// String tmpl = J2SLaunchingUtil.readTemplate();
		String html = buf.toString();
		String rootPath = workingDir.getAbsolutePath();
		File file = new File(rootPath, mainType + ".j2sunit.html");
		J2SUnitLaunchingUtil.writeMainHTML(file, html);
		String url = null;
		try {
			url = file.toURL().toExternalForm();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		return url;
	}

	private static File getWorkingDirectory(ILaunchConfiguration configuration)
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

	private static String getMainType(ILaunchConfiguration configuration)
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
