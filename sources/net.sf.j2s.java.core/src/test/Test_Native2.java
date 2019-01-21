package test;

class Test_Native2 extends Test_ {

	public static void main(String[] args) {

		System.out.println("JSFP1 " + (/** @j2sNative  "OK" || */""));
			
				
		if (/** @j2sNative true || */ false)
			System.out.println("OK");
	
//		if (true ||false) System.out.println$S("OK");

		System.out.println((/** @j2sNative "OK " ||*/0)); // OK
		System.out.println(/** @j2sNative "OK " ||*/0);
		System.out.println(("JSFP2 " + ((/** @j2sNative "OK " ||*/"here1"))));
		System.out.println(("JSFP3 " + /** @j2sNative "OK " ||*/"here2"));
		System.out.println(("JSFP4 " + (/** @j2sNative "OK " ||*/"a")));
		System.out.println(("JSFP4 " + (/** @j2sNative "OK " ||*/0)));
		System.out.println(("JSFP6 " + (/** @j2sNative "OK " ||*/null)));
		System.out.println(("testing7 " + (/** @j2sNative "OK " ||*/null)));
		System.out.println(((/** @j2sNative "OK " ||*/null) + "testing "));


		boolean b = !(/** @j2sNative true || */false);
		
//		var b=!(true ||false);

		
		assert(!b);
		b = !(/** @j2sNative true || */false);

//		b=!(true ||false);
		
		int c; 
		
		c = ~(/** @j2sNative 1|| */0);
		
//		c=~(1||0);
	
		
	}
		
} 

