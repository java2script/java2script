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
 * 2006-1-31
 */
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import net.sf.j2s.ui.classpath.CSSResource;
import net.sf.j2s.ui.classpath.CompositeResources;
import net.sf.j2s.ui.classpath.ContactedClasses;
import net.sf.j2s.ui.classpath.ContactedUnitClass;
import net.sf.j2s.ui.classpath.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpath.Resource;
import net.sf.j2s.ui.classpath.UnitClass;
import net.sf.j2s.ui.launching.JavaRuntime;
import net.sf.j2s.ui.resources.ExternalResources;

import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.debug.internal.ui.SWTFactory;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.ISelectionChangedListener;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.jface.viewers.SelectionChangedEvent;
import org.eclipse.jface.viewers.StructuredSelection;
import org.eclipse.jface.viewers.TreeViewer;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Combo;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.ScrollBar;
import org.eclipse.swt.widgets.Shell;

public class J2SConfigPage extends Composite {

	private Button buttonEnable;
	private Button buttonDisable;
	private boolean compilerEnabled = true;
	private Composite compilerStatusComp;
	private Button buttonUp;
	protected TreeViewer viewer;
	protected J2SClasspathModel classpathModel;
	private Button buttonDown;
	private Button buttonRemove;
	private Button buttonAbandon;
	private Button buttonRestore;
	private Button buttonAddRes;
	private Button buttonAddInnerRes;
	private Button buttonAddPrj;
	
	private Button buttonDefault;
	
	protected File j2sFile;
	
	private transient Set listeners = new HashSet();
	private J2SAddInnerJarAction addInnerJarAction;
	
	public void addConfigModifiedListener(IJ2SConfigModifiedListener listener) {
		listeners.add(listener);
	}
	public void removeConfigModifiedListener(IJ2SConfigModifiedListener listener) {
		listeners.remove(listener);
	}
	public void fireConfigModified() {
		for (Iterator iter = listeners.iterator(); iter.hasNext();) {
			IJ2SConfigModifiedListener listener = (IJ2SConfigModifiedListener) iter.next();
			listener.configModified();
		}
	}
	public J2SConfigPage(Composite parent, int style) {
		super(parent, style);
		
		GridLayout gl = new GridLayout();
		gl.numColumns = 1;
		setLayout(gl);
		setLayoutData(new GridData(GridData.FILL_BOTH));
		
		compilerStatusComp = new Composite(this, SWT.NONE);
		GridLayout gl1 = new GridLayout();
		gl1.numColumns = 3;
		compilerStatusComp.setLayout(gl1);
		GridData gd1 = new GridData(GridData.FILL_HORIZONTAL);
		//gd1.exclude = true;
		compilerStatusComp.setLayoutData(gd1);
		
		buttonEnable = new Button(compilerStatusComp, SWT.TOGGLE);
		new Label(compilerStatusComp, SWT.NONE).setText(":");
		buttonDisable = new Button(compilerStatusComp, SWT.TOGGLE);
		buttonEnable.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				enableCompiler();
				fireConfigModified();
			}
		});
		buttonDisable.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				disableCompiler();
				fireConfigModified();
			}
		});
		
		Composite viewerComp = new Composite(this, SWT.NONE);
		GridLayout gl3 = new GridLayout();
		gl3.numColumns = 2;
		viewerComp.setLayout(gl3);
		GridData gd2 = new GridData(GridData.FILL_BOTH);
		gd2.heightHint = 250;
		viewerComp.setLayoutData(gd2);
		
		viewer = new TreeViewer(viewerComp, SWT.BORDER | SWT.MULTI);
		viewer.setContentProvider(new J2SClasspathContentProvider());
		viewer.setLabelProvider(new J2SClasspathLabelProvider());
		viewer.getTree().setLayoutData(new GridData(GridData.FILL_BOTH));
		
		viewer.addSelectionChangedListener(new ISelectionChangedListener() {
			public void selectionChanged(SelectionChangedEvent event) {
				updateButtonGroup();
			}
		});
		Composite actionComp = new Composite(viewerComp, SWT.NONE);
		actionComp.setLayout(new GridLayout());
		actionComp.setLayoutData(new GridData(GridData.FILL_VERTICAL));
		
		buttonAddInnerRes = SWTFactory.createPushButton(actionComp, "Add Libraries", null);
		addInnerJarAction = new J2SAddInnerJarAction(this);
		buttonAddInnerRes.addSelectionListener(addInnerJarAction);
		
		buttonAddRes = SWTFactory.createPushButton(actionComp, "Add Resources", null);
		buttonAddRes.addSelectionListener(new J2SAddJarAction(this));
		
		buttonAddPrj = SWTFactory.createPushButton(actionComp, "Add Projects", null);
		buttonAddPrj.addSelectionListener(new J2SAddProjectAction(this));

		buttonUp = SWTFactory.createPushButton(actionComp, "Up", null);
		buttonUp.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				Object[] expandedElements = viewer.getExpandedElements();
				if (isResourcesSelected()) {
					up(getSelection(), classpathModel.resources);
				} else if (isClassesSelected()) {
					up(getSelection(), classpathModel.unitClasses);
				} else {
					up(getSelection(), classpathModel.abandonedClasses);
				}
				ScrollBar bar = viewer.getTree().getVerticalBar();
				double selection = 0;
				if (bar != null) {
					selection = (0.0 + bar.getSelection()) / bar.getMaximum();
				}
				viewer.refresh();
				//viewer.expandToLevel(2);
				viewer.setExpandedElements(expandedElements);
				if (bar != null) {
					bar.setSelection((int) Math.round(selection * bar.getMaximum()));
				}
				updateButtonGroup();
				fireConfigModified();
			}
		});
		
		buttonDown = SWTFactory.createPushButton(actionComp, "Down", null);
		buttonDown.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				Object[] expandedElements = viewer.getExpandedElements();
				if (isResourcesSelected()) {
					down(getSelection(), classpathModel.resources);
				} else if (isClassesSelected()) {
					down(getSelection(), classpathModel.unitClasses);
				} else {
					down(getSelection(), classpathModel.abandonedClasses);
				}
				ScrollBar bar = viewer.getTree().getVerticalBar();
				double selection = 0;
				if (bar != null) {
					selection = (0.0 + bar.getSelection()) / bar.getMaximum();
				}
				viewer.refresh();
				//viewer.expandToLevel(2);
				viewer.setExpandedElements(expandedElements);
				if (bar != null) {
					bar.setSelection((int) Math.round(selection * bar.getMaximum()));
				}
				updateButtonGroup();
				fireConfigModified();
			}
		});
		buttonRemove = SWTFactory.createPushButton(actionComp, "Remove", null);
		buttonRemove.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				Object[] expandedElements = viewer.getExpandedElements();
				Object[] sels = getSelection();
				for (int i = 0; i < sels.length; i++) {
					classpathModel.removeTheResource((Resource) sels[i]);
				}
				ScrollBar bar = viewer.getTree().getVerticalBar();
				double selection = 0;
				if (bar != null) {
					selection = (0.0 + bar.getSelection()) / bar.getMaximum();
				}
				viewer.refresh();
				//viewer.expandToLevel(2);
				viewer.setExpandedElements(expandedElements);
				if (bar != null) {
					bar.setSelection((int) Math.round(selection * bar.getMaximum()));
				}
				updateButtonGroup();
				fireConfigModified();
			}
		});
		buttonAbandon = SWTFactory.createPushButton(actionComp, "Abandon Classes", null);
		buttonAbandon.addSelectionListener(new J2SAbandonClassesAction(this));

		buttonRestore = SWTFactory.createPushButton(actionComp, "Restore Classes", null);
		buttonRestore.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				Object[] expandedElements = viewer.getExpandedElements();
				Object[] sels = getSelection();
				for (int i = 0; i < sels.length; i++) {
					if (sels[i] instanceof J2SCategory) {
						for (int j = classpathModel.abandonedClasses.size() - 1; j >= 0; j--) {
							classpathModel.restoreUnitClass((UnitClass) classpathModel.abandonedClasses.get(j));
						}
						break;
					}
					classpathModel.restoreUnitClass((UnitClass) sels[i]);
				}
				ScrollBar bar = viewer.getTree().getVerticalBar();
				double selection = 0;
				if (bar != null) {
					selection = (0.0 + bar.getSelection()) / bar.getMaximum();
				}
				viewer.refresh();
				//viewer.expandToLevel(2);
				viewer.setExpandedElements(expandedElements);
				if (bar != null) {
					bar.setSelection((int) Math.round(selection * bar.getMaximum()));
				}
				updateButtonGroup();
				fireConfigModified();
			}
		});
		buttonDefault = SWTFactory.createPushButton(actionComp, "Restore Default Classpath", null);
		GridData gd3 = new GridData();
		gd3.exclude = true;
		buttonDefault.setLayoutData(gd3);
		
		updateButtonGroup();
	}
	
	/*
	 * Nasty thing
	 */
	public void forClasspathTab() {
		GridData gd3 = new GridData();
		buttonDefault.setLayoutData(gd3);
		GridData gd1 = new GridData(GridData.FILL_HORIZONTAL);
		gd1.exclude = true;
		compilerStatusComp.setLayoutData(gd1);
	}
	
	private boolean isLastElementSelected() {
		Object[] sels = getSelection();
		if (classpathModel.abandonedClasses.size() > 0) {
			Object res = classpathModel.abandonedClasses.get(classpathModel.abandonedClasses.size() - 1);
			for (int i = 0; i < sels.length; i++) {
				if (res == sels[i]) {
					return true;
				}
			}
		}
		if (classpathModel.unitClasses.size() > 0) {
			Object res = classpathModel.unitClasses.get(classpathModel.unitClasses.size() - 1);
			for (int i = 0; i < sels.length; i++) {
				if (res == sels[i]) {
					return true;
				}
			}
		}
		if (classpathModel.resources.size() > 0) {
			Object res = classpathModel.resources.get(classpathModel.resources.size() - 1);
			for (int i = 0; i < sels.length; i++) {
				if (res == sels[i]) {
					return true;
				}
			}
		}
		return false;
	}
	private boolean isFirstElementSelected() {
		Object[] sels = getSelection();
		if (classpathModel.abandonedClasses.size() > 0) {
			Object res = classpathModel.abandonedClasses.get(0);
			for (int i = 0; i < sels.length; i++) {
				if (res == sels[i]) {
					return true;
				}
			}
		}
		if (classpathModel.unitClasses.size() > 0) {
			Object res = classpathModel.unitClasses.get(0);
			for (int i = 0; i < sels.length; i++) {
				if (res == sels[i]) {
					return true;
				}
			}
		}
		if (classpathModel.resources.size() > 0) {
			Object res = classpathModel.resources.get(0);
			for (int i = 0; i < sels.length; i++) {
				if (res == sels[i]) {
					return true;
				}
			}
		}
		return false;
	}
	
	private static void up(Object[] sels, List list) {
		int size = list.size();
		for (int i = 1; i < size; i++) {
			Object obj = list.get(i);
			for (int j = 0; j < sels.length; j++) {
				if (sels[j] == obj) {
					Object t = list.get(i - 1);
					list.set(i - 1, sels[j]);
					list.set(i, t);
					break;
				}
			}
		}
	}
	
	private static void down(Object[] sels, List list) {
		int size = list.size();
		for (int i = size - 2; i >= 0; i--) {
			Object obj = list.get(i);
			for (int j = 0; j < sels.length; j++) {
				if (sels[j] == obj) {
					Object t = list.get(i + 1);
					list.set(i + 1, sels[j]);
					list.set(i, t);
					break;
				}
			}
		}
	}
	
	protected void updateButtonGroup() {
		buttonAbandon.setEnabled(true);
		buttonRestore.setEnabled(false);
		buttonRemove.setEnabled(false);
		buttonDown.setEnabled(false);
		buttonUp.setEnabled(false);
		buttonAddPrj.setEnabled(false);
		buttonAddRes.setEnabled(false);
		buttonAddInnerRes.setEnabled(false);
		if (!isNoContactedUnits()) {
			return ;
		}
		if (isSelectionInOneCategory()) {
			//if (!isAbandonsSelected()) {
				buttonRemove.setEnabled(true);
			//}
			if (!isLastElementSelected()) {
				buttonDown.setEnabled(true);
			}
			if (!isFirstElementSelected()) {
				buttonUp.setEnabled(true);
			}
			if (isResourcesSelected()) {
				buttonAddPrj.setEnabled(true);
				buttonAddRes.setEnabled(true);
				buttonAddInnerRes.setEnabled(true);
			} else {
				if (isAbandonsSelected()) {
					buttonRestore.setEnabled(true);
				} else {
					buttonAbandon.setEnabled(true);
				}
			}
		} else if (!isSelectionContainsCategory() && getSelection().length > 0) {
				buttonRemove.setEnabled(true);
		}
		if (getSelection().length == 1) {
			if (isResourceCategorySelected()) {
				buttonAddPrj.setEnabled(true);
				buttonAddInnerRes.setEnabled(true);
				buttonAddRes.setEnabled(true);
			} else if (isAbandonedCategorySelected() && classpathModel.abandonedClasses.size() > 0) {
				buttonRestore.setEnabled(true);
			}
		}
		
	}
	private boolean isNoContactedUnits() {
		Object[] sels = getSelection();
		if (sels.length == 0) {
			return true;
		}
		boolean b1 = true;
		for (int i = 0; i < sels.length; i++) {
			if (sels[i] instanceof ContactedUnitClass) {
				b1 = false;
				break;
			}
			if (sels[i] instanceof CSSResource
					&& ((CSSResource) sels[i]).getParent() instanceof ContactedClasses) {
				b1 = false;
				break;
			}
		}
		return b1;
	}
	Object[] getSelection() {
		IStructuredSelection selection = (IStructuredSelection) viewer.getSelection();
		if (selection.size() >= 1) {
			return selection.toArray();
		} else {
			return new Object[0];
		}
	}
	private boolean isSelectionInOneCategory() {
		Object[] sels = getSelection();
		if (sels.length == 0) {
			return false;
		}
		boolean b1 = false;
		for (int i = 0; i < sels.length; i++) {
			if (classpathModel.isResourceInResources(sels[i])) {
				b1 = true;
				break;
			}
		}
		boolean b2 = false;
		for (int i = 0; i < sels.length; i++) {
			if (classpathModel.isResourceInClasses(sels[i])) {
				b2 = true;
				break;
			}
		}
		if (b1 && b2) {
			return false;
		}
		boolean b3 = false;
		for (int i = 0; i < sels.length; i++) {
			if (classpathModel.isResourceInAbandons(sels[i])) {
				b3 = true;
				break;
			}
		}
		for (int i = 0; i < sels.length; i++) {
			if (sels[i] instanceof J2SCategory) {
				return false;
			}
		}
		if ((b1 && b3) || (b2 && b3)) {
			return false;
		}
		return b1 || b2 || b3;
	}
	private boolean isResourcesSelected() {
		Object[] sels = getSelection();
		boolean b = false;
		boolean other = false;
		for (int i = 0; i < sels.length; i++) {
			if (classpathModel.isResourceInResources(sels[i])) {
				b = true;
				break;
			} else {
				other = true;
			}
		}
		return b && !other;
	}
	private boolean isResourceCategorySelected() {
		Object[] sels = getSelection();
		boolean b = false;
		for (int i = 0; i < sels.length; i++) {
			if (sels[i] instanceof J2SCategory) {
				J2SCategory ctg = (J2SCategory) sels[i];
				if (J2SClasspathModel.categories[0].equals(ctg.getKey())) {
					b = true;
					break;
				}
			}
		}
		return b;
	}
	private boolean isAbandonedCategorySelected() {
		Object[] sels = getSelection();
		boolean b = false;
		for (int i = 0; i < sels.length; i++) {
			if (sels[i] instanceof J2SCategory) {
				J2SCategory ctg = (J2SCategory) sels[i];
				if (J2SClasspathModel.categories[J2SClasspathModel.categories.length - 1].equals(ctg.getKey())) {
					b = true;
					break;
				}
			}
		}
		return b;
	}
	private boolean isClassesSelected() {
		Object[] sels = getSelection();
		boolean b = false;
		for (int i = 0; i < sels.length; i++) {
			if (classpathModel.isResourceInClasses(sels[i])) {
				b = true;
				break;
			}
		}
		return b;
	}
	private boolean isAbandonsSelected() {
		Object[] sels = getSelection();
		boolean b = false;
		for (int i = 0; i < sels.length; i++) {
			if (classpathModel.isResourceInAbandons(sels[i])) {
				b = true;
				break;
			}
		}
		return b;
	}
	private boolean isSelectionContainsCategory() {
		Object[] sels = getSelection();
		boolean b = false;
		for (int i = 0; i < sels.length; i++) {
			if (sels[i] instanceof J2SCategory) {
				b = true;
				break;
			}
		}
		return b;
	}
	public void initConfigPage(File j2sFile) {
		initConfigPage(j2sFile, null);
	}

	public void initConfigPage(File file, InputStream is) {
		if (file != null) {
			this.j2sFile = file;
		}
		classpathModel = new J2SClasspathModel();
		String[][] allResources = ExternalResources.getAllResources();
		String j2sLibPath = null;
		if (allResources != null && allResources.length != 0 && allResources[0].length != 0) {
			if ((allResources[0][0]).startsWith("|")) {
				allResources[0][0] = allResources[0][0].substring(1).replace('\\', '/');
			}
			j2sLibPath = allResources[0][0].substring(0, allResources[0][0].lastIndexOf("/") + 1);
		} else {
			j2sLibPath = "../net.sf.j2s.lib/j2slib/";
		}
		IRuntimeClasspathEntry entry = JavaRuntime.newArchiveRuntimeClasspathEntry(j2sLibPath + "/java.runtime.j2x");
		if (entry != null) {
			((Resource) entry).setAbsolute(true);
			classpathModel.resources.add(entry);
		}
		CompositeResources comp = new CompositeResources();
		comp.setFolder(j2sFile.getParentFile());
		comp.setRelativePath(j2sFile.getName());
		if (addInnerJarAction != null) {
			addInnerJarAction.setJ2SFile(j2sFile);
		}
		if (is != null) {
			comp.load(is);
		} else {
			comp.load();
		}
		updateByCompositeResource(comp);
	}

	private void updateByCompositeResource(CompositeResources comp) {
		Resource[] children = comp.getChildren();
		for (int i = 0; i < children.length; i++) {
			Resource res = children[i];
			if (res instanceof UnitClass) {
				classpathModel.addUnitClass((UnitClass) res);
			} else {
				classpathModel.addResource(res);
			}
		}
		children = comp.getAbandonedResources();
		for (int i = 0; i < children.length; i++) {
			Resource res = children[i];
			if (res instanceof UnitClass) {
				classpathModel.addAbandonedClass((UnitClass) res);
			} else {
				//classpathModel.addResource(res);
			}
		}
		viewer.setInput(classpathModel);
		viewer.expandToLevel(2);
		if (comp.getCompilerStatus() != null
				&& "enable".equals(comp.getCompilerStatus())) {
			compilerEnabled = true;
		} else {
			compilerEnabled = false;
		}
		if (!compilerEnabled) {
			disableCompiler();
		} else {
			enableCompiler();
		}
	}

	private void enableCompiler() {
		buttonDisable.setSelection(false);
		buttonDisable.forceFocus();
		buttonEnable.setSelection(true);
		buttonEnable.setText("Java2Script compiler is enabled");
		buttonDisable.setText("Disable Java2Script Compiler");
		compilerEnabled = true;
		compilerStatusComp.layout(true);
		setConfigEditable(true);
	}

	private void disableCompiler() {
		buttonDisable.setSelection(true);
		buttonEnable.forceFocus();
		buttonEnable.setSelection(false);
		buttonEnable.setText("Enable Java2Script Compiler");
		buttonDisable.setText("Java2Script compiler is disabled");
		compilerEnabled = false;
		compilerStatusComp.layout(true);
		
		setConfigEditable(false);
	}

	private void setConfigEditable(boolean editable) {
		viewer.getTree().setEnabled(editable);
		if (editable) {
			updateButtonGroup();
		} else {
			buttonAbandon.setEnabled(false);
			buttonRestore.setEnabled(false);
			buttonRemove.setEnabled(false);
			buttonDown.setEnabled(false);
			buttonUp.setEnabled(false);
			buttonAddPrj.setEnabled(false);
			buttonAddRes.setEnabled(false);
			buttonAddInnerRes.setEnabled(false);
		}
	}

	public boolean isCompilerEnabled() {
		return compilerEnabled;
	}

	public Properties getUpdatedProperties(InputStream is, File file) {
		Properties props = new Properties();
		try {
			props.load(is);
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}

		List ress = classpathModel.resources;
		StringBuffer buffer = new StringBuffer();
		for (Iterator iter = ress.iterator(); iter.hasNext();) {
			Resource res = (Resource) iter.next();
			String resPath = null;
			resPath = res.toResourceString();
			if (res.isAbsolute() && file != null) {
				resPath = FileUtil.toRelativePath(resPath.substring(1), file.getAbsolutePath());
			}
			if (resPath != null) {
				if (buffer.length() != 0) {
					buffer.append(',');
				}
				buffer.append(resPath);
			}
		}
		ress = classpathModel.unitClasses;
		for (Iterator iter = ress.iterator(); iter.hasNext();) {
			Resource res = (Resource) iter.next();
			String resPath = res.toResourceString();
			if (resPath != null) {
				if (buffer.length() != 0) {
					buffer.append(',');
				}
				buffer.append(resPath);
			}
		}
		props.setProperty("j2s.resources.list", buffer.toString());

		ress = classpathModel.abandonedClasses;
		buffer = new StringBuffer();
		for (Iterator iter = ress.iterator(); iter.hasNext();) {
			Resource res = (Resource) iter.next();
			String resPath = res.toResourceString();
			if (resPath != null) {
				if (buffer.length() != 0) {
					buffer.append(',');
				}
				buffer.append(resPath);
			}
		}
		props.setProperty("j2s.abandoned.resources.list", buffer.toString());
		if (isCompilerEnabled()) {
			props.setProperty("j2s.compiler.status", "enable");
		} else {
			props.setProperty("j2s.compiler.status", "disable");
		}
		return props;
	}


	/* (non-Javadoc)
	 * @see org.eclipse.swt.widgets.Composite#setFocus()
	 */
	public boolean setFocus() {
		if (compilerEnabled) {
			ISelection selection = viewer.getSelection();
			if (selection == null || selection.isEmpty()) {
				viewer.setSelection(new StructuredSelection(classpathModel.getCategories()[0]));
			}
			viewer.getControl().setFocus();
		} else {
			buttonEnable.setFocus();
		}
		return true;
	}
	
	public Button getRestoreDefaultButton() {
		return buttonDefault;
	}
}
