package test;

class Test_Boolean extends Test_ {
	
  public static int i_;
  
  public static void main(String[] args) {
	  System.out.println("" + (new Boolean("true")) + (!new Boolean("false")));
	  assert(new Boolean("true"));
	  assert(!new Boolean("false"));
	  System.out.println("Test_Boolean OK");
  }
	
}