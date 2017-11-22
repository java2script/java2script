package test;


public abstract class Test_Abstract extends Test_ {

	final static String a = "astring";
	static String b = "bstring";
	
	static class Test_Abstract_a {
	
		void testing() {
		System.out.println("XX" + a);
		}
	}
	 
	
	Test_Abstract c = new Test_Abstract() {
		void test() {
			;
		}
		
	};
	
	public static void main(String[] args) {
		Test_Abstract_a x = new Test_Abstract_a();
	}

}