package net.sf.j2s.ajax;

public class CompoundPipeRunnable extends SimplePipeRunnable {

	/**
	 * @j2sNative
var hexStr = "0123456789abcdef";
var key = "";
for (var i = 0; i < 4; i++) {
	var hex = Math.round(15 * Math.random());
	key += "" + hexStr.charAt(hex);
}
return key;
	 */
	private static String nextSessionKey() {
		StringBuilder keyBuilder = new StringBuilder(4);
		for (int i = 0; i < 4; i++) {
			int hex = (int) Math.floor(Math.random() * 16);
			keyBuilder.append((char) (hex < 10 ? ('0' + hex) : ('a' + hex - 10)));
		}
		return keyBuilder.toString();
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

	long lastSetup;
	
	public CompoundPipeRunnable() {
		pipes = new CompoundPipeSession[4];
		status = 0; // starting
		setupFailedRetries = 0;
		lastSetupRetried = 0;
		pipeMethod = "GET";
		rpcMethod = "POST";
		pipeURL = "simplepipe";
		rpcURL = "piperpc";
		lastSetup = System.currentTimeMillis();
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
		//pipeKey = null;
		status = 0; // starting
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
		if (status == 3 && System.currentTimeMillis() - lastSetup <= 3 * SimplePipeRequest.pipeLiveNotifyInterval) {
			return true;
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
		super.pipeClosed();
	}

	@Override
	public void pipeLost() {
		for (int i = 0; i < pipes.length; i++) {
			if (pipes[i] != null) {
				pipes[i].pipeLost();
				pipes[i] = null;
			}
		}
		super.pipeLost();
	}

	@Override
	public void keepPipeLive() {
		for (int i = 0; i < pipes.length; i++) {
			if (pipes[i] != null && pipes[i].isPipeLive()) {
				pipes[i].keepPipeLive();
			}
		}
	}

	@Override
	protected void updateStatus(boolean live) {
		for (int i = 0; i < pipes.length; i++) {
			if (pipes[i] != null) {
				pipes[i].updateStatus(live);
			}
		}
		super.updateStatus(live);
	}

	public boolean weave(CompoundPipeSession pipe) {
		pipe.pipeReset();
		synchronized (pipes) {
			for (int i = 0; i < pipes.length; i++) {
				if (pipe == pipes[i]) {
					pipe.pipeKey = this.pipeKey;
					pipe.parent = this;
					initPipeSession(pipe);
					return false;
				}
			}
			for (int i = 0; i < pipes.length; i++) {
				if (pipe.session != null && pipes[i] != null
						&& pipe.session.equals(pipes[i].session)) {
					if (pipes[i].isPipeLive()) {
						System.out.println("pipe session " + pipes[i].session + " is still live!!");
					}
					pipes[i] = pipe; // replace it!!!
					lastSetup = System.currentTimeMillis();
					pipe.pipeKey = this.pipeKey;
					pipe.parent = this;
					return true;
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
				lastSetup = System.currentTimeMillis();
			}
		}
		pipe.pipeKey = this.pipeKey;
		pipe.parent = this;
		initPipeSession(pipe);
		return true;
	}

	private void initPipeSession(CompoundPipeSession pipe) {
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

	public boolean unweave(CompoundPipeSession pipe) {
		/*
		if (pipeKey == null || !pipeKey.equals(pipe.pipeKey)) {
			return false;
		}
		//*/
		for (int i = 0; i < pipes.length; i++) {
			if (pipe == pipes[i] || (pipe.session != null && pipes[i] != null
					&& pipe.session.equals(pipes[i].session))) {
				pipes[i] = null;
				lastSetup = System.currentTimeMillis();
				pipe.pipeKey = null;
				return true;
			}
		}
		return false;
	}
	
	public int getActivePipeSessionCount() {
		int count = 0;
		for (int i = 0; i < pipes.length; i++) {
			if (pipes[i] != null) {
				count++;
			}
		}
		return count;
	}
	
	public boolean isEmpty() {
		for (int i = 0; i < pipes.length; i++) {
			if (pipes[i] != null) {
				return false;
			}
		}
		return true;
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

	@Override
	protected long pipeMonitoringInterval() {
		long monitorInterval = super.pipeMonitoringInterval();
		for (int i = 0; i < pipes.length; i++) {
			if (pipes[i] != null) {
				monitorInterval = Math.min(monitorInterval, pipes[i].pipeWaitClosingInterval());
			}
		}
		return monitorInterval;
	}

	@Override
	public long pipeWaitClosingInterval() {
		long closingInterval = super.pipeWaitClosingInterval();
		for (int i = 0; i < pipes.length; i++) {
			if (pipes[i] != null) {
				closingInterval = Math.max(closingInterval, pipes[i].pipeWaitClosingInterval());
			}
		}
		return closingInterval;
	}

}
