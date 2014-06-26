package net.sf.j2s.store;

interface IStore {
	
	public void setProperty(String name, String value);
	
	public String getProperty(String name);
	
	public boolean isReady();

}
