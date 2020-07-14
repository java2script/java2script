package test;

import java.io.FileInputStream;
import java.io.IOException;

import test.function.Exception1;

public class Test_Catch extends Test_ {


	public static void main(String[] args) {
		try {
			new Test_Catch(); 
		} catch (Exception e) {
			if (e instanceof Exception1) {
				
			}
		}
		try (FileInputStream fis = new FileInputStream("askdfja")){
			
		} catch (IOException e) {
			
		}
		System.out.println("Test_Catch OK");
	}

}