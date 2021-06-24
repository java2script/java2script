package test;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Properties;

public class Test_Resource extends Test_ {
	
	static int getInt() {
		return 0;
	}
	
	static boolean isClosed = false;

	public static void main(String[] args) {
		Properties p = new Properties();
		try {
			// check for proper referencing of an interface
			Class<?> c = Test_Resource.class;
			System.out.println("Class.getResourceAsStream(\"test.properties\")");
			p.load(c.getResourceAsStream("test.properties"));
	        String test = p.getProperty("test");
	        System.out.println("property test=" + test);
	        assert("OK".equals(test));
		} catch (Exception e) {
			System.out.println(e);
			assert(false);
		}

		try {
			File f = File.createTempFile("test", ".txt");
	        System.out.println("opening output stream for tempfile testnnnnn.txt");
			try(OutputStream os = new FileOutputStream(f) {
				public void close() {
					try {
						System.out.println("closing OutputStream ");
						isClosed = true;
						super.close();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}) {
				os.write("test".getBytes());
				// this will close the output stream as a 4-byte file
			} catch (IOException e) {
				e.printStackTrace();
			}
			System.out.println(f.getName() + " length=" + f.length());
			assert(f.length() == 4);
			assert(isClosed);
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		
		System.out.println("Test_Resource OK");
	}

} 