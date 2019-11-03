package org.sgx.j2s.mauve.report;

import gnu.testlet.ResourceNotFoundException;
import gnu.testlet.TestHarness;
import gnu.testlet.Testlet;
import java.io.InputStream;
import java.util.*;
/**
 * this harness is also a testResults container
 * @author sebastian
 *
 */
public class J2sTestHarness extends TestHarness{

	List<TestSubResult> results = new LinkedList<TestSubResult>();
	Testlet test;
	private String testName;
	String type;
	private Throwable throwable;
	public static final String EXIT_OK="OK", 
		THROW_NATIVE_EXCEPTION="THROW NATIVE EXCEPTION", 
		THROW_EXCEPTION="THROW EXCEPTION";
	
	
	public J2sTestHarness(String testName, Testlet test) {
		super();
		this.test = test;
		this.testName=testName;
	}
	
	
	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	@Override
	public void check(boolean result) {
		check(result, "unamed check "+ results.size());
	}
	@Override
	public void check(boolean result, String msg) {
		if(!result) {
			results.add(new TestSubResult(TestSubResult.FAIL, msg));
//			print("**ERROR** - "+msg);
		}
		else{
			results.add(new TestSubResult(TestSubResult.PASS, msg));
//			print("**PASS** - "+msg);
		}
	}
	@Override
	public void fail(String name) {
		results.add(new TestSubResult(TestSubResult.FAIL, name));
//		print("**FAIL** : "+name);
//		super.fail(name);
	}

	@Override
	public void checkPoint(String name) {
//		results.add(new TestSubResult(TestSubResult.CHECKPOINT, ""));
//		print("**checkPoint** : "+name);
	}

//	private void print(String string) {
//		System.out.println(string);
//	}

	@Override
	public void debug(String message) {
//		print("**debug** : "+message);
		
	}

	@Override
	public void debug(String message, boolean newline) {
//		print("**debug** : "+message);
	}

	@Override
	public void debug(Throwable ex) {
//		print("**debug** : exception : ");
	}

	@Override
	public void debug(Object[] o, String desc) {
//		print("**debug Object[]** : "+desc);
	}

//	@Override
//	public Reader getResourceReader(String name)
//			throws ResourceNotFoundException {
//		
//		// TODO Auto-generated method stub
//		return new InputStreamReader(getResourceStream(name));
//	}

	@Override
	public InputStream getResourceStream(String name)
			throws ResourceNotFoundException {
		try {
			return J2sTestHarness.class.getResourceAsStream(name);
		}catch (Exception e) {
			throw new ResourceNotFoundException(name);
		}
	}

	@Override
	public void verbose(String message) {
//		print("**vervose** : "+message);
	}
	public List<TestSubResult> getResults() {
		return results;
	}
	public void setResults(List<TestSubResult> results) {
		this.results = results;
	}
	public Testlet getTest() {
		return test;
	}
	public void setTest(Testlet test) {
		this.test = test;
	}
	public String getTestName() {
		return testName;
	}
	public void setTestName(String testName) {
		this.testName = testName;
	}
	public void setThrowable(Throwable e) {
		this.throwable = e;		
	}
	public Throwable getThrowable() {
		return throwable;
	}


	public String getTestUrl() {
		String cn = test.getClass().getName();
		return "/j2sMauve/srcMauve/"+cn.replace('.', '/')+".java";		
	}	
}
