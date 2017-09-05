package test;

@SuppressWarnings("rawtypes")
class Test_Class {

	public Test_Class() {
	  System.out.println(true);
	}
	
	public Test_Class(Object... ab) {
		System.out.println("a==test3 " + (ab[0] == "test3"));
		System.out.println("b==test4 " + (ab[1] == "test4"));
	
	}
	public Test_Class(String a, String b) {
		System.out.println("a==test1 " + (a == "test1"));
		System.out.println("b==test2 " + (b == "test2"));
	}
	
	public static Test_Class newInstance() {
		   System.out.println("failed! this is static Test_Class.newInstance()");
		   return null;		
		}
		
	public static Test_Class newInstance(Object... objects) {
	   System.out.println("failed! this is static Test_Class.newInstance(Object... objects");
	   return null;		
	}
	
	Class B() {
		return null;
	}
	
	static class C extends Test_Class  {
		
	}

	Class C() {
		return C.class;
	}
	
  public static void main(String[] args) {
	  
		try {
			Class<?> cl;
			cl = Class.forName("test.Test_Class");
			cl.getConstructor(String.class, String.class).newInstance(
					new Object[] { "test1", "test2" });
			cl.getConstructor(Object[].class).newInstance(
					new Object[] { new Object[] { "test3", "test4" } });
			cl.getConstructor(String.class, String.class).newInstance("test1",
					"test2");
			Test_Class c = (Test_Class) cl.getConstructor().newInstance();
			cl = c.C();
			cl.newInstance(); // fails in JavaScript - runs the static method instead
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

  }
	
}

class Test_class1 {
	int test;
}