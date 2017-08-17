package test;

class Test_Char {
	
  public static void main(String[] args) {
	  System.out.println("'K'=" + (char)75 + " Character('K')=" + new Character('K'));
	  test((char) 75);
	  String  s = new String("\ud800\udf84");
	  char c = (char)0xdf84;
	  int i = (int) c;
	  c = (char) 0xd800df84;
	  System.out.println("c=" + c + " i = " + i);
	  System.out.println(s.length() + " " + Character.charCount(s.codePointAt(0)) + " " + Character.getName(c));
  }

	private static void test(char c) {
		System.out.println("testing char " + c);
	}
	
}