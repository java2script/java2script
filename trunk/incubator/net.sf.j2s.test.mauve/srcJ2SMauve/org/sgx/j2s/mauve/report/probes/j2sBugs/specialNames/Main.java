package org.sgx.j2s.mauve.report.probes.j2sBugs.specialNames;

import java.util.LinkedList;

/**
 * this is a tests suite that shows j2s failing to handle/instantiate classes with special names like toString, and I think oither names like equals will also be buggy
 * 
 * this will throw a native javascript eception that sais MethodnotFoundException LinkedList.add() method doesn't exists
 * 
 * the real issue is with "new org.sgx.j2s.j2sBugs.specialNames.toString()"
 * 
 * @author sgurin
 *
 */
public class Main {
	public static class toString {

	}

	public static void main(String[] args) {
		LinkedList l = new LinkedList();
		l.add(1);
		l.add(new org.sgx.j2s.mauve.report.probes.j2sBugs.specialNames.Main.toString());
		System.out.println("end");
	}

}
