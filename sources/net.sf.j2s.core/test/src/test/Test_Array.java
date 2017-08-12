package test;

class Test_Array {
	
  public static void main(String[] args) {
	  System.out.println("int[]" + " " + (new int[3] instanceof int[]));
	  System.out.println("int[][]" + " " + (new int[3][3] instanceof int[][]));
	  System.out.println("!int[][]" + " " + !(((Object) new int[3][3]) instanceof int[]));
  }

}