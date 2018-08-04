package test;

public class Test_Extends extends Test_Extends_6 {

	public Test_Extends this2;
	
	public String a = "test_6_a";

	public String[] d = {"1", "2"};

	public String[][] d2 = {{"1", "2"}, {"3", "4"}};

	//private StringBuffer buffer = new StringBuffer();

	public Test_Extends() {
		
	}
	public Test_Extends(int... ints) {
		
	}
	public Test_Extends(int i) {
		this("s" + i);
		System.out.println("test_extends.construct " + i);
	}
	
	public Test_Extends(Float n) {
		this("sN" + n);
		System.out.println("Test_extends Float n done");

	}
	
	

	public Test_Extends(String s) {
		System.out.println("test_extends.construct " + s);
		myfunc(s);
		this2 = this;
		this.myfunc(s + "test_extends constructor calling this.myfunc");
		this2.myfunc(s + "test_extends constructor calling this2.myfunc");
		
		System.out.println("calling x_1 from test_extends constructor");
		x_1();
		
	}
	 
	public Test_Extends(String s, String t) {
		System.out.println("test_extends.construct " + s + " and " + t);
		myfunc(s);
		
	}

	protected void myfunc(String s) {
		System.out.println("test_extends.myfunc " + s);
		myfunc2(s);
		myfunc3();
		this.myfunc4();
	}

	protected void myfunc2(String s) {
		// never called
		System.out.println("test_extends.myfunc2 " + s);
	}
		
	protected void myfunc3() {
		test8();
		System.out.println("test_extends.myfunc3 this2 == this? " + this2 + (this2 == this));
		if (this2 == null)
			return;
		System.out.println("test_extends.myfunc3 this2.a=" + this2.a);
		System.out.println("test_extends.myfunc3 this.a=" + a);
	}
	
	private void myfunc4() {
		System.out.println("test_extends.myfunc4 this2 == this? " + (this2 == this));
		if (this2 == null)
			return;
		System.out.println("test_extends.myfunc4 this2.a=" + this2.a);
		System.out.println("test_extends.myfunc4 this.a=" + a);
	}

	protected void myfunc(Float x) {
		System.out.println("test_extends.myfunct Float " + x);
	}

	public void testing() {
		Test_Extends t = this;
		t.testing1();
	}


	
	private void testing1() {
		System.out.println("test_extends.testing1");
	}

	
	public class test_extends_inner {

		int testing_inner = 0;
		
		public test_extends_inner() {
			System.out.println("??");
		}
		public test_extends_inner(int a) {
			System.out.println("test_extends_inner construct int a = " + a);
			//j2sLog("OK");
			//System.out.println(buffer);
		}
		
		public test_extends_inner(float b) {
			System.out.println("test_extends_inner construct float b = " + b);
		}

	}
	
    public void x_2b() {
		System.out.println("calling x_1 from test_extends.x_2b");
		x_1();
    }

    public static void main(String[] args) {
		Test_Extends t5 = new Test_Extends(3f);
		t5.new test_extends_inner(3);
		t5.x_2b();
		t5.x_2();
		final String finalString = "final" + new Integer(3);
		System.out.println("???");
		new Test_Extends_6(36) {
		    public void x_2() {
				System.out.println("t6b.x_2 in test_extends anonymous finalString=" + finalString);
				System.out.println("calling Test6.x_2 from anonymous Test_6 using super.x_2()");
				super.x_2();
		    }
		    
		    public void x_1() {
		    	System.out.println("test_Extends anon Test_6 x_1");
		    }

		};
	}

	public void x_1() {
		System.out.println("x_1 in  test_extends");
	}


}
