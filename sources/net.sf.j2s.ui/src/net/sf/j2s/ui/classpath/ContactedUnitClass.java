package net.sf.j2s.ui.classpath;

public class ContactedUnitClass extends Resource {
	private String className;
	
	public String getName() {
		return getClassName();
	}
	
	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public void parseClassName() {
		this.className = PathUtil.convertClassName(getRelativePath(), null);
	}

	public boolean exists () {
		return true;
	}
	
	public String toHTMLString() {
		return "";
	}
	public int getType() {
		return ARCHIVE;
	}
}
