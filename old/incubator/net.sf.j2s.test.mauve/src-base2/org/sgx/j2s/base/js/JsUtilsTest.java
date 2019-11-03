package org.sgx.j2s.base.js;
//package net.sf.j2s.js;
//
//import junit.framework.TestCase;
//
//public class JsUtilsTest extends TestCase {
//
//	protected void setUp() throws Exception {
//		super.setUp();
//	}
//
//	protected void tearDown() throws Exception {
//		super.tearDown();
//	}
//
//	/* *** FUNC * ***/
//	private String testFuncAttr1="";
//	public void testFUNC1() {
//		Object f = JsUtils.FUNC(new AbstractRunnable() {
//			@Override
//			public Object run2(Object o1, Object o2) { 
//				JsUtilsTest.this.testFuncAttr1 = o1+" "+o2;
//				return null;
//			}
//			@Override
//			public int getParamCount() { 
//				return 2;
//			}
//		});
//		
//		/**
//		 * @j2sNative
//		 * f("hello", "world");
//		 */{}
//		 assertTrue(testFuncAttr1.equals("hello world"));
//	}
//
//	
//	
//	
//	
//	public void testPUT() {
////		Object o = 
////		fail("Not yet implemented");
//	}
//
//	public void testGET() {
////		fail("Not yet implemented");
//	}
//
//	String testOBJ1Attr1="";
//	public void testOBJ1() {
//		Runnable r = new AbstractRunnable() {
//			@Override
//			public Object run2(Object o1, Object o2) { 
//				JsUtilsTest.this.testOBJ1Attr1 = o1+" "+o2;
//				return null;
//			}
//			@Override
//			public int getParamCount() { 
//				return 2;
//			}
//		};
//		Object o = JsUtils.OBJ(new Object[]{
//			"intAttr1", 1, 
//			"intAttr2", new Integer(2),
//			"booleanAttr1", new Boolean(true),
//			"funcAttr1", r			
//		});
//		assertTrue("foo1", true);
//		
//		/**
//		 * @j2sNative
//		  this.assertTrue("number1", o.intAttr1==1);
//		  this.assertTrue("number2", o.intAttr2==2);
//		   debugger;
//		  this.assertTrue("boolean1", o.booleanAttr1);
//		 
//		  //o.funcAttr1("hi", "luke");
//		  //this.assertTrue(this.testOBJ1Attr1=="hi luke");
//		 */{}
////		fail("Not yet implemented");
//	}
//
//	public void testARR() {
////		fail("Not yet implemented");
//	}
//
//}
