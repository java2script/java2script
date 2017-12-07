package test;

import test.function.Function;

/**
 * tests for allowing keywords such as "function" in a path name.
 */
class Test_Reserved extends Test_ {
	
	public static void main(String[] args) {
		
	  Object o = new Function();
	  System.out.println("Test_Reserved OK");
	}

}