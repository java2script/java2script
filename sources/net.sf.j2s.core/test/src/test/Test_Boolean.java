package test;

class Test_Boolean extends Test_ {
	
  public static void main(String[] args) {
	  assert(new Boolean("true"));
	  assert(!new Boolean("false"));
	  System.out.println("Test_Boolean OK");
  }
	
}