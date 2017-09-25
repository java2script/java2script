package test;

class Test_Cast extends Test_ {

	private static void say(char c, String type, int val) {
		System.out.println("testing char " + type + " " +  c + " " + val);
		assert(type == "char" && c == val);
	}


	private static void say(Character c, String type, int val) {
		System.out.println("testing char " + type + " " +  c + " " + val);
		assert(type == "Character" && c== val);
	}

	private static void say(byte b, String type, int val) {
		System.out.println("byte " + type + " " +  b + " " + val);
		assert(type == "byte" && b == val);
	}

	private static void say(short b, String type, int val) {
		System.out.println("short " + type + " " +  b + " " + val);
		assert(type == "short" && b == val);
	}

	private static void say(int b, String type, int val) {
		System.out.println("int " + type + " " +  b + " " + val);
		assert(type == "int" && b == val);
	}

	private static void say(long b, String type, long val) {
		System.out.println("long " + type + " " +  b + " " + val);
		assert(type == "long" && b == val);

	}

	public int f() { return new Character('c'); };
	
	public static void main(String[] args) {
		
		int i300 = 300;
		
		say(i300 > 1000 ? (byte) 333: new Character('C') , "int", 67);  // int
		
		
		System.out.println("'K'=" + (char) 75 + " Character('K')=" + new Character('K'));
		say((char) 75, "char", 'K');
		say(new Character('K'), "Character", 'K');
		say((byte) 75, "byte", 75);
		say((short) 75, "short", 75);

		byte b300 = (byte) 300;
		byte b100 = (byte) 100;
		short s300 = (short) 300;
		short s100 = (short) 100;

		// int char --> char
		// char int --> char
		// byte int --> byte
		// int byte --> byte
		// byte long --> long
	    // byte Character --> int ??? 
		

		assert(i300 == 300 && true);
		
		int i100 = 100;
		long l100 = 100;
		long l300 = 300;

		
		assert (b300 == (byte) i300);
		boolean t = true;
		boolean f = false;
		assert (t ^ f);
		assert (t | f);

		// byte
		say(b300++, "byte", (byte) 44);

		
		// note that Java supports |, ^, $, << only for int and long, not byte or short
		// all of these are int:
		char c = 'c';
		say(++c, "char", 'd');
		say(b300 | i300, "int", 301);
		say(b300 ^ i300, "int", 257);
		say(i300 ^ i100, "int", 328);
		say(i300 | i100, "int", 364);
		say(b300 | b100, "int", 109);
		say(s300 | s100, "int", 364);
		int shift = 1;
		say(b300 << shift, "int", 90);
		say(s300 << shift, "int", 600);
		say(-2 >> shift, "int", -1);
		say(-2 >>> shift, "int", 2147483647); 
		
		long l1 = 1;
		
		say(Integer.MAX_VALUE, "int", 2147483647);
		// long
		say(l300 | l100, "long", 364);		
		say(Integer.MAX_VALUE + l1, "long", 2147483648L);
//		say(-2l >>> shift, "long", 9223372036854775807L); // fails

		System.out.println("Test_Cast OK");

	}

}