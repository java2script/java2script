/*******************************************************************************
 * Copyright (c) 2003, 2004 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.core.runtime.internal.adaptor;

/**
 * Internal class.
 */
public class Semaphore {
	protected long notifications;

	public Semaphore(int count) {
		notifications = count;
	}

	/**
	 * Attempts to acquire this semaphore.  Returns only when the semaphore has been acquired.
	 */
	public synchronized void acquire() {
		while (true) {
			if (notifications > 0) {
				notifications--;
				return;
			}
			try {
				wait();
			} catch (InterruptedException e) {
				//Ignore
			}
		}
	}

	/**
	 * Attempts to acquire this semaphore.  Returns true if it was successfully acquired,
	 * and false otherwise.
	 */
	public synchronized boolean acquire(long delay) {
		long start = System.currentTimeMillis();
		long timeLeft = delay;
		while (true) {
			if (notifications > 0) {
				notifications--;
				return true;
			}
			if (timeLeft < 0)
				return false;
			try {
				wait(timeLeft);
			} catch (InterruptedException e) {
				//Ignore
			}
			timeLeft = start + delay - System.currentTimeMillis();
		}
	}

	public synchronized void release() {
		notifications++;
		notifyAll();
	}

	// for debug only
	public String toString() {
		return "Semaphore(" + notifications + ")"; //$NON-NLS-1$ //$NON-NLS-2$
	}
}
