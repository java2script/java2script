package test;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.Hashtable;

@SuppressWarnings("rawtypes")
class Test_Class extends Test_Class2 {

	
	static int istatic = 5;
	static String sstatic = "test5";
	
	static class Singleton {
		// reference to Test_Class.Singleton.instance 
		// lazily initializes a new instance of Test_Class() 
		static Test_Class instance = new Test_Class();
		// actually, not recommended for JavaScript, because this
		// instance would be shared among applications, unlike in Java.
	}
	
	static  {
		System.out.println("Test_Class static init " + istatic + " " + sstatic);
	}

    //static Test_Class cl0_1 = new Test_Class("test-static0_1 <<<<<<<<<<<<<<<<<<<");


	{
		istatic = 0;
		System.out.println("Test_Class nonstatic init " + istatic + " " + sstatic);
	}

	private void test(String s) {
	
	}

    void c() {
		
	}
	
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
			
			@Override
			public void mouseClicked(MouseEvent e) {
				System.out.println("mouseClicked1");
				Test_Class.this.showt(); 
				showt();				
				assert(Test_Class.this == me);
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
		
		Hashtable<String, Object> t = new Hashtable<String, Object>() {
			public Object put(String key, Object value) {
				super.put(key,  value); 
				System.out.println("t.put:" + key + "/" + value);
				// test for inner class access to an outer class's superclass method 
				assert(showt() == 0);
				// test for inner class access to a private outer-class method
				assert(getTesting1() == "testing1");
				// test for inner class access to a private outer-class field
				assert(test == "testing1");
				// test for inner class access to a final variable
				String myfinal = testfinal;
				assert(myfinal.equals("testFinal3.0"));
				
				// note that the following will fail in Java but succeed in JavaScript:
				
				// assert(myfinal == "testFinal3.0");
				
				
				
				// test for inner class access to an implicitly final variable
				assert(pseudofinal == "testPseudo");
				return value;
			}			
		};
		
		Object o = t.put("test", getTesting());
		assert(o == "testing2");
		
	}

	public Test_Class(String s) {
		System.out.println(">>>>>>>>>>>>>>>>>>Test_Class(s) " + s + " " + i5 + " " + i8);
	}
	public Test_Class(Object... ab) {
		//System.out.println(">>>>>>Test_Class(Object...) " + cl1 +  " " + i5 + " " + i8 + " ??? ");
		
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

	}

	Class C() {
		return C.class;
	}

	public static void main(String[] args) {

		
		System.out.println(Test_Class.Singleton.instance);
		String ss = "testing \10\13a \7777  \u0052";
		System.out.println(ss + " "+ ss.length());
		try {
			System.out.println(new String(ss.getBytes(), "UTF-8"));
		} catch (UnsupportedEncodingException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
		//System.out.println("Test_Class.main() " + cl1);
		 try {
			Constructor<Test_Class> constr = Test_Class.class.getConstructor(new Class[] {Test_.class});
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

			Class<?> cls = Class.forName("test.Test_Call",false, test.Test_Class.class.getClassLoader());
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

	public static void testStatic() {
		// TODO Auto-generated method stub
		
	}

}

class Test_class1 {
	int test;
}