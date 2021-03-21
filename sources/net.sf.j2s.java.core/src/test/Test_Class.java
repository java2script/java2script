package test;

import static java.awt.Color.getColor;
import static java.awt.Toolkit.getDefaultToolkit;
import static java.lang.String.format;

import java.awt.Color;
import java.awt.Toolkit;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Hashtable;

class Test_Class extends Test_Class2<Integer> {

	public static String $(String a) {
		System.out.println("$ " + a);
		return "$" + a;
	}

	public static String S(String a) {
		System.out.println("S " + a);
		return "S" + a;
	}

	static {

		System.out.println(new NullPointerException($("test")));
		System.out.println(new NullPointerException(S("test")));

	}

	static class TestStatic {

		static String sayHello() {
			return "Hello there";
		}
	}

	public int test_int = 3; // shadows Test_

	public Test_Class(short i) {
		super();
		test_int = super.test_int;
		System.out.println("Hello?");
	}

	public Test_Class(byte[]... d) {
		super(d);

		test_int = super.test_int;

		assert (getClass().getPackage().toString().equals("package test"));

		getDefaultToolkit();
		Toolkit.getDefaultToolkit();
		String f = format("testing");
		assert (f.equals("testing"));
		Color c1 = Color.getColor("green");

		Color c = getColor("red");
		// just for testing transpiler bug main(null);

		System.out.println("Test_Class len = " + d.length);
	}

	int x = 2000000000 + 2000000000;

	static int istatic = 5;
	static String sstatic = "test5";

	static String tstatic = "initial";
	String same$ = null;

	String same() {
		return null;
	}

	static class Singleton {
		static {
			tstatic = "changed by static";
		}
		// reference to Test_Class.Singleton.instance
		// lazily initializes a new instance of Test_Class()
		static Test_Class instance = new Test_Class();

		// actually, not recommended for JavaScript, because this
		// instance would be shared among applications, unlike in Java.
		public static void test(String s) {
		}
	}

	static {
		System.out.println("Test_Class static init " + istatic + " " + sstatic);
	}

	// static Test_Class cl0_1 = new Test_Class("test-static0_1
	// <<<<<<<<<<<<<<<<<<<");

	{
		istatic = 0;
		System.out.println("Test_Class nonstatic init " + istatic + " " + sstatic);
	}

	@SuppressWarnings("unused")
	private void test(String s) {

	}

	void c() {

	}

	@SuppressWarnings("unused")
	private void test(Integer i) {
		c();
	}

	int test1 = '0';
	static String s = "test";

	static {
		assert (java.lang.Number.class.getSuperclass() == Object.class);
		assert (java.lang.Object.class.getSuperclass() == null);
		assert (Integer.TYPE.isPrimitive());
		assert (!Integer.TYPE.isArray());
		assert (Integer.class.getName().equals("java.lang.Integer"));
		System.out.println("static java.lang OK");

	}
	private String test = "testing1";

	private String getTesting1() {
		return test;
	}

	static class Test_Class_Inner {
		static Integer i = 5;
		static int i2 = new Integer(3);
		static int ic = 'c';
		static char c = 'c';
		static Character c2 = 'c';
		static char c3 = new Character('c');

		Test_Class_Inner(String... s) {
			System.out.println(s.length);
		}

		public static Test_Class newInstance(Object... objects) {
			System.out.println("This is static Test_Class.newInstance(Object... objects");
			return null;
		}

	}

	public Test_Class(Test_ t) {
		System.out.println("Test_Class(t) constructor");
	}

	public Test_Class() {

		System.out.println("Test_Class() constructor");

		PropertyChangeListener l = new PropertyChangeListener() {
			@Override
			public void propertyChange(PropertyChangeEvent event) {
				// Let the defaultCloseOperation handle the closing
				// if the user closed the window without selecting a button
				// (newValue = null in that case). Otherwise, close the dialog.
				Test_Class x = Test_Class.this;
				System.out.println("Test_Class prop " + x);
			}
		};

		final Test_Class me = Test_Class.this;
		MouseListener c = new MouseListener() {

			public int showt() {
				return 2;
			}

			@Override
			public void mouseClicked(MouseEvent e) {
				System.out.println("mouseClicked1");
				// test of qualified this
				setT(1);
				assert (Test_Class.this.showt() == 1);
				assert (showt() == 2);
				assert (Test_Class.this == me);
				setT(0);
				System.out.println("mouseClicked2");
			}

			@Override
			public void mousePressed(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mouseReleased(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mouseEntered(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mouseExited(MouseEvent e) {
				// TODO Auto-generated method stub

			}

		};
		c.mouseClicked(null);
		final String testfinal = "testFinal" + Double.valueOf(3);

		String pseudofinal = "testPseudo";

		@SuppressWarnings("serial")
		Hashtable<String, Object> t = new Hashtable<String, Object>() {
			@Override
			public Object put(String key, Object value) {
				super.put(key, value);
				System.out.println("t.put:" + key + "/" + value);
				// test for inner class access to an outer class's superclass method
				assert (showt() == 0);
				// test for inner class access to a private outer-class method
				assert (getTesting1() == "testing1");
				// test for inner class access to a private outer-class field
				assert (test == "testing1");
				// test for inner class access to a final variable
				String myfinal = testfinal;
				assert (myfinal.equals("testFinal3.0"));

				// note that the following will fail in Java but succeed in JavaScript:

				// assert(myfinal == "testFinal3.0");

				// test for inner class access to an implicitly final variable
				assert (pseudofinal == "testPseudo");
				return value;
			}
		};

		t.replace("test", "testing");
		Object o = t.put("test", getTesting());
		assert (o == "testing2");

	}

	public Test_Class(String s) {
		System.out.println(">>>>>>>>>>>>>>>>>>Test_Class(s) " + s + " " + i5 + " " + i8);
	}

	public Test_Class(Object... ab) {
		// System.out.println(">>>>>>Test_Class(Object...) " + cl1 + " " + i5 + " " + i8
		// + " ??? ");

		System.out.println("a==test3 " + (ab[0] == "test3"));
		assert (ab[0] == "test3");
		System.out.println("b==test4 " + (ab[1] == "test4"));
		assert (ab[1] == "test4");
	}

	public Test_Class(String a, String b) {
		System.out.println("a==test1 " + (a == "test1"));
		assert (a == "test1");
		System.out.println("b==test2 " + (b == "test2"));
		assert (b == "test2");
	}

	public static Test_Class newInstance() {
		System.out.println("failed! this is static Test_Class.newInstance()");
		assert (false);
		return null;
	}

	public static Test_Class newInstance(Object... objects) {
		System.out.println("failed! this is static Test_Class.newInstance(Object... objects");
		assert (false);
		return null;
	}

	class B {
		String test = "testingB";

		void testB() {
			System.out.println(test);
			assert (test.equals("testingB"));
			System.out.println(Test_Class.this.test);
			assert (Test_Class.this.test.equals("testing1"));
			test = "testc";
			assert (test.equals("testc"));
			test += "test";
			assert (test.equals("testctest"));
			test += Test_Class.this.test;
			assert (test.equals("testctesttesting1"));
			Test_Class.this.test += test;
			assert (Test_Class.this.test.equals("testing1testctesttesting1"));

		}
	}

	Class B() {
		return B.class;
	}

	static class C extends Test_Class {

		C() {
			super();
		}

		C(byte[]... d) {
			super(d);
			System.out.println("C len = " + d.length);
		}

	}

	Class C() {
		return C.class;
	}

	public short testShort(short s) {
		return 0;
	}

	public static String localtest() {
		return tstatic = "changed by localtest";
	}

	public static void main(String[] args) {

		Class<?> cc = null;
		try {
			cc = Class.forName("test.Test_Class");
			Constructor<?>[] constructors = cc.getConstructors();
			for (int i = 0; i < constructors.length; i++) {
				Class<?>[] parameters = constructors[i].getParameterTypes();
				if (parameters.length == 1 && parameters[0] == Short.TYPE) {
					Test_Class tc;
					tc = (Test_Class) constructors[i].newInstance(new Object[] { Short.valueOf((short) 99) });
					System.out.println(tc.getClass().getName());
					break;
				}
			}

		} catch (ClassNotFoundException | InstantiationException | IllegalAccessException | IllegalArgumentException
				| InvocationTargetException e) {
			e.printStackTrace();
		}

		TestStatic ts = null;

		System.out.println(ts.sayHello());

//		System.out.println(new Date() + " " + Date.parse("3/4/2020"));

		System.out.println(Number.class.isAssignableFrom(Double.class));
		System.out.println(System.getProperty("user.dir"));
		System.out.println(System.getProperty("user.home"));

		float specversion = Float.parseFloat(System.getProperty("java.specification.version"));

		System.out.println(System.getProperty("screen"));

		System.out.println(Toolkit.getDefaultToolkit().getMenuShortcutKeyMask());

		// tricky situation where a parameter changes a value that is also changed by
		// the static initializer of a class:
		boolean test1 = false;
		if (test1) {
			Test_Class.Singleton.test(tstatic = "changed by parameters");
		} else {
			Test_Class.Singleton.test(localtest());
		}
		boolean isOK = tstatic.equals("changed by static");
		System.out.println("testing static load order " + isOK + " " + tstatic);

		try {
//			assert(isOK);
			assert (new String().getClass().getName().equals("java.lang.String"));
			assert (Class.forName("java.lang.String") == String.class);
			assert (Test_Class.class.getMethod("testShort", Short.TYPE).getParameterTypes()[0] == Short.TYPE);
			assert (Class.forName("java.lang.String") == String.class);
			assert (new String[0].getClass().getName().equals("[Ljava.lang.String;"));
			assert (Class.forName("[Ljava.lang.String;").getComponentType() == String.class);
			assert (new short[0].getClass().getName().equals("[S"));
			assert (Class.forName("[S").getComponentType() == Short.TYPE);
		} catch (Throwable t) {
			t.printStackTrace();
			assert (false);
		}

		System.out.println("===========");
		// these won't be the same, because Java declares synthetic access$n methods
		showMethods(Test_Class.class.getDeclaredMethods());
		System.out.println("-----------");
		// these won't be the same, because SwingJS returns public and package-private
		// methods
		showMethods(Test_Class.class.getMethods());
		System.out.println("===========");
		showMethods(Test_Class_int.class.getDeclaredMethods());
		System.out.println("-----------");

		new C(new byte[0], new byte[100], new byte[1000]);

		new C(new byte[3][5]);

		try {
			new C((byte[][]) null);
		} catch (Throwable t) {
			System.out.println("Right!");
		}

		Class<?> type = Object.class;
		assert (type instanceof Class<?>);

		System.out.println(Test_Class.Singleton.instance);
		String ss = "testing \10\13a \7777  \u0052";
		System.out.println(ss + " " + ss.length());
		try {
			System.out.println(new String(ss.getBytes(), "UTF-8"));
		} catch (UnsupportedEncodingException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
		// System.out.println("Test_Class.main() " + cl1);
		try {
			Constructor<Test_Class> constr = Test_Class.class.getConstructor(new Class[] { Test_.class });
		} catch (NoSuchMethodException | SecurityException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		class LocalClass {

			String hello() {
				return "LocalClass says hello";
			}
		}

		try {

			System.out.println("main istatic=" + istatic);

			Class<?> cls = Class.forName("test.Test_Call", false, test.Test_Class.class.getClassLoader());
			Method m = cls.getMethod("main", String[].class);
			String[] params = null;
			m.invoke(null, (Object) params);

			String s = new LocalClass().hello();
			System.out.println(s);
			assert (s.equals("LocalClass says hello"));

			s = new Test_Class().getTesting();
			System.out.println(s);
			assert (s.equals("testing2"));

			new Test_Class().new B().testB();
			Class<?> cl;
			ClassLoader loader = test.Test_Anon.class.getClassLoader();
			@SuppressWarnings("unused")
			Object x = Class.forName("test.Test_Anon", false, loader).getConstructor().newInstance();

			cl = Class.forName("test.Test_Class");
			cl.getConstructor(String.class, String.class).newInstance(new Object[] { "test1", "test2" });
			cl.getConstructor(Object[].class).newInstance(new Object[] { new Object[] { "test3", "test4" } });
			cl.getConstructor(String.class, String.class).newInstance("test1", "test2");
			Test_Class c = (Test_Class) cl.getConstructor().newInstance();
			cl = c.C();
			cl.newInstance();

			String o = "" + java.util.concurrent.DelayQueue.class;
			System.out.println(o);
			assert (("" + o).equals("class java.util.concurrent.DelayQueue"));
			o = "" + java.awt.geom.Point2D.Double.class;
			System.out.println(o);
			assert (("" + o).equals("class java.awt.geom.Point2D$Double"));

			o = "" + test.Test_Class.B.class;
			System.out.println(o);
			assert (("" + o).equals("class test.Test_Class$B"));

			System.out.println(test.Test_Class.B.class.getSimpleName());
			assert (test.Test_Class.B.class.getSimpleName().equals("B"));

			o = "" + test.Test_Class.C.class;
			System.out.println(o);
			assert (("" + o).equals("class test.Test_Class$C"));

			System.out.println(test.Test_Class.C.class.getSimpleName());
			assert (test.Test_Class.C.class.getSimpleName().equals("C"));

			System.out.println(LocalClass.class.isLocalClass());
			assert (LocalClass.class.isLocalClass());

			assert (("" + test.Test_Interface.class).equals("interface test.Test_Interface"));

			System.out.println("Test_Class OK");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	private static void showMethods(Method[] methods) {
		for (int i = 0; i < methods.length; i++) {
			System.out.print("name=" + methods[i].getName());
			Class<?>[] parameters = methods[i].getParameterTypes();
			for (int j = 0; j < parameters.length; j++)
				System.out.print(" " + parameters[j].getName());
			System.out.println();
		}

	}

	public static void testStatic() {
		// TODO Auto-generated method stub

	}

	public void testAbstract(int i, Integer n, long j) {
		System.out.println("OK -- Test_Class.testAbstract int Integer long");

	}

	public void testAbstract(int i, Double n, long j) {
		System.out.println("OHOH!!!!!!!!!!!!!!!!!!!!!!!!!");
		// assert(false);

	}

	@Override
	public void testClassInt(int i) {
		// TODO Auto-generated method stub

	}

	@Override
	public void testClassLong(long i) {
		// TODO Auto-generated method stub

	}

}

class Test_class1 {
	int test;
}