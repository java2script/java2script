package net.sf.j2s.ajax;

public class CompoundPipeRequest extends SimplePipeRequest {

	static CompoundPipeRunnable[] pipes = new CompoundPipeRunnable[3];
	
	public static void weave(String id, CompoundPipeSession p) {
		final CompoundPipeRunnable pipe = retrievePipe(id, true);
		if (pipe.status == 0 || !pipe.isPipeLive()) {
			pipe.weave(p); // no matter woven or not, continue to start the pipe
			pipe.updateStatus(true);
			if (pipe.status == 0) { // pipe is not started yet
				pipe.status = 1; // pipe request is sent
				pipe.pipeKey = null;
				SimplePipeRequest.pipe(pipe);
			}
		} else {
			if (!pipe.weave(p) && p.isPipeLive()) { // already woven!
				return;
			}
			if (pipe.pipeKey == null) {
				return;
			}
			p.pipeKey = pipe.pipeKey;
			SimpleRPCRequest.request(p);
			if (pipe.status < 2) {
				pipe.status = 2; // requested
			}
		}
	}
	
	static void pipeFailed(CompoundPipeRunnable pipe) {
		long now = System.currentTimeMillis();
		if (now - pipe.lastSetupRetried > 5 * 60 * 1000) { // five minutes
			pipe.setupFailedRetries = 0;
		}
		pipe.setupFailedRetries++;
		if (pipe.setupFailedRetries <= 3) {
			// take another trys
			pipe.updateStatus(true);
			pipe.lastSetupRetried = now;
			SimplePipeRequest.pipe(pipe);
		} else {
			for (int i = 0; i < pipe.pipes.length; i++) {
				if (pipe.pipes[i] != null) {
					pipe.pipes[i].pipeFailed();
				}
				// pipe.pipes[i] = null;
			}
			pipe.setupFailedRetries = 0;
			pipe.status = 0;
			pipe.lastSetupRetried = 0;
			// unregisterPipe(pipe.id);
		}
	}
	
	public static void configure(String id, String pipeURL, String pipeMethod,
			String rpcURL, String rpcMethod) {
		CompoundPipeRunnable cfg = retrievePipe(id, true);
		if (pipeURL != null) {
			cfg.pipeURL = pipeURL;
		}
		if (pipeMethod != null) {
			cfg.pipeMethod = pipeMethod;
		}
		if (rpcURL != null) {
			cfg.rpcURL = rpcURL;
		}
		if (rpcMethod != null) {
			cfg.rpcMethod = rpcMethod;
		}
	}
	
	static CompoundPipeRunnable retrievePipe(String id, boolean createNew) {
		CompoundPipeRunnable[] allPipes = pipes;
		synchronized (allPipes) {
			for (int i = 0; i < allPipes.length; i++) {
				if (allPipes[i] != null && allPipes[i].id.equals(id)) {
					return allPipes[i];
				}
			}
			if (!createNew) {
				return null;
			}
			
			CompoundPipeRunnable pipe = createPipe(id);
			addPipe(pipe);
			return pipe;
		}
	}

	private static CompoundPipeRunnable createPipe(String id) {
		CompoundPipeRunnable pipe = new CompoundPipeRunnable() {
		
			@Override
			public void ajaxOut() {
				super.ajaxOut();
				if (!pipeAlive) {
					CompoundPipeRequest.pipeFailed(this);
					return; // Not setup yet!
				}
				for (int i = 0; i < pipes.length; i++) {
					if (pipes[i] != null) {
						pipes[i].pipeKey = pipeKey;
						SimpleRPCRequest.request(pipes[i]);
						if (status < 2) {
							status = 2; // requested
						}
					}
				}
			}
		
			@Override
			public void ajaxFail() {
				CompoundPipeRequest.pipeFailed(this);
			}
		
		};

		pipe.id = id;
		return pipe;
	}

	private static void addPipe(CompoundPipeRunnable pipe) {
		CompoundPipeRunnable[] allPipes = pipes;
		for (int i = 0; i < allPipes.length; i++) {
			if (allPipes[i] == null) {
				allPipes[i] = pipe;
				return;
			}
		}
		CompoundPipeRunnable[] newPipes = new CompoundPipeRunnable[allPipes.length + 100];
		System.arraycopy(allPipes, 0, newPipes, 0, allPipes.length);
		newPipes[allPipes.length] = pipe;
		pipes = newPipes;
	}
	
	static CompoundPipeRunnable registerPipe(CompoundPipeRunnable pipe) {
		if (pipe == null) return null;
		String id = pipe.id;
		CompoundPipeRunnable[] allPipes = pipes;
		synchronized (allPipes) {
			for (int i = 0; i < allPipes.length; i++) {
				if (allPipes[i] != null && allPipes[i].id.equals(id)) {
					return allPipes[i];
				}
			}
			addPipe(pipe);
			return pipe;
		}
	}
	
	static CompoundPipeRunnable unregisterPipe(String id) {
		CompoundPipeRunnable[] allPipes = pipes;
		synchronized (allPipes) {
			for (int i = 0; i < allPipes.length; i++) {
				if (allPipes[i] != null && allPipes[i].id.equals(id)) {
					CompoundPipeRunnable pipe = allPipes[i];
					allPipes[i] = null;
					return pipe;
				}
			}
			return null;
		}
	}
}
