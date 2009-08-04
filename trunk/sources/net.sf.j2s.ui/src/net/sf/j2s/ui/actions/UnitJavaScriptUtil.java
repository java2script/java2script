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

package net.sf.j2s.ui.actions;

import java.io.File;
import java.util.ArrayList;

import net.sf.j2s.ui.Java2ScriptUIPlugin;

import org.eclipse.core.filesystem.EFS;
import org.eclipse.core.filesystem.IFileStore;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
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
import org.eclipse.osgi.util.NLS;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.IEditorDescriptor;
import org.eclipse.ui.IEditorInput;
import org.eclipse.ui.IEditorRegistry;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.IWorkbenchWindow;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.editors.text.EditorsUI;
import org.eclipse.ui.ide.FileStoreEditorInput;
import org.eclipse.ui.ide.IDE;
import org.eclipse.ui.internal.ide.IDEWorkbenchMessages;
import org.eclipse.ui.internal.ide.IDEWorkbenchPlugin;
import org.eclipse.ui.part.FileEditorInput;

/**
 * @author zhou renjian
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
				IWorkbenchWindow fWindow = Java2ScriptUIPlugin.getDefault()
						.getWorkbench().getActiveWorkbenchWindow();
				IWorkbenchPage page =  fWindow.getActivePage();
				try {
					// Copy from IDE.openEditorOnFileStore
			        IEditorInput input = getEditorInput(fileStore);
			        String editorId = null;
					IEditorDescriptor descriptor;
					try {
						descriptor = IDE.getEditorDescriptor("java2script.txt"); // text editor
						if (descriptor != null)
							editorId = descriptor.getId();
					} catch (PartInitException e) {
					}
			        
			        // open the editor on the file
			        page.openEditor(input, editorId);
					return true;
				} catch (PartInitException e) {
					String msg =  NLS.bind(IDEWorkbenchMessages.OpenLocalFileAction_message_errorOnOpen, fileStore.getName());
					IDEWorkbenchPlugin.log(msg,e.getStatus());
					MessageDialog.openError(fWindow.getShell(), IDEWorkbenchMessages.OpenLocalFileAction_title, msg);
				}
			}
		}
		return false;
	}

	/**
	 * Create the Editor Input appropriate for the given <code>IFileStore</code>.
	 * The result is a normal file editor input if the file exists in the
	 * workspace and, if not, we create a wrapper capable of managing an
	 * 'external' file using its <code>IFileStore</code>.
	 * 
	 * @param fileStore
	 *            The file store to provide the editor input for
	 * @return The editor input associated with the given file store
	 */
	private static IEditorInput getEditorInput(IFileStore fileStore) {
		IFile workspaceFile = getWorkspaceFile(fileStore);
		if (workspaceFile != null)
			return new FileEditorInput(workspaceFile);
		return new FileStoreEditorInput(fileStore);
	}

	/**
	 * Determine whether or not the <code>IFileStore</code> represents a file
	 * currently in the workspace.
	 * 
	 * @param fileStore
	 *            The <code>IFileStore</code> to test
	 * @return The workspace's <code>IFile</code> if it exists or
	 *         <code>null</code> if not
	 */
	private static IFile getWorkspaceFile(IFileStore fileStore) {
		IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
		IFile[] files = root.findFilesForLocationURI(fileStore.toURI());
		files = filterNonExistentFiles(files);
		if (files == null || files.length == 0)
			return null;

		// for now only return the first file
		return files[0];
	}

	/**
	 * Filter the incoming array of <code>IFile</code> elements by removing
	 * any that do not currently exist in the workspace.
	 * 
	 * @param files
	 *            The array of <code>IFile</code> elements
	 * @return The filtered array
	 */
	private static IFile[] filterNonExistentFiles(IFile[] files) {
		if (files == null)
			return null;

		int length = files.length;
		ArrayList existentFiles = new ArrayList(length);
		for (int i = 0; i < length; i++) {
			if (files[i].exists())
				existentFiles.add(files[i]);
		}
		return (IFile[]) existentFiles.toArray(new IFile[existentFiles.size()]);
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
