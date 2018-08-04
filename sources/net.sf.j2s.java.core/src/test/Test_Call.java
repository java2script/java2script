package test;

public class Test_Call extends Test_call0 implements Comparable<Test_Call>{

	String myclass = "Test_Call";

	int y = 0;

	int testing1;
	int testing2 = 3;
	
	int i4 = 4;
	
	@Override
	void checkTesting(int pass) {
		System.out.println("testing:" + testing1 + " " + testing2);
		assert(testing2 == (pass == 1 ? 0 : 3));
		if (pass == 1)
			testing2 = 2;
	}

	
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
		super();
		checkTesting(2);
		setX(-1);
		Inner1 i1 = new Inner1();
		System.out.println(myclass);
		assert(x == -1 && y == 100);
	}
	
	
	class Inner1 extends Test_call2 {
				
		Inner2 t2;


		@SuppressWarnings("synthetic-access") 
		Inner1() {
			System.out.println(this);
			t2 = new Inner2();
			System.out.println("Inner1 i4=" + i4);
			// t2 initializer will set the x and y values for the Inner1 instance
			setY(1);    // call0 -- this instance
			setTY(100); // Call -- not this instance
			System.out.println("Inner1 " + myclass);
			
			assert(x == 4 && y == 1);
		}
		
		
		class Inner2 {
			Inner2 () {
				System.out.println(this);
				System.out.println("Inner2 i4=" + i4);
				setX(4);  // call2 -- instance of Inner1
				setY(4);  // call0 -- instance of Inner1
				setTY(40);// Call -- not this instance
				System.out.println("t2 x is " + x);
				System.out.println("Inner2 " + myclass);
				assert(x == 4 && y == 4);
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