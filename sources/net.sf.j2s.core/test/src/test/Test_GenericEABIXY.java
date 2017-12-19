package test;

class Test_GenericEABIXY extends Test_GenericIMV_AB<String, Number> implements Test_Generic_XY<String, Number> {

//	class test.Test_GenericEABIXY
//	extends Test_Generic_IMV_AB<java.lang.String,java.lang.Number>
//	implements : Test_Generic_XY<java.lang.String,java.lang.Number>

//	Ltest/Test_Generic_IMV_AB<Ljava/lang/String;Ljava/lang/Number;>;typeA 0String
//	Ltest/Test_Generic_IMV_AB<Ljava/lang/String;Ljava/lang/Number;>;typeA 1Number

//	--superclass--
//	false Ltest/Test_Generic_IMV_AB<Ljava/lang/String;Ljava/lang/Number;>; (id=151)
//	class test.Test_Generic_IMV_AB<A, B>
//		extends test.Test_
//		implements : Test_Generic_MV<A,B>

//	--implements--
//	false Ltest/Test_Generic_MV<Ljava/lang/String;Ljava/lang/Number;>; (id=149)
//	interface test.Test_Generic_MV<M, V>

//	Ltest/Test_Generic_MV<Ljava/lang/String;Ljava/lang/Number;>;typeA 0String
//	Ltest/Test_Generic_MV<Ljava/lang/String;Ljava/lang/Number;>;typeA 1Number


	
	
	@Override
	public int compareTo(String s) {
		return compareTo("test", Integer.valueOf(3));
	}

	@Override
	public int compareTo(String s, Number i) {
		System.out.println("Test_Generic#compareTo(String, Number)" + s + "," + i);
		return 0;
	}

	@Override
	public void show(String msg, String x) {
		// TODO Auto-generated method stub
	}


}