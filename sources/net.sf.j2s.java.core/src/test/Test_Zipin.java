package test;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.Arrays;
import java.util.zip.GZIPInputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javajs.util.Rdr;
import javajs.util.ZipTools;

public class Test_Zipin extends Test_ {

static boolean j2sHeadless = true;

	@SuppressWarnings("unused")
	public static void main(String[] args) {

		try {

			InputStream is = Test_Zipin.class.getResourceAsStream("3c9k.xml.gz");

			System.out.println("unzipping");
			GZIPInputStream gzis = new GZIPInputStream(is, 8096);
			BufferedInputStream gis = new BufferedInputStream(gzis);
			byte[] buf = new byte[8096];
			byte[] bytes = new byte[buf.length];
			int len = 0;
			int totalLen = 0;
			while ((len = gis.read(buf, 0, buf.length)) > 0) {
				totalLen += len;
				if (totalLen >= bytes.length)
					bytes = Arrays.copyOf(bytes, bytes.length << 1);
				System.arraycopy(buf, 0, bytes, totalLen - len, len);
			}
			gis.close();
			if (bytes.length > totalLen) {
				bytes = Arrays.copyOf(bytes, totalLen);
			}
			String s = new String(bytes);
			System.out.println(s.length());
			assert (s.length() == 2957648);
			gzis.close();

			InputStream bzis = Test_Zipin.class.getResourceAsStream("test2.txt.bz2");
			bzis = ZipTools.newBZip2InputStream(bzis);
			s = new String((byte[]) Rdr.getStreamAsBytes(new BufferedInputStream(bzis), null), "utf-8");
			System.out.println(s);
			assert (s.equals("test2 here"));
			bzis.close();
			

			if (/** @j2sNative true || */
			false) {

			
			
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
				bytes = null;
				out: while (ze != null) {
					while ((ze = zis.getNextEntry()) != null && ze.isDirectory()) {
						System.out.println(ze.getName());
					}
					;
					System.out.println(ze.getName());
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
					assert (s.hashCode() == hashcode);
				}
			}
			System.out.println("Test_Zipin OK");
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}