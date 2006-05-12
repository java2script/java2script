package org.eclipse.jdt.internal.core.builder;

public class NameEnvironmentProxy {

	private NameEnvironment nameEnv;

	public NameEnvironmentProxy(NameEnvironment env) {
		super();
		this.nameEnv = env;
	}

	public ClasspathLocation[] getBinaryLocations() {
		return nameEnv.binaryLocations;
	}
}
