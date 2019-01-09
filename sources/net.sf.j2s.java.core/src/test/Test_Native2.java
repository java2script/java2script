package test;

class Test_Native2 extends Test_ {

	public static void main(String[] args) {

		if (/** @j2sNative true || */ false)
			System.out.println("OK");
		
//		if (true ||false) System.out.println$S("OK");

		
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

