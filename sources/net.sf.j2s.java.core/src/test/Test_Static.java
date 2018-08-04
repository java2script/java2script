package test;

import test.Test_Class.Test_Class_Inner;

class Test_Static extends Test_ implements Test_int3, Test_int2, Test_int1 {

	/**
	 * Note that a static block in a main class is executed prior to running main().
	 * So you can set the arguments here as thisApplet.__Info.args, for example. 
	 * Setting j2sHeadless = true prevents all the AWT/Swing classes from being loaded
	 * but also means you cannot use them later. It really means headless just like in Java 
	 * 
	 * @j2sNative
	 * 
	 * j2sHeadless = true;
	 * 
	 * thisApplet.__Info.args = ["1","2","3"];
	 * 
	 */
	static {
		// JS only
	}
	
	private static byte[] bytearray = {1,2,127};
	
	private static boolean b = false;
	private static int y;
	private static char c = 'c';
	private static int innerI = Test_Class_Inner.i;
	static {
		System.out.println(Test_int1.int1);
		System.out.println(Test_int2.int2);
		System.out.println(Test_int3.int3);

		System.out.println(innerI);
		assert(innerI == 5);
		int x = 3;
		y = Test_Boolean.i_;
		Test_Array.y = 3;
		y = Test_Array.y;
		y = x;
		Test_Boolean.main(null);
		t = "setFromStaticInitializer";
		s = "setFromStaticInitializer";
	}

	public static String s, t = null;

	private void test1() {};
	private void test() {
		test1();
	};

	private static byte[] bytes = new byte[3]; 
	public static byte[] getByteArray() {
		return bytes;
	}
	
	@SuppressWarnings("static-access")
	public static void main(String[] args) {

		assert(t == null);
		assert s == "setFromStaticInitializer";

		
		  /**
		   * @j2sNative
		   * 
		   * 	  System.out.println(args);
		   * 
		   *   try{
		   *     afldsjadf.adfadf;
		   *    
		   *   } catch(e) {// is being called by Test_.js 
		   *     if (e.stack.indexOf("Test_.js")) args[1] = 2;
		   *   }
	       *
		   */
		  {
			  args = new String[] {"1","2","3"};
		  }
		  assert(args[1] == "2");

		assert (y == 3); 
		b = false;
		new Test_Static().test();
		new Test_Static().b ^= true;
		System.out.println(bytearray[2]);
		
		new Test_Static().bytearray[--y]++;
		
		
		System.out.println(bytearray[2]);
		assert(bytearray[2] == -128);

		int p = 0;
		getByteArray()[p++] += (byte) ++p;
		System.out.println((new Test_Static()).getByteArray()[2]++);
		System.out.println((new Test_Static()).getByteArray()[2]);
		
		byte bb = 127;
		bb++;
		System.out.println("bb = " + bb); 
		assert(bb == -128);
		y++; 
		new Test_Static().y++;
		new Test_Static().s += "test1" + c++ + 3 + 5.5f + c + 5.5 + y; 
		assert (s.equals("setFromStaticInitializertest1c35.5d5.54") && b == true);

		int i = 3 + y + (new Test_Static().y++);

		assert (i == 11 && y == 5);
		i += 3 + y + ++(new Test_Static().y); 
		assert (y == 6 && i == 25); 

		Test_Static st = new Test_Static();
		st.y++;
		
		new Test_Static().y--;
		y--;

		String y1 = "0";
		y1 += "test" + c + 3 + 5.5f + c + 5.5;
		assert (y1.equals("0testd35.5d5.5"));
		System.out.println("Test_Static OK");
	}

}

