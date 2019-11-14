package test;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Hashtable;

class Test_Class7 extends Test_ {


	public static String test7 = "Test_Class7.test7";

	static  {
		System.out.println("Test_Class7 static init ");
	}

	 {
		System.out.println("Test_Class7 nonstatic init ");
	}

	public Test_Class7() {
		System.out.println("Test_Class7 constr ");
	}

	public static void main(String[] args) {
		System.out.println("Test_Class7 main ");
	}

}
