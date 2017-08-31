package test;

import java.lang.reflect.Array;

class Test_Array {
		
 static int y;	
  static {
	  int x = 3;
	  y = x;
  }
  
  static Object tType3__ = Array.newInstance(Test_Array[][].class, 3);
  static Object oType3__ = Array.newInstance(Object[][].class, 3);
  static Object sType3__ = Array.newInstance(String[][].class, 3);
  static Object iType3__ = Array.newInstance(int[][].class, 3);
  static Object iType3_ = Array.newInstance(int[].class, 3);
  static Object iType3 = Array.newInstance(Integer.TYPE, 3);
  static Object iType123_ = Array.newInstance(Integer.TYPE, 1,2,3);
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
  static Object c33def = new int[][] {new int[] {3, 4, 5}, null};
  static Object c33def2 = new int[][] {new int[] {0, 1, 2}, new int[] {3, 4, 5}};

  public static void main(String[] args) {
	  
      Class<?> c = i3.getClass().getComponentType();
      int[] i3b = (int[]) Array.newInstance(c, 5);
      
      System.out.println(i3.getClass().getComponentType().getName() == "int");
      System.out.println(i33.getClass().getComponentType().getName() == "[I");
      System.out.println(i33.getClass().getComponentType().getComponentType().getName() == "int");
      System.out.println(tType3__.getClass().getComponentType().getName().equals("[[L" + Test_Array.class.getName() + ";"));
	  System.out.println("int[] " + (i3 instanceof int[]));
	  System.out.println("int[] " + (i3b instanceof int[]));
	  System.out.println("int[] " + (iType3 instanceof int[]));
	  System.out.println("int[][] " + (i33 instanceof int[][]));
	  System.out.println("int[][] " + (iType3_ instanceof int[][]));
	  System.out.println("int[][] != int[] " + !(i33 instanceof int[]));
  }

}