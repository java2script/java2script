package test;


public class Test_call1 extends Test_call {

	int y = 0;
	
	void setX(int x) {
		this.x = x;
	}
	
	void setY(int y) {
		this.y = y;
	}
	
	void setTY(int y) {
		this.y = y;
	}
	
	Test_call1() {
		setX(-1);
		new Inner1();
		System.out.println("Test_call1 " + x + " " + y);
	}
	
	
	class Inner1 extends Test_call2 {
				
		Inner2 t2;


		Inner1() {
			t2 = new Inner2();
			setY(1);
			setTY(100);
			System.out.println("inner1 " + x + " " + y);
		}
		
		
		class Inner2 {
			Inner2 () {
				setX(2);
				setY(2);
				System.out.println("inner2 " + x + " " + y);
			}
		}
	}

	public static void main(String[] args) {
		new Test_call1();
	}


}