package test;

public class Test_Bytecode1 extends Test_Bytecode {

	int x;
	double y = 5.5;

	void setX(int x) {
		System.out.println("BC1_setX(int) " + x);
		this.x = x;
	}
	
	void setX(double x) {
		System.out.println("BC1_setX(double) " + x);
		this.x = (int)x;
	}
	
	public Test_Bytecode1() {
		super();
//	BC1_setX(double) 4.4  (using super's y field but subclass's methods)
//	BC1_setX(int) 4
		
		setX(y);
//	BC1_setX(double) 5.5  (using subclass's y field and subclass's methods)
//	BC1_setX(int) 5
		
	};

	public static void main(String[] args) {
		
		Test_Bytecode t = new Test_Bytecode1();
		
		t.setX(3);
//	BC1_setX(int) 3

		t.setX(1.1);		
//	BC1_setX(double) 1.1
//	BC1_setX(int) 1
		

//	  // Method descriptor #56 ([Ljava/lang/String;)V
//	  // Stack: 3, Locals: 2
//	  public static void main(java.lang.String[] args);
//	     0  new test.Test_Bytecode1 [1]
//	     3  dup
//	     4  invokespecial test.Test_Bytecode1() [57]
//	     7  astore_1 [t]
//	     8  aload_1 [t]
//	     9  iconst_3
//	    10  invokevirtual test.Test_Bytecode.setX(int) : void [58]
//	    13  aload_1 [t]
//	    14  ldc2_w <Double 1.1> [60]
//	    17  invokevirtual test.Test_Bytecode.setX(double) : void [62]
//	    20  return
		
	}
	
}

////Compiled from Test_Bytecode1.java (version 1.6 : 50.0, super bit)
//public class test.Test_Bytecode1 extends test.Test_Bytecode {
//
//// Field descriptor #6 I
//int x;
//
//// Field descriptor #8 D
//double y;
//
//// Method descriptor #10 (I)V
//// Stack: 4, Locals: 2
//void setX(int x);
//  0  getstatic java.lang.System.out : java.io.PrintStream [12]
//  3  new java.lang.StringBuilder [18]
//  6  dup
//  7  ldc <String "BC1_setX(int) "> [20]
//  9  invokespecial java.lang.StringBuilder(java.lang.String) [22]
// 12  iload_1 [x]
// 13  invokevirtual java.lang.StringBuilder.append(int) : java.lang.StringBuilder [26]
// 16  invokevirtual java.lang.StringBuilder.toString() : java.lang.String [30]
// 19  invokevirtual java.io.PrintStream.println(java.lang.String) : void [34]
// 22  aload_0 [this]
// 23  iload_1 [x]
// 24  putfield test.Test_Bytecode1.x : int [39]
// 27  return
//   Line numbers:
//     [pc: 0, line: 9]
//     [pc: 22, line: 10]
//     [pc: 27, line: 11]
//   Local variable table:
//     [pc: 0, pc: 28] local: this index: 0 type: test.Test_Bytecode1
//     [pc: 0, pc: 28] local: x index: 1 type: int
//
//// Method descriptor #45 (D)V
//// Stack: 4, Locals: 3
//void setX(double x);
//  0  getstatic java.lang.System.out : java.io.PrintStream [12]
//  3  new java.lang.StringBuilder [18]
//  6  dup
//  7  ldc <String "BC1_setX(double) "> [46]
//  9  invokespecial java.lang.StringBuilder(java.lang.String) [22]
// 12  dload_1 [x]
// 13  invokevirtual java.lang.StringBuilder.append(double) : java.lang.StringBuilder [48]
// 16  invokevirtual java.lang.StringBuilder.toString() : java.lang.String [30]
// 19  invokevirtual java.io.PrintStream.println(java.lang.String) : void [34]
// 22  aload_0 [this]
// 23  dload_1 [x]
// 24  d2i
// 25  putfield test.Test_Bytecode1.x : int [39]
// 28  return
//   Line numbers:
//     [pc: 0, line: 14]
//     [pc: 22, line: 15]
//     [pc: 28, line: 16]
//   Local variable table:
//     [pc: 0, pc: 29] local: this index: 0 type: test.Test_Bytecode1
//     [pc: 0, pc: 29] local: x index: 1 type: double
//
//// Method descriptor #51 ()V
//// Stack: 3, Locals: 1
//public Test_Bytecode1();
//  0  aload_0 [this]
//  1  invokespecial test.Test_Bytecode() [52]
//  4  aload_0 [this]
//  5  ldc2_w <Double 5.5> [54]
//  8  putfield test.Test_Bytecode1.y : double [56]
// 11  aload_0 [this]
// 12  aload_0 [this]
// 13  getfield test.Test_Bytecode1.y : double [56]
// 16  invokevirtual test.Test_Bytecode1.setX(double) : void [58]
// 19  return
//   Line numbers:
//     [pc: 0, line: 19]
//     [pc: 4, line: 6]
//     [pc: 11, line: 23]
//     [pc: 19, line: 27]
//   Local variable table:
//     [pc: 0, pc: 20] local: this index: 0 type: test.Test_Bytecode1
//
//// Method descriptor #61 ([Ljava/lang/String;)V
//// Stack: 3, Locals: 2
//public static void main(java.lang.String[] args);
//  0  new test.Test_Bytecode1 [1]
//  3  dup
//  4  invokespecial test.Test_Bytecode1() [62]
//  7  astore_1 [t]
//  8  aload_1 [t]
//  9  iconst_3
// 10  invokevirtual test.Test_Bytecode1.setX(int) : void [63]
// 13  aload_1 [t]
// 14  ldc2_w <Double 1.1> [65]
// 17  invokevirtual test.Test_Bytecode1.setX(double) : void [58]
// 20  return
//   Line numbers:
//     [pc: 0, line: 31]
//     [pc: 8, line: 33]
//     [pc: 13, line: 36]
//     [pc: 20, line: 56]
//   Local variable table:
//     [pc: 0, pc: 21] local: args index: 0 type: java.lang.String[]
//     [pc: 8, pc: 21] local: t index: 1 type: test.Test_Bytecode1
//}
//2E6A6176610021000100030000000200000005000600000000000700080000000400000009000A0001000B000000
//58000400020000001C
//
//void setX(int x);
//B2000C // getstatc
//BB0012 // new
//59 // dup
//1214 // lc
//B70016 // invokespecial
//1B     // iload_1
//B6001A
//B6001E
//B60022
//2A // aload_0
//1B // iload_1
//B50027 // putfield
//B1 // return
//
//
//0000000200290000000E0003000000090016000A001B000B002A0000001600020000001C002B002C00000000001C00050006000100000009002D0001000B000000
//59000400030000001D
//
//void setX(double x);
//B2000C // getstatic
//BB0012 // new
//59 // dup
//122E // ld
//B70016 // invokespecial
//27 // dload_1
//B60030
//B6001E
//B60022
//2A // aload_0
//27 // dload_1
//8E // d2i
//B50027 // putfield
//B1
//
//0000000200290000000E00030000000E0016000F001C0010002A0000001600020000001D002B002C00000000001D0005000800010001001800330001000B0000004A0003000100000014
//
//
//public Test_Bytecode1();
//
//
//2A // aload_0
//B70034 // invokespecial
//2A // aload_0
//140036 // ldc2_w
//B50038 // putfield
//2A // aload_0
//2A // aload_0
//B40038 // getfield
//B6003A
//B1
//
//
//0000
//0002
//0029
//0000
//0012
//0004
//0000
//0013
//0004
//0006
//000B
//0017
//0013
//001B
//002A
//0000
//000C
//0001
//0000
//0014
//002B
//002C
//0000
//0009
//003C
//003D
//0001
//000B
//0000
//0055
//0003
//0002
//0000
//0015
//
//public static void main(java.lang.String[] args);
//BB0001 // new test.Test_Bytecode1 [1]
//59 // dup
//B7003E // invokespecial test.Test_Bytecode1() [57]
//4C // astore_1
//2B // aload_1
//06 // iconst_3
//B6003F // invokevirtual test.Test_Bytecode1.setX(int) : void [63]
//2B
//140041
//B6003A // invokevirtual test.Test_Bytecode1.setX(double) : void [58]
//B1
//
//
//0000000200290000001200040000001F00080021000D002400140038002A000000160002000000150043004400000008000D0045002C000100010046000000020047
//
