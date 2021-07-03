package test;

class Test_Boolean extends Test_ {
	
  public static int i_;
  
  public static void main(String[] args) {


	  // test that b1 &= b2 is b1 = !!(b1 & b2), not just b1 && b2:
	  boolean a = false;
	  int c = 2;
	  a &= (++c > 1);
	  assert(a == false && c == 3);
	  
	  // test unboxing right
	  a &= Boolean.TRUE; //  a=!!(a&((Boolean.TRUE).valueOf()));
	  assert(a == false);
	  a |= Boolean.TRUE;
	  assert(a == true);
	  a = false;
	  a |= Boolean.FALSE;
	  assert(a == false);
	  	  
	  // test unboxing left Boolean then boxing Boolean
	  Boolean b = Boolean.FALSE;
	  b |= true; // b=Boolean.valueOf$Z(!!((b).valueOf()|(true)));
	  assert(b == Boolean.TRUE);

	  // test unboxing left Integer then boxing Integer
	  Integer ai = Integer.valueOf(33);
	  ai |= 23; // ai=Integer.valueOf$I((ai).valueOf()|(23));
	  assert (ai == 55);

	  // test unboxing left Integer and right Short, then boxing Integer
	  Short si = Short.valueOf((short)22);
	  ai = Integer.valueOf(33);
	  ai |= si; // ai=Integer.valueOf$I((ai).valueOf()|((si).valueOf()));
	  assert (ai == 55);

	  // test Boolean.FALSE is not new Boolean(false);
	  b = Boolean.FALSE;
	  Boolean b1 = new Boolean(false);
	  assert(new Boolean(false).equals(Boolean.FALSE));
	  assert(new Boolean(false) != Boolean.FALSE);
	  boolean boo = false;
	  assert(new Boolean(boo) != Boolean.FALSE);
	  assert(testBool(false) == Boolean.FALSE);
	  
	  // test unboxing right Boolean
	  assert(b == false);
	  assert(b1 == false);
	  assert(Boolean.FALSE ? false : true);
	  
	  // test ! Boolean
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

	  // test system properties getBoolean
	  assert(!Boolean.getBoolean("user.home"));
	  System.setProperty("mytest", "true");
	  assert(Boolean.getBoolean("mytest"));

	  // test hashcode same for Boolean.TRUE and just true
	  assert(Boolean.TRUE.hashCode() == Boolean.hashCode(true) );
	  assert(Boolean.FALSE.hashCode() == Boolean.hashCode(false));

	  // test string values
	  assert(Boolean.TRUE.toString() == "true");
	  assert(Boolean.FALSE.toString() == "false");
	  assert(Boolean.valueOf("true"));
	  assert(Boolean.valueOf("TRUE"));
	  assert(!Boolean.valueOf("false"));
	  assert(!Boolean.valueOf("FALSE"));

	  // Boolean.valueOf
	  assert(Boolean.valueOf(true));
	  assert(!Boolean.valueOf(false));

	  
	  System.out.println("Test_Boolean OK");
  }

private static Boolean testBool(Object b) {
	return (Boolean) b;
}
	
}