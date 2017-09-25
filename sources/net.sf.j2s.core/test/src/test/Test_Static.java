package test;

class Test_Static extends Test_ {
	
 private static boolean b;
 private static int y;
 private static char c = 'c';
 static String s;
  static {
	  int x = 3;
	  y = x;
	  Test_Boolean.main(null);
  }

  @SuppressWarnings("static-access")
public static void main(String[] args) {
	  assert(y == 3);
	  new Test_Static().b ^= true;
	  new Test_Static().y++;
	  new Test_Static().s += "test1" + c++ + 3 + 5.5f + c + 5.5;
	  assert(s.equals("nulltest1c35.5d5.5"));
	  
	  int i = 3 + y + (new Test_Static().y++);
	  
	  assert(i == 11 && y == 5);
	  i += 3 + y + ++(new Test_Static().y);
	  assert(y == 6 && i == 25);
	  
	  new Test_Static().y--;
	  y--;

	  String y1 ="0";
	  y1 += "test" + c + 3 + 5.5f + c + 5.5;
	  assert(y1.equals("0testd35.5d5.5"));
	  System.out.println("Test_Static OK");
  }

}