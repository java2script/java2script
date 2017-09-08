package test;

class Test_DivEqual {
	
  public static void main(String[] args) {
	  
	  int x = 100;
	  x /= 3;
	  assert(x == 33);
	  x /= 3.5;
	  assert(x == 9);
	  x = 3;
	  x *= 3.5;
	  assert(x == 10);
	  x = 3;
	  x += 3.5 - x;
	  assert(x == 6);
	  x = 3;
	  x -= 3.5 + x - 3.5;
	  assert(x == 0);
	  byte b = 50;
	  b *= 20;
	  assert(b == -24);
	  b = 50;
	  b += 205;
	  assert(b == -1);
	  System.out.println(b / 33f);
	  System.out.println("Test_DivEqual OK");
  }
	
}