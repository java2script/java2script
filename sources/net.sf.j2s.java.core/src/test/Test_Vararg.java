package test;

import java.util.Arrays;
import java.util.List;

@SuppressWarnings("unused")
class Test_Vararg extends Test_ {

	Test_Vararg(float... a) {
		System.out.println("Test_Vararg float... " + (a.length > 0 ? a[0] : null));
		assert((a.length > 0 ? a[0] : 1) == 2);
	}

	Test_Vararg(int... a) {
		System.out.println("Test_Vararg int... " + (a.length > 0 ? a[0] : null));
		assert((a.length > 0 ? a[0] : 1) == 1);
	}

	private void testVar(String s, int i) {
		System.out.println("testVar i=" + i + " " + s);
		assert(s.equals("int"));
	}

	private void testVarI(String s, int... a) {
		System.out.println("testVar inta len=" + a.length + " " + s);
		assert(s.equals("int[]") && (a.length < 2));		

	}

	private void testVar(String s, float... a) {
		System.out.println("testVar floata float... len=" + a.length + " " + s);
	}

	private void testVarII(String s, int[]... aa) {
		System.out.println("testVar int[][] len=" + aa.length + " " + s);
		assert(s.equals("int[][]"));		
	}

	private void testVarO(String s, Object[]... aa) {
		System.out.println("testVar Object[] len=" + aa.length + " " + s);
		assert(s.equals("Object[]"));		
	}

	private void testVarN(String s, Number... aa) {
		System.out.println("testVar Number len=" + aa.length + " " + s);
		assert(s.equals("Number"));		
	}

	private void testVarD(String s, double... aa) {
		System.out.println("testVar Double len=" + aa.length + " " + s);
		assert(s.equals("Double"));		
	}


	public static void main(String[] args) {

		Test_Vararg t = new Test_Vararg();
		Test_Vararg t1 = new Test_Vararg(1);
		Test_Vararg t21 = new Test_Vararg(1, 1);
		Test_Vararg t1f = new Test_Vararg(2f);
		t21.testVar("int", 1);
		t21.testVarI("int[]", 2);
		t21.testVarI("int[]", new int[] {1});
		t21.testVarI("int[]");
		t21.testVarII("int[][]", new int[] {1});
		t21.testVarII("int[][]", new int[] {2}, new int[] {1});
		t21.testVarII("int[][]");
		t21.testVarO("Object[]", new Object[] {"1", "2", "3"});
		t21.testVarO("Object[]", new Object[] {} , new Object[] {});

		t21.testVarN("Number", new Integer(3));
		t21.testVarN("Number", new Integer[] {null, null, null});
		t21.testVarD("Double", 1.0,2,3);

		List<Class<? extends Test_>> x = Arrays.<Class<? extends Test_>>asList(Test_.class);

		System.out.println("Test_Vararg OK");

		
//		try {
//		t21.testVar("int[]", null);
//		} catch (NullPointerException e) {
//			System.out.println("ok - npe");
//		}

	}

}