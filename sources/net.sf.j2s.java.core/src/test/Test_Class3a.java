package test;

class Test_Class3a extends Test_Class4 {

	// extends a class
	
//	Test_Class4 static init 
//	Test_Class3a static init 
//	Test_Class3a main 
//	Test_Class4 nonstatic init 
//	Test_Class4 constr 
//	Test_Class3a nonstatic init 
//	Test_Class3a constr 
	
	static  {
		System.out.println("Test_Class3a static init ");
	}


//	static Test_Class4 cl4 = new Test_Class4();
	 {
		System.out.println("Test_Class3a nonstatic init 4 3a 3a 4 4 3a 3a");
	}

	public Test_Class3a() {
		System.out.println("Test_Class3a constr ");
	}

	public static void main(String[] args) {
		System.out.println("Test_Class3a main ");
		new Test_Class3a();
	}

}
