package j2s.common;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class FileUtil {

	public static String readSource(File f) {
		StringBuffer sb = new StringBuffer();
		try {
			FileReader reader = new FileReader(f);
			char[] buf = new char[1024];
			int read = reader.read(buf);
			while (read != -1) {
				sb.append(buf, 0, read);
				read = reader.read(buf);
			}
			reader.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return sb.toString();
	}
}

