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
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * @author zhou renjian
 *
 * 2006-7-29
 */
public class J2SConcat {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		boolean completelyCompressing = true;
		int indexDelta = 1;
		if (args.length > 0 && ("true".equals(args[0]) || "false".equals(args[0]))) {
			completelyCompressing = "true".equals(args[0]);
			indexDelta++;
		}
		File dest = new File(args[indexDelta - 1]);
		StringBuffer buf = new StringBuffer();
		String j2sKeySig = "/* http://j2s.sf.net/ */";
		buf.append(j2sKeySig);
		System.out.println("To " + dest.getAbsolutePath());
		boolean isAllFileEarlier = dest.exists();
		if (isAllFileEarlier) {
			for (int i = 0; i < args.length - 1 - indexDelta; i++) {
				File src = new File(args[indexDelta], args[i + 1 + indexDelta]);
				if (!src.exists()) {
					System.err.println("Source file " + src.getAbsolutePath() + " does not exist!");
					return ;
				}
//				System.out.println("Checking " + args[i + 1 + indexDelta] + " ...");
				if (src.lastModified() > dest.lastModified()) {
					isAllFileEarlier = false;
					break;
				}
			}
			if (isAllFileEarlier) {
				System.out.println("Already updated.");
				return;
			}
		}
		for (int i = 0; i < args.length - 1 - indexDelta; i++) {
			File src = new File(args[indexDelta], args[i + 1 + indexDelta]);
			try {
				String s = RegExCompress.readFileAll(new FileInputStream(src));
				if (s.startsWith(j2sKeySig)) {
					s = s.substring(j2sKeySig.length());
				}
				if (s.startsWith("Clazz.load") || s.startsWith("$_L")) {
					int idx1 = s.indexOf("{") + 1;
					if (idx1 != -1) {
						int idx2 = s.lastIndexOf("}");
						if (idx2 != -1) {
							s = s.substring(idx1, idx2);
						}
					}
				}
				/*
				if (completelyCompressing) {
					buf.append(RegExCompress.regexCompress(s));
				} else {
					buf.append(RegExCompress.regexCompress2(s));
				}
				*/
				buf.append(s);
			} catch (FileNotFoundException e) {
				e.printStackTrace();
				return;
			}
		}
		try {
			FileOutputStream fos = new FileOutputStream(dest);
			fos.write(new byte[] {(byte) 0xef, (byte) 0xbb, (byte) 0xbf}); // UTF-8 header!
			if (completelyCompressing) {
				fos.write(RegExCompress.regexCompress(buf.toString()).getBytes("UTF-8"));
			} else {
				fos.write(RegExCompress.regexCompress2(buf.toString()).getBytes("UTF-8"));
			}
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}
