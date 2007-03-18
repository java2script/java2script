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

package net.sf.j2s.ui.text.javadoc;

/**
 * @author zhou renjian
 *
 * 2006-5-3
 */
/**
 * Javadoc tag constants.
 *
 * @since 3.0
 */
public interface IJavaDocTagConstants {

	/** Javadoc general tags */
	public static final String[] JAVADOC_GENERAL_TAGS= new String[] { 
		"@j2sIgnore", //$NON-NLS-1$
		"@j2sDebug", //$NON-NLS-1$
		"@j2sKeep", //$NON-NLS-1$
		"@j2sNative", //$NON-NLS-1$
		"@j2sNativeSrc", //$NON-NLS-1$
		"@j2sOverride", //$NON-NLS-1$
		"@j2sIgnoreSuperConstructor", //$NON-NLS-1$
		"@j2sRequireImport", //$NON-NLS-1$
		"@j2sOptionalImport", //$NON-NLS-1$
		"@j2sIgnoreImport", //$NON-NLS-1$
		"@j2sPrefix", //$NON-NLS-1$
		"@j2sSuffix" };//$NON-NLS-1$
	//"@author", "@deprecated", "@docRoot", "@exception", "@inheritDoc", "@link", "@linkplain", "@param", "@return", "@see", "@serial", "@serialData", "@serialField", "@since", "@throws", "@value", "@version" }; 

	/** Javadoc link tags */
	public static final String[] JAVADOC_LINK_TAGS= new String[] { }; //"@docRoot", "@inheritDoc", "@link", "@linkplain" }; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$ //$NON-NLS-4$

	/** Javadoc parameter tags */
	public static final String[] JAVADOC_PARAM_TAGS= new String[] { }; // "@exception", "@param", "@serialField", "@throws" }; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$ //$NON-NLS-4$

	/** Javadoc reference tags */
	public static final String[] JAVADOC_REFERENCE_TAGS= new String[] { }; //"@see" }; //$NON-NLS-1$

	/** Javadoc root tags */
	public static final String[] JAVADOC_ROOT_TAGS= new String[] { }; // "@author", "@deprecated", "@return", "@see", "@serial", "@serialData", "@since", "@version", "@inheritDoc" }; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$ //$NON-NLS-4$ //$NON-NLS-5$ //$NON-NLS-6$ //$NON-NLS-7$ //$NON-NLS-8$ //$NON-NLS-9$

	/** Javadoc tag prefix */
	public static final char JAVADOC_TAG_PREFIX= '@';
}
