/*******************************************************************************
 * Copyright (c) 2004 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.core.runtime.internal.adaptor;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import org.eclipse.core.runtime.adaptor.*;
import org.eclipse.osgi.service.datalocation.Location;

/**
 * Internal class.
 */
public class BasicLocation implements Location {
	private static class MockLocker implements Locker {
		public boolean lock() throws IOException {
			// locking always successful
			return true;
		}
		public void release() {
			// nothing to release
		}

	}
	private boolean isReadOnly;
	private URL location = null;
	private Location parent;
	private URL defaultValue;
	private String property;

	// locking related fields
	private File lockFile;
	private Locker locker;
	public static final String PROP_OSGI_LOCKING = "osgi.locking"; //$NON-NLS-1$
	private static String LOCK_FILENAME = ".metadata/.lock"; //$NON-NLS-1$
	public static boolean DEBUG;

	private static boolean isRunningWithNio() {
		try {
			 Class.forName("java.nio.channels.FileLock"); //$NON-NLS-1$
		} catch (ClassNotFoundException e) {
			return false;
		}
		return true;
	}

	public static Locker createLocker(File lock, String lockMode) {
		if (lockMode == null)
			lockMode = System.getProperties().getProperty(PROP_OSGI_LOCKING);
		
		if ("none".equals(lockMode)) //$NON-NLS-1$
			return new MockLocker();
		
		if ("java.io".equals(lockMode)) //$NON-NLS-1$
			return new Locker_JavaIo(lock);
		
		if ("java.nio".equals(lockMode)) { //$NON-NLS-1$
			if (isRunningWithNio()) {
				return new Locker_JavaNio(lock);
			} else {
				// TODO should we return null here.  NIO was requested but we could not do it...
				return new Locker_JavaIo(lock);
			}
		} 
		
		//	Backup case if an invalid value has been specified
		if (isRunningWithNio()) {
			return new Locker_JavaNio(lock);
		} else {
			return new Locker_JavaIo(lock);
		}
	}

	public BasicLocation(String property, URL defaultValue, boolean isReadOnly) {
		super();
		this.property = property;
		this.defaultValue = defaultValue;
		this.isReadOnly = isReadOnly;
	}

	public boolean allowsDefault() {
		return defaultValue != null;
	}

	public URL getDefault() {
		return defaultValue;
	}

	public Location getParentLocation() {
		return parent;
	}

	public synchronized URL getURL() {
		if (location == null && defaultValue != null)
			setURL(defaultValue, false);
		return location;
	}

	public synchronized boolean isSet() {
		return location != null;
	}

	public boolean isReadOnly() {
		return isReadOnly;
	}

	public synchronized boolean setURL(URL value, boolean lock) throws IllegalStateException {
		if (location != null)
			throw new IllegalStateException(EclipseAdaptorMsg.ECLIPSE_CANNOT_CHANGE_LOCATION);
		File file = null;
		if (value.getProtocol().equalsIgnoreCase("file")) //$NON-NLS-1$
			file = new File(value.getFile(), LOCK_FILENAME);
		lock = lock && !isReadOnly;
		if (lock) {
			try {
				if (!lock(file))
					return false;
			} catch (IOException e) {
				return false;
			}
		}
		lockFile = file;
		location = LocationManager.buildURL(value.toExternalForm(), true);
		if (property != null)
			System.getProperties().put(property, location.toExternalForm());
		return lock;
	}

	public synchronized void setParent(Location value) {
		parent = value;
	}

	public synchronized boolean lock() throws IOException {
		if (!isSet())
			return false;
		return lock(lockFile);
	}

	private boolean lock(File lock) throws IOException {
		if (lock == null || isReadOnly)
			return false;

		File parentFile = new File(lock.getParent());
		if (!parentFile.exists())
			if (!parentFile.mkdirs())
				return false;

		setLocker(lock);
		if (locker == null)
			return true;
		boolean locked = false; 
		try {
			locked = locker.lock();
			return locked;
		} finally {
			if (!locked)
				locker = null;
		}
	}

	private void setLocker(File lock) {
		if (locker != null)
			return;
		String lockMode = System.getProperties().getProperty(PROP_OSGI_LOCKING);
		locker = createLocker(lock, lockMode);
	}

	public synchronized void release() {
		if (locker != null)
			locker.release();
	}
}
