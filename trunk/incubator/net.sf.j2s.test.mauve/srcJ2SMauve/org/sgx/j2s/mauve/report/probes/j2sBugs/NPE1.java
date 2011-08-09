package org.sgx.j2s.mauve.report.probes.j2sBugs;

public class NPE1 {
public static void main(String[] args) {
	Object o = null;
	boolean ok=false;
	try {
		o.toString();
	} catch (NullPointerException e) {
		ok=true;
	} catch (Exception e) {
		ok=false;		
	}catch (Throwable e) {
		ok=false; 
	}
	System.out.println(ok);
}
}
