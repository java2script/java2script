package net.sf.j2s.ui.launching;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.HashSet;
import java.util.Set;

import net.sf.j2s.ui.classpathviewer.CompositeResources;
import net.sf.j2s.ui.classpathviewer.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpathviewer.Resource;

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

public class J2SLaunchingUtil {
//	public static String readTemplate() {
//		try {
//			InputStream res = J2SLaunchingUtil.class
//					.getResourceAsStream("j2s.template.html");
//			ByteArrayOutputStream baos = new ByteArrayOutputStream();
//			byte[] buf = new byte[1024];
//			int read = 0;
//			while ((read = res.read(buf)) != -1) {
//				baos.write(buf, 0, read);
//			}
//			res.close();
//			return baos.toString();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
//	}

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

	public static void launchingJ2SApp(ILaunchConfiguration configuration)
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
					if (!existed.contains(res.getName())) {
						existed.add(res.getName());
						buf.append(res.toHTMLString());
					}
				}
			}
			
//			String binPath = "j2score";
//			boolean useInnerConsole = configuration.getAttribute(
//					IJ2SLauchingConfiguration.INNER_CONSOLE, true);
//			if (useInnerConsole) {
//				buf.append("<link rel=\"stylesheet\" href=\"");
//				buf.append(binPath);
//				buf.append("/console.css\"/>\r\n");
//				buf.append(wrapTypeJS("java.lang.NativeConsole", binPath));
//			}
//			String[] classes = new String[] {
//					"java.lang.Class", 
//					"java.lang.Object", 
//					"java.lang.NoSuchMethodException", 
//					"java.lang.Runnable", 
//					"java.lang.Encoding", 
//					"java.lang.String"
//			};
//			for (int i = 0; i < classes.length; i++) {
//				buf.append(wrapTypeJS(classes[i], binPath));
//			}
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
		
		if (buf.indexOf(relativePath + "/" + mainType.replace('.', '/') + ".js") == -1) {
			buf.append(wrapTypeJS(mainType, relativePath));
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

		buf.append(generateClasspathHTML(configuration, mainType, workingDir));

		buf.append(configuration.getAttribute(
				IJ2SLauchingConfiguration.TAIL_HEADER_HTML, ""));
		buf.append("</head>\r\n");
		buf.append("<body>\r\n");
		if (useInnerConsole) {
			buf.append("<div id=\"_console_\" class=\"consolewindow\"></div>\r\n");
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
		String relativePath = null;
		if (idx != -1) {
			relativePath = path.substring(idx + 1); 
		}
		/*
		 * MainType Class may already included in the header section
		 */
		//buf.append(wrapTypeJS(mainType, relativePath));
		buf.append("<script type=\"text/javascript\">\r\n");
		String args = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROGRAM_ARGUMENTS, (String) null);
		buf.append("" + mainType + ".main(" + ArgsUtil.wrapAsArgumentArray(args) + ");\r\n");
		buf.append("</script>\r\n");

		buf.append(configuration.getAttribute(
				IJ2SLauchingConfiguration.TAIL_BODY_HTML, ""));
		buf.append("</body>\r\n");
		buf.append("</html>");

		// String tmpl = J2SLaunchingUtil.readTemplate();
		String html = buf.toString();
		String rootPath = workingDir.getAbsolutePath();
		File file = new File(rootPath, mainType + ".html");
		J2SLaunchingUtil.writeMainHTML(file, html);
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
