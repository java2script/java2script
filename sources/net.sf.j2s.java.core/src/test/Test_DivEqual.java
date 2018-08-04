package test;

class Test_DivEqual extends Test_ {
	
  public static void main(String[] args) {
	  
	  int x = 100;
	  x /= 3;
	  System.out.println(x);
	  assert(x == 33);
	  x /= 3.5;
	  System.out.println(x);
	  assert(x == 9);
	  x = 3;
	  x *= 3.5;
	  System.out.println(x);
	  assert(x == 10);
	  x = 3;
	  x += 3.5 - x;
	  System.out.println(x);
	  assert(x == 3);
	  x = 3;
	  x -= 3.5 + x - 3.5;
	  System.out.println(x);
	  assert(x == 0);
	  byte b = 50;
	  b *= 20;
	  System.out.println(x);
	  assert(b == -24);
	  b = 50;
	  b += 205;
	  System.out.println(x);
	  assert(b == -1);
	  System.out.println(b / 33f);
	  System.out.println("Test_DivEqual OK");
  }
	
}