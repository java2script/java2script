package test;

/**
 * 
 * @j2sPrefix
 *   /-* this is from <@>j2sPrefix *-/
 *   
 * 
 * @j2sSuffix
 *   /-* this is from <@>j2sSuffix *-/
 */
public class Test_5 extends Test_6 {

	public Test_5 this2;
	
	public String a = "test_5_a";

	public String[] d = {"1", "2"};

	//private StringBuffer buffer = new StringBuffer();

	public Test_5() {
		
	}
	public Test_5(int... ints) {
		
	}
	public Test_5(int i) {
		this("s" + i);
		System.out.println("test5.construct " + i);
	}
	
	public Test_5(Float n) {
		this("sN" + n);
		System.out.println("Test5 Float n done");

	}
	
	

	public Test_5(String s) {
		System.out.println("test5.construct " + s);
		myfunc(s);
		this2 = this;
		this.myfunc(s + "test_5 constructor calling this.myfunc");
		this2.myfunc(s + "test_5 constructor calling this2.myfunc");
		
		System.out.println("calling x_1 from Test_5 constructor");
		x_1();
		
	}
	 
	public Test_5(String s, String t) {
		System.out.println("test5.construct " + s + " and " + t);
		myfunc(s);
		
	}

	protected void myfunc(String s) {
		System.out.println("test5.myfunc " + s);
		myfunc2(s);
		myfunc3();
		this.myfunc4();
	}

	protected void myfunc2(String s) {
		// never called
		System.out.println("test5.myfunc2 " + s);
	}
		
	protected void myfunc3() {
		test8b();
		System.out.println("test5.myfunc3 this2 == this? " + this2 + (this2 == this));
		if (this2 == null)
			return;
		System.out.println("test5.myfunc3 this2.a=" + this2.a);
		System.out.println("test5.myfunc3 this.a=" + a);
	}
	
	private void myfunc4() {
		System.out.println("test5.myfunc4 this2 == this? " + (this2 == this));
		if (this2 == null)
			return;
		System.out.println("test5.myfunc4 this2.a=" + this2.a);
		System.out.println("test5.myfunc4 this.a=" + a);
	}

	protected void myfunc(Float x) {
		System.out.println("test5.myfunct Float " + x);
	}

	public void testing() {
		Test_5 t = this;
		t.testing1();
	}


	
	private void testing1() {
		System.out.println("test5.testing1");
	}

	
	public class Test_5_inner {

		int testing_inner = 0;
		
		public Test_5_inner() {
			System.out.println("??");
		}
		public Test_5_inner(int a) {
			System.out.println("Test_5_inner construct int a = " + a);
			//j2sLog("OK");
			//System.out.println(buffer);
		}
		
		public Test_5_inner(float b) {
			System.out.println("Test_5_inner construct float b = " + b);
		}

	}
	
    public void x_2b() {
    	/**
    	 * 
    	 * @j2sNative
    	 * 
    	 *   /-* comment *-/  
    	 * 
    	 */
    	{}
		System.out.println("calling x_1 from Test_5.x_2b");
		x_1();
    }

    public static void main(String[] args) {
		Test_5 t5 = new Test_5(3f);
		t5.new Test_5_inner(3);
		t5.x_2b();
		t5.x_2();
		final String finalString = "final" + new Integer(3);
		System.out.println("???");
		new Test_6(36) {
		    public void x_2() {
				System.out.println("t6b.x_2 in Test_5 anonymous finalString=" + finalString);
				System.out.println("calling Test6.x_2 from anonymous Test_6 using super.x_2()");
				super.x_2();
		    }

		};
	}

	public void x_1() {
		System.out.println("x_1 in  Test_5");
	}


}
