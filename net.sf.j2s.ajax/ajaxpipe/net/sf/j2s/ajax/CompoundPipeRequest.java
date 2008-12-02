package net.sf.j2s.ajax;

import java.util.Date;

public class CompoundPipeRequest extends SimplePipeRequest {

	static CompoundPipeRunnable pipe;
	
	static int count = 0;
	
	static long lastTried = 0;
	
	static String pipeMethod = "GET";
	
	static String rpcMethod = "POST";
	
	static String pipeURL = "simplepipe";
	
	static String rpcURL = "piperpc";
	

	public static void weave(CompoundPipeSession p) {
		if (pipe == null || !pipe.isPipeLive()) {
			pipe = new CompoundPipeRunnable() {
			
				@Override
				public void ajaxOut() {
					super.ajaxOut();
					for (int i = 0; i < pipes.length; i++) {
						if (pipes[i] != null) {
							pipes[i].pipeKey = pipe.pipeKey;
							SimpleRPCRequest.request(pipes[i]);
							if (pipe.status < 2) {
								pipe.status = 2; // requested
							}
						}
					}
				}
			
				@Override
				public void ajaxFail() {
					CompoundPipeRequest.pipeFailed(this);
				}
			
			};
			pipe.weave(p);
			pipe.updateStatus(true);
			SimplePipeRequest.pipe(pipe);
			pipe.status = 1; // pipe
		} else {
			pipe.weave(p);
			if (pipe.pipeKey != null) {
				p.pipeKey = pipe.pipeKey;
				SimpleRPCRequest.request(p);
				if (pipe.status < 2) {
					pipe.status = 2; // requested
				}
			}
		}
	}
	
	static void pipeFailed(CompoundPipeRunnable pipe) {
		long now = new Date().getTime();
		if (now - lastTried > 5 * 60 * 1000) { // five minutes
			count = 0;
		}
		count++;
		if (count <= 3) {
			// take another trys
			pipe.updateStatus(true);
			lastTried = now;
			SimplePipeRequest.pipe(pipe);
		} else {
			for (int i = 0; i < pipe.pipes.length; i++) {
				if (pipe.pipes[i] != null) {
					pipe.pipes[i].pipeFailed();
				}
				pipe.pipes[i] = null;
			}
			pipe = null;
		}
	}
	
	public static void configure(String pipeURL, String pipeMethod, String rpcURL, String rpcMethod) {
		if (pipeURL != null) {
			CompoundPipeRequest.pipeURL = pipeURL;
		}
		if (pipeMethod != null) {
			CompoundPipeRequest.pipeMethod = pipeMethod;
		}
		if (rpcURL != null) {
			CompoundPipeRequest.rpcURL = rpcURL;
		}
		if (rpcMethod != null) {
			CompoundPipeRequest.rpcMethod = rpcMethod;
		}
	}
}
