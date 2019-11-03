package net.sf.j2s.ui.property;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;

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

	public static String toRelativePath(String absPath, String basePath) {
		try {
			File absFile = new File(absPath).getCanonicalFile();
			File baseFile = new File(basePath).getCanonicalFile();
			String absURL = absFile.toURL().toString();
			String baseURL = baseFile.toURL().toString();
			if (absURL.startsWith(baseURL)) {
				String relativeURL = absURL.substring(baseURL.length());
				if (relativeURL.startsWith("/") || relativeURL.startsWith("\\")) {
					relativeURL = relativeURL.substring(1);
				}
				return relativeURL;
			}
			int index = absURL.indexOf('/');
			int lastIndex = index;
			while (index != -1) {
				String partURL = absURL.substring(0, index);
				if (!baseURL.startsWith(partURL + "/") && !baseURL.equals(partURL)) {
					break;
				}
				lastIndex = index;
				index = absURL.indexOf('/', lastIndex + 1);
			}
			absURL = absURL.substring(lastIndex + 1);
			baseURL = baseURL.substring(lastIndex + 1);
			String[] parts = baseURL.split("\\/");
			int length = parts.length;
			if (baseFile.isFile()) {
				length--;
			}
			StringBuffer buffer = new StringBuffer();
			for (int i = 0; i < length; i++) {
				buffer.append("../");
			}
			buffer.append(absURL);
			return buffer.toString();
		} catch (MalformedURLException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
//	public static void main(String[] args) {
//		String relativeStr = toRelativePath("D:/eclipse-3.3/eclipse/workspace/org.eclipse.draw2d/bin", "D:/eclipse-3.3/eclipse/workspace/org.eclipse.draw2d.examples");
//		String relativeStr = toRelativePath("D:/eclipse-3.3/eclipse/workspace/org.eclipse.draw2d.examples/bin", "D:/eclipse-3.3/eclipse/workspace/org.eclipse.draw2d.examples/");
//		System.out.println(relativeStr);
//	}
}
