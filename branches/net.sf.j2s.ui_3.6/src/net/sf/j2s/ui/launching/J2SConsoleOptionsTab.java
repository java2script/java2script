package net.sf.j2s.ui.launching;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;
import net.sf.j2s.ui.Java2ScriptUIPlugin;
import net.sf.j2s.ui.preferences.PreferenceConstants;
import net.sf.j2s.ui.property.FileUtil;
import net.sf.j2s.ui.resources.ExternalResources;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.debug.core.ILaunchConfigurationWorkingCopy;
import org.eclipse.debug.ui.AbstractLaunchConfigurationTab;
import org.eclipse.jdt.debug.ui.launchConfigurations.JavaLaunchTab;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.internal.debug.ui.JavaDebugImages;
import org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.FocusAdapter;
import org.eclipse.swt.events.FocusEvent;
import org.eclipse.swt.events.FocusListener;
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Text;

public class J2SConsoleOptionsTab extends AbstractLaunchConfigurationTab {
	
	Button btnInner;

	Button btnCompatiable;
	
	Button btnCompatiableRawJS; // whether import or include mozilla.addon.js 

	Button btnFastView;

	Button btnMaximize;

	Button btnUseGlobalURL;

	Button btnExternal;

	Label lblJ2SLib;

	Text txtJ2SLib;

	Label lblBin;

	Text txtBin;

	public J2SConsoleOptionsTab() {
		super();
	}

	public void createControl(Composite parent) {
		Font font = parent.getFont();
		Composite comp = new Composite(parent, SWT.NONE);
		GridLayout layout = new GridLayout(1, true);
		comp.setLayout(layout);
		comp.setFont(font);

		GridData gd = new GridData(GridData.FILL_BOTH);
		comp.setLayoutData(gd);
		setControl(comp);

		Group group = new Group(comp, SWT.NONE);
		group.setFont(font);
		layout = new GridLayout();
		group.setLayout(layout);
		group.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));

		String controlName = "Java2Script Console";
		group.setText(controlName);
		
		btnInner = new Button(group, SWT.RADIO);
		btnInner.setText("Inner J2S Console");
		btnInner.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				updateLaunchConfigurationDialog();
				btnFastView.setEnabled(btnInner.getSelection());
				btnMaximize.setEnabled(btnInner.getSelection());
			}
		});

		btnFastView = new Button(group, SWT.CHECK);
		btnFastView.setText("Make J2S console as fast view automatically");
		GridData gdfv = new GridData();
		gdfv.horizontalIndent = 32;
		btnFastView.setLayoutData(gdfv);
		btnFastView.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				updateLaunchConfigurationDialog();
			}
		});

		btnMaximize = new Button(group, SWT.CHECK);
		btnMaximize.setText("Maximize J2S console automatically");
		GridData gdm = new GridData();
		gdm.horizontalIndent = 32;
		btnMaximize.setLayoutData(gdm);
		btnMaximize.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				updateLaunchConfigurationDialog();
			}
		});
		
		btnExternal = new Button(group, SWT.RADIO);
		btnExternal.setText("Registered external browsers, like Firefox, IE");
		btnExternal.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				updateLaunchConfigurationDialog();
				btnFastView.setEnabled(btnInner.getSelection());
				btnMaximize.setEnabled(btnInner.getSelection());
			}
		});
		
		btnCompatiable = new Button(comp, SWT.CHECK);
		btnCompatiable.setText("Generate codes with Mozilla Add-on supports");
		btnCompatiable.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				updateLaunchConfigurationDialog();
				btnCompatiableRawJS.setEnabled(btnCompatiable.getSelection());
			}
		});
		
		btnCompatiableRawJS = new Button(comp, SWT.CHECK);
		GridData gdjs = new GridData();
		gdjs.horizontalIndent = 32;
		btnCompatiableRawJS.setLayoutData(gdjs);
		btnCompatiableRawJS.setText("Write compatiable JavaScript instead of including mozilla.addon.js");
		btnCompatiableRawJS.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				updateLaunchConfigurationDialog();
			}
		});
		
		btnUseGlobalURL = new Button(comp, SWT.CHECK);
		btnUseGlobalURL.setText("Use global *.js URL");
		btnUseGlobalURL.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				updateLaunchConfigurationDialog();
				boolean selection = btnUseGlobalURL.getSelection();
				lblJ2SLib.setEnabled(selection);
				lblBin.setEnabled(selection);
				txtJ2SLib.setEnabled(selection);
				txtBin.setEnabled(selection);
			}
		});
		
		Composite txtComp = new Composite(comp, SWT.NONE);
		GridData gdtxt = new GridData();
		gdtxt.horizontalIndent = 32;
		txtComp.setLayoutData(gdtxt);
		txtComp.setLayout(new GridLayout(2, false));
		
		lblJ2SLib = new Label(txtComp, SWT.NONE);
		lblJ2SLib.setText("J2SLib base URL:");
		
		txtJ2SLib = new Text(txtComp, SWT.BORDER);
		GridData gdtxt1 = new GridData();
		gdtxt1.widthHint = 240;
		txtJ2SLib.setLayoutData(gdtxt1);
		FocusListener focusListener = new FocusAdapter() {
			public void focusGained(FocusEvent e) {
				// select txt
				((Text) e.widget).selectAll();
			}
		};
		ModifyListener modifyListener = new ModifyListener() {
			public void modifyText(ModifyEvent e) {
				updateLaunchConfigurationDialog();
			}
		};
		txtJ2SLib.addFocusListener(focusListener);
		txtJ2SLib.addModifyListener(modifyListener);
		
		lblBin = new Label(txtComp, SWT.NONE);
		lblBin.setText("Binary folder URL:");
		
		txtBin = new Text(txtComp, SWT.BORDER);
		GridData gdtxt2 = new GridData();
		gdtxt2.widthHint = 240;
		txtBin.setLayoutData(gdtxt2);
		txtBin.addFocusListener(focusListener);
		txtBin.addModifyListener(modifyListener);
	}

	public void setDefaults(ILaunchConfigurationWorkingCopy configuration) {
		configuration.setAttribute(IJ2SLauchingConfiguration.FAST_VIEW_J2S_CONSOLE,
				false);
		configuration.setAttribute(
				IJ2SLauchingConfiguration.MAXIMIZE_J2S_CONSOLE, false);
		
		IPreferenceStore store = Java2ScriptUIPlugin.getDefault()
			.getPreferenceStore();

		boolean preferred = store.getBoolean(PreferenceConstants.INNER_CONSOLE);
		
		configuration.setAttribute(
				IJ2SLauchingConfiguration.VIEW_IN_INNER_J2S_CONSOLE, preferred);
		
		preferred = store.getBoolean(PreferenceConstants.ADDON_COMPATIABLE);
		
		configuration.setAttribute(
				IJ2SLauchingConfiguration.J2S_MOZILLA_ADDON_COMPATIABLE, preferred);
		
		configuration.setAttribute(
				IJ2SLauchingConfiguration.J2S_MOZILLA_ADDON_COMPATIABLE_RAW_JS, true);
		
		configuration.setAttribute(
				IJ2SLauchingConfiguration.USE_GLOBAL_ALAA_URL, false);
		
		configuration.setAttribute(
				IJ2SLauchingConfiguration.GLOBAL_J2SLIB_URL, 
				"http://archive.java2script.org/" + getCurrentReleaseAlias(configuration) + "/");
		
		configuration.setAttribute(
				IJ2SLauchingConfiguration.GLOBAL_BINARY_URL, getCurrentBinPath(configuration));
	}

	public void initializeFrom(ILaunchConfiguration configuration) {
		try {
			btnFastView.setSelection(configuration.getAttribute(
					IJ2SLauchingConfiguration.FAST_VIEW_J2S_CONSOLE, false));
			btnMaximize.setSelection(configuration.getAttribute(
					IJ2SLauchingConfiguration.MAXIMIZE_J2S_CONSOLE, false));
			btnCompatiableRawJS.setSelection(configuration.getAttribute(
					IJ2SLauchingConfiguration.J2S_MOZILLA_ADDON_COMPATIABLE_RAW_JS, true));
			
			IPreferenceStore store = Java2ScriptUIPlugin.getDefault()
				.getPreferenceStore();

			boolean preferred = store.getBoolean(PreferenceConstants.INNER_CONSOLE);
			
			boolean external = configuration.getAttribute(
					IJ2SLauchingConfiguration.VIEW_IN_INNER_J2S_CONSOLE, preferred);
			btnInner.setSelection(external);
			btnExternal.setSelection(!external);
			btnFastView.setEnabled(external);
			btnMaximize.setEnabled(external);
			
			preferred = store.getBoolean(PreferenceConstants.ADDON_COMPATIABLE);
			
			boolean compatiable = configuration.getAttribute(
					IJ2SLauchingConfiguration.J2S_MOZILLA_ADDON_COMPATIABLE, preferred);
			btnCompatiable.setSelection(compatiable);
			btnCompatiableRawJS.setEnabled(compatiable);
			
			boolean useGlobal = configuration.getAttribute(
					IJ2SLauchingConfiguration.USE_GLOBAL_ALAA_URL, false);
			btnUseGlobalURL.setSelection(useGlobal);
			lblJ2SLib.setEnabled(useGlobal);
			lblBin.setEnabled(useGlobal);
			txtJ2SLib.setEnabled(useGlobal);
			txtBin.setEnabled(useGlobal);
			
			txtJ2SLib.setText(configuration.getAttribute(
					IJ2SLauchingConfiguration.GLOBAL_J2SLIB_URL, 
					"http://archive.java2script.org/" + getCurrentReleaseAlias(configuration) + "/"));
			
			txtBin.setText(configuration.getAttribute(
					IJ2SLauchingConfiguration.GLOBAL_BINARY_URL, getCurrentBinPath(configuration)));
			
		} catch (CoreException e) {
			e.printStackTrace();
		}
	}

	private String getCurrentBinPath(ILaunchConfiguration configuration) {
		IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
		try {
			String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
			if ((projectName == null) || (projectName.trim().length() < 1)) {
				return null;
			}			
			IJavaProject javaProject = javaModel.getJavaProject(projectName);
			if ((javaProject == null) || !javaProject.exists()) {
				return null;
			}
			String path = javaProject.getOutputLocation().toString();
			int idx = path.indexOf('/', 2);
			String relativePath = "./";
			if (idx != -1) {
				relativePath = path.substring(idx + 1); 
			}
			return relativePath;
		} catch (JavaModelException e) {
			e.printStackTrace();
		} catch (CoreException e) {
			e.printStackTrace();
		}
		return "bin/";
	}
	private String getCurrentJ2SLibPath(File workingDir) {
		String[][] allResources = ExternalResources.getAllResources();
		String j2sLibPath = null;
		if (allResources != null && allResources.length != 0 && allResources[0].length != 0) {
			if ((allResources[0][0]).startsWith("|")) {
				allResources[0][0] = FileUtil.toRelativePath(allResources[0][0].substring(1), 
						workingDir.getAbsolutePath());;
			}
			j2sLibPath = allResources[0][0].substring(0, allResources[0][0].lastIndexOf("/") + 1);
		} else {
			j2sLibPath = "../net.sf.j2s.lib/j2slib/";
		}
		return j2sLibPath;
	}
	private String getCurrentReleaseAlias(ILaunchConfiguration configuration) {
		File workingDir = null;
		try {
			workingDir = J2SLaunchingUtil.getWorkingDirectory(configuration);
			String j2sLibPath = getCurrentJ2SLibPath(workingDir);
			
			File j2slibFolder = new File(workingDir.getAbsolutePath(), j2sLibPath);
			File j2sRelease = new File(j2slibFolder, ".release");
			Properties release = new Properties();
			String alias = "2.0.0";
			String version = "20081203";
			release.put("alias", alias);
			release.put("version", version);
			if (j2sRelease.exists()) {
				try {
					release.load(new FileInputStream(j2sRelease));
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
				alias = release.getProperty("alias");
				version = release.getProperty("version");
			}
			return alias;
		} catch (CoreException e) {
			e.printStackTrace();
			return "2.0.0";
		}
	}
	public void performApply(ILaunchConfigurationWorkingCopy configuration) {
		configuration.setAttribute(IJ2SLauchingConfiguration.FAST_VIEW_J2S_CONSOLE,
				btnFastView.getSelection());
		configuration.setAttribute(
				IJ2SLauchingConfiguration.MAXIMIZE_J2S_CONSOLE, btnMaximize.getSelection());
		configuration.setAttribute(
				IJ2SLauchingConfiguration.VIEW_IN_INNER_J2S_CONSOLE, btnInner.getSelection());
		configuration.setAttribute(
				IJ2SLauchingConfiguration.J2S_MOZILLA_ADDON_COMPATIABLE, btnCompatiable.getSelection());
		configuration.setAttribute(
				IJ2SLauchingConfiguration.J2S_MOZILLA_ADDON_COMPATIABLE_RAW_JS, btnCompatiableRawJS.getSelection());
		configuration.setAttribute(
				IJ2SLauchingConfiguration.USE_GLOBAL_ALAA_URL, btnUseGlobalURL.getSelection());
		configuration.setAttribute(
				IJ2SLauchingConfiguration.GLOBAL_J2SLIB_URL, txtJ2SLib.getText());
		configuration.setAttribute(
				IJ2SLauchingConfiguration.GLOBAL_BINARY_URL, txtBin.getText());
	}

	public String getName() {
		return "Miscellaneous";
	}
	
	public Image getImage() {
		return getClasspathImage();
	}

	public static Image getClasspathImage() {
		return JavaDebugImages.get(JavaDebugImages.IMG_OBJS_MONITOR);
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#activated(org.eclipse.debug.core.ILaunchConfigurationWorkingCopy)
	 */
	public void activated(ILaunchConfigurationWorkingCopy workingCopy) {}

	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#deactivated(org.eclipse.debug.core.ILaunchConfigurationWorkingCopy)
	 */
	public void deactivated(ILaunchConfigurationWorkingCopy workingCopy) {}


}
