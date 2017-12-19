package test;

import javajs.util.Lst;

public class Test_GenericExt2 extends Test_GenericExt_K<Test_Generic_Comp> {

	public static void main(String[] args) {
    	//no subclassing here new Test_GenericExt<Test_Generic_Comp2>();
    	
		Lst<String> lst = new Lst<String>();
		lst.addLast("String");
    	Test_GenericExt_K<Test_Generic_Comp> t = new Test_GenericExt2();
    	t.check(null, null);
    		  	
	}

	
	@Override
	public void check2(Test_Generic_Comp data) {
		if (data != null) {
				data.compareTo(null);
				this.data.compareTo(null);
		}
		System.out.println("Test_GenericExt2.check2 OK");
	}
	

}
