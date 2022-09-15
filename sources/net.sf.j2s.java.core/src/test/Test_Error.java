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
		}
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