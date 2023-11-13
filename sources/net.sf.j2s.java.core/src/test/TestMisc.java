package test;

class TestMisc {

	static int i = 1;
	final static int fi = 2;
	final static String fs = "testaldkjfa;lf;aldkjf;aldfjdalfjdakdsa"
			+ "adfljdsalfjdsalsjfaljdflajdfldsadsakjfldsjflsajfldsajflds"
			+ "asfdlkjasflkdsjafldsakjflksajfsladkjflasjdflsdajfldsajfsadlfajds"
			+ "";
	final static float ff = 2;
	final static double fd = 3;
	final static char fc = 'c';
	final static boolean fb = true;
	final static int fiI = Integer.valueOf(3); // incorrectly not unboxed in Legacy

	final static int ffi = 2, ffj = 3, ffk = 4;

	final static Integer fI = Integer.valueOf(3);

	static String s = "test";
	static float f = 2;
	static double d = 4;
	static char c = 'c';
	static boolean b = true;

	public void test() {
		String s = fs;
		String talso = fs;
		int ii = i;
		int ifi = fi;
		int thisi = this.fI;

	}

}