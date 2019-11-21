package test;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Hashtable;

class Test_Class3c extends Test_ {

	// demonstration that referencing a static runs the static initializers in reverse order
//	Test_Class5 static init 
//	Test_Class6 static init 
//	Test_Class3c static init 
//	Test_Class3c main 
//	Test_Class3c nonstatic init 
//	Test_Class3c constr 
	
	static String test6 = Test_Class6.test6;
	static  {
		System.out.println("Test_Class3c static init");
	}


//	static Test_Class4 cl4 = new Test_Class4();
	 {
		System.out.println("Test_Class3c nonstatic init  5 6 3c 3c 3c 3c");
	}

	public Test_Class3c() {
		System.out.println("Test_Class3c constr ");
	}

	public static void main(String[] args) {
		System.out.println("Test_Class3c main ");
		new Test_Class3c();
	}

}
