package net.sf.j2s.ui.property;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import net.sf.j2s.ui.classpathviewer.Resource;
import net.sf.j2s.ui.jdtenhancer.EnhancerInfo;
import net.sf.j2s.ui.jdtenhancer.JarUtil;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IncrementalProjectBuilder;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.Platform;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.preference.PreferenceDialog;
import org.eclipse.jface.preference.PreferencePage;
import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.BusyIndicator;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.program.Program;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Link;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.PlatformUI;
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

			ress = configPage.classpathModel.abandomedClasses;
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
//			File folder = new File(prjFolder, "j2slib");
//			if (!folder.exists() || !folder.isDirectory()) {
//				folder.mkdir();
//			}
//            URL starterURL = Java2ScriptUIPlugin.getDefault().getBundle()
//					.getEntry("/" + File.separator); //$NON-NLS-1$
//			String path = "."; //$NON-NLS-1$
//			try {
//				path = Platform.asLocalURL(starterURL).getFile();
//			} catch (IOException e1) {
//				e1.printStackTrace();
//			}
//			path = path.replace('/', File.separatorChar);
//
//			FileSystemUtils.copyFolder(new File(path, "j2slib").getAbsolutePath(), folder.getAbsolutePath(), true);
			
//			String patternKey = configPage.getPatternKey();
//			if (patternKey != null) {
//				IExternalResourceProvider provider = ExternalResources.getProviderByName(patternKey);
//				if (provider != null) {
//					provider.copyResources(patternKey, path);
//				}
//			}
			
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
			props.setProperty("j2s.abandomed.resources.list", "");
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

	private Label createLabel(Composite comp, String label) {
		Label lbl = new Label(comp, SWT.WRAP);
		lbl.setText(label);
		GridData gd = new GridData(GridData.FILL_HORIZONTAL);
		gd.widthHint = 330;
		lbl.setLayoutData(gd);
		return lbl;
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

//        URL starterURL = Java2ScriptUIPlugin.getDefault().getBundle()
//				.getEntry("/" + File.separator); //$NON-NLS-1$
//		String path = "."; //$NON-NLS-1$
//		try {
//			path = Platform.asLocalURL(starterURL).getFile();
//		} catch (IOException e1) {
//			e1.printStackTrace();
//		}
//		path = path.replace('/', File.separatorChar);
//		final String enhancePath = path;
		//String base = new File(path).getParentFile().getAbsolutePath();
		final String base = new File(Platform.getInstallLocation().getURL().getFile(), "plugins").getAbsolutePath();
		final String coreJarName = JarUtil.getJDTCoreJarName(base);
		String version = null;
		if (coreJarName != null) {
			try {
				version = JarUtil.getEnhancedJDTCoreVersion(base, coreJarName);
			} catch (IOException e) {
			}
		}
		if (version == null) {
			Label label = new Label(composite, SWT.NONE);
			label.setText("It's detected that your JDT Core is not enhanced yet.");
			label.setForeground(new Color(null, 255, 0, 0));
			
			Label label2 = new Label(composite, SWT.NONE);
			label2.setText("JDT Core must be enhanced before Java2Script builder can take into effect.");

			Link link = new Link(composite, SWT.NONE);
			link.setText("<a href=\"http://j2s.sourceforge.net/docs/jdt-core-enhance.html\">Why must JDT Core be enhanced?</a>");

			createLabel(composite, "Maybe this is the first time you install Java2Script plugin. To install Java2Script, do as following:");
			createLabel(composite, "1. Click the following \"Enhance JDT Core\" button, and then exit Eclipse platform. ");
			createLabel(composite, "2. Copy the enhanced \"org.eclipse.jdt.core_3.*.*.jar\" file and overwrite original " +
					"jar file in \"plugins\" folder (You must exit Eclipse first, as Eclipse is locking the jar file).");
			createLabel(composite, "3. Restart the Eclipse you will get the true Java2Script Builder property page.");

			//new Label(composite, SWT.NONE);
			Label seperator0 = new Label(composite, SWT.SEPARATOR | SWT.HORIZONTAL);
			seperator0.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));

			final Button btnEnhance = new Button(composite, SWT.PUSH);
			if (!EnhancerInfo.isJDTCoreAlreadyEnhanced) {
				btnEnhance.setText("Enhance JDT Core");
			} else {
				btnEnhance.setText("Enhance JDT Core Again");
			}
			GridData gdBtn = new GridData(GridData.BEGINNING);
			gdBtn.widthHint = 216;
			gdBtn.horizontalIndent = 6;
			gdBtn.verticalIndent = 8;
			btnEnhance.setLayoutData(gdBtn);
			new Label(composite, SWT.NONE);
			
			Composite pathComp = new Composite(composite, SWT.NONE);
			pathComp.setLayout(new GridLayout(2, false));
			GridData gd = new GridData(GridData.FILL_HORIZONTAL);
			gd.grabExcessHorizontalSpace = true;
			pathComp.setLayoutData(gd);
			
			final Label label3 = new Label(pathComp, SWT.NONE);
			label3.setText("Enhanced Jar Location:");
			final Text textPath = new Text(pathComp, SWT.NONE);
			textPath.setText(new File(base).getParentFile().getAbsolutePath());
			textPath.setEditable(false);
			GridData gd2 = new GridData(GridData.FILL_HORIZONTAL);
			gd2.widthHint = 240;
			textPath.setLayoutData(gd2);
			final Button btnOpen = new Button(pathComp, SWT.PUSH);
			GridData gd3Btn = new GridData(GridData.BEGINNING);
			gd3Btn.widthHint = 216;
			gd3Btn.horizontalSpan = 2;
			//gd3Btn.horizontalIndent = 6;
			btnOpen.setLayoutData(gd3Btn);
			btnOpen.setText("Open Location with External Explorer");
			//btnOpen.setLayoutData(new GridData(GridData.BEGINNING, GridData.BEGINNING, false, false, 2, 1));
			btnOpen.addSelectionListener(new SelectionAdapter() {
				public void widgetSelected(SelectionEvent e) {
					Program.launch(textPath.getText());
				}
			});
			
			final Label label4 = createLabel(composite, "Before you can overwrite the JDT Core jar, you have to exit Ecipse platform. After replacing with the enhanced jar, you can restart the Eclipse.");

			final Button btnRestart = new Button(composite, SWT.PUSH);
			btnRestart.setText("Exit Eclipse Now");
			GridData gd2Btn = new GridData(GridData.BEGINNING);
			gd2Btn.widthHint = 216;
			gd2Btn.horizontalIndent = 6;
			btnRestart.setLayoutData(gd2Btn);
			//btnRestart.setLayoutData(new GridData(GridData.END, GridData.BEGINNING, true, false));
			btnRestart.addSelectionListener(new SelectionAdapter() {
				public void widgetSelected(SelectionEvent e) {
			        PlatformUI.getWorkbench().close();
				}
			});
			if (!EnhancerInfo.isJDTCoreAlreadyEnhanced) {
				label3.setEnabled(false);
				textPath.setEnabled(false);
				btnOpen.setEnabled(false);
				label4.setEnabled(false);
				btnRestart.setEnabled(false);
			}
			
			btnEnhance.addSelectionListener(new SelectionAdapter() {
				public void widgetSelected(SelectionEvent e) {
					BusyIndicator.showWhile(getShell().getDisplay(), new Runnable() {
						public void run() {
							try {
								JarUtil.enhanceJDTCoreTo(coreJarName, base, 
											new File(base).getParentFile().getAbsolutePath(), base);
								EnhancerInfo.isJDTCoreAlreadyEnhanced = true;
								label4.setEnabled(true);
								btnRestart.setEnabled(true);
								//btnEnhance.setEnabled(false);
								label3.setEnabled(true);
								textPath.setEnabled(true);
								btnOpen.setEnabled(true);
								btnEnhance.setText("Enhance JDT Core Again");
							} catch (IOException e1) {
								e1.printStackTrace();
								MessageDialog.openError(getShell(), "Enhance Error", e1.getMessage());
							}
						}
					
					});
				}
			});
			

			noDefaultAndApplyButton();
		} else {
	    	IJavaProject jproject = (IJavaProject) getElement();
	        IProject project = jproject.getProject();
			String prjFolder = project.getLocation().toOSString();
			File file = new File(prjFolder, ".j2s");
			
			configPage = new J2SConfigPage(composite, SWT.NONE);
			configPage.initConfigPage(file);
			isEnabled = configPage.isCompilerEnabled();
		}
		return composite;
	}
	
	public boolean performOk() {
		if (EnhancerInfo.currentDetectedVersion == null) {
			return true;
		}
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
				project.build(IncrementalProjectBuilder.CLEAN_BUILD, monitor);
			} catch (CoreException e) {
				e.printStackTrace();
			}
		}
		return true;
	}

//	protected void performDefaults() {
//		// TODO Auto-generated method stub
//		super.performDefaults();
//	}

}