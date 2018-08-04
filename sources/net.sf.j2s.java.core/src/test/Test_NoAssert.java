package test;

class Test_NoAssert {
	
	
	  public static void main(String[] args) {
		  int i = 0;
		  assert(i++ == 0);
		  System.out.println("With no assert enabled, this should read 0: " + i);
	  }

	
	
}