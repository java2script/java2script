package test;

class Test_Precision {
	
  public static void main(String[] args) {
	  System.out.println("Test_Precision OK (no asserts excecuted)");
  }

	private static void test(double value, int prec) {
	  
	  System.out.println(value + " prec=" + prec + " "
	  + String.format("%1." + prec + "f", value)  + " " 
	  + String.format("%1." + prec + "g", value)  + " " 
	  + String.format("%1." + prec + "e", value)  + " " 
	  	  	);
		}
		
		static {
			double d = 1234.56789356789; 
			for (int i = -10; i < 10; i++) {
				System.out.println("----");
				test2(d * Math.pow(10, i));
		  }
			d = 1.5; 
			for (int i = -10; i < 10; i++) {
				System.out.println("----");
				test2(d * Math.pow(10, i));
		  }
			d = 2.5; 
			for (int i = -10; i < 10; i++) {
				System.out.println("----");
				test2(d * Math.pow(10, i));
		  }
			d = 1; 
			for (int i = -10; i < 10; i++) {
				System.out.println("----");
				test2(d * Math.pow(10, i));
		  }
			d = 100; 
			for (int i = -10; i < 10; i++) {
				System.out.println("----");
				test2(d * Math.pow(10, i));
		  }
			d = 100.34567891234; 
			for (int i = -10; i < 10; i++) {
				System.out.println("----");
				test2(d * Math.pow(10, i));
		  }
			d = 4.95; 
			for (int i = -10; i < 10; i++) {
				System.out.println("----");
				test2(d * Math.pow(10, i));
		  }
			d = 4.5; 
			for (int i = -10; i < 10; i++) {
				System.out.println("----");
				test2(d * Math.pow(10, i));
		  }
			d = 3.95; 
			for (int i = -10; i < 10; i++) {
				System.out.println("----");
				test2(d * Math.pow(10, i));
		  }
			d = 3.5; 
			for (int i = -10; i < 10; i++) {
				System.out.println("----");
				test2(d * Math.pow(10, i));
		  }
			d = 12345; 
			for (int i = -10; i < 10; i++) {
				System.out.println("----");
				test2(d * Math.pow(10, i));
		  }
			System.out.println("{"+String.format("%.3f", 36f)+"}");
			System.out.println("----");
			
		}

		private static void test2(double d) {
			for (int i = 0; i < 10; i++)
			test(d , i);
		}	

}