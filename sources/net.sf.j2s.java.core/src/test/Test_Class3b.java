package test;

class Test_Class3b extends Test_ {

//	Test_Class5 static init 
//	Test_Class3b static init 
//	Test_Class3b main 
//	Test_Class3b nonstatic init 
//	Test_Class3b constr 
	
	static String test5 = Test_Class5.test5;
	static  {
		System.out.println("Test_Class3b static init ");
	}


//	static Test_Class4 cl4 = new Test_Class4();
	 {
		System.out.println("Test_Class3b nonstatic init 5 3b 3b 3b 3b");
	}

	public Test_Class3b() {
		System.out.println("Test_Class3b constr ");
	}

	public static void main(String[] args) {
		System.out.println("Test_Class3b main ");
		new Test_Class3b();
	}

}
