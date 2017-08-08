package test;

import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import javajs.util.Lst;
import javajs.util.OC;
import javajs.util.ZipTools;

public class Test_zip {

	public static void main(String[] args) {

		try {
			URL url = new URL("http://chemapps.stolaf.edu/jmol/jsmol/data/sage.zip");
			InputStream fis = url.openStream();
			BufferedInputStream bis = new BufferedInputStream(fis);
			ZipInputStream zis = new ZipInputStream(bis);
			ZipEntry ze = zis.getNextEntry();
			System.out.println(ze.getName() + " " + ze.getSize());
			bis.close();
			
			
			
		  url = new URL("http://chemapps.stolaf.edu/jmol/jsmol/data/sage.zip");
			fis = url.openStream();
			bis = new BufferedInputStream(fis);
			String s = new ZipTools().getZipDirectoryAsStringAndClose(bis);
			System.out.println(s);

			
			Lst<Object> lst = new Lst<Object>();
			lst.addLast("test1");
			lst.addLast(null);
			byte[] bytes = "this is a test".getBytes();
			lst.addLast(bytes);
			String msg = "javascript only";
			OC outputChannel = new OC();
			
			/**
			 * @j2sNative
			 * 
			 *          outputChannel.setParams(null,  "testzip.zip", false, null);
			 *  		msg = swingjs.JSToolkit.getDefaultToolkit().writeZipFile(outputChannel, lst);	 
			 */
			{
				OutputStream os = new FileOutputStream("C:/temp/testzip.zip");
				ZipOutputStream zos = new ZipOutputStream(os);
			  zos.putNextEntry(new ZipEntry("test1"));
			  zos.write(bytes, 0, bytes.length);
			  zos.closeEntry();
			  zos.close();
			  msg = bytes.length + " bytes written to testzip.zip";
			}
			System.out.println(msg);
			
			

			
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}