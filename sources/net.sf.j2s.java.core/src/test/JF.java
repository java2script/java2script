package test;
public class JF
  {
	public static void main(String[] args) {

		try {
			System.out.println("HelloWorld!");
			Object o = new Object();
			System.out.println("....");
			for (int i = 0; i < 10; i++) {
				o.wait(5000);
				System.out.println("OK");
			}
		} catch (Exception e) {
		}

	}
  }
