package test;

class Test_Cast {
	
  public static void main(String[] args) {
	  System.out.println("'K'=" + (char)75 + " Character('K')=" + new Character('K'));
	  test((char) 75);
  }

	private static void test(char c) {
		System.out.println("testing char " + c);
	}
	
}