package test;


public abstract class Test_Inner extends Test_ {

	final static String a = "a string";
	static String b = "bstring"; 
	
	static class Test_Abstract_a {
	
		void testing() {
			System.out.println("this is " + a);
			assert (a == "a string");
		}
	}
	 
	
	Test_Inner c = new Test_Inner() {
		void test() {
		}
		
	};
	
	public static void main(String[] args) {
		Test_Abstract_a x = new Test_Abstract_a();
		x.testing();
		System.out.println("Test_Inner OK");
	}

}