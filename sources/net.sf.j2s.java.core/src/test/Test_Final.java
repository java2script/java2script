package test;

public class Test_Final extends Test_ {

	// This one should not be removed
	public static final Object UNINITIALIZED_VALUE = "uninitializedValue";

	public String finalStr2 = "?";
	public static int TEST = 0;
	public Test_Final(int i) {
		String finalStr = "testing" + TEST++;
		finalStr2 += "?";
		Test_Extends_8 t = new Test_Extends_8() {
			public void test8() {
				System.out.println("anon Test_8 finalStr is " + finalStr + " " + finalStr2);
				assert(finalStr.equals("testing" + i) && finalStr2.equals("??"));
			}
		};
		t.test8();
	}

	public static void main(String[] args) {
		ClassLoader.getSystemClassLoader().setClassAssertionStatus("test.Test_Final$1", true);
		new Test_Final(0); // anon Test_8 finalStr is 0 ??
		new Test_Final(1); // anon Test_8 finalStr is 1 ??
		new Test_Final(2); // anon Test_8 finalStr is 2 ??
		new Test_Final(3); // anon Test_8 finalStr is 3 ??
		new Test_Final(4); // anon Test_8 finalStr is 4 ??
		new Test_Final(5); // anon Test_8 finalStr is 5 ??
		System.out.println("Test_Final OK");
	}
}
