package test;

class Test_Static {
	
 static int y;	
  static {
	  int x = 3;
	  y = x;
  }

  public static void main(String[] args) {
	  System.out.println(y == 3);
  }

}