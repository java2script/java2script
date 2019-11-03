package net.sf.j2s.ui.launching;

import java.util.Arrays;

import net.sf.j2s.ui.launching.template.J2SAppLauncherTemplateContributor;
import net.sf.j2s.ui.launching.template.TemplateContributionUtil;

import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.IExtension;
import org.eclipse.core.runtime.IExtensionPoint;
import org.eclipse.core.runtime.Platform;
import org.eclipse.debug.ui.AbstractLaunchConfigurationTabGroup;
import org.eclipse.debug.ui.ILaunchConfigurationDialog;
import org.eclipse.debug.ui.ILaunchConfigurationTab;
import org.eclipse.jdt.debug.ui.launchConfigurations.JavaMainTab;

public class J2SLaunchingTabGroup extends AbstractLaunchConfigurationTabGroup {

	public J2SLaunchingTabGroup() {
		super();
	}

	public void createTabs(ILaunchConfigurationDialog dialog, String mode) {		

		/* sgurin: if some j2s template contributor is available, then hide HTMLOptionsTab and show 
		the template contributor tab. If no template contribution is available, show HTMLOptionsTab so 
		everithing is unchanged */
				
		ILaunchConfigurationTab[] tabs = null;
		J2SAppLauncherTemplateContributor contrib = null;
		
		try {
			contrib = TemplateContributionUtil.getInstance().getCurrentTemplateContribution();
		} catch (Exception e) {
			
		}
		
		if(contrib!=null) {
			tabs=new ILaunchConfigurationTab[] {
				new JavaMainTab(), 
				new J2SArgumentsTab(),
				new J2SClasspathOptionTab(), 
				new J2STemplateOptionsTab(contrib),
				new J2SConsoleOptionsTab()
			};
		}
		else {
			tabs=new ILaunchConfigurationTab[] {
				new JavaMainTab(), 
				new J2SArgumentsTab(),
				new J2SClasspathOptionTab(), 
				new J2SGenerateHTMLOptionsTab(),
				new J2SConsoleOptionsTab()
			};
		}
		
		setTabs(tabs);
	}

}
