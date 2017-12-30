package test;

import java.util.AbstractMap;
import java.util.HashMap;

class A {
	private void init() {
		System.out.println("class A init");
	}

	protected void init(String a) {
		System.out.println("class A init String a");
	}

	protected void init2() {
		System.out.println("class A init2");
		init();
	}
}

class B extends A {
	protected void init() {
		System.out.println("class B init");
		super.init2();
	}

	@Override
	protected void init(String b) {
		System.out.println("class B init String b");
	}

}

@SuppressWarnings({ "serial", "rawtypes" })
public class Test_Bugs extends HashMap {

	private String me = "me";

	public Test_Bugs() {
		System.out.println("this is Test_Bugs()" + me);
		
	}

	public Test_Bugs(String s) {
		System.out.println("this is Test_Bugs(String):" + s + me);
	}

	public Test_Bugs(Object[] o) {
		System.out.println("this is Test_Bugs(Object[]):" + o + me);
	}

	public Test_Bugs(String s, String t) {
		System.out.println("this is Test_Bugs(String,String):" + s + t + me);
	}

	private void test(AbstractMap a) {
		System.out.println(a + " is an AbstractMap");
	}

	private void test(Object ja) {
		System.out.println(ja + " is an Object");
	}

	private void test1(Number ja) {
		System.out.println(ja + " is a Number");
	}

	private void test1(int ja) {
		System.out.println(ja + " is an int");
	}

	private static String getFont(String f) {
		return f;
	}

	private static String getFont(String f, String y) {
		return f + y;
	}

	public static void main(String[] args) {

		new B().init();

		// report should be:
		//
		// class B init
		// class A init2
		// class A init


		System.out.println(getFont("f"));
		System.out.println(getFont("f", "y"));

		Test_Bugs t = new Test_Bugs();

		t.test1(Integer.valueOf(33));
		t.test1(33);

		t.test(t);
		t.test((Object) t);

		printit(2, 3, 4, 5);
		System.out.println(args);

		char[] test = new char[] { '1', '2', '3', '4', '5' };
		String s = new String(test, 2, 3);

		System.out.println("char test: 345 = " + s);

		main2(null);
		
	}

	static void printit(int... t) {
		for (int i = 0; i < t.length; i++)
			System.out.println(t[i]);
	}

	// ///////// https://groups.google.com/forum/#!topic/java2script/mjrUxnp1VS8

	public interface INTERFACE {
	}

	public static class CLASS {
	}

	public static class Baz extends CLASS implements INTERFACE {
	}

	public static class Qux {

		void f(INTERFACE arg) {
			System.out.println("f(INTERFACE) called -- CORRECT");
		}

		void f(CLASS arg) {
			
			System.out.println("f(CLASS) called -- ERROR");
		}

	}

	public static void g(INTERFACE foo) {

		Qux q = new Qux();

		q.f(foo);

	}

	public static void main2(String[] args) {

		Baz b = new Baz();

		g(b);

	}

	// ///////// https://groups.google.com/forum/#!topic/java2script/9FMWuEiH9Ik
		
	public class SubBaseClass {
	  
	}
	public class BaseClass {

		public BaseClass() {
			this("");
		}

		public BaseClass(String prefix) {
			System.out.println(prefix + "Hello from BaseClass");
		}

	}

	public class SubClass extends BaseClass {

		SubClass(String message) {
			super();
			System.out.println(message);
		}

	}

	public void main3(String[] args) {
		/**
		 * @j2sNative
		 * 
		 * debugger;
		 */
		new SubClass("Hello from SubClass");
		System.out.println("Done.");
	}

}

