package test;

class Test_Class_1 extends Test_ implements Test_Class_int {

	
    //static Test_Class_1 cl0_1 = new Test_Class_1("test-static0_1 <<<<<<<<<<<<<<<<<<<");

	static int cl0_1 = 1;
	
	static {
		System.out.println("Test_Class_1 static init");
	}
	
    {
		System.out.println("Test_Class_1 nonstatic init");
	}
	

	public Test_Class_1(String s) {
		// simple test that static was set prior to instantiation
		assert(cl0_1 == 1);
    	System.out.println("Test_Class_1(s) " + s + " " + cl0_1);// + cl1);
    	System.out.println("Test_Class_1 OK");
    }
    
    public static void main(String[] args) {
    	new Test_Class_1("main");
    }

	@Override
	public void testClassInt(int i) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void testClassLong(long i) {
		// TODO Auto-generated method stub
		
	}
}
