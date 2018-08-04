package test;

public interface Test_Interface { 	
	
	int x = 3;
	String y = "y";
	String[] s = new String[3];
	
	class Inner extends Test_ {
		String test(String s) {
			return s;
		}
	}
	
	
	public interface Test_Interface_inner {
		// This mus be wrapped, or C$ changes definitions
	}
	
  public static void main(String[] args) {
	 ClassLoader.getSystemClassLoader().setClassAssertionStatus("test.Test_Interface", true);
	 
	 Inner inner = new Inner();
	 System.out.println(inner.test("1") == "1");
	 
	 assert(inner.test("1") == "1");
	 
	 System.out.println("in the interface " + x + " " + y);
	 assert("3 y".equals(x + " " + y));
	 System.out.println("Test_Interface OK");
	 
  }
	
}