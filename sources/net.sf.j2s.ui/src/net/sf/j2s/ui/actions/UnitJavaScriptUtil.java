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

package net.sf.j2s.ui.actions;

import java.io.File;

import net.sf.j2s.ui.Java2ScriptUIPlugin;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Platform;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.internal.core.PackageFragmentRoot;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.IEditorDescriptor;
import org.eclipse.ui.IEditorInput;
import org.eclipse.ui.IEditorRegistry;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.editors.text.EditorsUI;
import org.eclipse.ui.internal.editors.text.JavaFileEditorInput;
import org.eclipse.ui.part.FileEditorInput;

/**
 * @author josson smith
 *
 * 2006-4-30
 */
public class UnitJavaScriptUtil {
	protected static String getEditorID() {
		IEditorRegistry editorRegistry = Java2ScriptUIPlugin
				.getDefault().getWorkbench().getEditorRegistry();
		IEditorDescriptor descriptor = editorRegistry
				.getDefaultEditor("j2s.js", Platform
						.getContentTypeManager()
						.findContentTypeFor("j2s.js"));
		String editorID = null;
		if (descriptor != null) {
			editorID = descriptor.getId();
		} else {
			editorID = EditorsUI.DEFAULT_TEXT_EDITOR_ID;
		}
		return editorID;
	}
	public static boolean openEditor(ICompilationUnit unit) {
		String relativePath = getRelativeJSPath(unit);
		IJavaModel javaModel = unit.getJavaModel();
		File file = new File(javaModel.getResource()
				.getLocation().toOSString(), relativePath);
		
		IFile[] files = javaModel.getWorkspace().getRoot()
				.findFilesForLocation(
						Path.fromPortableString(relativePath));
		IEditorInput editorInput = null;
		if (files != null && files.length != 0) {
			editorInput = new FileEditorInput(files[0]);
		} else {
			editorInput = new JavaFileEditorInput(file);
		}
		try {
			Java2ScriptUIPlugin.getDefault().getWorkbench()
					.getActiveWorkbenchWindow().getActivePage()
					.openEditor(editorInput, getEditorID());
			return true;
		} catch (PartInitException e) {
			e.printStackTrace();
		}
		return false;
	}
	protected static String getRelativeJSPath(ICompilationUnit unit) {
		if (unit == null) {
			return null;
		}
		IJavaProject javaProject = unit.getJavaProject();
		if (javaProject != null) {
			String relativePath = null;
			IJavaElement parent = unit.getParent();
			while (parent != null) {
				if (parent instanceof PackageFragmentRoot) {
					relativePath = unit.getPath().toPortableString()
							.substring(
									parent.getPath().toPortableString()
											.length());
					break;
				}
				parent = parent.getParent();
			}
			IPath outputLocation = null;
			try {
				outputLocation = javaProject.getOutputLocation();
			} catch (JavaModelException e) {
				e.printStackTrace();
			}
			if (outputLocation != null && relativePath != null) {
				relativePath = outputLocation
						+ relativePath.substring(0, relativePath
								.lastIndexOf('.')) + ".js";
				return relativePath;
			}
		}
		return null;
	}

	public static boolean isUnitJSExisted(ICompilationUnit unit) {
		File file = new File(unit.getJavaModel().getResource()
				.getLocation().toOSString(), getRelativeJSPath(unit));
		return file.exists();
	}
	public static void popupError() {
		Shell shell = new Shell();
		MessageDialog.openError(shell, "Generated JavaScript",
				"Error occurs while opening the generated JavaScript file.");
	}
}
