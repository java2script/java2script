package java.security;

public class AccessController implements AccessControlContext {

	// a dummy class
	
	public static <T> T doPrivileged(PrivilegedAction<T> action) {
		return action.run();
	}

	public static void doPrivileged(PrivilegedExceptionAction<Void> privilegedExceptionAction) {
		try {
			privilegedExceptionAction.run();
		} catch (Exception e) {
		}		
	}

	public static AccessControlContext getContext() {
		return new AccessController();
	}

	@Override
	public boolean checkPermission(Object perm) {
		// no access checking in JavaScript
		return true;
	}

  public static <T> T doPrivileged(PrivilegedAction<T> action,
      AccessControlContext context) {
  	return action.run();
  }

}
