package test;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.StandardOpenOption;
import java.util.Arrays;
import java.util.Random;

import javax.swing.filechooser.FileSystemView;

import javajs.util.OC;

public class Test_File extends Test_ {

	@SuppressWarnings("unused")
	public static void main(String[] args) {
		

		testTempDir();
		
		System.out.println(System.getProperty("jnlp.codebase"));
		String tmpdir = System.getProperty("java.io.tmpdir");
		System.out.println(tmpdir);
		File f = new File("./test");
		URI u = f.toURI();
		System.out.println(u);
		System.out.println(f = new File(f.getAbsolutePath()));
		if (/** @j2sNative true|| */
		false) {
			assert (f.getAbsolutePath() == "./test");
			
			OC oc = new OC("/TEMP/testing");
			oc.append("testing");
			oc.closeChannel();
			assert (new File("/TEMP/testing").length() == 7);

		}

// first is null
//		URL fu = Test_File.class.getResource("./NOTICE");
// 		System.out.println("fu=" + fu);
// second is found if NOTICE is in the j2s directory.
//		fu = Test_File.class.getResource("/NOTICE");
//		System.out.println("fu=" + fu);
//		
//		
		
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

		File tempFile = new File(tmpdir, "testing");
		try {
			Files.write(tempFile.toPath(), "testing123".getBytes(), StandardOpenOption.CREATE);
			tempFile = new File(tmpdir, "testing");
			String test = new String(Files.readAllBytes(tempFile.toPath()));
			assert ("testing123".equals(test));
			assert (tempFile.exists());
			tempFile.delete();
			assert (!tempFile.exists());
			System.out.println("Test_File OK");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private static void testTempDir() {
		try {
			File dir = new File(System.getProperty("java.io.tmpdir"), "tracker" + new Random().nextInt());
			dir.mkdir();			

			toFile(dir, "test2", "\testing2");
			toFile(dir, "test3", "testing3");
			toFile(dir, "test1", "testing1");
			if (dir.isDirectory()) {
				String[] list = dir.list();
				System.out.println(Arrays.toString(list));
				System.out.println(Arrays.toString(dir.listFiles()));
				File files[] = FileSystemView.getFileSystemView().getFiles(dir, false);	
				System.out.println(Arrays.toString(files));
			}
			dir = new File(System.getProperty("java.io.tmpdir"));
			System.out.println(Arrays.toString(dir.list()));

			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}


	private static void toFile(File dir, String fname, String data) throws IOException {
		FileOutputStream fos = new FileOutputStream(new File(dir, fname));
		fos.write(data.getBytes());
		fos.close();		
	}
}