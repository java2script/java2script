package test;

public class Test_Ints {

	public Test_Ints(float... floats){
			System.out.println("Test_int(float...) - FAILED");
		};

	public Test_Ints(int... ints){
		System.out.println("Test_int(int...) - PASSED");
	};

	public static void main(String[] args) {
		new Test_Ints();
		new Test_Ints(3,5,6);
		new Test_Ints(3.5f,5.5f,6.5f);
	}
}
