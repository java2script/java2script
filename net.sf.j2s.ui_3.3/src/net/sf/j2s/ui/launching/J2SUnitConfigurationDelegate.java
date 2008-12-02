package net.sf.j2s.ui.launching;

import java.io.File;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.debug.core.ILaunch;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.debug.core.model.LaunchConfigurationDelegate;

public class J2SUnitConfigurationDelegate extends LaunchConfigurationDelegate {

	public J2SUnitConfigurationDelegate() {
		super();
	}

	public void launch(ILaunchConfiguration configuration, String mode,
			ILaunch launch, IProgressMonitor monitor) throws CoreException {
		if (configuration != null) {
			try {
				J2SLaunchingUtil.launchingJ2SUnit(configuration, mode, "junit.html");
				String mainType = J2SLaunchingUtil.getMainType(configuration);
				if (mainType != null) {
					File workingDir = J2SLaunchingUtil.getWorkingDirectory(configuration);
					if (workingDir != null) {
						launch.addProcess(new J2SProcess(launch, new File(workingDir, mainType + ".junit.html").getAbsolutePath()));
					}
				}
			} catch (CoreException e) {
				e.printStackTrace();
			}
			//DebugUITools.launch(config, mode);
		}			
	}

}
