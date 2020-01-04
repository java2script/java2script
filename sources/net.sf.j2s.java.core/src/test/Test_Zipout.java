package test;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class Test_Zipout extends Test_ {

	public static void main(String[] args) {
		try {
			String s = "";
			for (int i = 0; i < 4000; i++)
				s += i + "\tthis is a test\n";
			byte[] bytes = s.getBytes(); 
			OutputStream os = new FileOutputStream("C:/temp/testzip.zip");
			ZipOutputStream zos = new ZipOutputStream(os);
			zos.putNextEntry(new ZipEntry("test1.txt"));
			zos.write(bytes, 0, bytes.length);
			zos.closeEntry();
			zos.close();
			String msg = bytes.length + " bytes written to testzip.zip";
			System.out.println(msg);
			System.out.println("Test_Zipout OK");
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}