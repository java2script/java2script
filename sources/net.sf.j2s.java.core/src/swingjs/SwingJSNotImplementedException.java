package swingjs;

public class SwingJSNotImplementedException extends IllegalStateException {
	
	public SwingJSNotImplementedException() {
		super("Not Implemented in SwingJS");
	}

	public SwingJSNotImplementedException(String msg) {
		super("Not Implemented in SwingJS: " + msg);
	}

}
