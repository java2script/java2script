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
package net.sf.j2s.ui.property;

/**
 * @author josson smith
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

import net.sf.j2s.ui.classpathviewer.CSSResource;
import net.sf.j2s.ui.classpathviewer.CompositeResources;
import net.sf.j2s.ui.classpathviewer.ContactedClasses;
import net.sf.j2s.ui.classpathviewer.ContactedUnitClass;
import net.sf.j2s.ui.classpathviewer.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpathviewer.Resource;
import net.sf.j2s.ui.classpathviewer.UnitClass;
import net.sf.j2s.ui.resources.ExternalResources;

import org.eclipse.debug.internal.ui.SWTUtil;
import org.eclipse.jface.viewers.ISelectionChangedListener;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.jface.viewers.SelectionChangedEvent;
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

	/*
	private static String[] patterns = new String[] {
		"SWT", 
		"Common", 
		"Utilities", 
		"Bare Core", 
		"Custom" 
	};
	private static String[] patternTips = new String[] { 
			"With SWT components supported", 
			"With common Java classes supported, such as StringBuffer", 
			"With Java utilities supported, such as java.util.*", 
			"With only the Java class inheritance supported", 
			"Custom the pattern needed" 
	};
	private static String[][] patterResouces = new String[][] {
		new String[] {
				"j2s-core-more.z.js",
				"j2s-browser-native.z.js",
				"j2s-swt-basic.z.js",
				"j2s-swt-widget.z.js"
		},
		new String[] {
				"j2s-core-common.z.js"
		},
		new String[] {
				"j2s-core-util.z.js"
		},
		new String[] {
				"j2s-core-bare.z.js"
		},
		new String[] {
		}
	};
	*/
//	private static String[] patterns = null;
//	private static String[] patternTips = null;
//	private static String[][] patterResouces = null;
//	
//	static void initPattern() {
//		patterns = null;
//		if (patterns == null) {
//			patterns = ExternalResources.getAllKeys();
//			patternTips = ExternalResources.getAllDescriptions();
//			patterResouces = ExternalResources.getAllResources();
//		}
//	}

	private Button buttonEnable;
	private Button buttonDisable;
	private boolean compilerEnabled = true;
//	private Combo comboPattern;
	private Composite compilerStatusComp;
//	private Label patternLeadingLabel;
	private Button buttonUp;
//	private Label tipsLabel;
	protected TreeViewer viewer;
	protected J2SClasspathModel classpathModel;
	private Button buttonDown;
	private Button buttonRemove;
	private Button buttonAbandom;
	private Button buttonRestore;
	private Button buttonAddRes;
	private Button buttonAddInnerRes;
	private Button buttonAddPrj;
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
//		syncDropList();
	}
	public J2SConfigPage(Composite parent, int style) {
		super(parent, style);
		
//		initPattern();
		
		GridLayout gl = new GridLayout();
		gl.numColumns = 1;
		setLayout(gl);
		setLayoutData(new GridData(GridData.FILL_BOTH));
		
		compilerStatusComp = new Composite(this, SWT.NONE);
		GridLayout gl1 = new GridLayout();
		gl1.numColumns = 3;
		compilerStatusComp.setLayout(gl1);
		compilerStatusComp.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
		
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
		
//		Composite patternComp = new Composite(this, SWT.NONE);
//		GridLayout gl2 = new GridLayout();
//		gl2.numColumns = 4;
//		patternComp.setLayout(gl2);
//		patternComp.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
//		patternLeadingLabel = new Label(patternComp, SWT.NONE);
//		patternLeadingLabel.setText("Pattern:");
//		comboPattern = new Combo(patternComp, SWT.READ_ONLY);
//		GridData gd = new GridData();
//		gd.widthHint = 80;
//		comboPattern.setLayoutData(gd);
//		//comboPattern.setItems(patterns);
//		comboPattern.setItems(ExternalResources.getAllKeys());
//		tipsLabel = new Label(patternComp, SWT.NONE);
//		GridData gd2 = new GridData(GridData.FILL_HORIZONTAL);
//		gd2.horizontalSpan = 2;
//		gd2.widthHint = 300;
//		tipsLabel.setLayoutData(gd2);
//		comboPattern.addSelectionListener(new SelectionAdapter() {
//			public void widgetSelected(SelectionEvent e) {
//				int idx = comboPattern.getSelectionIndex();
//				updatePattern(idx);
//				fireConfigModified();
//			}
//		});
//		comboPattern.select(1);
//		tipsLabel.setText("(" + patternTips[1] + ")");
		
		Composite viewerComp = new Composite(this, SWT.NONE);
		GridLayout gl3 = new GridLayout();
		gl3.numColumns = 2;
		viewerComp.setLayout(gl3);
		GridData gd1 = new GridData(GridData.FILL_BOTH);
		gd1.heightHint = 250;
		viewerComp.setLayoutData(gd1);
		
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
		
		buttonAddInnerRes = SWTUtil.createPushButton(actionComp, "Add libraries", null);
		addInnerJarAction = new J2SAddInnerJarAction(this);
		buttonAddInnerRes.addSelectionListener(addInnerJarAction);
		
		buttonAddRes = SWTUtil.createPushButton(actionComp, "Add resources", null);
//		buttonAddRes.addSelectionListener(new SelectionAdapter() {
//			public void widgetSelected(SelectionEvent e) {
//			}
//		});
		buttonAddRes.addSelectionListener(new J2SAddJarAction(this));
		
		buttonAddPrj = SWTUtil.createPushButton(actionComp, "Add projects", null);
//		buttonAddPrj.addSelectionListener(new SelectionAdapter() {
//			public void widgetSelected(SelectionEvent e) {
//			}
//		});
		buttonAddPrj.addSelectionListener(new J2SAddProjectAction(this));

		buttonUp = SWTUtil.createPushButton(actionComp, "Up", null);
		buttonUp.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				Object[] expandedElements = viewer.getExpandedElements();
				if (isResourcesSelected()) {
					up(getSelection(), classpathModel.resources);
				} else if (isClassesSelected()) {
					up(getSelection(), classpathModel.unitClasses);
				} else {
					up(getSelection(), classpathModel.abandomedClasses);
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
		
		buttonDown = SWTUtil.createPushButton(actionComp, "Down", null);
		buttonDown.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				Object[] expandedElements = viewer.getExpandedElements();
				if (isResourcesSelected()) {
					down(getSelection(), classpathModel.resources);
				} else if (isClassesSelected()) {
					down(getSelection(), classpathModel.unitClasses);
				} else {
					down(getSelection(), classpathModel.abandomedClasses);
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
		buttonRemove = SWTUtil.createPushButton(actionComp, "Remove", null);
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
		buttonAbandom = SWTUtil.createPushButton(actionComp, "Abandom classes", null);
		buttonAbandom.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				Object[] expandedElements = viewer.getExpandedElements();
				Object[] sels = getSelection();
				for (int i = 0; i < sels.length; i++) {
					classpathModel.abandomUnitClass((UnitClass) sels[i]);
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
		buttonRestore = SWTUtil.createPushButton(actionComp, "Restore classes", null);
		buttonRestore.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				Object[] expandedElements = viewer.getExpandedElements();
				Object[] sels = getSelection();
				for (int i = 0; i < sels.length; i++) {
					if (sels[i] instanceof J2SCategory) {
						for (int j = classpathModel.abandomedClasses.size() - 1; j >= 0; j--) {
							classpathModel.restoreUnitClass((UnitClass) classpathModel.abandomedClasses.get(j));
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
		
		updateButtonGroup();
	}
	
	/*
	private IRuntimeClasspathEntry newArchiveRuntimeClasspathEntry(String relativePath) {
		String path = relativePath.toString();
		if (path.startsWith("|")) {
			path = path.substring(1);
			File file = new File(path);
			path = file.getName();
			if (path.endsWith(".z.js")) {
				ContactedClasses cc = new ContactedClasses();
				cc.setFolder(file.getParentFile());
				cc.setRelativePath(path);
				if (path.indexOf("j2s-") == 0) {
					cc.setClasspathProperty(IRuntimeClasspathEntry.BOOTSTRAP_CLASSES);
				} else {
					cc.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
				}
				cc.setAbsolute(true);
				return cc;
			} else if (path.endsWith(".css")){
				CSSResource css = new CSSResource();
				css.setFolder(file.getParentFile());
				css.setRelativePath(path);
				css.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
				css.setAbsolute(true);
				return css;
			} else if (path.endsWith(".j2s")) {
				CompositeResources comp = new CompositeResources();
				comp.setFolder(file.getParentFile());
				comp.setRelativePath(path);
//				comp.setFolder(elem.getProject().getLocation().toFile());
//				comp.setRelativePath(path);
				comp.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
				comp.setAbsolute(true);
				return comp;
			}
		} else if (path.endsWith(".z.js")) {
			ContactedClasses cc = new ContactedClasses();
			cc.setFolder(j2sFile.getParentFile());
			cc.setRelativePath(path);
			if (path.indexOf("j2s-") == 0) {
				cc.setClasspathProperty(IRuntimeClasspathEntry.BOOTSTRAP_CLASSES);
			} else {
				cc.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			}
			return cc;
		} else if (path.endsWith(".css")){
			CSSResource css = new CSSResource();
			css.setFolder(j2sFile.getParentFile());
			css.setRelativePath(path);
			css.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			return css;
		} else if (path.endsWith(".j2s")) {
			CompositeResources comp = new CompositeResources();
			comp.setFolder(j2sFile.getParentFile());
			comp.setRelativePath(path);
//			comp.setFolder(elem.getProject().getLocation().toFile());
//			comp.setRelativePath(path);
			comp.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
			return comp;
		}
		return null;
	}
	*/
	private boolean isLastElementSelected() {
		Object[] sels = getSelection();
		if (classpathModel.abandomedClasses.size() > 0) {
			Object res = classpathModel.abandomedClasses.get(classpathModel.abandomedClasses.size() - 1);
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
		if (classpathModel.abandomedClasses.size() > 0) {
			Object res = classpathModel.abandomedClasses.get(0);
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
		buttonAbandom.setEnabled(false);
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
			buttonRemove.setEnabled(true);
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
				if (isAbandomsSelected()) {
					buttonRestore.setEnabled(true);
				} else {
					buttonAbandom.setEnabled(true);
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
			} else if (isAbandomedCategorySelected() && classpathModel.abandomedClasses.size() > 0) {
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
			if (classpathModel.isResourceInAbandoms(sels[i])) {
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
	private boolean isAbandomedCategorySelected() {
		Object[] sels = getSelection();
		boolean b = false;
		for (int i = 0; i < sels.length; i++) {
			if (sels[i] instanceof J2SCategory) {
				J2SCategory ctg = (J2SCategory) sels[i];
				if (J2SClasspathModel.categories[2].equals(ctg.getKey())) {
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
	private boolean isAbandomsSelected() {
		Object[] sels = getSelection();
		boolean b = false;
		for (int i = 0; i < sels.length; i++) {
			if (classpathModel.isResourceInAbandoms(sels[i])) {
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
		CompositeResources comp = new CompositeResources();
		//File folder = new File("S:/eclipse-3.1.1/eclipse/workspace/net.sf.j2s.java.org.eclipse.swt/");
		//comp.setFolder(folder);
		//comp.setRelativePath("swt.test.j2s");
		//j2sFile = ;
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
		children = comp.getAbandomedResources();
		for (int i = 0; i < children.length; i++) {
			Resource res = children[i];
			if (res instanceof UnitClass) {
				classpathModel.addAbandomedClass((UnitClass) res);
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
		
		//syncDropList();
	}
	/*
	private void syncDropList() {
		int len = patterResouces.length;
		int size = classpathModel.resources.size();
		for (int k = 0; k < len; k++) {
			int length = patterResouces[k].length;
			if (size == length) {
				boolean[] existed = new boolean[size];
				for (int i = 0; i < existed.length; i++) {
					existed[i] = false;
				}
				for (int i = 0; i < size; i++) {
					Resource res = (Resource) classpathModel.resources.get(i);
					String name = res.getAbsoluteFile().getName();
					for (int j = 0; j < size; j++) {
						String path = patterResouces[k][j];
						if (path.startsWith("|")) {
							path = path.substring(1);
						}
						File file = new File(path);
						if (file.getName().equals(name)) {
							existed[j] = true;
							break;
						}
					}
				}
				
				boolean ok = true;
				for (int i = 0; i < size; i++) {
					if (!existed[i]) {
						ok = false;
						break;
					}
				}
				if (ok) {
					comboPattern.setText(patterns[k]);
					updatePattern(k);
					return ;
				}
			}
		}
		for (int k = 0; k < len; k++) {
			int length = patterResouces[k].length;
			if (0 == length) {
				comboPattern.setText(patterns[k]);
				updatePattern(k);
				return ;
			}
		}
		comboPattern.setText(patterns[0]);
		updatePattern(0);
		/*
		if (size == 1) {
			for (int i = 1; i <= 3; i++) {
				Resource res = (Resource) classpathModel.resources.get(0);
				String name = res.getAbsoluteFile().getName();
				String path = patterResouces[i][0];
				if (path.startsWith("|")) {
					path = path.substring(1);
				}
				File file = new File(path);
				if (file.getName().equals(name)) {
					comboPattern.setText(patterns[i]);
					updatePattern(i);
					return ;
				}
			}
		} else if (size == len) {
			boolean[] existed = new boolean[len];
			for (int i = 0; i < existed.length; i++) {
				existed[i] = false;
			}
			for (int i = 0; i < len; i++) {
				Resource res = (Resource) classpathModel.resources.get(i);
				String name = res.getAbsoluteFile().getName();
				for (int j = 0; j < len; j++) {
					String path = patterResouces[0][j];
					if (path.startsWith("|")) {
						path = path.substring(1);
					}
					File file = new File(path);
					if (file.getName().equals(name)) {
						existed[j] = true;
						break;
					}
				}
			}
			
			for (int i = 0; i < len; i++) {
				if (!existed[i]) {
					comboPattern.setText(patterns[4]);
					updatePattern(4);
					return ;
				}
			}
			comboPattern.setText(patterns[0]);
			updatePattern(0);
			return ;
		}
		comboPattern.setText(patterns[4]);
		updatePattern(4);
		*-/
	}

	public static void main (String [] args) {
		Display display = new Display ();
		Shell shell = new Shell(display);
		
		final J2SConfigPage page = new J2SConfigPage(shell, SWT.NONE);
		page.initConfigPage(new File("S:/eclipse-3.1.1/eclipse/workspace/net.sf.j2s.java.org.eclipse.swt/swt.test.j2s"));
		shell.setLayout(new GridLayout());
		//shell.layout();
		Button button = new Button(shell, SWT.PUSH);
		button.setText("Test");
		button.addSelectionListener(new SelectionAdapter() {
		
			public void widgetSelected(SelectionEvent e) {
				J2SClasspathModel model = page.classpathModel;
				for (Iterator iter = model.resources.iterator(); iter.hasNext();) {
					Resource res = (Resource) iter.next();
					System.out.println(res.toHTMLString());
				}
				for (Iterator iter = model.unitClasses.iterator(); iter.hasNext();) {
					Resource res = (Resource) iter.next();
					System.out.println(res.toHTMLString());
				}
				System.out.println("========");
				for (Iterator iter = model.abandomedClasses.iterator(); iter.hasNext();) {
					Resource res = (Resource) iter.next();
					System.out.println(res.toHTMLString());
				}
			}
		
		});
		shell.pack ();
		shell.open ();
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		display.dispose ();
	}
	*/

	private void enableCompiler() {
		buttonDisable.setSelection(false);
		buttonDisable.forceFocus();
		buttonEnable.setSelection(true);
		buttonEnable.setText("Java2Script compiler is enabled");
		buttonDisable.setText("Disable Java2Script Compiler");
		compilerEnabled = true;
		compilerStatusComp.layout(true);
		
//		if (classpathModel.resources.size() == 0
//				&& classpathModel.unitClasses.size() == 0
//				&& classpathModel.abandomedClasses.size() == 0) {
//			int idx = comboPattern.getSelectionIndex();
//			updatePattern(idx);
//		}
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
//		patternLeadingLabel.setEnabled(editable);
//		comboPattern.setEnabled(editable);
//		tipsLabel.setEnabled(editable);
		viewer.getTree().setEnabled(editable);
		//buttonUp.setEnabled(editable);
		if (editable) {
			updateButtonGroup();
		} else {
			buttonAbandom.setEnabled(false);
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

		ress = classpathModel.abandomedClasses;
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
		props.setProperty("j2s.abandomed.resources.list", buffer.toString());
		if (isCompilerEnabled()) {
			props.setProperty("j2s.compiler.status", "enable");
		} else {
			props.setProperty("j2s.compiler.status", "disable");
		}
		return props;
	}

	/*
	private void updatePattern(int idx) {
		if (idx != -1) {
			tipsLabel.getParent().layout(true);
			tipsLabel.setText("(" + patternTips[idx] + ")");
			
			Object[] expandedElements = viewer.getExpandedElements();
			int size = patterResouces[idx].length;
			if (size != 0) {
				classpathModel.resources.clear();
			}
			for (int i = 0; i < size; i++) {
				//IRuntimeClasspathEntry entry = newArchiveRuntimeClasspathEntry("j2slib/" + patterResouces[idx][i]);
				IRuntimeClasspathEntry entry = newArchiveRuntimeClasspathEntry(patterResouces[idx][i]);
				if (entry != null) {
					classpathModel.resources.add(entry);
				}
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

		}
	}
	*/

	/* (non-Javadoc)
	 * @see org.eclipse.swt.widgets.Composite#setFocus()
	 */
	public boolean setFocus() {
		if (compilerEnabled) {
//			comboPattern.setFocus();
			viewer.getControl().setFocus();
		} else {
			buttonEnable.setFocus();
		}
		return true;
	}
//	
//	public String getPatternKey() {
//		return comboPattern.getText();
//	}
}
