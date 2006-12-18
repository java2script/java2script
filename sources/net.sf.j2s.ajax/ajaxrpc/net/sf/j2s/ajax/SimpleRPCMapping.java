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

package net.sf.j2s.ajax;

/**
 * This class gives developers an optional way to map those long Simple RPC URL into short URL.
 * This class may help to publish Simple RPC services. It is OK to not use this class.
 *  
 * @author zhou renjian
 *
 * 2006-12-19
 */
public class SimpleRPCMapping {
	private String[][] map = new String[8][];
	
	/**
	 * Return the SimpleRPCRunnable service class name by the given relative URL.
	 * This method will called in server side.
	 *  
	 * @param relativeURL
	 * @return SimpleRPCRunnable serivce class name if relative URL is mapped, or null.
	 */
	public String getRunnableClassName(String relativeURL) {
		for (int i = 0; i < map.length; i++) {
			if (map[i] != null) {
				if (relativeURL.equals(map[i][0])) {
					return map[i][1];
				}
			}
		}
		return null;
	}
	
	/**
	 * Return the short url for the given class name.
	 * This method will be called in client side.
	 * 
	 * @param clazzName
	 * @return SimpleRPCRunnable service short url if the service is registered, or null
	 */
	public String getRunnableURL(String clazzName) {
		for (int i = 0; i < map.length; i++) {
			if (map[i] != null) {
				if (clazzName.equals(map[i][1])) {
					return map[i][0];
				}
			}
		}
		return null;
	}
	
	/**
	 * Add mapping pair.
	 * @param url
	 * @param clazzName
	 * @return whether the map is updated or not.
	 */
	public boolean add(String url, String clazzName) {
		int length = map.length;
		if (url == null && clazzName == null) {
			return false;
		}
		if (url == null) { // delete clazzName specified item
			for (int i = 0; i < length; i++) {
				if (map[i] != null) {
					if (clazzName.equals(map[i][1])) {
						map[i] = null;
						return true; // return true for updated
					}
				}
			}
			return false;
		}
		/*
		 * Different class names may map to the same relative URL.
		 * 
		if (clazzName == null) { // delete url specified item
			for (int i = 0; i < length; i++) {
				if (map[i] != null) {
					if (url.equals(map[i][0])) {
						map[i] = null;
						return true; // return true for updated
					}
				}
			}
			return false;
		}
		*/
		for (int i = 0; i < length; i++) {
			if (map[i] != null) {
				if (/*url.equals(map[i][0]) || */clazzName.equals(map[i][1])) {
					// just return and do not update it!
					return false;
				}
			}
		}
		for (int i = 0; i < length; i++) {
			if (map[i] == null) {
				map[i] = new String[2];
				map[i][0] = url;
				map[i][1] = clazzName;
				return true;
			}
		}
		String[][] newMap = new String[length + 8][];
		for (int i = 0; i < length; i++) {
			newMap[i] = map[i];
		}
		newMap[length] = new String[2];
		newMap[length][0] = url;
		newMap[length][1] = clazzName;
		map = newMap;
		return true;
	}
}
