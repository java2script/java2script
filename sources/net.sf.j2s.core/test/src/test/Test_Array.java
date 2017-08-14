package test;

import java.lang.reflect.Array;

class Test_Array {
	
 static int y;	
  static {
	  int x = 3;
	  y = x;
  }
  static Object iType3 = Array.newInstance(Integer.TYPE, 3);
  static Object i3def = new int[] {3, 4, 5};
  static Object i3 = new int[3];
  static Object i3_ = new int[3][];
  static Object i33 = new int[3][3];
  static Object s3 = new String[3];
  static Object s3_ = new String[3][];
  static Object s33 = new String[3][3];
  static Object c3 = new char[3];
  static Object c3_ = new char[3][];
  static Object c33 = new char[3][3];
  static Object c33__ = new char[3][3][][];
  static Object c33_ = new char[3][3][];

  public static void main(String[] args) {
	  System.out.println("int[] " + (i3 instanceof int[]));
	  System.out.println("int[] " + (iType3 instanceof int[]));
	  System.out.println("int[][] " + (i33 instanceof int[][]));
	  System.out.println("int[][] != int[] " + !(i33 instanceof int[]));
  }

}