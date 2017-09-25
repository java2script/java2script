package test;

import java.applet.Applet;

class Test_Instance extends Test_ {

  public static void main(String[] args) {
	  // here we a are checking that Java.applet.Applet is not required
	  // since if it has NOT been loaded, "testing" cannot be an instance of it.
	  // there is no need to load it just to test this.
	  System.out.println(!(((Object)"testing") instanceof Applet));	  
	  System.out.println("testing" instanceof String);	  
	  System.out.println(new String() instanceof CharSequence);
	  System.out.println(new String[3] instanceof CharSequence[]);
	  System.out.println(new String[0] instanceof String[]);
	  System.out.println(new String[1][1] instanceof String[][]);
	  System.out.println(new int[0] instanceof int[]);
	  System.out.println(new int[1][1] instanceof int[][]);
	  System.out.println(new int[1][1] instanceof int[][]);
	  System.out.println(!(((Object) new int[1][1]) instanceof float[][]));
	  System.out.println(!(((Object) new int[1][1]) instanceof int[]));

	  assert(!(((Object)"testing") instanceof Applet));	  
	  assert("testing" instanceof String);	  
	  assert(new String() instanceof CharSequence);
	  assert(new String[3] instanceof CharSequence[]);
	  assert(new String[0] instanceof String[]);
	  assert(new String[1][1] instanceof String[][]);
	  assert(new int[0] instanceof int[]);
	  assert(new int[1][1] instanceof int[][]);
	  assert(new int[1][1] instanceof int[][]);
	  assert(!(((Object) new int[1][1]) instanceof float[][]));
	  assert(!(((Object) new int[1][1]) instanceof int[]));
	  System.out.println("Test_Instance OK");

	}
	
}