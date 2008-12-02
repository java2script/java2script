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
package net.sf.j2s.ui.property;

/**
 * @author zhou renjian
 *
 * 2006-2-1
 */
public class J2SCategory {
	private J2SClasspathModel parent;
	private String key;
	public J2SCategory(J2SClasspathModel parent, String key) {
		super();
		this.parent = parent;
		this.key = key;
	}
	public String getKey() {
		return key;
	}
	public J2SClasspathModel getParent() {
		return parent;
	}
	public boolean equals(Object obj) {
		if (obj == null || !(obj instanceof J2SCategory)) {
			return false;
		}
		J2SCategory ctg = (J2SCategory) obj;
		if (ctg.key != null && ctg.key.equals(key)) {
			return true;
		}
		return false;
	}
	public int hashCode() {
		if (key != null) {
			return key.hashCode();
		}
		return super.hashCode();
	}
}
