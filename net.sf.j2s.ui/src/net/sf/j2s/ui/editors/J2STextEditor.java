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
package net.sf.j2s.ui.editors;

import org.eclipse.jface.text.source.ISourceViewer;
import org.eclipse.ui.editors.text.TextEditor;

/**
 * @author zhou renjian
 *
 * 2006-2-1
 */
public class J2STextEditor extends TextEditor {

	public J2STextEditor() {
		super();
	}

	public void setReadOnly(boolean readOnly) {
		getSourceViewer().getTextWidget().setEditable(!readOnly);
	}
	
	public ISourceViewer getJ2SSourceViewer() {
		return getSourceViewer();
	}
}
