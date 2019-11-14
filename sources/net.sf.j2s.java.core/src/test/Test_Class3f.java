package test;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Hashtable;

class Test_Class3f extends Test_ implements Test_Class3fint1 {

//	Test_Class3f static init 
//	Test_Class5 static init 
//	Test_Class3f main 
//	Test_Class3f nonstatic init 
//	Test_Class3f constr 
	
   // references the interface field in a super-interface
   // result: init when referenced	
	
	static  {
		System.out.println("Test_Class3f static init ");
	}

	static String test = Test_Class5.test5;

	{
		System.out.println("Test_Class3f nonstatic init 3f 5 3f 3f 3f");
	}

	public Test_Class3f() {
		System.out.println("Test_Class3f constr ");
	}

	public static void main(String[] args) {
		System.out.println("Test_Class3f main ");
		new Test_Class3f();
	}

}
