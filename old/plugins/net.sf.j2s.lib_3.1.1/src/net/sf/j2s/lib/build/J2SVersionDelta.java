/*******************************************************************************
 * Copyright (c) 2010 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.lib.build;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author zhou renjian
 *
 * 2010-4-18
 */
public class J2SVersionDelta {

	private static String readFileContent(File file) {
		FileInputStream res = null;
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		byte[] buf = new byte[1024];
		int read = 0;
		try {
			res = new FileInputStream(file);
			while ((read = res.read(buf)) != -1) {
				baos.write(buf, 0, read);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (res != null) {
				try {
					res.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return baos.toString();
	}

	private static void traverseFolder(File file, String baseFolder, String oldVersion, List deltas) {
		File[] files = file.listFiles();
		if (files != null && files.length > 0) {
			for (int i = 0; i < files.length; i++) {
				File f = files[i];
				if (f.isDirectory()) {
					traverseFolder(f, baseFolder, oldVersion, deltas);
				} else {
					String absPath = f.getAbsolutePath();
					String relativePath = absPath.substring(baseFolder.length() + 1);
					int idx = relativePath.indexOf(File.separator);
					relativePath = relativePath.substring(idx + 1);
					String oldPath = baseFolder + File.separator + oldVersion + File.separator + relativePath;
					File oldFile = new File(oldPath);
					
					if (!oldFile.exists() || oldFile.length() != f.length()) {
						deltas.add(relativePath);
					} else {
						String content = readFileContent(f);
						String oldContent = readFileContent(oldFile);
						if (!content.equals(oldContent)) {
							deltas.add(relativePath);
						}
					}
				}
			}
		}
	}
	
	public static void main(String[] args) {
		if (args == null || args.length != 3) {
			System.out.println("Usage:\r\nJ2SVersionDelta <base folder> <original version alias> <updated version alias>");
			return;
		}

		String oldVersion = args[1];
		String newVersion = args[2];
		File originalFolder = new File(args[0], oldVersion);
		File updatedFolder = new File(args[0], newVersion);
		if (!originalFolder.exists()) {
			System.out.println("Folder " + oldVersion + " does not exist!");
			return;
		}
		if (!updatedFolder.exists()) {
			System.out.println("Folder " + newVersion + " does not exist!");
			return;
		}
		String basePath = new File(args[0]).getAbsolutePath();
		ArrayList deltas = new ArrayList();
		traverseFolder(updatedFolder, basePath, oldVersion, deltas);
		int size = deltas.size();
		if (size > 0) {
			System.out.println("window[\"j2s.update.delta\"] = [");
			for (int i = 0; i < size; i++) {
				String path = (String) deltas.get(i);
				if (i > 0) {
					System.out.print("\t\"$\", \"$\", ");
				} else {
					System.out.print("\t\"" + oldVersion + "\", ");
					System.out.print("\"" + newVersion + "\", ");
				}
				System.out.print("\"" + path.replace('\\', '/') + "\"");
				if (i == size - 1) {
					System.out.println();
				} else {
					System.out.println(",");
				}
			}
			System.out.println("];");
		} else {
			System.out.println("There is no updates!");
		}
	}

}
