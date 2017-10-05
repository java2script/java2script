package test;

class Test_Cinit extends Test_ {

	static int a = 0;
	static int i = Test_cinit4.j;
	static Test_cinit4 b = new Test_cinit4(55);
	static int p = 33;

	public Test_Cinit(int j) {
		p = j + 55;
	}

	public static void main(String[] args) {
		System.out.println("i is " + i);
		System.out.println("p is " + p);
		assert (i == 0 && p == 33);
		System.out.println("Test_cint4.j is " + Test_cinit4.j);
		assert (Test_cinit4.j == 0);
		new Test_cinit4(33);
		System.out.println("Test_Cinit OK");

	}

}