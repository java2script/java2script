package net.sf.j2s.ajax;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 
 * @author zhourenjian
 *
 * @j2sIgnore
 */
public class SourceUtils {

	public static void insertLineComment(StringBuilder source, String indent, int index, boolean blankLine) {
		source.append(indent).append("//+$").append(index).append("+\r\n");
		source.append(indent).append("//-$").append(index).append("-\r\n");
		if (blankLine) {
			source.append("\r\n");
		}
	}

	public static void wrapALineWithLineComment(StringBuilder source, String indent, int index, String line, boolean blankLine) {
		source.append(indent).append("//+$").append(index).append("+\r\n");
		source.append(indent).append(line).append("\r\n");
		source.append(indent).append("//-$").append(index).append("-\r\n");
		if (blankLine) {
			source.append("\r\n");
		}
	}

	public static void openLineComment(StringBuilder source, String indent, int index) {
		source.append(indent).append("//+$").append(index).append("+\r\n");
	}
	
	public static void closeLineComment(StringBuilder source, String indent, int index, boolean blankLine) {
		source.append(indent).append("//-$").append(index).append("-\r\n");
		if (blankLine) {
			source.append("\r\n");
		}
	}

	public static void insertBlockComment(StringBuilder source, int index) {
		source.append(" /*+$").append(index).append("+*/  /*-$").append(index).append("-*/ ");
	}
	
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
		if (oldSource.length() > 0) {
			Pattern regExp = Pattern.compile("\\/[\\/|\\*]\\+\\$(\\d+)\\+");
			Matcher matcher = regExp.matcher(source);
			List<String> allIndexes = new ArrayList<String>();
			while (matcher.find()) {
				String indexStr = matcher.group(1);
				allIndexes.add(indexStr);
			}
			int position = 0;
			Map<String, String> map = new HashMap<String, String>();
			for (Iterator<String> itr = allIndexes.iterator(); itr.hasNext();) {
				String i = (String) itr.next();
				boolean got = false;
				String key1 = "//+$" + i + "+";
				int idx1 = oldSource.indexOf(key1, position);
				if (idx1 != -1) {
					String key2 = "//-$" + i + "-";
					int idx2 = oldSource.indexOf(key2, position + key1.length());
					if (idx2 != -1) {
						String s = oldSource.substring(idx1 + key1.length(), idx2);
						map.put(i, s);
						got = true;
						position = idx2 + key2.length();
					}
				}
				if (!got) {
					key1 = "/*+$" + i + "+*/";
					idx1 = oldSource.indexOf(key1, position);
					if (idx1 != -1) {
						String key2 = "/*-$" + i + "-*/";
						int idx2 = oldSource.indexOf(key2, position + key1.length());
						if (idx2 != -1) {
							String s = oldSource.substring(idx1 + key1.length(), idx2);
							map.put(i, s);
							got = true;
							position = idx2 + key2.length();
						}
					}
				}
			}
			position = 0;
			for (Iterator<String> itr = allIndexes.iterator(); itr.hasNext();) {
				String i = (String) itr.next();
				boolean changed = false;
				String key1 = "//+$" + i + "+";
				int idx1 = source.indexOf(key1, position);
				if (idx1 != -1) {
					String key2 = "//-$" + i + "-";
					int idx2 = source.indexOf(key2, position + key1.length());
					if (idx2 != -1) {
						String ss = source.substring(idx1 + key1.length(), idx2);
						String s = map.get(i);
						if (s != null && !s.equals(ss)
								&& !(s.trim().length() == 0 && ss.trim().length() == 0)) {
							source = source.substring(0, idx1 + key1.length()) + s + source.substring(idx2);
							changed = true;
						}
						position = idx2 + key2.length();
					}
				}
				if (!changed) {
					key1 = "/*+$" + i + "+*/";
					idx1 = source.indexOf(key1, position);
					if (idx1 != -1) {
						String key2 = "/*-$" + i + "-*/";
						int idx2 = source.indexOf(key2, position + key1.length());
						if (idx2 != -1) {
							String ss = source.substring(idx1 + key1.length(), idx2);
							String s = map.get(i);
							if (s != null && !s.equals(ss)
									&& !(s.trim().length() == 0 && ss.trim().length() == 0)) {
								source = source.substring(0, idx1 + key1.length()) + s + source.substring(idx2);
								changed = true;
							}
						}
						position = idx2 + key2.length();
					}
				}
			}
			
			if (source.equals(oldSource)) {
				return;
			} else {
				@SuppressWarnings("deprecation")
				String copyrightYear = " Copyright (c) " + (new Date().getYear() + 1900);
				String updatedSource = oldSource.replaceFirst(" Copyright \\(c\\) \\d{4}", copyrightYear);
				if (source.equals(updatedSource)) {
					return;
				}
			}
		}
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(file);
			fos.write(source.getBytes("UTF-8"));
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
