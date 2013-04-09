package net.sf.j2s.ajax;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class SourceUtils {

	public static void updateSourceContent(File file, String source) {
		FileInputStream fis = null;
		byte[] buffer = new byte[8096];
		int read = -1;
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			fis = new FileInputStream(file);
			while ((read = fis.read(buffer)) != -1) {
				baos.write(buffer, 0, read);
			}
		} catch (IOException e1) {
			//e1.printStackTrace();
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					//e.printStackTrace();
				}
			}
		}
		String oldSource = baos.toString();
		Map<Integer, String> map = new HashMap<Integer, String>();
		for (int i = 0; i < 100; i++) {
			boolean got = false;
			String key1 = "//+$" + i + "+";
			int idx1 = oldSource.indexOf(key1);
			if (idx1 != -1) {
				String key2 = "//-$" + i + "-";
				int idx2 = oldSource.indexOf(key2);
				if (idx2 != -1) {
					String s = oldSource.substring(idx1 + key1.length(), idx2);
					map.put(i, s);
					got = true;
				}
			}
			if (!got) {
				key1 = "/*+$" + i + "+*/";
				idx1 = oldSource.indexOf(key1);
				if (idx1 != -1) {
					String key2 = "/*-$" + i + "-*/";
					int idx2 = oldSource.indexOf(key2);
					if (idx2 != -1) {
						String s = oldSource.substring(idx1 + key1.length(), idx2);
						map.put(i, s);
						got = true;
					}
				}
			}
		}
		for (int i = 0; i < 100; i++) {
			boolean changed = false;
			String key1 = "//+$" + i + "+";
			int idx1 = source.indexOf(key1);
			if (idx1 != -1) {
				String key2 = "//-$" + i + "-";
				int idx2 = source.indexOf(key2);
				if (idx2 != -1) {
					String ss = source.substring(idx1 + key1.length(), idx2);
					String s = map.get(i);
					if (s != null && !s.equals(ss)) {
						source = source.substring(0, idx1 + key1.length()) + s + source.substring(idx2);
						changed = true;
					}
				}
			}
			if (!changed) {
				key1 = "/*+$" + i + "+*/";
				idx1 = source.indexOf(key1);
				if (idx1 != -1) {
					String key2 = "/*-$" + i + "-*/";
					int idx2 = source.indexOf(key2);
					if (idx2 != -1) {
						String ss = source.substring(idx1 + key1.length(), idx2);
						String s = map.get(i);
						if (s != null && !s.equals(ss)) {
							source = source.substring(0, idx1 + key1.length()) + s + source.substring(idx2);
							changed = true;
						}
					}
				}
			}
		}
		
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(file);
			fos.write(source.getBytes("utf-8"));
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fos != null) {
				try {
					fos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

}
