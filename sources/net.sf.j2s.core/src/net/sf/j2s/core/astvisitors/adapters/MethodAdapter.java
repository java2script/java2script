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

package net.sf.j2s.core.astvisitors.adapters;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * @author zhou renjian
 *
 * 2006-12-3
 */
public class MethodAdapter extends AbstractPluginAdapter {

	private static Set<String> methodSet;
	private static Map<String, String> pmMap;
	private static final String PACKAGE_PREFIX;
	private static String[] mapDocument;
	private static String[] mapNode;
	private static String[] mapNodeList; 
	private static String[] mapNamedNodeMap;
	private static String[] mapCharacterData;
	private static String[] mapAttr;
	private static String[] mapElement;
	private static String[] mapDocumentType;
	private static String[] mapNotation;
	private static String[] mapEntity;
	private static String[] mapProcessingInstruction;

	public static boolean isMethodRegistered(String methodName) {
		return methodSet.contains(methodName);
	}

	public static String translate(String className, String methodName) {
		return pmMap.get(className + "." + methodName);
	}



	static {
		PACKAGE_PREFIX = "org.w3c.dom.";
		
		mapDocument = new String[] {
				"Document",
				"doctype",
				"implementation",
				"documentElement"
			};
		mapNode = new String[] {
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
		mapNodeList = new String[] {
				"NodeList",
				"length"
		};
		mapNamedNodeMap = new String[] {
			"NamedNodeMap",
			"length"
		};
		mapCharacterData = new String[] {
				"CharacterData",
				"data",
				"length"
		};
		mapAttr = new String[] {
				"Attr",
				"name",
				"specified",
				"value",
				"ownerElement",
		};
		mapElement = new String[] {
				"Element",
				"tagName"
		};
		mapDocumentType = new String[] {
				"DocumentType",
				"name",
				"entities",
				"notations",
				"publicId",
				"systemId",
				"internalSubset"
		};
		mapNotation = new String[] {
				"Notation",
				"publicId",
				"systemId"
		};
		mapEntity = new String[] {
				"Entity",
				"publicId",
				"systemId",
				"notationName"
		};
		mapProcessingInstruction = new String[] {
				"ProcessingInstruction",
				"target",
				"data"
		};

		init();
	}

	private static void init() {
		pmMap = new HashMap<String, String>();
		methodSet = new HashSet<String>();
		register("java.lang.Class", "forName", "Clazz.forName");
		register("java.lang.reflect.Array", "newInstance", "Clazz.array");
//		register("java.lang.String", "length", "length"); // BH no -- we need String to implement CharSequence. Both will be length$()
//		register("java.lang.CharSequence", "length", "length");//sgurin: fix for bug: CharSequence cs = "123"; cs.length();
		register("java.lang.String", "replace", "~replace");
		register("java.lang.String", "split", "~plit");
		MethodAdapter.registerAllMaps();
	}

	private static void register(String className, String methodName, String propertyName) {
		pmMap.put(className + "." + methodName, propertyName);
		methodSet.add(methodName);
	}

	private static void registerMap(String[] map) {
		for (int i = 1; i < map.length; i++) {
			register(PACKAGE_PREFIX + map[0], 
					"get" + map[i].substring(0, 1).toUpperCase() 
					+ map[i].substring(1), map[i]);
		}
	}

	private static void registerAllMaps() {
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
	}
	

}
