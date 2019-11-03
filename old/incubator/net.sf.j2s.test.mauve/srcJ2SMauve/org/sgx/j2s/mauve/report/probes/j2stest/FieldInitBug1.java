package org.sgx.j2s.mauve.report.probes.j2stest;

import java.util.*;

/**
 * the field v is never initialized, so calling al.size() in main() function will raise an error (this.v is null)
 * if I change the v field initialization to be inside the constructor (commented statement), everithing is fine
 * 
 * If I erase the second constructor (ListTest(List l)) everithing works fine.
 * 
 * so I think this is a problem with multiple constructors and field initialization.
 * @author sgurin
 *
 */
public class FieldInitBug1 extends AbstractSequentialList{

	public LinkedList v = new LinkedList();
	
	public FieldInitBug1(){		
		super();
//		v = new LinkedList();
	}
	public FieldInitBug1(List l){
		super();
		v.addAll(l);
	}
	
	public int size() {
		return v.size();
	}
	public ListIterator listIterator(int idx) {
	 	return v.listIterator(idx);
	}
	
	public static void main(String[] args) {
		FieldInitBug1 al = new FieldInitBug1();
		al.size();
		System.out.println("end");
		
		Hashtable t = new Hashtable();
//		t.get(key)
	}

}
