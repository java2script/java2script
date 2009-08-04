package net.sf.j2s.ui.classpath;

import java.util.Properties;

public interface IClasspathContainer {
	
	public void load();
	
	public void store(Properties props);
	
	public Resource[] getChildren();
	
}
