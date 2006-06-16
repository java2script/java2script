/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ajax;

import net.sf.j2s.ajax.IXHRCallback;
import org.eclipse.swt.widgets.Display;


/**
 * @author josson smith
 *
 * 2006-2-11
 */
public class XHRCallbackSWTAdapter implements IXHRCallback {
	
	public void swtOnComplete() {
	}

	public void swtOnInteractive() {
	}

	public void swtOnLoaded() {
	}

	public void swtOnLoading() {
	}

	public void swtOnUninitialized() {
	}

	public void onComplete() {
		Display.getDefault().syncExec(new Runnable() {
			public void run() {
				swtOnComplete();
			}
		});
	}

	public void onInteractive() {
		Display.getDefault().syncExec(new Runnable() {
			public void run() {
				swtOnInteractive();
			}
		});
	}

	public void onLoaded() {
		Display.getDefault().syncExec(new Runnable() {
			public void run() {
				swtOnLoaded();
			}
		});
	}

	public void onLoading() {
		Display.getDefault().syncExec(new Runnable() {
			public void run() {
				swtOnLoading();
			}
		});
	}

	public void onUninitialized() {
		Display.getDefault().syncExec(new Runnable() {
			public void run() {
				swtOnUninitialized();
			}
		});
	}

}
