package test;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Hashtable;

class Test_Class3g extends Test_ {

   // references the interface field in a sub-interface(6 of 5)
   // result: interface is initialized [super,sub] [5,6] when referenced
	
//	Test_Class3g static init 
//	Test_Class5 static init 
//	Test_Class6 static init 
//	Test_Class3g main 
//	Test_Class3g nonstatic init 
//	Test_Class3g constr 
	
	static  {
		System.out.println("Test_Class3g static init ");
	}

	static String test = Test_Class6.test6;

	{
		System.out.println("Test_Class3g nonstatic init 3g 5 6 3g 3g 3g");
	}

	public Test_Class3g() {
		System.out.println("Test_Class3g constr ");
	}

	public static void main(String[] args) {
		System.out.println("Test_Class3g main ");
		new Test_Class3g();
	}

}
