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
 * @author zhou renjian
 *
 * 2006-12-3
 */
public class ASTMethodVisitor extends ASTTypeVisitor {

	private static Set methodSet;
	private static Map pmMap;

	static {
		init();
	}

	public static void init() {
		pmMap = new HashMap();
		methodSet = new HashSet();
		register("java.lang.String", "length", "length");
		register("java.lang.String", "replace", "~replace");
		register("java.lang.String", "split", "~plit");
		ASTMethodVisitor.registerAllMaps();
	}

	public static boolean isMethodRegistered(String methodName) {
		return methodSet.contains(methodName);
	}

	public static void register(String className, String methodName, String propertyName) {
		pmMap.put(className + "." + methodName, propertyName);
		methodSet.add(methodName);
	}

	public static String translate(String className, String methodName) {
		return (String) pmMap.get(className + "." + methodName);
	}

	public static final String PACKAGE_PREFIX = "org.w3c.dom.";
	public static String[] mapDocument = new String[] {
		"Document",
		"doctype",
		"implementation",
		"documentElement"
	};
	public static String[] mapNode = new String[] {
		"Node",
		"nodeName",
		"nodeValue",
		"nodeType",
		"parentNode",
		"childNodes",
		"firstChild",
		"lastChild",
		"previousSibling",
		"nextSibling",
		"attributes",
		"ownerDocument",
		"namespaceURI",
		"prefix",
		"localName"
	};
	public static String[] mapNodeList = new String[] {
		"NodeList",
		"length"
	};
	public static String[] mapNamedNodeMap = new String[] {
		"NamedNodeMap",
		"length"
	};
	public static String[] mapCharacterData = new String[] {
		"CharacterData",
		"data",
		"length"
	};
	public static String[] mapAttr = new String[] {
		"Attr",
		"name",
		"specified",
		"value",
		"ownerElement",
	};
	public static String[] mapElement = new String[] {
		"Element",
		"tagName"
	};
	public static String[] mapDocumentType = new String[] {
		"DocumentType",
		"name",
		"entities",
		"notations",
		"publicId",
		"systemId",
		"internalSubset"
	};
	public static String[] mapNotation = new String[] {
		"Notation",
		"publicId",
		"systemId"
	};
	public static String[] mapEntity = new String[] {
		"Entity",
		"publicId",
		"systemId",
		"notationName"
	};
	public static String[] mapProcessingInstruction = new String[] {
		"ProcessingInstruction",
		"target",
		"data"
	};

	protected static void registerMap(String[] map) {
		for (int i = 1; i < map.length; i++) {
			register(PACKAGE_PREFIX + map[0], 
					"get" + map[i].substring(0, 1).toUpperCase() 
					+ map[i].substring(1), map[i]);
		}
	}

	public static void registerAllMaps() {
		registerMap(mapDocument);
		registerMap(mapNode);
		registerMap(mapNodeList);
		registerMap(mapNamedNodeMap);
		registerMap(mapCharacterData);
		registerMap(mapAttr);
		registerMap(mapElement);
		registerMap(mapDocumentType);
		registerMap(mapNotation);
		registerMap(mapEntity);
		registerMap(mapProcessingInstruction);
	}}
