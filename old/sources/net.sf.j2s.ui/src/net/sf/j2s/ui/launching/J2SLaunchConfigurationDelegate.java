package net.sf.j2s.ui.launching;

import java.io.File;

import net.sf.j2s.ui.launching.template.J2SAppLauncherTemplateContributor;
import net.sf.j2s.ui.launching.template.J2STemplateContext;
import net.sf.j2s.ui.launching.template.TemplateContributionUtil;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.Platform;
import org.eclipse.debug.core.ILaunch;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.debug.core.model.LaunchConfigurationDelegate;

public class J2SLaunchConfigurationDelegate extends LaunchConfigurationDelegate {

	public J2SLaunchConfigurationDelegate() {
		super();
	}

	public void launch(ILaunchConfiguration configuration, String mode,
			ILaunch launch, IProgressMonitor monitor) throws CoreException {
		if (configuration != null) {
			try {
				/* sgurin: if configuration attribute IJ2SLauchingConfiguration.APPLY_TEMPLATE exists and is on
				 * then we call net.sf.j2s.ui.launching.J2SAppLauncherTemplateContributor contributor class
				 */
				boolean applyTemplate = configuration.getAttribute("j2s.launch.template.apply", false);
				
				if(applyTemplate) {
					try {
						J2SAppLauncherTemplateContributor contributor = TemplateContributionUtil.getInstance().getCurrentTemplateContribution();
						contributor.launchJ2SApp(new J2STemplateContext(configuration));
					} catch (Exception e) {
						applyTemplate=false;
					}
				}
				if(!applyTemplate){ // if applyTemplate is unchecked or if no template contributor class is found 
					J2SLaunchingUtil.launchingJ2SApp(configuration, mode, "html");					
				}			
				
				String mainType = J2SLaunchingUtil.getMainType(configuration);
				if (mainType != null) {
					File workingDir = J2SLaunchingUtil.getWorkingDirectory(configuration);
					if (workingDir != null) {
						launch.addProcess(new J2SProcess(launch, new File(workingDir, mainType + ".html").getAbsolutePath()));
					}
				}
			} catch (CoreException e) {
				e.printStackTrace();
			}
			//DebugUITools.launch(config, mode);
		}			
	}
}
