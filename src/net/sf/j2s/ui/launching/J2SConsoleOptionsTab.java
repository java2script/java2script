package net.sf.j2s.ui.launching;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.debug.core.ILaunchConfigurationWorkingCopy;
import org.eclipse.debug.ui.AbstractLaunchConfigurationTab;
import org.eclipse.jdt.debug.ui.launchConfigurations.JavaLaunchTab;
import org.eclipse.jdt.internal.debug.ui.JavaDebugImages;
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

	private Button btnFastView;

	private Button btnMaximize;

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
		group.setLayoutData(new GridData(GridData.FILL_BOTH));

		String controlName = "Console UI Options";
		group.setText(controlName);

		btnFastView = new Button(group, SWT.CHECK);
		btnFastView.setText("Make J2S console as fast view automatically");
		btnFastView.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				updateLaunchConfigurationDialog();
			}
		});

		btnMaximize = new Button(group, SWT.CHECK);
		btnMaximize.setText("Maximize J2S console automatically");
		btnMaximize.addSelectionListener(new SelectionAdapter() {
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
	}

	public void initializeFrom(ILaunchConfiguration configuration) {
		try {
			btnFastView.setSelection(configuration.getAttribute(
					IJ2SLauchingConfiguration.FAST_VIEW_J2S_CONSOLE, false));
			btnMaximize.setSelection(configuration.getAttribute(
					IJ2SLauchingConfiguration.MAXIMIZE_J2S_CONSOLE, false));
		} catch (CoreException e) {
			e.printStackTrace();
		}
	}

	public void performApply(ILaunchConfigurationWorkingCopy configuration) {
		configuration.setAttribute(IJ2SLauchingConfiguration.FAST_VIEW_J2S_CONSOLE,
				btnFastView.getSelection());
		configuration.setAttribute(
				IJ2SLauchingConfiguration.MAXIMIZE_J2S_CONSOLE, btnMaximize.getSelection());
	}

	public String getName() {
		return "Console UI";
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
