package test;

class Testx {
 // example of a second independent top-level class	
}

abstract class Test_ {
	
	static boolean j2sHeadless = true;


	private static int i_ = 0;
	private int t = 0;
	 
	public int showt() {
		System.out.println(t);
		return t;
	}
	static {
		ClassLoader.getSystemClassLoader().setDefaultAssertionStatus(true);
	}
	
//	static int checknofinal() {
//		return j_;
//	}
//	
//	static int i_ = 2;
	
//	final static Hashtable a = new Hashtable();
//	final static Hashtable b = new Hashtable();
	
//	static int j_ = 3;
	
	
	  public static void main(String[] args) {
		  Test_Anon.main(args);
		  Test_Appendable.main(args);
		  Test_Array.main(args);
		  Test_Assert.main(args);
		  Test_Boolean.main(args);
		  Test_Bugs.main(args);
		  Test_Byte.main(args);
		  Test_Bytecode.main(args);
		  Test_Bytecode1.main(args);
		  Test_Bytecode2.main(args);
		  Test_Call.main(args);
		  Test_Cast.main(args);
		  Test_Char.main(args);
		  Test_Cinit.main(args);
		  Test_Cinit2.main(args);
		  Test_Class.main(args);
		  Test_Clone.main(args);
		  Test_DivEqual.main(args);
		  Test_Double.main(args);
		  Test_Enum.main(args);
		  Test_Extends_6.main(args);
		  Test_Extends_7.main(args);
		  //Test_Extends_JButton.main(args);
		  Test_Extends.main(args);
		  Test_Final.main(args);
		  Test_Format.main(args);
		  Test_Generic_Java8.main(args);
		  Test_Generic_Method.main(args);
		  Test_GenericAnon.main(args);
		  Test_GenericEABIXY2.main(args);
		  Test_GenericExt2.main(args);
		  Test_Init.main(args);
		  Test_Inner.main(args);
		  Test_Instance.main(args);
		  Test_Interface.main(args);
		  Test_Interface2.main(args);
		  Test_Ints.main(args);
		  Test_Map.main(args);
		  Test_Native.main(args);
		  Test_NoAssert.main(args);
		  Test_NoHeadless_1.main(args);
		  Test_Precision.main(args);
		  Test_Print.main(args);
		  Test_Printf.main(args);
		  Test_Proxy.main(args);
		  Test_Reflect.main(args);
		  Test_Reserved.main(args);
		  Test_Resource.main(args);
		  Test_Static.main(args);
		  Test_String.main(args);
		  Test_Var.main(args);
		  Test_Vararg.main(args);
		  Test_Void.main(args);
		  Test_Zipin.main(args);
		  Test_Zipout.main(args);
	  }

	
	  public String toString() {
		  return "testing " + this.getClass().getName();
	  }
			
}

