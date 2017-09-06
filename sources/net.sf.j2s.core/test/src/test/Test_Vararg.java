package test;

@SuppressWarnings("unused")
class Test_Vararg {

	Test_Vararg(float... a) {
		System.out.println("Test_Vararg float... " + (a.length > 0 ? a[0] : null));
	}

	Test_Vararg(int... a) {
		System.out.println("Test_Vararg int... " + (a.length > 0 ? a[0] : null));
	}

	private void testVar(String s, int i) {
		System.out.println("testVar i=" + i + " " + s);
	}

	private void testVar(String s, int... a) {
		System.out.println("testVar len=" + a.length + " " + s);
	}

	private void testVar(String s, float... a) {
		System.out.println("testVar float... len=" + a.length + " " + s);
	}

	private void testVar2(String s, int[]... aa) {
		System.out.println("testVar len=" + aa.length + " " + s);
	}

	private void testVar3(String s, Object[]... aa) {
		System.out.println("testVar len=" + aa.length + " " + s);
	}

	public static void main(String[] args) {

		Test_Vararg t = new Test_Vararg();
		Test_Vararg t1 = new Test_Vararg(1);
		Test_Vararg t21 = new Test_Vararg(2, 1);
		t21.testVar("int", 1);
		t21.testVar("int[]", 2, 1);
		t21.testVar("int[]");
		t21.testVar2("int[][]", new int[] {1});
		t21.testVar2("int[][]", new int[] {2}, new int[] {1});
		t21.testVar2("int[][]");
		t21.testVar3("Object[]", new Object[] {"1", "2", "3"});
		t21.testVar3("Object[]", new Object[] {} , new Object[] {});
//		try {
//		t21.testVar("int[]", null);
//		} catch (NullPointerException e) {
//			System.out.println("ok - npe");
//		}

	}

}