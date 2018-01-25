package test;

import test.function.Exception1;

public class Test_Catch extends Test_ {


	public static void main(String[] args) {
		try {
			new Test_Catch();
		} catch (Exception e) {
			if (e instanceof Exception1) {
				
			}
		}
		System.out.println("Test_Catch OK");
	}

}