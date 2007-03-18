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
 * 2006-5-3
 */
public class Bundle2StringUtil {

	/**
	 * @param args
	 * @throws FileNotFoundException
	 */
	public static void main(String[] args) throws FileNotFoundException {
		String bundleName = null;
		String basePath = "bin/";
		if (args.length != 0) {
			basePath = args[0];
			bundleName = args[1];
		} else {
			bundleName = "net.sf.j2s.java.core.messages";
		}
		String bundlePath = bundleName.replaceAll("\\.", "/") + ".properties";
		String content = RegExCompress.readFileAll(new FileInputStream(
				new File(basePath, bundlePath)));
		String contentStr = content
				.replaceAll("\\s*#.*[\\r\\n]+", "")
				.replaceAll("\\\\", "\\\\\\\\").replaceAll(
				"\\t", "\\\\t").replaceAll("\\r", "\\\\r").replaceAll("\\n",
				"\\\\n").replaceAll("\\'", "\\\\'")
				.replaceAll("\\\"", "\\\\\"");
		String jsStr = "java.util.ResourceBundle.registerBundle(\""
				+ bundleName + "\", \"" + contentStr + "\");";
		System.out.println(jsStr);
		if (args.length != 0) {
			try {
				bundlePath = bundleName.replaceAll("\\.", "/") + ".js";
				FileOutputStream fos = new FileOutputStream(new File(basePath,
						bundlePath));
				fos.write(jsStr.getBytes());
				fos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}
