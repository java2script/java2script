package org.sgx.j2s.mauve.report;

import java.util.LinkedList;
import java.util.List;

import gnu.testlet.Testlet;
import gnu.testlet.java2.lang.String.decode;
/**
 * 
 * @author sgurin
 *
 */
public class Tester {
	
	private static String baseName;

	/** test to be made */
	List<Testlet> tests = null;
	
	/** tests results */
	List<J2sTestHarness>results = null;

	private int totalAsserts;

	private int okAsserts;

	private int failedAsserts;

	private int totalTestCount;

	private int totalTestFailed;

	private int totalTestOK;
	
	public static String getMethodUnsuportedHTMLString(String s) {
		return "<b class=\"method-not-supported\">Method not supported by J2S: "+s+"</b>";
	}
	
	public Tester(List<Testlet> tests, String baseName) {
		super();
		this.baseName=baseName;
		this.tests = tests;
		results = new LinkedList<J2sTestHarness>();
		tests = new LinkedList<Testlet>();
	}

	/**
	 * this methods make all test in tests list and poblates the results array
	 */
	public void testAll() {
		for(Testlet t : tests) {			
			J2sTestHarness harness = test(t);	
			results.add(harness);
		}
	}
	
	public void buildHTMLReport(StringBuffer b) {
		if(results==null)return ;
		
		generateGeneralStatistics();
		
		b.append(
//				"<html><head><title>J2s mauve test suite support java2 tests results</title>" +
				"<style>" +
				".main {width: 100%; /*table-layout: fixed;*/}"+
				".main td{border: 1px solid black; }" +
				".main .name{width: 40px;}" +
				".main .finishedOK{width: 70px;}" +
				".main .totalAsserts{width: 5px;}" +
				".main .passed{width: 5px;}" +
				".main .failed{width: 5px;}" +
				".main .failed-names{width: 100px;}" +
				".main tr.fail {background-color: red;}" +
				".main tr.no-failures {background-color: green;}" +
				
				"</style>" +
//				"</head><body>" +
				
				//statistics
				"<p><b>Total test classes runned: </b>"+totalTestCount+"</p>"+
				"<p><b>Total test interrupted by exception: </b>"+totalTestFailed+"</p>"+
				"<p><b>Total test runned ok: </b>"+totalTestOK+"</p>"+
				"<p><b>Total test asserts: </b>"+totalAsserts+"</p>"+
				"<p><b>Total test asserts OK: </b>"+okAsserts+"</p>"+
				"<p><b>Total test asserts FAILED: </b>"+failedAsserts+"</p>"+
				
				"<table class=\"main\">" +
				"<tr class=\"title\">" +
					"<td class=\"name\">Test Name</td>" +
					"<td class=\"finishedOK\">Finnished OK?</td>" +
					"<td class=\"totalAsserts\">Total asserts</td>" +
					"<td class=\"passed\">Passed</td>" +
					"<td class=\"failed\">Failed</td>" +
					"<td class=\"failed-names\">Failed asserts names</td>" +
				"</tr>");
		for(J2sTestHarness r : results){
			List<TestSubResult> results = r.getResults(), 
				failed = filterResultsByType(results, TestSubResult.FAIL),
				passed = filterResultsByType(results, TestSubResult.PASS);
			boolean exceptionThrowed = r.getType().equals(J2sTestHarness.THROW_NATIVE_EXCEPTION)||r.getType().equals(J2sTestHarness.THROW_EXCEPTION);
			String trClass = !exceptionThrowed?"":"fail";
			trClass+=(!exceptionThrowed&&failed.size()==0)?" no-failures ":"";
			
			b.append("<tr class=\""+trClass+"\">" +
				"<td class=\"name\"><a href=\""+r.getTestUrl()+"\">"+r.getTestName()+"</a></td>" +
				"<td class=\"finishedOK\">"+(!exceptionThrowed?"YES":"NO: "+r.getType()+" - "+r.getThrowable())+"</td>" +
				"<td class=\"totalAsserts\">"+results.size()+"</td>" +
				"<td class=\"passed\">"+passed.size()+"</td>" +
				"<td class=\"failed\">"+failed.size()+"</td>" +
				"<td class=\"failed-names\">"+printNames(failed)+"</td>" +
			"</tr>");
		}
		b.append("</table>" 
//				+"</body></html>"
				);
	}
	private void generateGeneralStatistics() {
		totalTestCount=0;
		totalTestFailed=0;
		totalTestOK=0;
		totalAsserts = 0;
		okAsserts=0; 
		failedAsserts = 0;
		for(J2sTestHarness h : results) {
			totalTestCount++;
			if(h.getType()==J2sTestHarness.EXIT_OK) 
				totalTestOK++;
			else
				totalTestFailed++;				
			for(TestSubResult subResult : h.getResults()){
				totalAsserts++;
				if(subResult.getType()==TestSubResult.FAIL)
					failedAsserts++;
				if(subResult.getType()==TestSubResult.PASS)
					okAsserts++;
			}
		}
	}

	private String printNames(List<TestSubResult> l) {
		String s = "";
		for(TestSubResult tr : l){
			s+=tr.getTestName()+", ";
		}
		return s;
	}

	public String buildHTMLReport() {
		StringBuffer sb = new StringBuffer();
		buildHTMLReport(sb);
		return sb.toString();
	}
	public static J2sTestHarness test(Testlet t) {
		J2sTestHarness harness = new J2sTestHarness(getTestName(t), t);		
		boolean typeSetted=false, nativeThrow=false;
		try {			
			t.test(harness);			
		}catch (Exception e) { 
			harness.setType(J2sTestHarness.THROW_EXCEPTION);
			typeSetted=true;
			harness.setThrowable(e);
		}catch (Throwable e) { /* this catch native exceptions also*/
			harness.setType(J2sTestHarness.THROW_NATIVE_EXCEPTION);
			harness.setThrowable(e);
			typeSetted=true;
		}
		if(!typeSetted)
			harness.setType(J2sTestHarness.EXIT_OK);
		return harness;		
	}
	
	public static String getTestName(Testlet t) {
		String cn = t.getClass().getName();
		return   cn.substring(baseName.length()+1,cn.length());
	}
	
	public static List<TestSubResult> filterResultsByType( List<TestSubResult> l, String type) {
		List<TestSubResult> r = new LinkedList<TestSubResult>();
		for(TestSubResult tr : l){
			if(tr.getType().equals(type)) {
				r.add(tr);
			}
		}
		return r;
	}
}

