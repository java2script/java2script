package test;

public class Test_Final {

	public String finalStr2 = "?";
	public static int TEST = 0;
	public Test_Final() {
		String finalStr = "testing" + TEST++;
		finalStr2 += "?";
		Test_8 t = new Test_8() {
			public void test8b() {
				System.out.println("anon Test_8 finalStr is " + finalStr + " " + finalStr2);
			}
		};
		t.test8b();
	}


	public static void main(String[] args) {
		new Test_Final(); // anon Test_8 finalStr is 0 ??
		new Test_Final(); // anon Test_8 finalStr is 1 ??
		new Test_Final(); // anon Test_8 finalStr is 2 ??
		new Test_Final(); // anon Test_8 finalStr is 3 ??
		new Test_Final(); // anon Test_8 finalStr is 4 ??
		new Test_Final(); // anon Test_8 finalStr is 5 ??
	}
}
