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
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

import net.sf.j2s.ui.Java2ScriptUIPlugin;

import org.eclipse.core.filesystem.EFS;
import org.eclipse.core.filesystem.IFileStore;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Platform;
import org.eclipse.core.runtime.content.IContentType;
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
import org.eclipse.ui.IWorkbench;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.IWorkbenchWindow;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.editors.text.EditorsUI;
import org.eclipse.ui.internal.editors.text.EditorsPlugin;
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
	public static boolean openEditor( ICompilationUnit unit) {
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
			try {
				Java2ScriptUIPlugin.getDefault().getWorkbench()
						.getActiveWorkbenchWindow().getActivePage()
						.openEditor(editorInput, getEditorID());
				return true;
			} catch (PartInitException e) {
				e.printStackTrace();
			}
		} else {
			IFileStore fileStore= EFS.getLocalFileSystem().getStore(new Path(file.getParent()));
			fileStore= fileStore.getChild(file.getName());
			if (!fileStore.fetchInfo().isDirectory() && fileStore.fetchInfo().exists()) {
				IEditorInput input= createEditorInput(fileStore);
				if (input == null) {
					return false;
				}
				IWorkbenchWindow fWindow = Java2ScriptUIPlugin.getDefault().getWorkbench()
						.getActiveWorkbenchWindow();
				String editorId= getEditorId(fWindow, fileStore);
				IWorkbenchPage page= fWindow.getActivePage();
				try {
					page.openEditor(input, editorId);
					return true;
				} catch (PartInitException e) {
					EditorsPlugin.log(e.getStatus());
				}
			}
		}
		return false;
	}
	/*
	 * XXX: Requested a helper to get the correct editor descriptor
	 *		see: https://bugs.eclipse.org/bugs/show_bug.cgi?id=110203
	 */
	private static String getEditorId(IWorkbenchWindow fWindow, IFileStore file) {
		IWorkbench workbench= fWindow.getWorkbench();
		IEditorRegistry editorRegistry= workbench.getEditorRegistry();
		IEditorDescriptor descriptor= editorRegistry.getDefaultEditor(file.getName(), getContentType(file));

		// check the OS for in-place editor (OLE on Win32)
		if (descriptor == null && editorRegistry.isSystemInPlaceEditorAvailable(file.getName()))
			descriptor= editorRegistry.findEditor(IEditorRegistry.SYSTEM_INPLACE_EDITOR_ID);
		
//		// check the OS for external editor
//		if (descriptor == null && editorRegistry.isSystemExternalEditorAvailable(file.getName()))
//			descriptor= editorRegistry.findEditor(IEditorRegistry.SYSTEM_EXTERNAL_EDITOR_ID);
		
		if (descriptor != null)
			return descriptor.getId();
		
		return EditorsUI.DEFAULT_TEXT_EDITOR_ID;
	}

	private static IContentType getContentType (IFileStore fileStore) {
		if (fileStore == null)
			return null;

		InputStream stream= null;
		try {
			stream= fileStore.openInputStream(EFS.NONE, null);
			return Platform.getContentTypeManager().findContentTypeFor(stream, fileStore.getName());
		} catch (IOException x) {
			EditorsPlugin.log(x);
			return null;
		} catch (CoreException x) {
			// Do not log FileNotFoundException (no access)
			if (!(x.getStatus().getException() instanceof FileNotFoundException))
				EditorsPlugin.log(x);
			
			return null;
		} finally {
			try {
				if (stream != null)
					stream.close();
			} catch (IOException x) {
				EditorsPlugin.log(x);
			}
		}
	}

	private static IEditorInput createEditorInput(IFileStore fileStore) {
		IFile workspaceFile= getWorkspaceFile(fileStore);
		if (workspaceFile != null)
			return new FileEditorInput(workspaceFile);
		return new JavaFileEditorInput(fileStore);
	}

	private static IFile getWorkspaceFile(IFileStore fileStore) {
		IWorkspace workspace= ResourcesPlugin.getWorkspace();
		IFile[] files= workspace.getRoot().findFilesForLocation(new Path(fileStore.toURI().getPath()));
		files= filterNonExistentFiles(files);
		if (files == null || files.length == 0)
			return null;
		if (files.length == 1)
			return files[0];
		return null;
	}

	private static IFile[] filterNonExistentFiles(IFile[] files){
		if (files == null)
			return null;

		int length= files.length;
		ArrayList existentFiles= new ArrayList(length);
		for (int i= 0; i < length; i++) {
			if (files[i].exists())
				existentFiles.add(files[i]);
		}
		return (IFile[])existentFiles.toArray(new IFile[existentFiles.size()]);
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
