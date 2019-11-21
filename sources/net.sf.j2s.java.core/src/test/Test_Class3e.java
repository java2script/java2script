package test;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Hashtable;

class Test_Class3e extends Test_ implements Test_Class3dint {

   // just references the interface -- <clinit> not called on interface
	
//	Test_Class3e static init 
//	Test_Class3e main 
//	Test_Class3e nonstatic init 
//	Test_Class3e constr 
	
	static  {
		System.out.println("Test_Class3e static init ");
	}

	{
		System.out.println("Test_Class3e nonstatic init 3e 3e 3e 3e");
	}

	public Test_Class3e() {
		System.out.println("Test_Class3e constr ");
	}

	public static void main(String[] args) {
		System.out.println("Test_Class3e main ");
		new Test_Class3e();
	}

}
