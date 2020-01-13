package test;

import java.util.Iterator;

/**
 * This test fails in JavaScript using Java2Script 3.2.1 because a subclass has
 * methods "field" and "next" with the same names as fields of its superclass.
 * 
 * The transpiler cannot predict the subclass when transpiling the superclass,
 * so the "field" and "next" fields will remain those names.
 * 
 * In addition, while field() could be renamed, next() cannot, because it is an
 * interface method.
 * 
 * But this works with Java2Script 3.2.2, because there we qualify all
 * 0-parameter method names that are not private or are static. These methods
 * have an added "$" appended to them. Thus, no field conflicts. 
 * 
 * @author hansonr
 *
 */
public class Test_Field_fails extends Test_Field1 implements Iterator<String> {

	String field() {
		return field;
	}

	public static void main(String[] args) {
		
		Test_Field_fails f = new Test_Field_fails();
		
		System.out.println("next is " + f.next);
		// OK. 

		System.out.println(f.field());
		// TypeError: f.field is not a function!
		
		System.out.println(f.next());
		// TypeError: f.next is not a function!
		
		System.out.println("Test_Field OK");
		
	}

	@Override
	public boolean hasNext() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String next() {
		// TODO Auto-generated method stub
		return "next is " + next;
	}
}
