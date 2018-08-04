package test;

class Test_assert2 {
	
	public Test_assert2() {
		boolean assertOn = false;
		assert assertOn = true;

		System.out.println("assert is " + (assertOn ? "enabled" : "disabled"));
		assert assertOn;
	}
	
	
}