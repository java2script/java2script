package test;

import java.util.Date;

class Test_Boolean extends Test_ {
	
  public static int i_;
  
  public static void main(String[] args) {
	  
	  System.out.println(new Date() + " " + Date.parse("3/4/2020"));
	  Boolean b = Boolean.FALSE;
	  Boolean b1 = new Boolean(false);
	  System.out.println(Integer.valueOf(3));
	  assert(new Boolean(false).equals(Boolean.FALSE));

	  assert(b ? false : true);
	  assert(b1 ? false : true);
	  assert(Boolean.FALSE ? false : true);
	  System.out.println("" + (new Boolean("true")) + (!new Boolean("false")));
	  assert(new Boolean("true"));
	  assert(!new Boolean("false"));

	  assert(!Boolean.logicalAnd(true, false));
	  assert(Boolean.logicalOr(true, false));

	  assert(Boolean.logicalXor(true, false));
	  assert(!Boolean.logicalXor(true, true));
	  assert(!Boolean.logicalXor(false, false));

	  assert(Boolean.compare(true, true) == 0);
	  assert(Boolean.compare(true, false) == 1);
	  assert(Boolean.compare(false, true) == -1);


	  assert(Boolean.TRUE.compareTo(true) == 0);
	  assert(Boolean.FALSE.compareTo(false) == 0);
	  assert(Boolean.TRUE.compareTo(false) == 1);
	  assert(Boolean.FALSE.compareTo(true) == -1);

	  assert(!Boolean.getBoolean("user.home"));
	  System.setProperty("mytest", "true");
	  assert(Boolean.getBoolean("mytest"));

	  assert(Boolean.TRUE.hashCode() == Boolean.hashCode(true) );
	  assert(Boolean.FALSE.hashCode() == Boolean.hashCode(false));

	  assert(Boolean.TRUE.toString() == "true");
	  assert(Boolean.FALSE.toString() == "false");

	  assert(Boolean.valueOf("true"));
	  assert(Boolean.valueOf("TRUE"));
	  assert(!Boolean.valueOf("false"));
	  assert(!Boolean.valueOf("FALSE"));
	  
	  assert(Boolean.valueOf(true));
	  assert(!Boolean.valueOf(false));

	  
	  System.out.println("Test_Boolean OK");
  }
	
}