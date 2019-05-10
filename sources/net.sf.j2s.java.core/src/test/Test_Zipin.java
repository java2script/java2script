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

	public static void main(String[] args) {

		try {
			InputStream bzis = Test_Zipin.class.getResourceAsStream("test2.txt.bz2");
			bzis = ZipTools.newBZip2InputStream(bzis);
			String s = new String((byte[]) Rdr.getStreamAsBytes(new BufferedInputStream(bzis), null), "utf-8");
			System.out.println(s);
			assert(s.equals("test2 here"));
			bzis.close();
			
			
			String path = (/** @j2sNative 1?"https://./swingjs/j2s/test/t.zip":*/"https://chemapps.stolaf.edu/jmol/jsmol/data/sage.zip");
			URL url = new URL(path);
			System.out.println("getting " + url);
			InputStream fis = url.openStream();
			BufferedInputStream bis = new BufferedInputStream(fis);
			ZipInputStream zis = new ZipInputStream(bis);
			ZipEntry ze = zis.getNextEntry();
			String test = ze.getName() + " " + ze.getSize();
			System.out.println(test);
			assert(test.equals("[Content_Types].xml 1548") || test.equals("obj_490758.pmesh 95301"));//"obj_490758.pmesh 95301"));
			bis.close();
			System.out.println("Test_Zipin OK");
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}