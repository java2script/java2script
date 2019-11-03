/*******************************************************************************
 * Copyright (c) 2000, 2004 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.core.runtime.internal.stats;

import java.util.ArrayList;

/**
 * Contains information about activated bundles and acts as the main 
 * entry point for logging bundle activity.
 */

public class BundleStats {
	public String symbolicName;
	public long id;
	public int activationOrder;
	private long timestamp; //timeStamp at which this bundle has been activated
	private boolean duringStartup; // indicate if the bundle has been activated during startup
	private long startupTime; // the time took by the bundle to startup
	private long startupMethodTime; // the time took to run the startup method

	// Indicate the position of the activation trace in the file
	private long traceStart = -1;
	private long traceEnd = -1;

	//To keep bundle parentage
	private ArrayList bundlesActivated = new ArrayList(3); // TODO create lazily
	private BundleStats activatedBy = null;

	public BundleStats(String name, long id) {
		this.symbolicName = name;
		this.id = id;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public int getActivationOrder() {
		return activationOrder;
	}

	protected void activated(BundleStats info) {
		bundlesActivated.add(info);
	}

	public BundleStats getActivatedBy() {
		return activatedBy;
	}

	public long getId() {
		return id;
	}

	public String getSymbolicName() {
		return symbolicName;
	}

	public long getStartupTime() {
		return startupTime;
	}

	public long getStartupMethodTime() {
		return startupMethodTime;
	}

	public boolean isStartupBundle() {
		return duringStartup;
	}

	public int getClassLoadCount() {
		if (!StatsManager.MONITOR_CLASSES)
			return 0;
		ClassloaderStats loader = ClassloaderStats.getLoader(symbolicName);
		return loader == null ? 0 : loader.getClassLoadCount();
	}

	public long getClassLoadTime() {
		if (!StatsManager.MONITOR_CLASSES)
			return 0;
		ClassloaderStats loader = ClassloaderStats.getLoader(symbolicName);
		return loader == null ? 0 : loader.getClassLoadTime();
	}

	public ArrayList getBundlesActivated() {
		return bundlesActivated;
	}

	public long getTraceStart() {
		return traceStart;
	}

	public long getTraceEnd() {
		return traceEnd;
	}

	protected void setTimestamp(long value) {
		timestamp = value;
	}

	protected void setActivationOrder(int value) {
		activationOrder = value;
	}

	protected void setTraceStart(long time) {
		traceStart = time;
	}

	protected void setDuringStartup(boolean value) {
		duringStartup = value;
	}

	protected void endActivation() {
		startupTime = System.currentTimeMillis() - timestamp;
	}

	protected void setTraceEnd(long position) {
		traceEnd = position;
	}

	protected void setActivatedBy(BundleStats value) {
		activatedBy = value;
	}
}
