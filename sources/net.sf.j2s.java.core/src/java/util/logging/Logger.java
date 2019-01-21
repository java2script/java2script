/*
 * Copyright (c) 2000, 2014, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */


package java.util.logging;

import java.net.URL;

public class Logger {

	public void addHandler(Handler handler) {
		// TODO Auto-generated method stub
		
	}

	public void fine(String string) {
		// TODO Auto-generated method stub
		
	}

	static Logger logger;
	
	public static Logger getLogger(String string) {
		return (logger == null ? (logger = new Logger()) : logger);
	}

	public boolean isLoggable(Level fine) {
		// TODO Auto-generated method stub
		return false;
	}

	public void log(Level fine, String string, Exception ignored) {
 	}

	public void log(Level fine, String string, Object[] objects) {
		
	}

	public void log(Level fine, String string, String string2) {
		// TODO Auto-generated method stub
		
	}

	public void log(Level fine, String string, URL url) {
		// TODO Auto-generated method stub
		
	}

	public void log(Level fine, String string) {
		// TODO Auto-generated method stub
		
	}

	public void setUseParentHandlers(boolean b) {
		// TODO Auto-generated method stub
		
	}

	public void setLevel(Level all) {
		// TODO Auto-generated method stub
		
	}
}
