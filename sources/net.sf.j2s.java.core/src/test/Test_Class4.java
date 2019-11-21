package test;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Hashtable;

class Test_Class4 extends Test_ {


	static  {
		System.out.println("Test_Class4 static init ");
	}

	 {
		System.out.println("Test_Class4 nonstatic init ");
	}

	public Test_Class4() {
		System.out.println("Test_Class4 constr ");
	}

	public static void main(String[] args) {
		System.out.println("Test_Class4 main ");
	}

}
