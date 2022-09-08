package test;

public class Test__ {

	static boolean isBatch = false;
	
	static public boolean j2sHeadless = true;


	static {
		ClassLoader.getSystemClassLoader().setDefaultAssertionStatus(true);
	}
	
	public static void main(String[] args) {


		// get all files loaded
		_test1(args);
		
		long t0 = System.currentTimeMillis();
		
		_test1(args);
		
		System.out.println(System.currentTimeMillis() - t0);
		
		//Test_Zipin.main(args);
		//Test_Zipout.main(args);
		System.out.println("Test_ all tests completed successfully.");
	}

	private static void _test1(String[] args) {
		Test_Anon.main(args);
		Test_Appendable.main(args);
		Test_Array.main(args);
		Test_Assert.main(args);
		Test_Boolean.main(args);
//		Test_Bugs.main(args);
//		Test_Byte.main(args);
//		Test_Bytecode.main(args);
//		Test_Bytecode1.main(args);
//		Test_Bytecode2.main(args);
//		Test_Call.main(args);
//		Test_Cast.main(args);
//		Test_Char.main(args);
//		Test_Cinit.main(args);
//		Test_Cinit2.main(args);
//		Test_Class.main(args);
//		Test_Class_1.main(args);
//		Test_ClassBase.main(args);
		Test_Clone.main(args);
		Test_DivEqual.main(args);
		Test_Double.main(args);
		Test_Enum.main(args);
		Test_Enum2.main(args);
//		Test_EPS.main(args); Java bug -- returns Dialog for Helevetica and TimesRoman!???
		Test_Extends_6.main(args);
//		Test_Extends_7.main(args);
		// Test_Extends_JButton.main(args);
		Test_Extends.main(args);
		Test_Field_fails.main(args);
		Test_Field_ok.main(args);
		//Test_File.main(args);
//		Test_Final.main(args);
		Test_Format.main(args);
		Test_Generic_Java8.main(args);
		Test_Generic_Method.main(args);
		Test_GenericAnon.main(args);
		Test_GenericEABIXY2.main(args);
		Test_GenericExt2.main(args);
		Test_Image.main(args);
//		Test_Init.main(args);
		Test_Inner.main(args);
		Test_Instance.main(args);
		Test_Interface.main(args);
		Test_Interface2.main(args);
		Test_Intern.main(args);
		Test_Interval.main(args);
		Test_Ints.main(args);
		Test_J8_Generic2.main(args);
		Test_J8_Stream.main(args);
		Test_Java8.main(args);
		Test_JAXB_Marshall.main(args);
		Test_JAXB_NONE.main(args);
		Test_JAXB_Obj.main(args);
		//failing on unicode char in "somewhatComplex" Test_JAXB_ORDERED.main(args);
//		Test_Map.main(args);
		Test_Math.main(args);
		Test_MyInterface.main(args);
		Test_Native.main(args);
		Test_NoAssert.main(args);
		Test_NoHeadless_1.main(args);
		Test_Or.main(args);
		Test_Precision.main(args);
		Test_Print.main(args);
		Test_Printf.main(args);
		Test_Proxy.main(args);
		Test_Reflect.main(args);
		Test_Reserved.main(args);
		Test_Resource.main(args);
		Test_Sort.main(args);
		Test_Static.main(args);
		Test_String.main(args);
		Test_Var.main(args);
		Test_Vararg.main(args);
		Test_Void.main(args);
		
	}
}
