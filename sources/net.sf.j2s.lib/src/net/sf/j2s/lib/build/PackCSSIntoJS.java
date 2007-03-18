/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.lib.build;

import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * @author zhou renjian
 *
 * 2006-8-5
 */
public class PackCSSIntoJS {
	/**
	 * @param args
	 * @throws IOException 
	 */
	public static void main(String[] args) throws IOException {
		if (args.length < 1) {
			System.out.println("Usage: ... <Folder that contains *.css and *.js>\r\n");
			return;
		}
		String base = args[0];
		File file = new File(base);
		if (!file.exists() || !file.isDirectory()) {
			System.out.println("Usage: ... <Folder that contains *.css and *.js>\r\n");
			return;
		}
		traverseCSSFile(file);
	}

	private static void traverseCSSFile(File folder) throws IOException {
		//System.out.println("Traversing " + folder.getName() + "...");
		File[] folders = folder.listFiles(new FileFilter() {
			public boolean accept(File pathname) {
				if (pathname.isDirectory()) {
					return true;
				}
				return false;
			}
		});
		for (int i = 0; i < folders.length; i++) {
			traverseCSSFile(folders[i]);
		}
		File[] cssFiles = folder.listFiles(new FileFilter() {
			public boolean accept(File pathname) {
				if (pathname.isFile() && pathname.getName().endsWith(".css")) {
					return true;
				}
				return false;
			}
		});
		for (int i = 0; i < cssFiles.length; i++) {
			File cssFile = cssFiles[i];
			String path = cssFile.getAbsolutePath();
			File jsFile = new File(path.substring(0, path.length() - 4) + ".js");
			if (jsFile.exists()) {
				String jsContent = RegExCompress.readFileAll(new FileInputStream(jsFile));
				String key = "$WTC$$.registerCSS";
				int idx1 = jsContent.indexOf(key);
				if (idx1 != -1) {
					int idx2 = jsContent.indexOf(");", idx1);
					if (idx2 != -1) {
						int idx3 = jsContent.indexOf(",", idx1);
						if (idx3 == -1 || idx3 > idx2) {
							// not packed yet
							idx3 = idx2;
							idx2 += 2;
						} else {
							// already packed
							idx2 = jsContent.indexOf(");\r\n", idx1);
							if (idx2 == -1) {
								System.err.println("O, no, packed CSS is not packed correctly.");
							} else {
								idx2 += 4;
							}
						}
						String cssContent = RegExCompress.readFileAll(new FileInputStream(cssFile));
						cssContent = cssContent
								.replaceAll("\\s*[\\r\\n]+", "\n") 
								// It's OK to remove unnecessary whitespace and line breaks
								.replaceAll("[\\r\\n]+\\s*", "\n")
								.replaceAll("\\\\", "\\\\\\\\")
								//.replaceAll("\\t", "\\\\t")
								//.replaceAll("\\r", "\\\\r")
								//.replaceAll("\\n", "\\\\n")
								.replaceAll("\\t", "")
								.replaceAll("\\r", "\\\\r")
								.replaceAll("\\n", "\\\\n")
								.replaceAll("\\'", "\\\\'")
								.replaceAll("\\\"", "\\\\\"");
						String jsContent2 = jsContent.substring(0, idx3) + ", \"" + cssContent + "\");\r\n" + jsContent.substring(idx2);
						if (!jsContent.equals(jsContent2)) {
							System.out.println("Updating " + jsFile.getName() + " ...");
							/*
							FileOutputStream fos = new FileOutputStream(jsFile);
							fos.write(jsContent2.getBytes());
							fos.close();
							*/
							try {
								FileOutputStream fos = new FileOutputStream(jsFile);
								fos.write(new byte[] {(byte) 0xef, (byte) 0xbb, (byte) 0xbf}); // UTF-8 header!
								fos.write(jsContent2.getBytes("UTF-8"));
								fos.close();
							} catch (IOException e) {
								e.printStackTrace();
							}
						}
					}
				}
			}
		}
	}
}
