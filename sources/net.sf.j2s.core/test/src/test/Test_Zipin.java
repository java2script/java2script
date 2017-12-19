package test;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class Test_Zipin extends Test_ {

	public static void main(String[] args) {

		try {
			URL url = new URL("http://chemapps.stolaf.edu/jmol/jsmol/data/sage.zip");
			InputStream fis = url.openStream();
			BufferedInputStream bis = new BufferedInputStream(fis);
			ZipInputStream zis = new ZipInputStream(bis);
			ZipEntry ze = zis.getNextEntry();
			System.out.println(ze.getName() + " " + ze.getSize());
			assert((ze.getName() + " " + ze.getSize()).equals("obj_490758.pmesh 95301"));
			bis.close();
			System.out.println("Test_Zipin OK");
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}