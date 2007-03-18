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

package net.sf.j2s.ui.actions;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * @author zhou renjian
 * 
 * 2006-5-3
 */
public class Bundle2StringUtil {
	public static void convert(String basePath, String bundleName) throws FileNotFoundException {
		String bundlePath = bundleName.replaceAll("\\.", "/") + ".properties";
		String content = readFileAll(new FileInputStream(
				new File(basePath, bundlePath)));
		String contentStr = content
				.replaceAll("\\s*#.*[\\r\\n]+", "")
				.replaceAll("\\\\", "\\\\\\\\").replaceAll(
				"\\t", "\\\\t").replaceAll("\\r", "\\\\r").replaceAll("\\n",
				"\\\\n").replaceAll("\\'", "\\\\'")
				.replaceAll("\\\"", "\\\\\"");
		String jsStr = "java.util.ResourceBundle.registerBundle(\""
				+ bundleName + "\", \"" + contentStr + "\");";
		//System.out.println(jsStr);
		try {
			bundlePath = bundleName.replaceAll("\\.", "/") + ".properties.js";
			FileOutputStream fos = new FileOutputStream(new File(basePath,
					bundlePath));
			fos.write(jsStr.getBytes());
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
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
