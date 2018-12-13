package test;


public class Test_call2 extends Test_call0 {

	String myclass = "Test_call2";
	class Inner3 {
		Inner3() {
			setX(30);
			
		  //Object o = Test_call2.Call0_inner.class;
		}
	
		
	}

	int i4 = -4;

	public void setX(int i) {
		System.out.println("Test_call2.setX " + i);
		x = i;
	}

}