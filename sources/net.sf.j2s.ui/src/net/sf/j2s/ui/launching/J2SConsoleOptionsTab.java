package net.sf.j2s.ui.launching;

import net.sf.j2s.ui.Java2ScriptUIPlugin;
import net.sf.j2s.ui.preferences.PreferenceConstants;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.debug.core.ILaunchConfigurationWorkingCopy;
import org.eclipse.debug.ui.AbstractLaunchConfigurationTab;
import org.eclipse.jdt.internal.debug.ui.JavaDebugImages;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Group;

public class J2SConsoleOptionsTab extends AbstractLaunchConfigurationTab {
	
	private Button btnInner;

	private Button btnCompatiable;
	
	private Button btnCompatiableRawJS; // whether import or include mozilla.addon.js 

	private Button btnFastView;

	private Button btnMaximize;

	public J2SConsoleOptionsTab() {
		super();
	}

	public void createControl(Composite parent) {
		Font font = parent.getFont();
		Composite comp = new Composite(parent, parent.getStyle());
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
		group.setLayoutData(new GridData(GridData.FILL_BOTH));

		String controlName = "Console Misc Options";
		group.setText(controlName);
		
		btnInner = new Button(group, SWT.CHECK);
		btnInner.setText("View Java2Script application in J2S console");
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
		
		btnCompatiable = new Button(group, SWT.CHECK);
		btnCompatiable.setText("Generate codes with Mozilla Addon compatiabilities");
		btnCompatiable.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				updateLaunchConfigurationDialog();
				btnCompatiableRawJS.setEnabled(btnCompatiable.getSelection());
			}
		});
		
		btnCompatiableRawJS = new Button(group, SWT.CHECK);
		GridData gdjs = new GridData();
		gdjs.horizontalIndent = 32;
		btnCompatiableRawJS.setLayoutData(gdjs);
		btnCompatiableRawJS.setText("Write compatiable JavaScript instead of including mozilla.addon.js");
		btnCompatiableRawJS.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				updateLaunchConfigurationDialog();
			}
		});
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
			btnFastView.setEnabled(external);
			btnMaximize.setEnabled(external);
			
			preferred = store.getBoolean(PreferenceConstants.ADDON_COMPATIABLE);
			
			boolean compatiable = configuration.getAttribute(
					IJ2SLauchingConfiguration.J2S_MOZILLA_ADDON_COMPATIABLE, preferred);
			btnCompatiable.setSelection(compatiable);
			btnCompatiableRawJS.setEnabled(compatiable);
			
		} catch (CoreException e) {
			e.printStackTrace();
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
	}

	public String getName() {
		return "Misc";
	}
	
	public Image getImage() {
		return getClasspathImage();
	}

	public static Image getClasspathImage() {
		return JavaDebugImages.get(JavaDebugImages.IMG_OBJS_MONITOR);
	}

}
