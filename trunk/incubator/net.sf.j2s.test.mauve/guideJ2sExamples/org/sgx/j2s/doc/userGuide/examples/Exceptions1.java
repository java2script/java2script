package org.sgx.j2s.doc.userGuide.examples;

public class Exceptions1 {

	public static void main(String[] args) {
//		test1();
//		testNativeNullPointerException();
//		testNativeDomException();
		testrunnable();
	}
	
	public static void testrunnable() {
		Runnable r = new Runnable(){
			public void run() {
				System.out.println("clicked");
			}
		};
		/**
		 * @j2sNative
		 * document.body.onclick=r.run;
		 */{}
		
	}
	
	private static void testNativeDomException() {
		try {
			/**
			 * this simulates a native javascript exception thrown by the DOM
			 * @j2sNative
			 * document.body.appendChild(null);
			 */{}
		} catch (Exception e) {
			System.out.println("this is NOT printed!!!");
		}
		catch(Throwable e) {
			System.out.println("this is printed!!!");
		}	
	}

private static void test1() {
	try {
		System.out.println("hell");
//		throwNPENative() ;
		throwDOMNativeException();
	} catch (Exception e) {
		System.out.println("java exception");
	}
	catch(Throwable e) {
		System.out.println("native exception");
	}		
	}

	public static void testNativeNullPointerException() {
		try {
			/**
			 * This simulates a native null pointer exception
			 * @j2sNative
			 * var a = null;
			 * a.sdf();
			 */{}
		} catch (NullPointerException e) {
			System.out.println("printed!");
		}
		catch (Throwable e) {
			System.out.println("NOT printed!");
		}
	}

	/**
	 * this simulates a native null pointer exception, that is throwed when accessing null:
	 * @j2sNative
	 * var a = null;
	 * null.method();
	 */
	private static native void throwNPENative() ;
	/**
	 * this method simulates a native javascript exception thrown by the DOM
	 * @j2sNative
	 * document.body.appendChild(null);
	 */
	private static native void throwDOMNativeException();
}
