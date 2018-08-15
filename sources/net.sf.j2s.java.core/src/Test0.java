import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;

class Test0 {

	class Test0a extends Test0  {
		Test0a() {
			System.out.println("Test0.Test0a");
		}
	}
	static class Exc extends NullPointerException {

		static class Exc1 {
			String finals = "finals1";

			void test(boolean b) {

			}
		}

		void test(String s, boolean b) {

		  class Exc2 extends NullPointerException {

				Exc2() {
					System.out.println("Test0.Exc2");
				}

				class Exc3 extends Exc2 {
					Exc3() {
						System.out.println("Test0.Exc2.Exc3");
					}
				}

			}


			
		}
	}

	static boolean j2sHeadless = true;

	public static void main(String[] args) {

		String f = "1";

		class exc2 extends Exc.Exc1 {
			String finals = "finalsEx2";

			class Exc3 {
				Exc3() {
					
					System.out.println(finals);

				}
			}

			void test() {
				System.out.println(f);
			}
		}

		System.out.println("hello from Test0");

		String.valueOf("test");

		new Test0_Applet().init();
		System.out.println(Test0_Applet.staticVar);

		Object o = Thread.currentThread();
		Object oo = Thread.class;
		Object ooo = Thread.State.class;
		StringReader rdr = null;
		try (BufferedReader br = new BufferedReader(rdr)) {

		} catch (java.io.IOException | NullPointerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}