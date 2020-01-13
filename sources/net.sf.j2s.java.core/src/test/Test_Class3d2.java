package test;

class Test_Class3d2 extends Test_ {

	
	static  {
		System.out.println("Test_Class3d2 static init ");
	}


	 {
		System.out.println("Test_Class3d2 nonstatic init");
	}

	public static void main(String[] args) {
		System.out.println("Test_Class3d2 main ");
		new Test_Class3d();
	}

}
