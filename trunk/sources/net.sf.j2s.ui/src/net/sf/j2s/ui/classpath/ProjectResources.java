package net.sf.j2s.ui.classpath;

import java.io.File;


public class ProjectResources extends CompositeResources {
	
	public File getAbsoluteFile() {
		return new File(getFolder(), getRelativePath());
	}

	public String getName() {
		String path = getRelativePath();
		return path.substring(1, path.indexOf('/', 2));
	}

	public boolean exists() {
		return new File(getFolder(), getRelativePath()).exists();
	}
	public String getBinRelativePath() {
		return getRelativePath().substring(0, getRelativePath().lastIndexOf('/') + 1);
	}
	public String toHTMLString() {
		return super.toHTMLString();
	}
	
	public int getType() {
		return PROJECT;
	}
}
