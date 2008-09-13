package net.sf.j2s.ui.launching;

import org.eclipse.debug.ui.AbstractLaunchConfigurationTabGroup;
import org.eclipse.debug.ui.ILaunchConfigurationDialog;
import org.eclipse.debug.ui.ILaunchConfigurationTab;
import org.eclipse.jdt.debug.ui.launchConfigurations.JavaMainTab;

public class J2SLaunchingTabGroup extends AbstractLaunchConfigurationTabGroup {

	public J2SLaunchingTabGroup() {
		super();
		// TODO Auto-generated constructor stub
	}

	public void createTabs(ILaunchConfigurationDialog dialog, String mode) {
		ILaunchConfigurationTab[] tabs = new ILaunchConfigurationTab[] {
				new JavaMainTab(), 
				new J2SArgumentsTab(),
				//new J2SPathTab(),
				//new JavaJRETab(),
//				new JavaClasspathTab(), 
				new J2SClasspathOptionTab(), 
				//new SourceLookupTab(),
				//new EnvironmentTab(), 
				//new CommonTab()
				new J2SGenerateHTMLOptionsTab(),
				new J2SConsoleOptionsTab()
		};
		setTabs(tabs);
	}

}
