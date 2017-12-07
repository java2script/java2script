package test;

public class Test_Call extends Test_call0 implements Comparable<Test_Call>{

	int y = 0;

	private transient Integer icall = null;
	

	void init() {
		assert(this instanceof Test_call0);
		assert(this instanceof Comparable);
		
		icall = new Integer(3);		
	}
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
		assert(x == -1 && y == 100);
	}
	
	
	class Inner1 extends Test_call2 {
				
		Inner2 t2;


		@SuppressWarnings("synthetic-access")
		Inner1() {
			t2 = new Inner2();
			setY(1);
			setTY(100);
			assert(x == 2 && y == 1);
		}
		
		
		class Inner2 {
			Inner2 () {
				setX(2);
				setY(2);
				assert(x == 2 && y == 2);
			}
		}
	}

	public static void main(String[] args) {
		new Test_Call();
		System.out.println("Test_Call OK");
	}
	@Override
	public int compareTo(Test_Call o) {
		// TODO Auto-generated method stub
		return 0;
	}


}