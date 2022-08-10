package test;

public interface Test_Interface {

	int x = 3;
	String y = "y";
	String[] s = new String[3];

	class Inner extends Test_ {
		String test(String s) {
			return s;
		}
	}

	public static int doTest(int i) {
		return i + 1;
	}

	public interface Test_Interface_inner {
		// This mus be wrapped, or C$ changes definitions
	}

	class Int1 implements Test_inta1 {


		@Override
		public String testInt(Number n) {
			return n.toString();
		}

		public String testInt() {
			return null;
		}
	}
	public static void main(String[] args) {

		String xx = ((Test_inta1)new Int1()).testInt(Integer.valueOf(1));
		if (!"1".equals(xx))
			throw new AssertionError();
		
		
//		ClassLoader.getSystemClassLoader().setClassAssertionStatus("test.Test_Interface", true);

		Inner inner = new Inner();
		System.out.println(inner.test("1") == "1");

		if (!"1".equals(inner.test("1")))
				throw new AssertionError();
		
		System.out.println("in the interface " + x + " " + y);
		if (!("3 y".equals(x + " " + y)))
			throw new AssertionError();
		System.out.println("Test_Interface OK");

	}

    final static Integer myTest = -1;
	
	public default int isTestInterface() {
		return myTest;
	}
}