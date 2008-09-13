package net.sf.j2s.ui.launching;

import java.io.ByteArrayInputStream;
import java.io.File;

import net.sf.j2s.ui.classpath.CSSResource;
import net.sf.j2s.ui.classpath.CompositeResources;
import net.sf.j2s.ui.classpath.ContactedClasses;
import net.sf.j2s.ui.classpath.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpath.ProjectResources;
import net.sf.j2s.ui.classpath.Resource;
import net.sf.j2s.ui.classpath.UnitClass;
import net.sf.j2s.ui.launching.IJ2SLauchingConfiguration;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants;

public class JavaRuntime {

	public static IRuntimeClasspathEntry newVariableRuntimeClasspathEntry(IPath path) {
		return null;
	}

	public static IRuntimeClasspathEntry newRuntimeContainerClasspathEntry(IPath path, int kind, IJavaProject proj) {
		// TODO Auto-generated method stub
		return null;
	}

	public static IRuntimeClasspathEntry newArchiveRuntimeClasspathEntry(IPath relativePath) {
		String path = relativePath.toFile().getName();
		if (path.endsWith(".z.js")) {
			ContactedClasses cc = new ContactedClasses();
			cc.setFolder(relativePath.toFile().getParentFile());
			cc.setRelativePath(path);
			cc.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			return cc;
		} else if (path.endsWith(".css")){
			CSSResource css = new CSSResource();
			css.setFolder(relativePath.toFile().getParentFile());
			css.setRelativePath(path);
			css.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			return css;
		} else if (path.endsWith(".j2s")) {
			CompositeResources comp = new CompositeResources();
			comp.setFolder(relativePath.toFile().getParentFile().getParentFile());
			comp.setRelativePath("/" + relativePath.toFile().getParentFile().getName() + "/" + path);
			comp.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			return comp;
//		} else if (path.endsWith(".js")) {
//			UnitClass unit = new UnitClass();
//			unit.setFolder(elem.getProject().getLocation().toFile());
//			unit.setRelativePath(path);
//			IJavaProject prj = (IJavaProject) elem.getAdapter(IJavaProject.class);
//			if (prj != null) {
//				try {
//					unit.setBinRelativePath(prj.getOutputLocation().toString());
//				} catch (JavaModelException e) {
//					unit.setBinRelativePath("");
//				}
//			} else {
//				unit.setBinRelativePath("");
//			}
//			unit.parseClassName();
//			return unit;
		}
		return null;
	}

	public static IRuntimeClasspathEntry newArchiveRuntimeClasspathEntry(String relativePath) {
		String path = new File(relativePath).getName();
		if (path.endsWith(".z.js") || path.endsWith(".j2x")) {
			ContactedClasses cc = new ContactedClasses();
			cc.setFolder(new File(relativePath).getParentFile());
			cc.setRelativePath(path);
			cc.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			return cc;
		} else if (path.endsWith(".css")){
			CSSResource css = new CSSResource();
			css.setFolder(new File(relativePath).getParentFile());
			css.setRelativePath(path);
			css.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			return css;
		} else if (path.endsWith(".j2s")) {
			CompositeResources comp = new CompositeResources();
			comp.setFolder(new File(relativePath).getParentFile().getParentFile());
			comp.setRelativePath("/" + new File(relativePath).getParentFile().getName() + "/" + path);
			comp.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			return comp;
//		} else if (path.endsWith(".js")) {
//			UnitClass unit = new UnitClass();
//			unit.setFolder(elem.getProject().getLocation().toFile());
//			unit.setRelativePath(path);
//			IJavaProject prj = (IJavaProject) elem.getAdapter(IJavaProject.class);
//			if (prj != null) {
//				try {
//					unit.setBinRelativePath(prj.getOutputLocation().toString());
//				} catch (JavaModelException e) {
//					unit.setBinRelativePath("");
//				}
//			} else {
//				unit.setBinRelativePath("");
//			}
//			unit.parseClassName();
//			return unit;
		}
		return null;
	}

	public static IRuntimeClasspathEntry newProjectRuntimeClasspathEntry(IJavaProject jp) {
		ProjectResources prjRes = new ProjectResources();
		prjRes.setClasspathProperty(IRuntimeClasspathEntry.PROJECT);
		prjRes.setFolder(jp.getProject().getLocation().toFile()/*.getParentFile()*/);
		prjRes.setRelativePath("/" + jp.getElementName() + "/.j2s");
		prjRes.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
		return prjRes;
	}

	public static IRuntimeClasspathEntry newRuntimeContainerClasspathEntry(IPath path, int standard_classes) throws CoreException {
		// TODO Auto-generated method stub
		return null;
	}

	public static IRuntimeClasspathEntry newArchiveRuntimeClasspathEntry(IResource elem) {
		IPath relativePath = elem.getProjectRelativePath();
		String path = relativePath.toString();
		if (path.endsWith(".z.js")) {
			ContactedClasses cc = new ContactedClasses();
			cc.setFolder(elem.getProject().getLocation().toFile());
			cc.setRelativePath(path);
			if (path.indexOf("j2s-") == 0) {
				cc.setClasspathProperty(IRuntimeClasspathEntry.BOOTSTRAP_CLASSES);
			} else {
				cc.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			}
			return cc;
		} else if (path.endsWith(".css")){
			CSSResource css = new CSSResource();
			css.setFolder(elem.getProject().getLocation().toFile());
			css.setRelativePath(path);
			css.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			return css;
		} else if (".j2s".equals(relativePath.toFile().getName())) {
			ProjectResources prjRes = new ProjectResources();
			//System.out.println(elem.getWorkspace().getRoot().getLocation().toFile());
			//prjRes.setFolder(elem.getWorkspace().getRoot().getLocation().toFile());
			prjRes.setFolder(elem.getProject().getLocation().toFile());
			prjRes.setRelativePath(elem.getFullPath().toPortableString());
			prjRes.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			return prjRes;
		} else if (path.endsWith(".j2s")) {
			CompositeResources comp = new CompositeResources();
			comp.setFolder(elem.getProject().getLocation().toFile());
			comp.setRelativePath(elem.getFullPath().toPortableString());
//			comp.setFolder(elem.getProject().getLocation().toFile());
//			comp.setRelativePath(path);
			comp.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			return comp;
		} else if (path.endsWith(".js")) {
			UnitClass unit = new UnitClass();
			unit.setFolder(elem.getProject().getLocation().toFile());
			unit.setRelativePath(path);
			IJavaProject prj = (IJavaProject) elem.getAdapter(IJavaProject.class);
			if (prj != null) {
				try {
					unit.setBinRelativePath(prj.getOutputLocation().toString());
				} catch (JavaModelException e) {
					unit.setBinRelativePath("");
				}
			} else {
				unit.setBinRelativePath("");
			}
			unit.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			unit.parseClassName();
			return unit;
		}
		return null;
	}

	public static IRuntimeClasspathEntry newStringVariableClasspathEntry(String varString) {
		// TODO Auto-generated method stub
		return null;
	}

	public static IJavaProject getJavaProject(ILaunchConfiguration launchConfiguration) {
		// TODO Auto-generated method stub
		return null;
	}

	public static IRuntimeClasspathEntry[] computeUnresolvedRuntimeClasspath(ILaunchConfiguration configuration) {
		try {
			CompositeResources fModel= new CompositeResources();
			IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
			String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
			if ((projectName == null) || (projectName.trim().length() < 1)) {
				return new IRuntimeClasspathEntry[0];
			}			
			IJavaProject javaProject = javaModel.getJavaProject(projectName);
			if ((javaProject == null) || !javaProject.exists()) {
				return new IRuntimeClasspathEntry[0];
			}
	        IProject project = javaProject.getProject();
			String prjFolder = project.getLocation().toOSString();
			File workingDir = new File(prjFolder);
			fModel.setFolder(workingDir);
			fModel.setRelativePath(".j2s");
			
			String path = javaProject.getOutputLocation().toString();
			int idx = path.indexOf('/', 2);
			String relativePath = null;
			if (idx != -1) {
				relativePath = path.substring(idx + 1); 
			}
			fModel.setBinRelativePath(relativePath);

			//String classpath = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_CLASSPATH, (String) null);
			boolean useDefault = true;
			try {
				useDefault = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_DEFAULT_CLASSPATH, true);
			} catch (CoreException e) {
				//JDIDebugUIPlugin.log(e);
			}
			String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
			if (useDefault || classpath == null || classpath.trim().length() == 0) {
				fModel.load();
			} else {
				if (relativePath == null) {
					relativePath = "";
				}
				String propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
				fModel.load(new ByteArrayInputStream(propStr.getBytes()));
			}
			fModel.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			Resource[] children = fModel.getChildren();
			for (int i = 0; i < children.length; i++) {
				children[i].setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
				String xpath = children[i].getRelativePath();
				if (xpath != null && xpath.endsWith(".z.js")) {
					if (xpath.indexOf("j2s-core") != -1
							|| xpath.indexOf("j2s-swt") != -1) {
						children[i].setClasspathProperty(IRuntimeClasspathEntry.BOOTSTRAP_CLASSES);
					} else {
						children[i].setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
					}
				}
			}
			return children;
		} catch (CoreException e) {
			e.printStackTrace();
		}
		return new IRuntimeClasspathEntry[0];
	}
	

	public static IRuntimeClasspathEntry[] computeUnresolvedIgnoredClasses(ILaunchConfiguration configuration) {
		try {
			CompositeResources fModel= new CompositeResources();
			IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
			String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
			if ((projectName == null) || (projectName.trim().length() < 1)) {
				return new IRuntimeClasspathEntry[0];
			}			
			IJavaProject javaProject = javaModel.getJavaProject(projectName);
			if ((javaProject == null) || !javaProject.exists()) {
				return new IRuntimeClasspathEntry[0];
			}
	        IProject project = javaProject.getProject();
			String prjFolder = project.getLocation().toOSString();
			File workingDir = new File(prjFolder);
			fModel.setFolder(workingDir);
			fModel.setRelativePath(".j2s");
			
			String path = javaProject.getOutputLocation().toString();
			int idx = path.indexOf('/', 2);
			String relativePath = null;
			if (idx != -1) {
				relativePath = path.substring(idx + 1); 
			}
			fModel.setBinRelativePath(relativePath);

			//String classpath = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_CLASSPATH, (String) null);
			boolean useDefault = true;
			try {
				useDefault = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_DEFAULT_CLASSPATH, true);
			} catch (CoreException e) {
				//JDIDebugUIPlugin.log(e);
			}
			String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_ABANDON_CLASS_PATH, (String) null);
			if (useDefault || classpath == null || classpath.trim().length() == 0) {
				fModel.load();
			} else {
				if (relativePath == null) {
					relativePath = "";
				}
				String propStr = "j2s.output.path=" + relativePath + "\r\nj2s.abandoned.resources.list=" + classpath;
				fModel.load(new ByteArrayInputStream(propStr.getBytes()));
			}
			fModel.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			return new IRuntimeClasspathEntry[] { fModel };
			/*
			Resource[] children = fModel.getAbandonedResources();
			for (int i = 0; i < children.length; i++) {
				children[i].setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
//				String xpath = children[i].getRelativePath();
//				if (xpath != null && xpath.endsWith(".z.js")) {
//					if (xpath.indexOf("j2s-core") != -1
//							|| xpath.indexOf("j2s-swt") != -1) {
//						children[i].setClasspathProperty(IRuntimeClasspathEntry.BOOTSTRAP_CLASSES);
//					} else {
//						children[i].setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
//					}
//				}
			}
			return children;
			*/
		} catch (CoreException e) {
			e.printStackTrace();
		}
		return new IRuntimeClasspathEntry[0];
	}
	

	public static IRuntimeClasspathEntry[] computeUpdatedRuntimeClasspath(ILaunchConfiguration configuration) {
		try {
			IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
			String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
			if ((projectName == null) || (projectName.trim().length() < 1)) {
				return new IRuntimeClasspathEntry[0];
			}			
			IJavaProject javaProject = javaModel.getJavaProject(projectName);
			if ((javaProject == null) || !javaProject.exists()) {
				return new IRuntimeClasspathEntry[0];
			}
	        IProject project = javaProject.getProject();
			String prjFolder = project.getLocation().toOSString();
			File workingDir = new File(prjFolder);
			
			String path = javaProject.getOutputLocation().toString();
			int idx = path.indexOf('/', 2);
			String relativePath = null;
			if (idx != -1) {
				relativePath = path.substring(idx + 1); 
			}
			
			CompositeResources fModel= new CompositeResources();
			fModel.setFolder(workingDir);
			fModel.setRelativePath(".j2s");
			fModel.setBinRelativePath(relativePath);
			fModel.load();
			
			CompositeResources newModel= new CompositeResources();
			newModel.setFolder(workingDir);
			newModel.setRelativePath(".j2s");
			newModel.setBinRelativePath(relativePath);
			
//			//String classpath = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_CLASSPATH, (String) null);
//			boolean useDefault = true;
//			try {
//				useDefault = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_DEFAULT_CLASSPATH, true);
//			} catch (CoreException e) {
//				//JDIDebugUIPlugin.log(e);
//			}
			String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
			if (classpath != null && classpath.trim().length() != 0) {
				if (relativePath == null) {
					relativePath = "";
				}
				String propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath;
				newModel.load(new ByteArrayInputStream(propStr.getBytes()));
			}
			
			//fModel.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			newModel.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			Resource[] nodes = newModel.getChildren();
			for (int i = 0; i < nodes.length; i++) {
				if (nodes[i] instanceof UnitClass 
						&& !fModel.existedResource(nodes[i])) {
					newModel.removeResource(nodes[i]);
				}
			}
			Resource[] existedChildren = fModel.getChildren();
			for (int i = 0; i < existedChildren.length; i++) {
				newModel.addResource(existedChildren[i]);
			}
			//newModel.addResource()
			
			Resource[] children = newModel.getChildren();
			for (int i = 0; i < children.length; i++) {
				children[i].setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
				String xpath = children[i].getRelativePath();
				if (xpath != null && xpath.endsWith(".z.js")) {
					if (xpath.indexOf("j2s-core") != -1
							|| xpath.indexOf("j2s-swt") != -1) {
						children[i].setClasspathProperty(IRuntimeClasspathEntry.BOOTSTRAP_CLASSES);
					} else {
						children[i].setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
					}
				}
			}
			return children;
		} catch (CoreException e) {
			e.printStackTrace();
		}
		return new IRuntimeClasspathEntry[0];
	}

}

