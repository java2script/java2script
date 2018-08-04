package test;

	public class Test_Equals extends Test_ {

	public static void main(String[] args) {
		
		String s = "testing" + Double.valueOf(3);
		assert(s.equals("testing3.0"));
		assert(s != "testing3.0");
		
		System.out.println("Test_Equals OK");
	}
}