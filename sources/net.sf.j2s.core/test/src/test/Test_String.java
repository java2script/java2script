package test;

public class Test_String extends Test_ {
	
  public static void main(String[] args) {

	  assert("test".length() == 4);
	  CharSequence cs = "test";
	  assert(cs.length() == 4);
	  assert(String.valueOf(true).equals("true"));
	  assert(String.valueOf(1).equals("1"));
	  assert(String.valueOf(1.5).equals("1.5"));
	  assert(String.valueOf(1.5f).equals("1.5"));
	  assert(new Test_String().toString().equals("testing test.Test_String"));
	  System.out.println("Test_String OK");
  }

} 