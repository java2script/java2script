package java.security;

public interface AccessControlContext {
	
	public boolean checkPermission(Object perm);

}
