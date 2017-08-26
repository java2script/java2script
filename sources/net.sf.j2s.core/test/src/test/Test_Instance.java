package test;

class Test_Instance {

  public static void main(String[] args) {
	  String s = "testing";
	  System.out.println(s instanceof String);	  
	  System.out.println(new String() instanceof CharSequence);
	  System.out.println(new String[3] instanceof CharSequence[]);
	  System.out.println(new String[0] instanceof String[]);
	  System.out.println(new String[1][1] instanceof String[][]);
	  System.out.println(new int[0] instanceof int[]);
	  System.out.println(new int[1][1] instanceof int[][]);
	  System.out.println(new int[1][1] instanceof int[][]);
	  System.out.println(!(((Object) new int[1][1]) instanceof float[][]));
	  System.out.println(!(((Object) new int[1][1]) instanceof int[]));

	}
	
}