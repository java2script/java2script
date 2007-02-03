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
package net.sf.j2s.ui.editors;

import org.eclipse.jface.text.source.ISourceViewer;
import org.eclipse.ui.editors.text.TextEditor;

/**
 * @author josson smith
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
