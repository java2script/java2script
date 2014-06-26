package net.sf.j2s.ajax;

public interface ISimpleCacheable {

	public boolean isCached();
	
	public void setCached(boolean cached);
	
	public <T extends ISimpleCacheable> void synchronizeFrom(T another);
	
}
