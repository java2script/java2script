package test;

public class Test_Intern extends Test_ {
	
  public static void main(String[] args) {
	  
		String a = "uninitialized";
		String b = "Value";
		
		// false in Java but true in JavaScript:		
		System.out.println("uninitializedValue" == a + b);
		String c = (a + b).intern();
		
		// true in Java and JavaScript:
		System.out.println("uninitializedValue" == c);

	  assert("uninitializedValue" == a + b);
	  System.out.println("Test_Intern OK");
  }

} 