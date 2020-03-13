package test;

import java.io.File;
import java.io.IOException;

public class Test_File extends Test_ {

	public static void main(String[] args) {
		File f = new File("./test");
		System.out.println(f = new File(f.getAbsolutePath()));
		assert(f.getAbsolutePath() == "./test");

		f = new File("c:/temp/out.txt");
		System.out.println(f.getName());
		File p = f.getParentFile();
		System.out.println(f);
		System.out.println(p);
		p = new File("c:/temp");
		System.out.println(p.getAbsolutePath());
		System.out.println(p.isDirectory());
		// JavaScript will report this as false:
		System.out.println(p.exists());
	}
}