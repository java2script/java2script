package test;

/**
 * Test to see that we can have a var test in a package test
 * @author RM
 *
 */
class Test_Var extends Test_ {
	
	int e,f,g;
	
  @SuppressWarnings("unused")
public static void main(String[] args) {
	 int a, b, c, d;
	 String test = "3";
	 String java = "java";
	 System.out.println(java == "java");
	 assert(java == "java");
	 System.out.println(test == "3");
	 assert(test == "3");
	 System.out.println(test.Test_Var.class);
	 assert(test.Test_Var.class.toString().equals("class test.Test_Var"));
	 System.out.println(test.Test_Class.class);
	 assert(test.Test_Class.class.toString().equals("class test.Test_Class"));
	 new test.Test_Class();
	 
	 System.out.println("Test_Var OK");
  }
	
}