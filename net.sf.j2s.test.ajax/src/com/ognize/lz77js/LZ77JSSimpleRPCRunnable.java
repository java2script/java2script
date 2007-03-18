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

package com.ognize.lz77js;

import net.sf.j2s.ajax.SimpleRPCRunnable;

/**
 * @author zhou renjian
 *
 * 2006-10-10
 */
public class LZ77JSSimpleRPCRunnable extends SimpleRPCRunnable {
	public String jsContent;
	public boolean toRegExpCompress;
	public boolean addLZ77Header;
	public String result;
	
	public String getHttpURL() {
		/*
		 * In JavaScript, this url must NOT be cross site URL!
		 */
		return "http://bl.ognize.com/lz77js/simplerpc"; /* this url doesn't work yet! */
	}

	public void ajaxRun() {
		/*
		if (toRegExpCompress) {
			jsContent = RegExCompress.regexCompress(jsContent);
		}
		J2SGZipUtil.PACK_WITH_DECODER = addLZ77Header;
		StringBuffer buf = new StringBuffer();
		J2SGZipEncode.zipping(jsContent, buf, toRegExpCompress);
		result = buf.toString();
		jsContent = null;
		*/
		result = "/* local lz77js call */\r\n" + jsContent;
		jsContent = null;
	}

}
