package test;

public class Test_Interface2 implements Test_Interface { 	
	
	static int x = 5;
	
  public static void main(String[] args) {
	 ClassLoader.getSystemClassLoader().setClassAssertionStatus("test.Test_Interface", true);
	 System.out.println("in the interface " + x + " " + y + " " + s.length);
	 assert("5 y".equals(x + " " + y));
	 assert(Test_Interface3.doTest(3) == 4);
	 System.out.println("Test_Interface OK");
	 
  }


	
}