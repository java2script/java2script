package test;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Hashtable;

class Test_Class3d extends Test_ implements Test_Class3dint {

// reference to interface field -- interface static init called
//	Test_Class5 static init 
//	Test_Class3d static init 
//	Test_Class3d main 
//	Test_Class3d nonstatic init 
//	Test_Class3d constr 

	
	static String test3d = "test3d";
	
	static String test3d() {
		return test3d;
	}
	static String test5 = test;
	static  {
		System.out.println("Test_Class3d static init ");
	}


//	static Test_Class4 cl4 = new Test_Class4();
	 {
		System.out.println("Test_Class3d nonstatic init 5 3d 3d 3d 3d");
	}

	public Test_Class3d() {
		System.out.println("Test_Class3d constr");
		assert("test3d".equals(test3d()));
	}

	public static void main(String[] args) {
		System.out.println("Test_Class3d main ");
		new Test_Class3d();
	}

}
