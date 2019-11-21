package test;

class Test_Static1 extends Test_ {

	public static class InnerStatic {

//		public InnerStatic() {
//		System.out.println("innerStatic initializer");
//		}
		

		public void test(String...strings) {
			
		}

	}

	public static void main(String[] args) { 

		new Test_Static1.InnerStatic();
	}


}

