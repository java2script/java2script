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
		String bin = "";
		// Class unit *.js is loaded by Clazz.load from now on.
		if (true) return bin; 
		if (this.getParent() != null 
				&& (this.getParent() instanceof CompositeResources)) {
			CompositeResources cc = (CompositeResources) this.getParent();
			String binRelative = cc.getBinRelativePath();
			if (binRelative != null) {
				bin += binRelative;
			}
		}
		return J2SLaunchingUtil.wrapTypeJS(getClassName(), bin + getBinRelativePath());
	}
	
	public int getType() {
		return ARCHIVE;
	}
}
