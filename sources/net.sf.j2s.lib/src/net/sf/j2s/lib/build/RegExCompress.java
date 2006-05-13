/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.lib.build;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author josson smith
 *
 * 2006-2-20
 */
public class RegExCompress {

	public static String mk(String str, String regex, String replacement) {
		Matcher matcher = Pattern.compile(regex).matcher(str);
		matcher.reset();
        boolean result = matcher.find();
        if (result) {
            StringBuffer sb = new StringBuffer();
            do {
            	if (matcher.group(10) != null) {
            		matcher.appendReplacement(sb, "$10 $11");
            	} else if (matcher.group(13) != null) {
            		matcher.appendReplacement(sb, "$13 $14");
            	} else {
            		matcher.appendReplacement(sb, replacement);
            	}
                result = matcher.find();
            } while (result);
            matcher.appendTail(sb);
            return sb.toString();
        }
		return str;
	}
	/**
	 * @param args
	 * @throws FileNotFoundException 
	 */
	public static void main(String[] args) throws FileNotFoundException {
		for (int i = 0; i < (args.length - 1) / 2; i++) {
			File src = new File(args[0], args[i + i + 1]);
			File dest = new File(args[0], args[i + i + 2]);
			pack(src, dest);
		}
	}
	private static void pack(File src, File dest) throws FileNotFoundException {
		if (src.exists() && dest.exists() && src.lastModified() <= dest.lastModified()) {
			return ;
		}
		if (!src.exists()) {
			System.err.println("Source file " + src.getAbsolutePath() + " does not exist!");
			return ;
		}
		String s = readFileAll(new FileInputStream(src));
		s = regexCompress(s);
		try {
			FileOutputStream fos = new FileOutputStream(dest);
			String compressedStr = "/* http://j2s.sf.net/ */" + s;
			fos.write(compressedStr.getBytes());
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public static String regexCompress(String str) {
		String regEx = "('[^'\\n\\r]*')|" + // 1:1
				"(\"[^\"\\n\\r]*\")|" + // 1:2
				"(\\/\\/[^\\n\\r]*[\\n\\r])|" + // 1:3
				"(\\/\\*[^*]*\\*+([^\\/][^*]*\\*+)*\\/)|" + // 2:4,5
				"(\\s+(\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*))|" + // 2:6,7
				"([^\\w\\x24\\/'\"*)\\?:]\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*)"; // 1:8
		//str = str.replaceAll(regEx,	"$1$2$7$8");
		str = mk(str, regEx +
				"|((\\b|\\x24)\\s+(\\b|\\x24))|" + // 3:9,10,11
				"(([+\\-])\\s+([+\\-]))|" + // 3:12,13,14
				"(\\s+)",
				"$1$2$7$8");
		return str;
	}
	public static String readFileAll(InputStream res) {
		try {
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			byte[] buf = new byte[1024];
			int read = 0;
			while ((read = res.read(buf)) != -1) {
				baos.write(buf, 0, read);
			}
			res.close();
			return baos.toString();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "Missing";
	}

}
