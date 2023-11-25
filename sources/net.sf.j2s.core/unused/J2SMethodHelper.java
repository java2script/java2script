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

package j2s.jmol.common;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.Modifier;

/**
 * @author zhou renjian
 *
 * 2006-12-3
 */
public class J2SMethodHelper extends J2SHelper {

	private static Set<String> methodSet;
	private static Map<String, String> pmMap;
	public static final String PACKAGE_PREFIX;
	public static String[] mapDocument;
	public static String[] mapNode;
	public static String[] mapNodeList; 
	public static String[] mapNamedNodeMap;
	public static String[] mapCharacterData;
	public static String[] mapAttr;
	public static String[] mapElement;
	public static String[] mapDocumentType;
	public static String[] mapNotation;
	public static String[] mapEntity;
	public static String[] mapProcessingInstruction;


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

	public static void init() {
		pmMap = new HashMap<String, String>();
		methodSet = new HashSet<String>();
		register("java.lang.String", "length", "length");
		register("java.lang.CharSequence", "length", "length");//sgurin: fix for bug: CharSequence cs = "123"; cs.length();
		register("java.lang.String", "replace", "~replace");
		register("java.lang.String", "split", "~plit");
		J2SMethodHelper.registerAllMaps();
	}

	public boolean isMethodRegistered(String methodName) {
		return methodSet.contains(methodName);
	}

	public static void register(String className, String methodName, String propertyName) {
		pmMap.put(className + "." + methodName, propertyName);
		methodSet.add(methodName);
	}

	public String translate(String className, String methodName) {
		return pmMap.get(className + "." + methodName);
	}

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
	}
	


	private boolean testForceOverriding(IMethodBinding method) {
		if(method == null){
			return true;
		}
		String methodName = method.getName();
		ITypeBinding classInHierarchy = method.getDeclaringClass();
		do {
			IMethodBinding[] methods = classInHierarchy.getDeclaredMethods();
			int count = 0;
			IMethodBinding superMethod = null;
			for (int i= 0; i < methods.length; i++) {
				if (methodName.equals(methods[i].getName())) {
					count++;
					superMethod = methods[i];
				}
			}
			if (count > 1 || count == 1  && superMethod != null 
				&& (!BindingHelper.isSubsignature(method, superMethod)
						||(superMethod.getModifiers() & Modifier.PRIVATE) != 0)) {
				return false;
			}
			classInHierarchy = classInHierarchy.getSuperclass();
		} while (classInHierarchy != null);
		return true;
	}

	/**
	 * Check whether the given method can be defined by "Clazz.overrideMethod" or not.
	 * @param node
	 * @return
	 */
	protected boolean canAutoOverride(MethodDeclaration node) {
		boolean isOK2AutoOverriding = false;
		IMethodBinding methodBinding = node.resolveBinding();
		if (methodBinding != null && testForceOverriding(methodBinding)) {
			IMethodBinding superMethod = BindingHelper.findMethodDeclarationInHierarchy(methodBinding.getDeclaringClass(), methodBinding);
			if (superMethod != null) {
				ASTNode parentRoot = node.getParent();
				while (parentRoot != null && !(parentRoot instanceof AbstractTypeDeclaration)) {
					parentRoot = parentRoot.getParent();
				}
				if (parentRoot != null) {
					isOK2AutoOverriding = !MethodReferenceASTVisitor.checkReference(parentRoot, superMethod.getKey());
				}
			}
		}
		return isOK2AutoOverriding;
	}

}
