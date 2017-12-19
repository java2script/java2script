package test;

class Test_Printf extends Test_ {
	
  public static void main(String[] args) {
	  String s = String.format("%s %s", "testing", "ok");
	  System.out.printf("%s %s", "testing", "ok");
	  assert(s.equals("testing ok"));
	  System.out.println("Test_Printf OK");
  }
	
}