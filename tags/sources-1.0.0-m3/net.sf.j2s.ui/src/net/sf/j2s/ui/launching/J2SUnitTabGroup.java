package net.sf.j2s.ui.launching;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.debug.core.ILaunchConfigurationWorkingCopy;
import org.eclipse.debug.ui.AbstractLaunchConfigurationTabGroup;
import org.eclipse.debug.ui.ILaunchConfigurationDialog;
import org.eclipse.debug.ui.ILaunchConfigurationTab;
import org.eclipse.debug.ui.ILaunchConfigurationTabGroup;
import org.eclipse.jdt.internal.junit.launcher.JUnitMainTab;
import org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants;
import org.eclipse.swt.custom.BusyIndicator;
import org.eclipse.swt.widgets.Display;

public class J2SUnitTabGroup extends AbstractLaunchConfigurationTabGroup {
	/**
	 * @see ILaunchConfigurationTabGroup#createTabs(ILaunchConfigurationDialog, String)
	 */
	public void createTabs(ILaunchConfigurationDialog dialog, String mode) {
		ILaunchConfigurationTab[] tabs = null;
//		if (PDECore.getDefault().getModelManager().isOSGiRuntime()) {
			tabs = new ILaunchConfigurationTab[]{new JUnitMainTab(),
					new J2SArgumentsTab(),
					//new J2SPathTab(),
					//new JavaJRETab(),
//					new JavaClasspathTab(), 
					new J2SClasspathOptionTab(), 
					//new SourceLookupTab(),
					//new EnvironmentTab(), 
					//new CommonTab()
					new J2SGenerateHTMLOptionsTab(),
					new J2SConsoleOptionsTab()
			};
//		} else {
//			tabs = new ILaunchConfigurationTab[]{new JUnitMainTab(),
//					new JUnitArgumentsTab(), new AdvancedLauncherTab(false),
//					new TracingLauncherTab(), new EnvironmentTab(),
//					new SourceLookupTab(), new CommonTab()};
//		}
		setTabs(tabs);
	}

	/**
	 * @see ILaunchConfigurationTabGroup#setDefaults(ILaunchConfigurationWorkingCopy)
	 */
	public void setDefaults(ILaunchConfigurationWorkingCopy config) {
		super.setDefaults(config); 
		config.setAttribute(IJavaLaunchConfigurationConstants.ATTR_SOURCE_PATH_PROVIDER, "org.eclipse.pde.ui.workbenchClasspathProvider"); //$NON-NLS-1$
	}
	
	/**
	 * @see org.eclipse.debug.ui.AbstractLaunchConfigurationTabGroup#initializeFrom(ILaunchConfiguration)
	 */
	public void initializeFrom(ILaunchConfiguration configuration) {
		final ILaunchConfiguration config = configuration;
		final ILaunchConfigurationTab[] tabs = getTabs();
		BusyIndicator.showWhile(Display.getCurrent(), new Runnable() {
			public void run() {
				try {
					String id =
						config.getAttribute(
							IJavaLaunchConfigurationConstants.ATTR_SOURCE_PATH_PROVIDER,
							(String) null);
					if (id == null
						&& config instanceof ILaunchConfigurationWorkingCopy) {
						ILaunchConfigurationWorkingCopy wc =
							(ILaunchConfigurationWorkingCopy) config;
						wc.setAttribute(
							IJavaLaunchConfigurationConstants.ATTR_SOURCE_PATH_PROVIDER,
							"org.eclipse.pde.ui.workbenchClasspathProvider"); //$NON-NLS-1$
					}
				} catch (CoreException e) {
				}
				for (int i = 0; i < tabs.length; i++) {
					tabs[i].initializeFrom(config);
				}

			}
		});
	}

}

