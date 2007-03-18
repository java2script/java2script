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

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Properties;

import net.sf.j2s.ui.property.IJ2SConfigModifiedListener;
import net.sf.j2s.ui.property.J2SConfigPage;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IMarker;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResourceChangeEvent;
import org.eclipse.core.resources.IResourceChangeListener;
import org.eclipse.core.resources.IncrementalProjectBuilder;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jface.dialogs.ErrorDialog;
import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.StyledText;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Display;
import org.eclipse.ui.IEditorInput;
import org.eclipse.ui.IEditorPart;
import org.eclipse.ui.IEditorSite;
import org.eclipse.ui.IFileEditorInput;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.editors.text.TextEditor;
import org.eclipse.ui.ide.IDE;
import org.eclipse.ui.part.FileEditorInput;
import org.eclipse.ui.part.MultiPageEditorPart;

/**
 * @author zhou renjian
 *
 * 2006-2-1
 */

/**
 * An example showing how to create a multi-page editor.
 * This example has 3 pages:
 * <ul>
 * <li>page 0 contains a nested text editor.
 * <li>page 1 allows you to change the font used in page 2
 * <li>page 2 shows the words in page 0 in sorted order
 * </ul>
 */
public class J2SConfigEditor extends MultiPageEditorPart implements IResourceChangeListener{

	/** The text editor used in page 0. */
	private TextEditor editor;

	private boolean lastEnabled;

	private J2SConfigPage configPage;
	/**
	 * Creates a multi-page editor example.
	 */
	public J2SConfigEditor() {
		super();
		ResourcesPlugin.getWorkspace().addResourceChangeListener(this);
	}
	/**
	 * Creates page 0 of the multi-page editor,
	 * which contains a text editor.
	 */
	void createPage1() {
		try {
			J2STextEditor readOnlyEditor = new J2STextEditor();
			int index = addPage(readOnlyEditor, getEditorInput());
			editor = readOnlyEditor;
			setPageText(index, "Source");
		} catch (PartInitException e) {
			ErrorDialog.openError(
				getSite().getShell(),
				"Error creating nested text editor",
				null,
				e.getStatus());
		}
	}
	/**
	 * Creates page 1 of the multi-page editor,
	 * which allows you to change the font used in page 2.
	 */
	void createPage0() {

		Composite composite = new Composite(getContainer(), SWT.NONE);
		GridLayout layout = new GridLayout();
		composite.setLayout(layout);
		layout.numColumns = 2;

		configPage = new J2SConfigPage(composite, SWT.NONE);
		configPage.addConfigModifiedListener(new IJ2SConfigModifiedListener() {
			public void configModified() {
				Properties oldProps = new Properties();
				StyledText textWidget = ((J2STextEditor) editor).getJ2SSourceViewer().getTextWidget();
				byte[] bytes = textWidget.getText().getBytes();
				try {
					oldProps.load(new ByteArrayInputStream(bytes));
				} catch (IOException e1) {
					e1.printStackTrace();
				}
				IFile file = (IFile) getEditorInput().getAdapter(IFile.class);
				Properties props = configPage.getUpdatedProperties(new ByteArrayInputStream(bytes), 
						file.getRawLocation().toFile());
				if (!props.equals(oldProps)) {
					ByteArrayOutputStream os = new ByteArrayOutputStream();
					try {
						props.store(os, "Java2Script Configuration");
					} catch (IOException e) {
						e.printStackTrace();
					}
					textWidget.setText(os.toString());
				}
			}
		});
		int index = addPage(composite);
		setPageText(index, "Config");
		
		IFile file = (IFile) getEditorInput().getAdapter(IFile.class);
		if (file != null) {
			File j2sFile = ResourcesPlugin.getWorkspace().getRoot().getFile(file.getFullPath()).getLocation().toFile();
			configPage.initConfigPage(j2sFile);
			lastEnabled = configPage.isCompilerEnabled();
		}
	}
	/**
	 * Creates the pages of the multi-page editor.
	 */
	protected void createPages() {
		createPage0();
		createPage1();
		setPartName(getEditorInput().getName());
	}
	/**
	 * The <code>MultiPageEditorPart</code> implementation of this 
	 * <code>IWorkbenchPart</code> method disposes all nested editors.
	 * Subclasses may extend.
	 */
	public void dispose() {
		ResourcesPlugin.getWorkspace().removeResourceChangeListener(this);
		super.dispose();
	}
	/**
	 * Saves the multi-page editor's document.
	 */
	public void doSave(IProgressMonitor monitor) {
		getEditor(1).doSave(monitor);
		IFile file = (IFile) getEditorInput().getAdapter(IFile.class);
		if (file != null) {
			IPath path = file.getFullPath();
			if (path.segmentCount() == 2 && ".j2s".equals(path.segment(1))) {
				boolean b = false;
				if (getActivePage() == 0) {
					b = configPage.isCompilerEnabled();
				} else {
					Properties props = new Properties();
					StyledText textWidget = ((J2STextEditor) editor)
							.getJ2SSourceViewer().getTextWidget();
					byte[] bytes = textWidget.getText().getBytes();
					try {
						props.load(new ByteArrayInputStream(bytes));
					} catch (IOException e1) {
						e1.printStackTrace();
					}
					String status = props.getProperty("j2s.compiler.status");
					if ("enable".equals(status)) {
						b = true;
					}
				}
				if (!lastEnabled && b) {
					IJavaModel javaModel = JavaCore.create(ResourcesPlugin
							.getWorkspace().getRoot());
					String projectName = path.segment(0);
					if ((projectName == null)
							|| (projectName.trim().length() < 1)) {
						return;
					}
					IJavaProject javaProject = javaModel
							.getJavaProject(projectName);
					if ((javaProject == null) || !javaProject.exists()) {
						return;
					}
					IProject project = javaProject.getProject();
					try {
						project.build(
								IncrementalProjectBuilder.CLEAN_BUILD,
								monitor);
					} catch (CoreException e) {
						e.printStackTrace();
					}
				}
				lastEnabled = b;
			}
		}
	}
	/**
	 * Saves the multi-page editor's document as another file.
	 * Also updates the text for page 0's tab, and updates this multi-page editor's input
	 * to correspond to the nested editor's.
	 */
	public void doSaveAs() {
		IEditorPart editor = getEditor(1);
		editor.doSaveAs();
		setPageText(0, editor.getTitle());
		setInput(editor.getEditorInput());
	}
	/* (non-Javadoc)
	 * Method declared on IEditorPart
	 */
	public void gotoMarker(IMarker marker) {
		setActivePage(0);
		IDE.gotoMarker(getEditor(1), marker);
	}
	/**
	 * The <code>MultiPageEditorExample</code> implementation of this method
	 * checks that the input is an instance of <code>IFileEditorInput</code>.
	 */
	public void init(IEditorSite site, IEditorInput editorInput)
		throws PartInitException {
		if (!(editorInput instanceof IFileEditorInput))
			throw new PartInitException("Invalid Input: Must be IFileEditorInput");
		super.init(site, editorInput);
	}
	/* (non-Javadoc)
	 * Method declared on IEditorPart.
	 */
	public boolean isSaveAsAllowed() {
		return true;
	}
	/**
	 * Calculates the contents of page 2 when the it is activated.
	 */
	protected void pageChange(int newPageIndex) {
		super.pageChange(newPageIndex);
		StyledText textWidget = ((J2STextEditor) editor).getJ2SSourceViewer().getTextWidget();
		byte[] bytes = textWidget.getText().getBytes();
		IFile file = (IFile) getEditorInput().getAdapter(IFile.class);
		if (newPageIndex == 1) {
			Properties oldProps = new Properties();
			try {
				oldProps.load(new ByteArrayInputStream(bytes));
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			Properties props = configPage.getUpdatedProperties(new ByteArrayInputStream(bytes), file.getRawLocation().toFile());
			if (!props.equals(oldProps)) {
				ByteArrayOutputStream os = new ByteArrayOutputStream();
				try {
					props.store(os, "Java2Script Configuration");
				} catch (IOException e) {
					e.printStackTrace();
				}
				textWidget.setText(os.toString());
			}
		} else {
			Properties oldProps = new Properties();
			try {
				oldProps.load(new ByteArrayInputStream(bytes));
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			Properties props = configPage.getUpdatedProperties(new ByteArrayInputStream(bytes), file.getRawLocation().toFile());
			if (!props.equals(oldProps)) {
				configPage.initConfigPage(null, new ByteArrayInputStream(bytes));
			}
		}
	}
	/**
	 * Closes all project files on project close.
	 */
	public void resourceChanged(final IResourceChangeEvent event){
		if(event.getType() == IResourceChangeEvent.PRE_CLOSE){
			Display.getDefault().asyncExec(new Runnable(){
				public void run(){
					IWorkbenchPage[] pages = getSite().getWorkbenchWindow().getPages();
					for (int i = 0; i<pages.length; i++){
						if(((FileEditorInput)editor.getEditorInput()).getFile().getProject().equals(event.getResource())){
							IEditorPart editorPart = pages[i].findEditor(editor.getEditorInput());
							pages[i].closeEditor(editorPart,true);
						}
					}
				}            
			});
		} else if(event.getType() == IResourceChangeEvent.POST_CHANGE){
			if (getActivePage() == 0) {
				Display.getDefault().asyncExec(new Runnable(){
					public void run(){
						IFile file = (IFile) getEditorInput().getAdapter(IFile.class);
						if (file != null) {
							File j2sFile = ResourcesPlugin.getWorkspace().getRoot().getFile(file.getFullPath()).getLocation().toFile();
							configPage.initConfigPage(j2sFile);
						}
					}
				});
			}
		}
	}
}
