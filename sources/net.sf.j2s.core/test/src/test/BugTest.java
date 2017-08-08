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

public class BugTest extends HashMap {

	private String me = "me";

	public BugTest() {
		System.out.println("this is BugTest()" + me);
		
	}

	public BugTest(String s) {
		System.out.println("this is BugTest(String):" + s + me);
	}

	public BugTest(Object[] o) {
		System.out.println("this is BugTest(Object[]):" + o + me);
	}

	public BugTest(String s, String t) {
		System.out.println("this is BugTest(String,String):" + s + t + me);
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

	private String name;

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

		try {
			Class<?> cl;
			cl = Class.forName("test.BugTest");
			cl.getConstructor(String.class, String.class).newInstance(
					new Object[] { "test1", "test2" });
			cl.getConstructor(Object[].class).newInstance(
					new Object[] { new Object[] { "test1", "test2" } });
			cl.getConstructor(String.class, String.class).newInstance("test1",
					"test2");
			cl.getConstructor().newInstance();
			cl.newInstance();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		System.out.println(getFont("f"));
		System.out.println(getFont("f", "y"));

		BugTest t = new BugTest();
		t.name = "test";

		t.test1(Integer.valueOf(33));
		t.test1(33);

		t.test(t);
		t.test((Object) t);

		int[] a2 = new int[2];
		int[][] a20 = new int[2][];
		int[][] a23 = new int[2][3];

		printit(2, 3, 4, 5);
		// Toolkit tk = Toolkit.getDefaultToolkit();

		// System.out.println(tk.toString());

		// JPanel ca = new JPanel();
		// JWindow jp = new JWindow();
		// JLabel jl = new JLabel();
		// jp.pack();
		// Font f = new Font("SansSerif", Font.BOLD, 10);
		// Graphics g = jp.getGraphics();
		// FontMetrics fm = g.getFontMetrics(f);
		// float w = fm.stringWidth("hello");
		// System.out.println(w + " " + jl.getGraphics() + " " + g);

		// int[] a = new int[] {1,2,3,343};
		// int[][] b = new int[][] {new int[]{4,5},new int[]{5,6}};
		// int[][] c = new int[3][4];
		// float[][] d = new float[][] {new float[]{4,5},new float[]{5,6}};
		// float[][][] e = new float[][][] {new float[][] {new float[]{4,5},new
		// float[]{5,6}}};
		// String[] sa = new String[] {"a","b","c","d"};
		// String[][] sb = new String[][] {new String[]{"a","b","c","d"},new
		// String[]{"a","b","c","d"}};
		// String[][] sc = new String[3][4];
		// String[][] sd = new String[][] {new String[]{"a","b","c","d"},new
		// String[]{"a","b","c","d"}};	
		System.out.println(args);

		char[] test = new char[] { '1', '2', '3', '4', '5' };
		String s = new String(test, 2, 3);

		System.out.println("char test: 345 = " + s);
		
		/**
		 * @j2sNative
		 * 
		 * ;//debugger;
		 * 
		 */
		{}
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
		{}
		SubClass obj = new SubClass("Hello from SubClass");
		System.out.println("Done.");
	}

	private static void test(double value, int prec) {
//  String s = PT.formatD(value, 1, precision, false, false, true);
//  char[] v = s.toCharArray();
//  int len = s.length();

		
//		char[] v = new char[30 + 1];
//	  
//
//	  sun.misc.FormattedFloatingDecimal fd
//      = new sun.misc.FormattedFloatingDecimal(value, prec,
//          sun.misc.FormattedFloatingDecimal.Form.GENERAL);
//
//  int ex = fd.getExponent();
//  // MAX_FD_CHARS + 1 (round?)
//  String sv = "" + value;
//  if (sv.indexOf("E") >= 0)
//  	sv = sv.substring(0, sv.indexOf("E"));
//  int dig = sv.length();
//  if ((""+value).indexOf(".") >= 0)
//   dig--;
//
//  
//  
//  int len = fd.getChars(v);
//  int expr = fd.getExponentRounded();
//  int exp = fd.getExponent();
//  if (exp != expr)
//  	System.out.println("ahaha");
//  String s = new String(v).substring(0, len);
//
//
//  sun.misc.FormattedFloatingDecimal fd1
//  = new sun.misc.FormattedFloatingDecimal(value, prec,
//      sun.misc.FormattedFloatingDecimal.Form.DECIMAL_FLOAT);
//  
//  len = fd1.getChars(v);
//  String sf = new String(v).substring(0, len); 
//  
//  sun.misc.FormattedFloatingDecimal fd2
//  = new sun.misc.FormattedFloatingDecimal(value, prec,
//      sun.misc.FormattedFloatingDecimal.Form.SCIENTIFIC);
//  
//  len = fd2.getChars(v);
//  String ss = new String(v).substring(0, len);
//  
//  sun.misc.FormattedFloatingDecimal fd3
//  = new sun.misc.FormattedFloatingDecimal(value, prec - 1,
//      sun.misc.FormattedFloatingDecimal.Form.SCIENTIFIC);
//  
//  len = fd3.getChars(v);
//  String ss1 = new String(v).substring(0, len);
  
  System.out.println(value + " prec=" + prec + " "
  + String.format("%1." + prec + "f", value)  + " " 
  + String.format("%1." + prec + "g", value)  + " " 
  + String.format("%1." + prec + "e", value)  + " " 
  	  	);
	}
	
	static {
		double d = 1234.56789356789; 
		for (int i = -10; i < 10; i++) {
			System.out.println("----");
			test2(d * Math.pow(10, i));
	  }
		d = 1.5; 
		for (int i = -10; i < 10; i++) {
			System.out.println("----");
			test2(d * Math.pow(10, i));
	  }
		d = 2.5; 
		for (int i = -10; i < 10; i++) {
			System.out.println("----");
			test2(d * Math.pow(10, i));
	  }
		d = 1; 
		for (int i = -10; i < 10; i++) {
			System.out.println("----");
			test2(d * Math.pow(10, i));
	  }
		d = 100; 
		for (int i = -10; i < 10; i++) {
			System.out.println("----");
			test2(d * Math.pow(10, i));
	  }
		d = 100.34567891234; 
		for (int i = -10; i < 10; i++) {
			System.out.println("----");
			test2(d * Math.pow(10, i));
	  }
		d = 4.95; 
		for (int i = -10; i < 10; i++) {
			System.out.println("----");
			test2(d * Math.pow(10, i));
	  }
		d = 4.5; 
		for (int i = -10; i < 10; i++) {
			System.out.println("----");
			test2(d * Math.pow(10, i));
	  }
		d = 3.95; 
		for (int i = -10; i < 10; i++) {
			System.out.println("----");
			test2(d * Math.pow(10, i));
	  }
		d = 3.5; 
		for (int i = -10; i < 10; i++) {
			System.out.println("----");
			test2(d * Math.pow(10, i));
	  }
		d = 12345; 
		for (int i = -10; i < 10; i++) {
			System.out.println("----");
			test2(d * Math.pow(10, i));
	  }
		System.out.println("{"+String.format("%.3f", 36f)+"}");
		System.out.println("----");
		
	}

	private static void test2(double d) {
		for (int i = 0; i < 10; i++)
		test(d , i);
	}	
}

