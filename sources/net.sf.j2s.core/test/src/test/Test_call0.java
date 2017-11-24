package test;

public class Test_call0 extends Test_ {

	int x, y;

	void init(){
		// only in Test_Call
	}
	void setX(int x) {
		this.x = x;
	}
	
	void setY(int y) {
		this.y = y;
	}
	

	public String toString() {
		return "test_call " + x + " " + y;
	}

	public Test_call0() {
		init();
	};
	
	class Call0_inner {
		
	}

}