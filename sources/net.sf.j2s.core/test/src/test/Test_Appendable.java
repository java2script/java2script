package test;

import java.io.IOException;

class Test_Appendable extends Test_  {
	private int t = 1;
  public static void main(String[] args) {
	 System.out.println(new Test_Appendable().t);
	 new Test_Appendable().showt();
	  Appendable s = new StringBuffer();
	  try {
		s.append("true");
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	assert(s.toString().equals("true"));
	System.out.println("Test_Appendable OK");
  }
	
}