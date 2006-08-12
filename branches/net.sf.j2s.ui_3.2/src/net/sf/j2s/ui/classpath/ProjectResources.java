package net.sf.j2s.ui.classpath;

import java.io.File;
import java.util.Iterator;


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
		//return super.getBinRelativePath();
	}
	public String toHTMLString() {
//		StringBuffer buf = new StringBuffer();
//		if (resources == null) {
//			this.load();
//		}
//		new File(".." + getRelativePath()).getParent();
//		for (Iterator iter = resources.iterator(); iter.hasNext();) {
//			Resource res = (Resource) iter.next();
//			
//			buf.append(res.toHTMLString());
//		}
//		return buf.toString();
		return super.toHTMLString();
	}
	
	public int getType() {
		return PROJECT;
	}
}
