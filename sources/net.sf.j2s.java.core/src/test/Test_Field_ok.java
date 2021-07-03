package test;

import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.Iterator;
 

/**
 * This test checks complex synthetic method and field references for nested
 * inner classes. This test works in JavaScript because although this subclass
 * has methods "field" and "next" with the same names as fields of its
 * superclass, the methods are given the names "field$" and "next$".
 * 
 * The problem in Java 8 HashMap was that the abstract class
 * HashMap$HashIterator (mistakenly?) does not implement Iterator, but it has a
 * "next" field, and the Iteration also requires a next() method.
 * 
 * The solution was to rewrite the transpiler to make sure only very specific
 * methods are left without $ appended. These include all methods EXCEPTING:
 * 
 * - hashCode and toString
 * 
 * - all methods in Math
 * 
 * - all methods in String, Integer, .... , Character except valueOf, replace,
 * and split
 * 
 * - all private nonstatic methods
 * 
 * Note that all private nonstatic methods are stored in local var p$<n> arrays
 * that can't collide with fields, have no inheritance issues, and can't even be
 * discovered programmatically, except by stopping the browser's debugger in a
 * method of the class containing them.
 * 
 * Proper output:
 * 
 * Test_Field_ok[f].field() is OK
 * 
 * Test_Field_ok[g].field() is OK
 * 
 * Test_Field_ok$inner inner private function OK
 * 
 * showField() OK
 * 
 * Test_Field_ok$inner$inner2 inner private function OK
 * 
 * Test_Field_ok[f] outer private function OK
 * 
 * Test_Field1 outer public function OK
 * 
 * mousePrivate() OK
 * 
 * Test_Field_ok$inner inner private function OK
 * 
 * Test_Field_ok[f] outer private function OK
 * 
 * next is OK
 * 
 * split OK
 * 
 * Test_Field OK
 * 
 * 
 * @author hansonr
 *
 */
public class Test_Field_ok extends Test_Field2<String> implements Field_iter, Iterator<String>, Runnable {

	public Test_Field_ok() {
	}
	
	public Test_Field_ok(String name) {
		className += ("[" + name + "]").intern();
	}

	private String field() {
		return className + ".field() is OK";
	} 

	private String className = "Test_Field_ok";
	private String next = "OK";
	String myfield = "OK";
	
	public final static int FIELD_STATIC = getField();
	
	
	static Test_Bugs TEST_BUGS;
	
	private void privateFunction() {
		
		System.out.println(className + " outer private function OK");
	} 
	
	private static int getField() {
		return 0;
	}

	public static void main(String[] args) {

		// expression for class:
		
		//testing();
		Test_Field_ok f = new Test_Field_ok("f"); 
		Test_Field_ok g = new Test_Field_ok("g"); 

		int i = 1;
		System.out.println((i == 1 ? f : g).field());
		System.out.println((i == 0 ? f : g).field());

		
		// inner field private method test
		
		f.new Test_Field_inner().showField();

		// field, not the method:
		System.out.println("next is " + f.next);

		// split without a problem: 
		
		try {
			f.getClass().newInstance().split("OKXNOTOK");
		} catch (InstantiationException | IllegalAccessException e) {
			e.printStackTrace();
		}

		// replace without a problem:
		
		System.out.println("Test_Field OK");
	} 

	public void split(String s) {
		System.out.println("split " + s.split("X")[0]);
	}
	
	class Test_Field_inner {
		private String className = "Test_Field_ok$inner";
		private void privateFunction() {
			System.out.println(className + " inner private function OK");
		};
		private void showField() { 
			privateFunction(); 
			
			MouseAdapter o = new MouseAdapter() {
				@Override
				public void mouseMoved(MouseEvent e) { 
				    mousePrivate(); 
					privateFunction();
					Test_Field_ok.this.privateFunction();
			//	    System.out.println(field() + " from anonymous inner$mouseAdapter.mouseMoved()");
				}
				private void mousePrivate() {
					System.out.println("mousePrivate() OK");
				};
			};
			System.out.println("showField() OK");
			inner2 i2 = new inner2();
			i2.privateFunction();
			new inner2().outerFunction();
			o.mouseMoved(null);
		}
	}

	private class inner2 extends Test_Field1 {
		private String className = "Test_Field_ok$inner$inner2";
	    private void privateFunction() {
			System.out.println(className + " inner private function OK");
			Test_Field_ok.this.privateFunction();
		}

	    private int index;
	    
		public int index() {
            return index;
        }

	}

	@Override
	public boolean hasNext() {
		// TODO Auto-generated method stub
		return false;
	}
 
	@Override 
	public String next() {
		// TODO Auto-generated method stub
		return "next is " + next;
	}
	
	private int lastVar = -1;

	@Override
	public int var() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int typeof() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		
	}
}
