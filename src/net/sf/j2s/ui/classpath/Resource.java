package net.sf.j2s.ui.classpath;

import java.io.File;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;

public class Resource implements IRuntimeClasspathEntry {
	private Resource parent;
	private File folder;
	private String relativePath;
	private boolean isAbsolute = false;
	
	private int resourceCategory;

	public Resource() {
		super();
	}

	public Resource(File folder, String relativePath) {
		super();
		this.folder = folder;
		this.relativePath = relativePath;
	}

	public Resource(Resource parent, File folder, String relativePath) {
		super();
		this.parent = parent;
		this.folder = folder;
		this.relativePath = relativePath;
	}

	public boolean isAbsolute() {
		return isAbsolute;
	}

	public void setAbsolute(boolean isAbsolute) {
		this.isAbsolute = isAbsolute;
	}

	public Resource getParent() {
		return parent;
	}

	public void setParent(Resource parent) {
		this.parent = parent;
	}

	public File getAbsoluteFolder() {
		return new File(folder, relativePath).getParentFile();
	}
	
	public File getAbsoluteFile() {
		if (folder == null || relativePath == null || relativePath.trim().length() == 0) {
			return null;
		}
		return new File(folder, relativePath);
	}
	
	public File getFolder() {
		return folder;
	}

	public void setFolder(File folder) {
		this.folder = folder;
	}
	
	public String getRelativePath() {
		return relativePath;
	}

	public void setRelativePath(String relativePath) {
		this.relativePath = relativePath;
	}

	public String getName() {
		File file = new File(getFolder(), relativePath);
		String name = file.getName();
		if (name.endsWith(".z.js")) {
			return name.substring(0, name.length() - 5);
		}
		int idx = name.lastIndexOf('.');
		if (idx != -1) {
			String ext = name.substring(idx + 1);
			if ("js".equals(ext) || "j2s".equals(ext)
					/*|| "jz".equals(ext)*/) {
				return name.substring(0, idx);
			} else {
				return name;
			}
		}
		return name;
	}
	
	public boolean exists() {
		return new File(getFolder(), relativePath).exists();
	}
	
	public String toResourceString() {
		if (isAbsolute) {
			return "|" + new File(getFolder(), relativePath).getAbsolutePath();
		}
		if (relativePath != null) {
			return relativePath;
		}
		return null;
	}
	
	public String toHTMLString() {
		if (relativePath != null) {
			return relativePath;
		}
		return null;
	}

	public IClasspathEntry getClasspathEntry() {
		return null;
	}

	public int getClasspathProperty() {
		return resourceCategory;
	}

	public IJavaProject getJavaProject() {
		return null;
	}

	public String getLocation() {
		return getAbsoluteFile().getAbsolutePath();
	}

	public IPath getPath() {
		return Path.fromPortableString(relativePath);
	}

	public IResource getResource() {
		if (relativePath != null) {
			if (relativePath.startsWith("/") && relativePath.endsWith("/.j2s")) {
				IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
				String projectName = relativePath.substring(1, relativePath.indexOf('/', 3));
				IJavaProject javaProject = javaModel.getJavaProject(projectName);
				IProject project = javaProject.getProject();
				return project;
			}
		}
		return null;
	}

	public int getType() {
		return OTHER;
	}

	public String getVariableName() {
		return getName();
	}

	public void setClasspathProperty(int location) {
		resourceCategory = location;
	}
	
	public boolean equals(Object obj) {
		if (obj != null && obj instanceof Resource) {
			Resource item = (Resource) obj;
			File file1 = this.getAbsoluteFile();
			File file2 = item.getAbsoluteFile();
			if (file1 == null && file2 == null) {
				return true;
			} else if (file1.equals(file2)) {
				return true;
			}
			return false;
		}
		return false;
	}
	public int hashCode() {
		File file = this.getAbsoluteFile();
		if (file != null) {
			return file.hashCode();
		}
		return super.hashCode();
	}
}
