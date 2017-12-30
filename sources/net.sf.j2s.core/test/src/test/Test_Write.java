package test;

import java.io.FileWriter;

public class Test_Write extends Test_ {

	public static void main(String[] args) {
		try {
			FileWriter f = new FileWriter("test.out");
			f.write("this is a test\n");
			f.write("this is line 2\n");
			f.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}