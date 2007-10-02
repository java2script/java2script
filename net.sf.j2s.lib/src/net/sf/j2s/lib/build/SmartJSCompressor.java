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
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author zhou renjian
 *
 * 2006-7-12
 */
public class SmartJSCompressor {
	/**
	 * @param args
	 * @throws IOException 
	 */
	public static void main(String[] args) throws IOException {
		if (args.length < 2) {
			System.out.println("Usage: \r\n" +
					"... <source.js> <dest.js> [variable=true|false] ...");
			return ;
		}
		String src = args[0];
		String dest = args[1];
		File srcFile = new File(src);
		if (!srcFile.exists()) {
			System.err.println("Error: source file " + srcFile.getAbsolutePath() + " does not exist!");
			return ;
		}
		/*
		File destFile = new File(dest);
		
		if (srcFile.exists() && destFile.exists() && srcFile.lastModified() <= destFile.lastModified()) {
			if ("Class.js".equals(srcFile.getName())) {
				File src2File = new File(srcFile.getParentFile(), "ClassExt.js");
				if (src2File.exists() && destFile.exists() && src2File.lastModified() <= destFile.lastModified()) {
					return ;
				}
			} else {
				return ;
			}
		}
		*/
		
		Map vals = new HashMap();
		if (args.length > 2) {
			for (int i = 2; i < args.length; i++) {
				if (args[i].indexOf("=") != -1) {
					String[] split = args[i].split("=");
					vals.put(split[0].trim(), new Boolean("true".equals(split[1].trim())));
				}
			}
		}
		Object veb = vals.get("verbose");
		boolean isVerbose = veb != null && (veb instanceof Boolean) && ((Boolean) veb).booleanValue();

		String source = RegExCompress.readFileAll(new FileInputStream(srcFile));
		if ("Class.js".equals(srcFile.getName())) {
			source += RegExCompress.readFileAll(new FileInputStream(new File(srcFile.getParentFile(), "ClassExt.js")));
		}
		int sourceLength = source.length();
		List blockInstructions = new ArrayList();
		int idx1 = source.lastIndexOf("#*/");
		while (idx1 != -1) {
			int idx2 = source.lastIndexOf("/*#", idx1 - 1);
			if (idx2 != -1) {
				String comment = source.substring(idx2 + 3, idx1 - 1);
				blockInstructions.add(new BlockScope(idx2, idx1 + 3, comment));
				/*
				*/
			} else {
				break;
			}
			idx1 = source.lastIndexOf("#*/", idx2 - 1);
		}
		if (blockInstructions.size() > 0) {
			StringBuffer buffer = new StringBuffer();
			boolean isScopeOpen = false;
			int begin = 0;
			BlockScope last = null;
			int index1 = -1, index2 = -1;
			for (int i = blockInstructions.size() - 1; i >= 0; i--) {
				BlockScope bs = (BlockScope) blockInstructions.get(i);
//				System.out.println(bs.command);
//				System.out.println(bs.begin);
				int index = 0;
				if ((index = bs.command.indexOf(">>x")) != -1) {
					index1 = index;
					isScopeOpen = true;
					last = bs;
				} else if ((index = bs.command.indexOf("x<<")) != -1) {
					index2 = index;
					if (isScopeOpen) {
						isScopeOpen = false;
						String instruction = last.command.substring(0, index1).trim();
						boolean isOK = false;
						if (instruction.startsWith("{$")) {
							String cond = instruction.substring(2, instruction.length() - 1);
							Object v = vals.get(cond);
							isOK = v != null && (v instanceof Boolean) && ((Boolean) v).booleanValue();
						} else {
							isOK = true;
						}
						if (isOK) {
							buffer.append(source.substring(begin, last.begin));
							begin = bs.end;
							String[] ss = getCommentString(bs.command.substring(index2 + 3));
							if (ss.length > 0) {
								for (int j = 0; j < ss.length; j++) {
									buffer.append(ss[j]);
									buffer.append("\r\n");
								}
							}
						}
					}
				}
			}
			if (begin != 0) {
				buffer.append(source.substring(begin));
				source = buffer.toString();
			}
		}
		System.out.println(1.0 * source.length() / sourceLength);
		
		blockInstructions = new ArrayList();
		idx1 = source.lastIndexOf("#-*/");
		while (idx1 != -1) {
			int idx2 = source.lastIndexOf("/*-#", idx1 - 1);
			if (idx2 != -1) {
				String comment = source.substring(idx2 + 4, idx1 - 1);
				String[] commentLines = getCommentString(comment);
				for (int i = 0; i < commentLines.length; i++) {
					blockInstructions.add(commentLines[i]);
				}
			} else {
				break;
			}
			idx1 = source.lastIndexOf("#-*/", idx2 - 1);
		}
		String[] lines = (String[]) blockInstructions.toArray(new String[0]);
//		System.out.println("-----" + lines.length);
		for (int i = 0; i < lines.length; i++) {
			String command = lines[i];
			if (command.indexOf("->") != -1) {
				String[] split = command.split("\\s*->\\s*");
				String from = split[0].trim().replaceAll("(\\$|\\.|\\[|\\(|\\)|\\])", "\\\\$0");
				String to = split[1].trim().replaceAll("\\$", "\\\\\\$");
				if (isVerbose) {
					System.out.println(from + "->" + to);
				}
				source = source.replaceAll(from, to);
			}
		}
		StringBuffer endBuffer = new StringBuffer();
		for (int i = 0; i < lines.length; i++) {
			String command = lines[i];
			if (command.startsWith("<<<")) {
				//System.out.println("<<<....");
				endBuffer.append(command.substring(3).trim());
				endBuffer.append("\r\n");
			}
		}
		if (endBuffer.length() != 0) {
			source += endBuffer.toString();
		}
		System.out.println(1.0 * source.length() / sourceLength);
		Object v = vals.get("link.compress");
		boolean isRegCompressOK = v != null && (v instanceof Boolean) && ((Boolean) v).booleanValue();
		if (isRegCompressOK) {
			source = RegExCompress.regexCompress(source);
		} else {
			source = RegExCompress.regexCompress2(source);
		}

		FileOutputStream fos = new FileOutputStream(dest);
		fos.write(new byte[] {(byte) 0xef, (byte) 0xbb, (byte) 0xbf}); // UTF-8 header!
		fos.write(source.getBytes("utf-8"));
		fos.close();
		System.out.println(1.0 * source.length() / sourceLength);
	}
	
	public static String[] getCommentString(String comment) {
		List all = new ArrayList();
		String[] split = comment.split("\r\n|\r|\n");
		boolean isAppending = false;
		for (int i = 0; i < split.length; i++) {
			split[i] = split[i].trim();
			if (split[i].startsWith("#")) {
				split[i] = split[i].substring(1).trim();
			}
			if (split[i].length() != 0) {
				if (split[i].indexOf("->") != -1) {
					all.add(split[i]);
				} else if (split[i].startsWith("<<<")) {
					isAppending = true;
					all.add(split[i]);
				} else if (split[i].startsWith("x<<")) {
					isAppending = false;
					all.add(split[i]);
				} else {
					if (isAppending) {
						all.add("<<< " + split[i]);
					} else {
						all.add(split[i]);
					}
				}
			}
		}
		return (String[]) all.toArray(new String[0]);
	}
	public static class BlockScope {
		public int begin;
		public int end;
		public String command;
		
		public BlockScope(int begin, int end, String command) {
			super();
			this.begin = begin;
			this.end = end;
			this.command = command;
		}
		
	}
}
