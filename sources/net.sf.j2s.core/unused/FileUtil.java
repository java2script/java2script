package net.sf.j2s.core.compiler;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class FileUtil {

	public static String readSource(File f) {
		StringBuffer sb = new StringBuffer();
		FileReader reader = null;
		try {
			reader = new FileReader(f);
			char[] buf = new char[1024];
			int read = reader.read(buf);
			while (read != -1) {
				sb.append(buf, 0, read);
				read = reader.read(buf);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			close(reader);
		}
		return sb.toString();
	}

	/**
	 * Close the given FileReader.
	 * 
	 * <p>In case of an error the exception and its backtrace is written to the standard error stream. 
	 * 
	 * @param fileReader null or the FileReader to close 
	 */
	public static void close(FileReader fileReader) {
		if (fileReader != null) {
			try {
				fileReader.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}

