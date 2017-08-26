package test;

class Test_DivEqual {
	
  public static void main(String[] args) {
	  int x = 99;
	  x /= 3;
	  System.out.println("x == 33 is " + (x == 33));
	  x /= 3.5;
	  System.out.println("x == 9 is " + (x == 9));
  }
	
}