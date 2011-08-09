package org.sgx.j2s.mauve.test.exceptions;

import org.sgx.j2s.base.js.JsUtils;

import gnu.testlet.TestHarness;
import gnu.testlet.Testlet;

public class ExceptionsTest implements Testlet{
	 public void test (TestHarness harness)
	    {
	      test_Basics (harness);
	    }

	private void test_Basics(TestHarness harness) {
		boolean pass = false;
		try {
			throwDOMNativeException();
			pass = false;
		} catch (Exception e) {
			pass = false;			
		}catch (Throwable e) {
			pass = true;
		}
		harness.check(pass, "test_Basics 1");
		
		pass = false;
		try {
			throwRuntimeException();
			pass = false;
		} catch (Exception e) {
			pass = true;			
		}catch (Throwable e) {
			pass = false;
		}
		harness.check(pass, "test_Basics 2");
		
		pass = false;
		try {
			throwNormalException();
			pass = false;
		} catch (Exception e) {
			pass = true;			
		}catch (Throwable e) {
			pass = false;
		}
		harness.check(pass, "test_Basics 3");
//		JsUtils.firebugDebug();
		pass = false;
		try {
			throwNPENative();
			pass = false;
		} catch (NullPointerException e) {
			pass = true;			
		}
		catch (Exception e) {
			pass = false;			
		}
		catch (Throwable e) {
			pass = false;
		}
		harness.check(pass, "test_Basics 4");
	}

	private void throwNormalException() throws Exception {
		throw new  Exception("faked exception");
	}

	private void throwRuntimeException() {
		throw new RuntimeException("faked exception");
	}
	/**
	 * @j2sNative
	 * var a = null;
	 * null.method();
	 */
	private native void throwNPENative() ;
	/**
	 * @j2sNative
	 * document.body.appendChild(null);
	 */
	private native void throwDOMNativeException();
}
