package net.sf.j2s.ui.launching;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import net.sf.j2s.ui.Java2ScriptUIPlugin;
import net.sf.j2s.ui.console.J2SConsoleView;
import net.sf.j2s.ui.preferences.PreferenceConstants;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.jface.preference.IPreferenceStore;
import org.eclipse.swt.program.Program;
import org.eclipse.ui.IViewPart;
import org.eclipse.ui.IViewReference;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.actions.ActionFactory;
import org.eclipse.ui.actions.ActionFactory.IWorkbenchAction;
import org.eclipse.ui.internal.WorkbenchPage;

public class J2SApplicationRunnable implements Runnable {
	ILaunchConfiguration configuration;
	String url;

	public J2SApplicationRunnable(ILaunchConfiguration configuration, String url) {
		this.configuration = configuration;
		this.url = url;
	}

	public void run() {
		boolean isToViewInConsole = true;
		boolean isViewFast = false;
		boolean isViewMaximize = false;
		try {
			IPreferenceStore store = Java2ScriptUIPlugin.getDefault().getPreferenceStore();

			boolean preferred = store.getBoolean(PreferenceConstants.INNER_CONSOLE);
		
			isToViewInConsole = configuration.getAttribute(
					IJ2SLauchingConfiguration.VIEW_IN_INNER_J2S_CONSOLE, preferred);
			isViewMaximize = configuration.getAttribute(
					IJ2SLauchingConfiguration.MAXIMIZE_J2S_CONSOLE, false);
			isViewFast = configuration.getAttribute(
					IJ2SLauchingConfiguration.FAST_VIEW_J2S_CONSOLE, false);
		} catch (CoreException e1) {
			e1.printStackTrace();
		}
		
		if (!isToViewInConsole) {
			if (url != null && url.length() != 0) {
				try {
					String file = new URL(url).getFile();
					boolean win32 = ((System.getProperty("os.name").indexOf("Windows") != -1) //$NON-NLS-1$ //$NON-NLS-2$ 
							|| (System.getProperty("os.name").indexOf("windows") != -1)); //$NON-NLS-1$ //$NON-NLS-2$
					if (win32 && file.startsWith("/")) {
						file = file.substring(1);
					}
					file = file.replace('/', File.separatorChar);
					Program.launch(file);
				} catch (MalformedURLException e1) {
					e1.printStackTrace();
				}
			}
			return;
		}
		IWorkbenchPage activePage = Java2ScriptUIPlugin.getDefault()
				.getWorkbench().getWorkbenchWindows()[0].getActivePage();
		IViewPart console = activePage
				.findView("net.sf.j2s.ui.console.J2SConsoleView");
		if (console == null) {
			try {
				console = activePage
						.showView("net.sf.j2s.ui.console.J2SConsoleView");
			} catch (PartInitException e) {
				e.printStackTrace();
			}
		}
		if (console != null) {
			J2SConsoleView j2sConsole = (J2SConsoleView) console;
			IWorkbenchPage page = j2sConsole.getViewSite().getWorkbenchWindow()
					.getActivePage();
			WorkbenchPage wp = (WorkbenchPage) page;
			IViewReference ref = wp
					.findViewReference("net.sf.j2s.ui.console.J2SConsoleView");
			if (isViewFast && !wp.isFastView(ref)) {
				wp.addFastView(ref);
			}
			page.activate(j2sConsole);
			j2sConsole.setFocus();
			if (isViewMaximize) {
				IWorkbenchAction action = ActionFactory.MAXIMIZE
						.create(j2sConsole.getViewSite().getWorkbenchWindow());
				action.run();
			}
			if (url != null) {
				j2sConsole.browse(url);
			}
		}

	}

}
