package net.sf.j2s.ui.property;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class FileUtil {
	public static void saveInputStreamAsFile(InputStream is, File file) {
		byte[] buf = new byte[1024];
		try {
			FileOutputStream fos = new FileOutputStream(file);
			int read = 0;
			while ((read = is.read(buf)) != -1) {
				fos.write(buf, 0, read);
			}
			fos.close();
			is.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
