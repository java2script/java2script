package test;

public class Test_Interface2 implements Test_Interface {

	static int x = 5;

	public static void main(String[] args) {
		ClassLoader.getSystemClassLoader().setClassAssertionStatus("test.Test_Interface", true);
		System.out.println("in the interface " + x + " " + y + " " + s.length);
		if (!"5 y".equals(x + " " + y)) 
			throw new AssertionError();
		if (Test_Interface3.doTest(3) != 4)
			throw new AssertionError();
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