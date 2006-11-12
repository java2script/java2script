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

package net.sf.j2s.core.astvisitors;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * @author josson smith
 *
 * 2006-2-15
 */
public class PropertyMethodMap {

	private PropertyMethodMap() {
		super();
	}
	
	private static Map pmMap;
	
	private static Set methodSet;
	
	static {
		init();
	}
	
	public static void init() {
		pmMap = new HashMap();
		methodSet = new HashSet();
		register("java.lang.String", "length", "length");
		register("java.lang.String", "replace", "~replace");
		register("java.lang.String", "split", "~plit");
		W3CDOM2Map.registerAllMaps();
	}
	
	public static void register(String className, String methodName, String propertyName) {
//		pmMap.put(className + "." + methodName, new PMPair(className, methodName, propertyName));
		pmMap.put(className + "." + methodName, propertyName);
		methodSet.add(methodName);
	}
	
	public static boolean isMethodRegistered(String methodName) {
		return methodSet.contains(methodName);
	}
	
	public static String translate(String className, String methodName) {
		return (String) pmMap.get(className + "." + methodName);
//		PMPair pair = (PMPair) pmMap.get(className + "." + methodName);
//		if (pair == null) {
//			return null;
//		} else {
//			return pair.propertyName;
//		}
	}
	
	
//	private static class PMPair {
//		String className;
//		String methodName;
//		String propertyName;
//		
//		private PMPair() {
//			super();
//		}
//
//		public PMPair(String className, String methodName, String propertyName) {
//			super();
//			this.className = className;
//			this.methodName = methodName;
//			this.propertyName = propertyName;
//		}
//		
//		/* (non-Javadoc)
//		 * @see java.lang.Object#equals(java.lang.Object)
//		 */
//		public boolean equals(Object obj) {
//			if (obj == null || !(obj instanceof PMPair)) {
//				return false;
//			}
//			PMPair pair = (PMPair) obj;
//			return (className.equals(pair.className) 
//					&& methodName.equals(pair.methodName)
//					&& propertyName.equals(pair.propertyName));
//		}
//		
//		/* (non-Javadoc)
//		 * @see java.lang.Object#hashCode()
//		 */
//		public int hashCode() {
//			return this.className.hashCode() 
//					^ this.methodName.hashCode() 
//					^ this.propertyName.hashCode();
//		}
//	}
}
