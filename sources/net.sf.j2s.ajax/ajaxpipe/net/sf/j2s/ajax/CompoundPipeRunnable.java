package net.sf.j2s.ajax;

public class CompoundPipeRunnable extends SimplePipeRunnable {
	
	private static String nextSessionKey() {
		String hexStr = "0123456789abcdef";
		String key = "";
		for (int i = 0; i < 4; i++) {
			int hex = (int) Math.round(15 * Math.random());
			key += "" + hexStr.charAt(hex);
		}
		return key;
	}
	
	CompoundPipeSession[] pipes;

	int status;
	
	String id; // id for CompoundPipeRequest
	String pipeMethod;
	String rpcMethod;
	String pipeURL;
	String rpcURL;
	
	int setupFailedRetries;
	long lastSetupRetried;

	public CompoundPipeRunnable() {
		pipes = new CompoundPipeSession[4];
		status = 0; // starting
		setupFailedRetries = 0;
		lastSetupRetried = 0;
		pipeMethod = "GET";
		rpcMethod = "POST";
		pipeURL = "simplepipe";
		rpcURL = "piperpc";
	}

	protected CompoundPipeSession getSession(String session) {
		if (session == null) {
			return null;
		}
		for (int i = 0; i < pipes.length; i++) {
			if (pipes[i] != null && session.equals(pipes[i].session)) {
				return pipes[i];
			}
		}
		return null;
	}
	
	@Override
	public boolean pipeDestroy() {
		for (int i = 0; i < pipes.length; i++) {
			if (pipes[i] != null) {
				pipes[i].pipeDestroy();
			}
		}
		return super.pipeDestroy();
	}

	@Override
	public void pipeInit() {
		super.pipeInit();
		for (int i = 0; i < pipes.length; i++) {
			if (pipes[i] != null) {
				pipes[i].pipeInit();
			}
		}
	}

	@Override
	public boolean pipeSetup() {
		return true;
	}

	@Override
	public boolean isPipeLive() {
		if (pipeAlive && status < 3) { // connected
			return true; // still in starting status
		}
		if (super.isPipeLive()) {
			for (int i = 0; i < pipes.length; i++) {
				if (pipes[i] != null && pipes[i].isPipeLive()) {
					return true;
				}
			}
		}
		return false;
	}

	@Override
	public void pipeClosed() {
		super.pipeClosed();
		for (int i = 0; i < pipes.length; i++) {
			if (pipes[i] != null) {
				if (pipes[i].closer != null) {
					pipes[i].closer.helpClosing(pipes[i]);
				} else {
					pipes[i].pipeClosed();
				}
				pipes[i] = null;
			}
		}
	}

	@Override
	public void pipeLost() {
		super.pipeLost();
		for (int i = 0; i < pipes.length; i++) {
			if (pipes[i] != null) {
				pipes[i].pipeLost();
				pipes[i] = null;
			}
		}
	}

	@Override
	public void keepPipeLive() {
		for (int i = 0; i < pipes.length; i++) {
			if (pipes[i] != null) {
				pipes[i].keepPipeLive();
			}
		}
	}

	public void weave(CompoundPipeSession pipe) {
		synchronized (pipes) {
			for (int i = 0; i < pipes.length; i++) {
				if (pipe == pipes[i]) {
					return;
				}
			}
			boolean added = false;
			for (int i = 0; i < pipes.length; i++) {
				if (pipes[i] == null) {
					pipes[i] = pipe;
					added = true;
					break;
				}
			}
			if (!added) {
				CompoundPipeSession[] newPipes = new CompoundPipeSession[pipes.length + 4];
				System.arraycopy(pipes, 0, newPipes, 0, pipes.length);
				newPipes[pipes.length] = pipe;
			}
		}
		pipe.parent = this;
		while (pipe.session == null) {
			String key = nextSessionKey();
			boolean isKeyOK = true;
			for (int i = 0; i < pipes.length; i++) {
				if (pipes[i] != null && key.equals(pipes[i].session)) {
					isKeyOK = false;
					break;
				}
			}
			if (isKeyOK) {
				pipe.session = key;
				break;
			}
		}
	}

	public void unweave(CompoundPipeSession pipe) {
		for (int i = 0; i < pipes.length; i++) {
			if (pipe == pipes[i]) {
				pipes[i] = null;
				break;
			}
		}
	}
	
	@Override
	public SimpleSerializable[] through(Object... args) {
		/*
		for (int i = 0; i < pipes.length; i++) {
			if (pipes[i] != null) {
				CompoundSerializable[] ss = pipes[i].convert(args);
				if (ss != null) {
					for (int j = 0; j < ss.length; j++) {
						if (ss[j] != null) {
							ss[j].session = pipes[i].session;
						}
					}
					return ss;
				}
			}
		}
		*/
		return null;
	}

	@Override
	public boolean deal(SimpleSerializable ss) {
		if (ss instanceof CompoundSerializable) {
			CompoundSerializable cs = (CompoundSerializable) ss;
			Class<? extends CompoundSerializable> clazz = cs.getClass();
			if ("net.sf.j2s.ajax.CompoundSerializable".equals(clazz.getName())) {
				return true; // seldom or never reach this branch, just ignore
			}
			for (int i = 0; i < pipes.length; i++) {
				CompoundPipeSession p = pipes[i];
				if (p != null && p.session != null 
						&& p.session.equals(cs.session) 
						&& p.deal(cs)) {
					return true;
				}
			}
		}
		return false;
	}
	
	@Override
	public String getHttpURL() {
		return rpcURL;
	}

	@Override
	public String getHttpMethod() {
		return rpcMethod;
	}

	@Override
	public String getPipeURL() {
		return pipeURL;
	}

	@Override
	public String getPipeMethod() {
		return pipeMethod;
	}

}
