package test;

public class Test_String extends Test_ {
	
  public static void main(String[] args) {
	  CharSequence cs = "test";
	  System.out.println("test".length() == 4);
	  System.out.println(cs.length() == 4);
	  System.out.println(String.valueOf(true) + "=true");
	  System.out.println(String.valueOf(1) + "=1");
	  System.out.println(String.valueOf(1.5) + "=1.5");
	  System.out.println(String.valueOf(1.5f)+ "=1.5");
	  System.out.println(new Test_String().toString());
  }

} 