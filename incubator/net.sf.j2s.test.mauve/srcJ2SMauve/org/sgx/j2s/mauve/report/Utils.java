package org.sgx.j2s.mauve.report;

public class Utils {

	/**
	 * @j2sNative
	 var el = document.createElement("div");
	 el.style.width="100%";
	 document.body.appendChild(el); 
	 el.innerHTML=s;
	 */
	public static native Object print_(String s);
	public static Object print(String s){
		if(isJs())
			return print_(s);
		else return null;
	}

	public static boolean isJs(){
		/**
		 * @j2sNative
		 * return true;
		 */{return false;}
	}

}
