package test;

import java.io.UnsupportedEncodingException;

import javajs.util.SB;

public class Test_String extends Test_ {
	

  public static void main(String[] args) {

	  String sb = new String(new byte[] {97,98,99});
	  System.out.println(sb);
	  assert (sb.equals("abc"));
	  sb = "ab\u2520c";
	  try {
		byte[] b = sb.getBytes("UTF-8");
	} catch (UnsupportedEncodingException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	  assert ("test".compareToIgnoreCase("Test") == 0);
	  assert ("test".compareToIgnoreCase("Testing") < 0);
	  assert ("test".compareToIgnoreCase("Sest") > 0);
	  assert (String.CASE_INSENSITIVE_ORDER.compare("test",  "Sest") > 0);
	  
	  assert("test".length() == 4);
	  CharSequence cs = "test";
	  assert(cs.length() == 4);
	  assert(String.valueOf(true).equals("true"));
	  assert(String.valueOf(1).equals("1"));
	  assert(String.valueOf(1.5).equals("1.5"));
	  assert(String.valueOf(1.5f).equals("1.5"));
	  assert(new Test_String().toString().equals("testing test.Test_String"));

	  long t0;	  
	  t0 = System.currentTimeMillis(); 
	  String s = "";
	  for (int i = 0; i < 10000; i++) {
		  s += i;
	  }
	  System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t s+=");
	  


	  t0 = System.currentTimeMillis();
	  StringBuffer Sb = new StringBuffer();
	  for (int i = 0; i < 10000; i++) {
		  Sb.append(i);
	  }
	  s = Sb.toString();
	  System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t one StringBuffer");
	 

	  t0 = System.currentTimeMillis();
	  StringBuilder S = new StringBuilder();
	  for (int i = 0; i < 10000; i++) {
		  S.append(i);
	  }
	  s = S.toString();
	  System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t one StringBuilder");
	 

	  t0 = System.currentTimeMillis();
	  for (int i = 0; i < 10000; i++) {
		  StringBuilder SB = new StringBuilder();
		  SB.append(i);
		  s = SB.toString();
	  }
	  System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t many StringBuilder");
	 


	  
	  
	  t0 = System.currentTimeMillis();
	  SB b = new SB();
	  for (int i = 0; i < 10000; i++) {
		  b.appendI(i);
	  }
	  s = b.toString();
	  System.out.println("ms " + (System.currentTimeMillis() - t0) + "\t javajs.util.SB");
	 
	  
	  
	  
	  System.out.println("Test_String OK");
  }

} 