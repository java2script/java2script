package org.sgx.j2s.mauve.report.probes.j2sBugs;

import java.util.LinkedList;

public class NP1 {

	public static void main(String[] args) {
		LinkedList l = new LinkedList();
		boolean passed;
		try {
			l.addAll(null);
			passed=false;
		} catch (Exception e) {
			passed=true;
		}
		System.out.println("passed");
	}

}
