package test;

import java.util.Map;

public class Test_Ints extends Test_ {

	public Test_Ints(float... floats){
			System.out.println("Test_int(float...) - " + (floats[0] != (int) floats[0]));
			assert(floats[0] != (int) floats[0]);
		};

	public Test_Ints(int... ints){
		System.out.println("Test_int(int...) - " + (ints.length == 0 || ints[0] == 3));
		assert(ints.length == 0 || ints[0] == 3);
	};

	private static void test(int i, Integer j, Character c, Integer k, Double d, Float f, Long l, Short s) {
		
	}
	
	private static int CLEAR_BITS = 0b10;
	
	 Map<String, Integer> map;
	
    Map<String, Integer> build() {
    	map.putIfAbsent("test", 0x00);
        return map;
    }
 
    static long[] uia = /** @j2sNative new Uint32Array(1) || */null;

    private static long uint(int i) {
    	/**
    	 * @j2sNative 
    	 * 
    	 * return uia[0] = i, uia[0];
    	 */
		return 0xFFFFFFFFL & i;
	}


	private static int getComponent(final int pixel) {
		final long v = uint(pixel);
		System.out.println((Math.pow(2, 32) - 1));
		System.out.println(0xFFFFFFFFL);
		double f = v / 0xFFFFFFFFL;
		f *= 255; 
		return (int) f;
	}
	private final static int USER = -13;
	private final static int ALT = 16;
	
	public static void main(String[] args) {

		System.out.println(0xffffffffffffffffL);
		
		System.out.println(Integer.MAX_VALUE);
		System.out.println((int) Math.pow(2, 32) - 1);
		System.out.println((int) (Math.pow(2, 32) - 1));
		System.out.println((long) (Math.pow(2, 32) - 1));
		
		System.out.println(getComponent(0));
		System.out.println(getComponent(-1));
		
		int ix = -1;
		// does not work:
		System.out.println(ix & 0xFFFFFFFFL);


		System.out.println((0xFFFFFFFFL
                & ((-1<<24) | ((0xFF & -1)<<16)
                        | ((0xFF & -1)<<8) | (0xFF & -1))));
		
		long[] uint = /** @j2sNative new Uint32Array(1) || */new long[0];
		
		System.out.println(/** @j2sNative 1?(uint[0] = ix, uint[0]) : */ix & 0xFFFFFFFFL);

		long lx = 0x300000005L;
		System.out.println(lx % 0x100000000L);

		System.out.println(lx & 0xFFFFFFFF);
		System.out.println(lx & -1);
		System.out.println(lx & 0xFFFFFFFFL);

		System.out.println((int) lx);
		System.out.println((int) (lx & 0xFFFFFFFF));
		System.out.println((int) (lx & -1));
		System.out.println((int) (lx & 0xFFFFFFFFL));
		
		
		System.out.println(Math.pow(2, 32));
		System.out.println((int) Math.pow(2, 32));
		System.out.println((int) Math.pow(2, 32) - 1);
		System.out.println(1L << 32);
		
		

		int i0b = new Integer(0b010101).intValue();
		assert(i0b == 21);
		new Test_Ints(0b11,0b01);
		test(0b01, 0b0101, 'c', 0x0f,0.5D, 0.2F, 33L, (short) 33);
		test(0b01, new Integer(0b0101), 'b', 0x0f,0.5D, 0.2F, 33L, (short) 33);
		int i3 = new Integer("3");
		int it = +USER;
		new Test_Ints();
		new Test_Ints(3,5,6);
		new Test_Ints(3.5f,5.5f,6.5f);
		int i = 6;
		assert(3/(double) i == 0.5);
		System.out.println("Test_Ints OK");
	}
}
