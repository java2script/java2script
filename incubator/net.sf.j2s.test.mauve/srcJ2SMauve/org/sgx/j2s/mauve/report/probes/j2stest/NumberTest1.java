package org.sgx.j2s.mauve.report.probes.j2stest;

import org.sgx.j2s.base.js.JsUtils;

import gnu.testlet.java2.lang.Number.NewNumber;

public class NumberTest1 {
	/**
	 * @j2sNative
	 * 
	  if(d.valueOf)d=d.valueOf();
	  if(d.value)d=d.value;
	  
	  var r = (d["to$tring"])(16)
	  
alert("haha: "+(123["to$tring"])(16)+" - "+r.valueOf());
return r;
	 */
	public static native  String toHexString(double d);
	
	
	
	
public static void main(String[] args) {
//	Double d = new Double(8);
//	System.out.println(JsUtils.dump(toHexString(1.2), true));
	testToHexString();
//	Integer.getInteger("lskjdf");
//	System.out.println(Integer.toString(123));
	
//	System.out.println(toHexString(1.2));
//	numberTest();
}

private static void testToHexString() {
	String str, str1;
	str = toHexString(8375);
	System.out.println("hex: "+str);
}



private static void numberTest() {
	Number n = new NewNumber(300);
	System.out.println("n=="+n.toString());
	System.out.println("ned");
}
}
