package test;

import java.io.IOException;

class Test_Appendable {
  public static void main(String[] args) {
	  Appendable s = new StringBuffer();
	  try {
		s.append("true");
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	System.out.println(s);
  }
	
}