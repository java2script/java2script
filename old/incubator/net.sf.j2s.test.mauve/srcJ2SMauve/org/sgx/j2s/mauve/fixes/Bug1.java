package org.sgx.j2s.mauve.fixes;

import java.util.List;
import java.util.Vector;

public class Bug1 {
public static void main(String[] args) {
//	bug1(); 
//	bug2();
	
//	try {
		Vector<String> v = new Vector<String>();
		v.add("hola");
		List v2 = v.subList(0,0);
		for(String s : v) {
			System.out.println(s);
		}
//	} catch (Exception e) {
//		System.out.println("hhhhs");
//		// TODO: handle exception
//	}
//	System.out.println("end");
}

//private static void bug2() {
//	for(int k=1; k<6; k++) {
//	   final int i=k;
//	   Object obj = new Object(){
//	           public String toString() {return "object"+i;};
//	   };
//	   System.out.println(obj.toString());
//	}
//}
//
//private static void bug1() {
//for(int k=1; k<6; k++) {
//	final int i=k; 
//	Object obj = new Object(){
//		private final int attr1 = i;
//		public String toString() {return "object"+attr1;};
//	};
//	System.out.println(obj.toString()); 
//}
//}
}
