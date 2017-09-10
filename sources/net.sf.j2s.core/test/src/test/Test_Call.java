package test;


public class Test_Call extends Test_call0 {

	int y = 0;
	
	void setX(int x) {
		this.x = x;
	}
	
	void setY(int y) {
		this.y = y;
	}
	
	private void setTY(int y) {
		this.y = y;
	}
	
	Test_Call() {
		setX(-1);
		new Inner1();
		System.out.println("Test_Call " + (x == -1 && y == 100));
	}
	
	
	class Inner1 extends Test_call2 {
				
		Inner2 t2;


		@SuppressWarnings("synthetic-access")
		Inner1() {
			t2 = new Inner2();
			setY(1);
			setTY(100);
			System.out.println("inner1 " + (x == 2 && y == 1));
		}
		
		
		class Inner2 {
			Inner2 () {
				setX(2);
				setY(2);
				System.out.println("inner2 " + (x == 2 && y == 2));
			}
		}
	}

	public static void main(String[] args) {
		new Test_Call();
	}


}