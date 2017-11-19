package test;

public class Test_Bytecode extends Test_ {

	int x;
	double y = 4.4;

	void setX(int x) {
		System.out.println("BC_setX(int) " + x);
		assert(x == 3);
		this.x = x;
	}
	
	void setX(double x) {
		System.out.println("BC_setX(double) " + x);
		assert(x == 1.1 || x == 4.4);
		// in SwingJS this next call causes an infinite loop
		//setX((int) x);
	}
	

	void setX(Double x) {
		System.out.println("BC_setX(Number) " + x);
		assert(x == 33);
		// note that in JavaScript, the above construction uses "valueOf" not "toString" for x.
		// this results in reporting "3" for new Double(3.0) instead of "3.0"
	}
	

	public Test_Bytecode() {
		setX(y); 
//	BC_setX(double) 4.4
//	BC_setX(int) 4

		// Note that "this.y" is from THIS class, even if we are being called by super()
		// and the subclass also has a "this.y"
		// SwingJS handles this appropriately.
			
	}

	public static void main(String[] args) {
		Test_Bytecode t = new Test_Bytecode();
		t.setX(3);
//    10  invokevirtual test.Test_Bytecode.setX(int) : void [51]
//	BC_setX(int) 3

		t.setX(1.1);
		
		System.out.println("Test_Bytecode OK");
		
//	BC_setX(double) 1.1
//	BC_setX(int) 1

//	  // Method descriptor #63 ([Ljava/lang/String;)V
//	  // Stack: 3, Locals: 2
//	  public static void main(java.lang.String[] args);
//	     0  new test.Test_Bytecode [1]
//	     3  dup
//	     4  invokespecial test.Test_Bytecode() [64]
//	     7  astore_1 [t]
//	     8  aload_1 [t]
//	     9  iconst_3
//	    10  invokevirtual test.Test_Bytecode.setX(int) : void [51]
//	    13  aload_1 [t]
//	    14  ldc2_w <Double 1.1> [65]
//	    17  invokevirtual test.Test_Bytecode.setX(double) : void [60]
//	    20  return

	}
	
}