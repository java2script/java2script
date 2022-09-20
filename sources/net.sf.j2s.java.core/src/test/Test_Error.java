package test;

public class Test_Error extends Test_{

	public static void main(String[] args) {
		
		new Test_Error().testError();
		
		try {
			//throw new NullPointerException("testing NPE");
			/**
			 * @j2sNative asdlj()
			 */
		} catch (Throwable e) {
			e.printStackTrace();
			boolean b = (e instanceof Error);
			System.out.println(b);
		}
		
		Throwable error = null;
		/** @j2sNative error = new Error(); */
		assert error instanceof Throwable;
		
		Error x = new java.lang.Error();
		System.out.println(x.getMessage() + "??");
		
		
		Throwable typeError = null;
		/** @j2sNative
		 * 
		 * typeError = new TypeError(); */
		assert error instanceof Throwable;  // pass
		assert typeError instanceof Throwable; // fail
		System.out.println(typeError.getStackTrace());

		System.out.println("Test_Error OK");
	}

	private void testError() {
		Error x;
		x = new LinkageError("test");
		x.printStackTrace();
		x = new Error("test");
		x.printStackTrace();
	}
}