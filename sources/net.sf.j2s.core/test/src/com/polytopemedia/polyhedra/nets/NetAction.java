package com.polytopemedia.polyhedra.nets;

class NetAction {
	public static final NetAction END = new NetAction(NetActionType.end);
	private final NetActionType type;
	private final int[][] parameters;

	NetAction(NetActionType type, int[]... parameters) {
		this.type = type;
		this.parameters = parameters;
	}

	public NetActionType getType() {
		return type;
	}
	
	public int[][] getParameters() {
		return parameters;
	}
}
