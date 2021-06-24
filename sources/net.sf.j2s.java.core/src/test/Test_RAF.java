package test;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.RandomAccessFile;

/**
 * Test for RandomAccessFile
 * @author hansonr
 *
 */
public class Test_RAF extends Test_ {

	public static void main(String[] args) {
		try {
			File t = File.createTempFile("test-raf", ".txt");
			System.out.println(t.getAbsolutePath());
			RandomAccessFile raf = new RandomAccessFile(t, "rw");
			assert(raf.length() == 0);
			raf.seek(844000);
			assert(raf.read() == -1);
			raf.close();
			raf = new RandomAccessFile(t, "rw");
			// UTF string
			raf.seek(8);
			raf.writeUTF("testing");
			assert(raf.length() == 17);
//			byte[] b = "testing".getBytes();
//			raf.writeShort(b.length);
//			raf.write(b);
			raf.close();
			raf = new RandomAccessFile(t, "rw");
			assert(raf.length() == 17);
			System.out.println("tested for temp file length 0, writing UTF 'testing' at byte 8, length now 17");
			raf.seek(8);
			String val = raf.readUTF();
			raf.close();
			assert(val.equals("testing"));
			System.out.println("tested for UTF value being '" + val + "'");
			t.delete();
			boolean deleted = false;
			try {
			raf = new RandomAccessFile(t, "r");
			} catch (Exception e) {
				deleted = true;
				assert(e instanceof FileNotFoundException);
			}
			assert(deleted);
			System.out.println("tested for temp file deleted");
			System.out.println("Test_RAF OK");
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}