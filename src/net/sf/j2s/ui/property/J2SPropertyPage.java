package net.sf.j2s.ui.property;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import net.sf.j2s.core.Java2ScriptProjectNature;
import net.sf.j2s.ui.classpath.Resource;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IncrementalProjectBuilder;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jface.preference.PreferenceDialog;
import org.eclipse.jface.preference.PreferencePage;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.ui.dialogs.PropertyPage;

public class J2SPropertyPage extends PropertyPage {

	private boolean isEnabled;
	private J2SConfigPage configPage;



	/**
	 * Constructor for SamplePropertyPage.
	 */
	public J2SPropertyPage() {
		super();
		//noDefaultAndApplyButton();
	}
	
	private void updateConfig() {
    	IJavaProject jproject = (IJavaProject) getElement();
    	IProject project = jproject.getProject();
		String prjFolder = project.getLocation().toOSString();
		File file = new File(prjFolder, ".j2s");
		Properties props = new Properties();
		if (file.exists()) {
			try {
				props.load(new FileInputStream(file));
			} catch (FileNotFoundException e1) {
				e1.printStackTrace();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			List ress = configPage.classpathModel.resources;
			StringBuffer buffer = new StringBuffer();
			for (Iterator iter = ress.iterator(); iter.hasNext();) {
				Resource res = (Resource) iter.next();
				String resPath = null;
				resPath = res.toResourceString();
				if (res.isAbsolute()) {
					resPath = FileUtil.toRelativePath(resPath.substring(1), file.getAbsolutePath());
				}
				if (resPath != null) {
					if (buffer.length() != 0) {
						buffer.append(',');
					}
					buffer.append(resPath);
				}
			}
			ress = configPage.classpathModel.unitClasses;
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

			ress = configPage.classpathModel.abandonedClasses;
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

		} else if (configPage.isCompilerEnabled()) {
			try {
				String path = jproject.getOutputLocation().toString();
				int idx = path.indexOf('/', 2);
				String relativePath = null;
				if (idx != -1) {
					relativePath = path.substring(idx + 1); 
					props.setProperty("j2s.output.path", relativePath);
				} else {
					props.setProperty("j2s.output.path", "");
				}
			} catch (JavaModelException e) {
				e.printStackTrace();
			}
			
			List ress = configPage.classpathModel.resources;
			StringBuffer buffer = new StringBuffer();
			for (Iterator iter = ress.iterator(); iter.hasNext();) {
				Resource res = (Resource) iter.next();
				String resPath = null;
				resPath = res.toResourceString();
				if (res.isAbsolute()) {
					resPath = FileUtil.toRelativePath(resPath.substring(1), new File(prjFolder).getAbsolutePath());
				}
				if (resPath != null) {
					if (buffer.length() != 0) {
						buffer.append(',');
					}
					buffer.append(resPath);
				}
			}
			props.setProperty("j2s.resources.list", buffer.toString());
			props.setProperty("j2s.abandoned.resources.list", "");
		}
		if (configPage.isCompilerEnabled()) {
			props.setProperty("j2s.compiler.status", "enable");
		} else {
			props.setProperty("j2s.compiler.status", "disable");
		}
		if (!configPage.isCompilerEnabled() && !file.exists()) {
			// do nothing
		} else {
			try {
				props.store(new FileOutputStream(file), "Java2Script Configuration");
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
	        try {
	        	project.refreshLocal(1, null);
	        } catch (CoreException e) {
	            e.printStackTrace();
	        }
		}
	}

	/**
	 * @see PreferencePage#createContents(Composite)
	 */
	protected Control createContents(Composite parent) {
		Composite composite = new Composite(parent, SWT.NONE);
		GridLayout layout = new GridLayout();
		composite.setLayout(layout);
		GridData data = new GridData(GridData.FILL);
		data.grabExcessHorizontalSpace = true;
		composite.setLayoutData(data);
    	IJavaProject jproject = (IJavaProject) getElement();
        IProject project = jproject.getProject();
		String prjFolder = project.getLocation().toOSString();
		File file = new File(prjFolder, ".j2s");
		
		configPage = new J2SConfigPage(composite, SWT.NONE);
		configPage.initConfigPage(file);
		isEnabled = configPage.isCompilerEnabled();
		return composite;
	}
	
	public boolean performOk() {
		updateConfig();
		if (configPage.isCompilerEnabled()) {
	        if (getContainer() instanceof PreferenceDialog) {
	            PreferenceDialog dialog = (PreferenceDialog) getContainer();
	            dialog.close();
	        }
	        if (isEnabled) {
	        	return true;
	        }
	        IProgressMonitor monitor = null;
	    	IJavaProject jproject = (IJavaProject) getElement();
	        IProject project = jproject.getProject();
	    	try {
	    		Java2ScriptProjectNature pn = new Java2ScriptProjectNature();
	    		pn.setProject(project);
	    		pn.configure();
	    	} catch (CoreException e) {
	    		e.printStackTrace();
	    	}
	        try {
				project.build(IncrementalProjectBuilder.CLEAN_BUILD, monitor);
			} catch (CoreException e) {
				e.printStackTrace();
			}
		} else {
	    	IJavaProject jproject = (IJavaProject) getElement();
	    	IProject project = jproject.getProject();
	    	try {
	    		Java2ScriptProjectNature pn = new Java2ScriptProjectNature();
	    		pn.setProject(project);
	    		pn.deconfigure();
	    	} catch (CoreException e) {
	    		e.printStackTrace();
	    	}
		}
		return true;
	}

}