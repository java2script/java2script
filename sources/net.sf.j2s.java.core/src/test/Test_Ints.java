package test;

public class Test_Ints extends Test_ {

	public Test_Ints(float... floats){
			System.out.println("Test_int(float...) - " + (floats[0] != (int) floats[0]));
			assert(floats[0] != (int) floats[0]);
		};

	public Test_Ints(int... ints){
		System.out.println("Test_int(int...) - " + (ints.length == 0 || ints[0] == 3));
		assert(ints.length == 0 || ints[0] == 3);
	};

	public static void main(String[] args) {
		int i3 = new Integer("3");
		new Test_Ints();
		new Test_Ints(3,5,6);
		new Test_Ints(3.5f,5.5f,6.5f);
		int i = 6;
		assert(3/(double) i == 0.5);
		System.out.println("Test_Ints OK");
	}
}
