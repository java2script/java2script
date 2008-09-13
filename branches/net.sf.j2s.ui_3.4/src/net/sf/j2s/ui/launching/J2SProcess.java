package net.sf.j2s.ui.launching;

import org.eclipse.debug.core.DebugException;
import org.eclipse.debug.core.ILaunch;
import org.eclipse.debug.core.model.IProcess;
import org.eclipse.debug.core.model.IStreamsProxy;

public class J2SProcess implements IProcess {

	private ILaunch launch;
	
	private String label;
	
	public J2SProcess(ILaunch launch, String label) {
		super();
		this.launch = launch;
		this.label = label;
	}

	public String getAttribute(String key) {
		return null;
	}

	public int getExitValue() throws DebugException {
		return 0;
	}

	public String getLabel() {
		return label;
	}

	public ILaunch getLaunch() {
		return launch;
	}

	public IStreamsProxy getStreamsProxy() {
		return null;
	}

	public void setAttribute(String key, String value) {
	}

	public Object getAdapter(Class adapter) {
		return null;
	}

	public boolean canTerminate() {
		return true;
	}

	public boolean isTerminated() {
		// J2S process is terminated already as there is no way to monitor it
		return true;
	}

	public void terminate() throws DebugException {
	}

}
