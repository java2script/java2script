package test;

import java.awt.event.InputEvent;

class Test_Native2 extends Test_ {

	public static void main(String[] args) {

		
				
		if (/** @j2sNative true || */ false)
			System.out.println("OK");
		
//		if (true ||false) System.out.println$S("OK");

		System.out.println(("JSFP setting currentfocusnode " + (/** @j2sNative "testing " ||*/0)));
		System.out.println(("JSFP setting currentfocusnode " + (/** @j2sNative "testing " ||*/null)));


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

