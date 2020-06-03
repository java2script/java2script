package test;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javajs.util.Rdr;
import javajs.util.ZipTools;

public class Test_Zipin extends Test_ {

	@SuppressWarnings("unused")
	public static void main(String[] args) {

		try {
			InputStream bzis = Test_Zipin.class.getResourceAsStream("test2.txt.bz2");
			bzis = ZipTools.newBZip2InputStream(bzis);
			String s = new String((byte[]) Rdr.getStreamAsBytes(new BufferedInputStream(bzis), null), "utf-8");
			System.out.println(s);
			assert (s.equals("test2 here"));
			bzis.close();

			String path = (/** @j2sNative 1?"https://./swingjs/j2s/test/t.zip": */
			"https://chemapps.stolaf.edu/jmol/jsmol/data/sage.zip");
			URL url = new URL(path);
			System.out.println("getting " + url);
			InputStream fis = url.openStream();
			ZipInputStream zis = new ZipInputStream(new BufferedInputStream(fis));
			ZipEntry ze = zis.getNextEntry();
			String test = ze.getName() + " " + ze.getSize();
			System.out.println(test);
			assert (test.equals("[Content_Types].xml 1548") || test.equals("obj_490758.pmesh 95301"));// "obj_490758.pmesh
																										// 95301"));
			int hashcode = 0;
			byte[] bytes = null;
			out: while (ze != null) {
				while ((ze = zis.getNextEntry()) != null && ze.isDirectory()) {
				}
				;
				if (ze.getName().equals("xl/calcChain.xml")) {
					bytes = new byte[(int) ze.getSize()];
					zis.read(bytes);
					break out;
				}
			}
			zis.close();
			s = new String(bytes);
			hashcode = s.hashCode();
			System.out.println("hashcode = " + hashcode);
			if (/** @j2sNative true || */
			false) { 	
				bytes = ze.getBytes();
				s = new String(bytes);
				System.out.println("hashcode = " + s.hashCode());
				assert(s.hashCode() == hashcode);
			}

			System.out.println("Test_Zipin OK");
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}