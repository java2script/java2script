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
    
	private final static int USER = -13;
	private final static int ALT = 16;
	
	public static void main(String[] args) {
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
