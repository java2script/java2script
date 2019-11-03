package net.sf.j2s.ui.classpath;

import java.io.File;

import net.sf.j2s.ui.launching.J2SLaunchingUtil;

public class UnitClass extends Resource {
	private String className;
	private String binRelativePath;

	public String getClassName() {
		return className;
	}

	public String getName() {
		return getClassName();
	}

	public void parseClassName() {
		this.className = PathUtil.convertClassName(getRelativePath(), binRelativePath);
	}

	public String getBinRelativePath() {
		return binRelativePath;
	}

	public void setBinRelativePath(String binRelativePath) {
		this.binRelativePath = binRelativePath;
	}

	public boolean exists() {
		return new File(getFolder(), getRelativePath()).exists();
	}
	public String toHTMLString() {
		// Class unit *.js is loaded by Clazz.load from now on.
		return "";
	}
	
	public int getType() {
		return ARCHIVE;
	}
}
