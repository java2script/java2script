package test;

import javajs.util.P3;
import javajs.util.T3;

class Test_Instance {

  public static void main(String[] args) {
	  String s = "testing";
	  System.out.println(s instanceof String);	  
	  System.out.println(new P3() instanceof T3);
	  System.out.println(new P3[0] instanceof T3[]);
	  System.out.println(new String[0] instanceof String[]);
	  System.out.println(new String[1][1] instanceof String[][]);
	  System.out.println(new int[0] instanceof int[]);
	  System.out.println(new int[1][1] instanceof int[][]);
	  System.out.println(new int[1][1] instanceof int[][]);
	  System.out.println(!(((Object) new int[1][1]) instanceof float[][]));
	  System.out.println(!(((Object) new int[1][1]) instanceof int[]));
	  
  }
	
}