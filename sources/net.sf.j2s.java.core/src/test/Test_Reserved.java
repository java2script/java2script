package test;

import test.function.function;

/**
 * tests for allowing keywords such as "function" in a path name.
 */
class Test_Reserved extends Test_ {
	
	public static void main(String[] args) {
		
	  Object o = new function();
	  System.out.println("Test_Reserved OK");
	}

}