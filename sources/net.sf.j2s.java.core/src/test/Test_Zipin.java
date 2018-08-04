package test;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class Test_Zipin extends Test_ {

	public static void main(String[] args) {

		try {
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