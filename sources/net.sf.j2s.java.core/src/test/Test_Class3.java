package test;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Hashtable;

class Test_Class3 extends Test_ {

//	Test_Class3 static init 
//	Test_Class4 static init 
//	Test_Class4 nonstatic init 
//	Test_Class4 constr 
//	Test_Class3 main 
//	Test_Class3 nonstatic init 
//	Test_Class3 constr 
	
	static  {
		System.out.println("Test_Class3 static init ");
	}


	static Test_Class4 cl4 = new Test_Class4();
	 {
		System.out.println("Test_Class3 nonstatic init 3 4 4 4 3 3 3");
	}

	public Test_Class3() {
		System.out.println("Test_Class3 constr ");
	}

	public static void main(String[] args) {
		System.out.println("Test_Class3 main ");
		new Test_Class3();
	}

}
