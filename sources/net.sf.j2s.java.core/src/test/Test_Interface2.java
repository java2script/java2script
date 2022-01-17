package test;

public class Test_Interface2 extends Test_ implements Test_Interface {

	static int x = 5;

	public static class I0 implements Test_Interface {
		
	}

	public static class I1 implements Test_Interface1 {
		
	}

	public int isTestInterface() {return 2;}
	
	public static void main(String[] args) {
		
		System.out.println("in the interface " + x + " " + y + " " + s.length);
		assert("5 y".equals(x + " " + y));
		System.out.println("in the interface " + Test_Interface3.doTest(3));
		assert(Test_Interface3.doTest(3) == 4);

		// test of public default override
		assert(new Test_Interface2().isTestInterface() == 2);
		System.out.println("testing access to default methods values");
		assert(new I0().isTestInterface() == -1);
		assert(new I1().isTestInterface() == 1);

		System.out.println("Test_Interface2 OK");
	}

	interface api {
		default void _api() {
			
		}
		interface js {
			default void _api_js() {
				
			}
			void check();
			interface js1 {
				default void _api_js_js1() {
					
				}
				
			}
			
			class jsc {
				
				void _api_js_jsc() {};
				
			}
		}
	}

}