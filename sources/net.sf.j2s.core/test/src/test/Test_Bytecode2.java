package test;

public class Test_Bytecode2 extends Test_Bytecode {

	int x;
	double y = 5.5;

	void setX(Number x) {
		System.out.println("BC2_setX(Number) " + x);
		// note that in JavaScript, the above construction uses "valueOf" not "toString" for x.
		// this results in reporting "3" for new Double(3.0) instead of "3.0"
	}
	
	void setX(Double x) {
		System.out.println("BC2_setX(Double) " + x);
	}
	
//  // Method descriptor #51 (Ljava/lang/Double;)V
//  // Stack: 4, Locals: 2
//  void setX(java.lang.Double x);
//     0  getstatic java.lang.System.out : java.io.PrintStream [24]
//     3  new java.lang.StringBuilder [30]
//     6  dup
//     7  ldc <String "BC1_setX(Double) "> [52]
//     9  invokespecial java.lang.StringBuilder(java.lang.String) [34]
//    12  aload_1 [x]
//    13  invokevirtual java.lang.StringBuilder.append(java.lang.Object) : java.lang.StringBuilder [37]
//    16  invokevirtual java.lang.StringBuilder.toString() : java.lang.String [41]
//    19  invokevirtual java.io.PrintStream.println(java.lang.String) : void [45]
//    22  return

	public static void main(String[] args) {
		
		Test_Bytecode2 t = new Test_Bytecode2();
//  4  invokespecial test.Test_Bytecode2() [57]
//	var t =  new test.Test_Bytecode2 ();
		
		t.setX(new Integer(3));
	// 14  invokespecial java.lang.Integer(int) [60]
	// 17  invokevirtual test.Test_Bytecode2.setX(java.lang.Number) : void [63]
//	t.setX ( new Integer (3));

		t.setX(new Double(3));
	// 28  invokespecial java.lang.Double(double) [69]
	// 31  invokevirtual test.Test_Bytecode2.setX(java.lang.Double) : void [72]
//	t.setX ( new Double (3));

		t.setX((Number) new Double(3));
//    42  invokespecial java.lang.Double(double) [69]
//    45  invokevirtual test.Test_Bytecode2.setX(java.lang.Number) : void [63]
//		t.setX ( new Double (3)); // SWINGJS FAILURE!

		
		Test_Bytecode t0 = new Test_Bytecode2();
//  4  invokespecial test.Test_Bytecode2() [57]
//	  	var t0 =  new test.Test_Bytecode2 ();
		
		t0.setX(new Integer(3));
//    68  invokevirtual test.Test_Bytecode.setX(int) : void [78]
//		t0.setX (( new Integer (3)).intValue ());
		// BC_setX(int) 3
		
		t0.setX(new Double(3));
//    82  invokevirtual test.Test_Bytecode.setX(java.lang.Double) : void [80]
//  	t0.setX ( new Double (3));
		// BC2_setX(Double) 3.0


		Test_Bytecode t1 = new Test_Bytecode();
//    89  invokespecial test.Test_Bytecode() [12]
//	  	var t0 =  new test.Test_Bytecode2 ();
		
		t1.setX(new Integer(3));
//    68  invokevirtual test.Test_Bytecode.setX(int) : void [78]
//		t0.setX (( new Integer (3)).intValue ());
		// BC_setX(int) 3
		
		t1.setX(new Double(33));
//    119  invokevirtual test.Test_Bytecode.setX(java.lang.Double) : void [80]
//  	t0.setX ( new Double (3));
		// BC_setX(Double) 3.0

		System.out.println("Bytecode2 OK");
		
	}
	
}
