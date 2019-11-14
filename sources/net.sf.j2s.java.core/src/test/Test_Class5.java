package test;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Hashtable;

class Test_Class5 extends Test_ {


	public static String test5 = "Test_Class5.test5";

	static  {
		System.out.println("Test_Class5 static init ");
	}

	 {
		System.out.println("Test_Class5 nonstatic init ");
	}

	public Test_Class5() {
		System.out.println("Test_Class5 constr ");
	}

	public static void main(String[] args) {
		System.out.println("Test_Class5 main ");
	}

}
