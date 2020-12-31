package test;

class Test_Cinit2 extends Test_ {

	static int a = 0;
	static int i = Test_cinit5.j;
	static Test_cinit5 b = new Test_cinit5(55, 0);
	static int p = 33;

	public Test_Cinit2(int j) {
		System.out.println("p is " + p + " j is " + j);
		assert(p == j + 110 || p == j);
		p = j + 55;
	}

	public static void main(String[] args) {
		System.out.println(i);
		System.out.println(p);
		assert (i == 0 && p == 143 || p == 33);
		assert (Test_cinit5.j == 0 || Test_cinit5.j == 33);
		Test_cinit5.j = 33;
		new Test_cinit5(88, 33);
		new Test_Cinit2(88);
		System.out.println("Test_Cinit2 OK");
	}

}