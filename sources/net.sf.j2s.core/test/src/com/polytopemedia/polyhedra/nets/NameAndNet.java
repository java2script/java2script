package com.polytopemedia.polyhedra.nets;

public class NameAndNet {
	private final Net net;
	private final String name;

	public NameAndNet(String name, Net net) {
		this.name = name;
		this.net = net;
	}

	public Net getNet() {
		return net;
	}

	public String getName() {
		return name;
	}
}
