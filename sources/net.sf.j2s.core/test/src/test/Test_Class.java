package test;

@SuppressWarnings("rawtypes")
class Test_Class extends Test_ {
	
	static String s = "test";

	static class Test_Class_Inner {
		static Integer i = 5;
		static int i2 = new Integer(3);
		static int ic = 'c';
		static char c = 'c';
		static Character c2 = 'c';
		static char c3 = new Character('c');
	}
	
	public Test_Class() {
	  System.out.println(true);
	}
	
	public Test_Class(Object... ab) {
		System.out.println("a==test3 " + (ab[0] == "test3"));
		assert(ab[0] == "test3");
		System.out.println("b==test4 " + (ab[1] == "test4"));
		assert(ab[1] == "test4");
	}
	
	public Test_Class(String a, String b) {
		System.out.println("a==test1 " + (a == "test1"));
		assert(a == "test1");
		System.out.println("b==test2 " + (b == "test2"));
		assert(b == "test2");
	}
	
	public static Test_Class newInstance() {
		   System.out.println("failed! this is static Test_Class.newInstance()");
		   assert(false);
		   return null;		
		}
		
	public static Test_Class newInstance(Object... objects) {
	   System.out.println("failed! this is static Test_Class.newInstance(Object... objects");
	   assert(false);
	   return null;		
	}
	
	String test = "testing";
	class B {
		String test = "testingB";
		void testB() {
			System.out.println(test);
			assert(test.equals("testingB"));
			System.out.println(Test_Class.this.test);
			assert(Test_Class.this.test.equals("testing"));
			test = "testc";
			assert(test.equals("testc"));
			test += "test";
			assert(test.equals("testctest"));
			test += Test_Class.this.test;
			assert(test.equals("testctesttesting"));
			Test_Class.this.test += test;
			assert(Test_Class.this.test.equals("testingtestctesttesting"));
			
			
		}
		
	}
	
	Class B() {
		return B.class;
	}
	
	static class C extends Test_Class  {
		
	}

	Class C() {
		return C.class;
	}
	
  public static void main(String[] args) {
	  
	  	class LocalClass {
	  		
	  		String hello() {
	  			return "hello";
	  		}
	  	}
	  
	  
		try {

		  	String s = new LocalClass().hello();
		    System.out.println(s);
		    assert(s.equals("hello"));
		    

			new Test_Class().new B().testB();
			Class<?> cl;
			ClassLoader loader = test.Test_Anon.class.getClassLoader();
			Object x = Class.forName("test.Test_Anon", false, loader).getConstructor().newInstance();
			
			cl = Class.forName("test.Test_Class");
			cl.getConstructor(String.class, String.class).newInstance(
					new Object[] { "test1", "test2" });
			cl.getConstructor(Object[].class).newInstance(
					new Object[] { new Object[] { "test3", "test4" } });
			cl.getConstructor(String.class, String.class).newInstance("test1",
					"test2");
			Test_Class c = (Test_Class) cl.getConstructor().newInstance();
			cl = c.C();
			cl.newInstance();
			
			String o = "" + java.util.concurrent.DelayQueue.class;
			System.out.println(o);
			assert(("" + o).equals("class java.util.concurrent.DelayQueue"));
			o = "" + java.awt.geom.Point2D.Double.class;
			System.out.println(o);
			assert(("" + o).equals("class java.awt.geom.Point2D$Double"));

			o = "" + test.Test_Class.B.class;
			System.out.println(o);
			assert(("" + o).equals("class test.Test_Class$B"));
			
			System.out.println(test.Test_Class.B.class.getSimpleName());
			assert(test.Test_Class.B.class.getSimpleName().equals("B"));

			o = "" + test.Test_Class.C.class;
			System.out.println(o);
			assert(("" + o).equals("class test.Test_Class$C"));
			
			System.out.println(test.Test_Class.C.class.getSimpleName());
			assert(test.Test_Class.C.class.getSimpleName().equals("C"));

		    System.out.println(LocalClass.class.isLocalClass());
		    assert(LocalClass.class.isLocalClass());

			
			assert(("" + test.Test_Interface.class).equals("interface test.Test_Interface"));

			System.out.println("Test_Class OK");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

  }
	
}

class Test_class1 {
	int test;
}