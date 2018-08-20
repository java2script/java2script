package test;

public class Test_Extends_8b extends Test_Extends_8 {

	int i0 = -8;
	
	public Test_Extends_8b() {
		super();
		System.out.println("Test_Extend_8b i0 super.i0 " + i0 + " " + super.i0);
		  assert((i0 + " " + super.i0).equals("-8 8"));
	}
	
	{
	  System.out.println("8.1 init");
	}

	{
		//int[] test8 = new int[8];
		System.out.println("8.2 init - prepare fields");
	}


	public void test8(){
		System.out.println("Test_Extends_8.test8()");
		System.out.println(i0 + " " + super.i0);
		  assert((i0 + " " + super.i0).equals("8 8"));
	}


	@Override
	void getSuper0() {
		// TODO Auto-generated method stub
		
	};

//	public Test_8(){
//	  System.out.println("8.3 construct()");
//	};

//	public Test_8(int... ints){
//	  System.out.println("8.3 construct()");
//		// nah, this is not the default constructor
//		System.out.println("constructor 8 [], ...)");
//	};

}
