package test;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Hashtable;

class Test_Class6 extends Test_Class5 {


	static String test6 = "Test_Class6.test6";
	
	static  {
		System.out.println("Test_Class6 static init ");
	}

	 {
		System.out.println("Test_Class6 nonstatic init ");
	}

	public Test_Class6() {
		System.out.println("Test_Class6 constr ");
	}

	public static void main(String[] args) {
		System.out.println("Test_Class6 main ");
	}

}
