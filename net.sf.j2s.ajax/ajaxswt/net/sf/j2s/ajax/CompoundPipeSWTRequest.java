package net.sf.j2s.ajax;

import java.util.Date;

import org.eclipse.swt.widgets.Display;


public class CompoundPipeSWTRequest extends SimplePipeRequest {
	
	private static SimplePipeHelper.IPipeClosing pipeClosingWrapper;

	public static void swtWeave(final CompoundPipeSession p) {
		/**
		 * // For JavaScript, there is no need to wrap SWT context 
		 * @j2sNative
		 */
		{
			if (pipeClosingWrapper == null) {
				pipeClosingWrapper = new SimplePipeHelper.IPipeClosing() {
					
					public void helpClosing(final SimplePipeRunnable pipe) {
						SWTHelper.syncExec(Display.getDefault(), new Runnable() {
							public void run() {
								pipe.pipeClosed();
							}
						});
					}
					
				};
			}
			p.setPipeCloser(pipeClosingWrapper);
		}
		
		CompoundPipeRunnable pipe = CompoundPipeRequest.pipe;
		if (pipe == null || !pipe.isPipeLive()) {
			CompoundPipeRequest.pipe = new CompoundPipeRunnable() {
				
				@Override
				public void ajaxOut() {
					super.ajaxOut();
					for (int i = 0; i < pipes.length; i++) {
						if (pipes[i] != null) {
							pipes[i].pipeKey = CompoundPipeRequest.pipe.pipeKey;
							SimpleRPCSWTRequest.swtRequest(pipes[i]);
							if (CompoundPipeRequest.pipe.status < 2) {
								CompoundPipeRequest.pipe.status = 2; // requested
							}
						}
					}
				}
				
				@Override
				public void ajaxFail() {
					CompoundPipeSWTRequest.pipeFailed(this);
				}
			
			};
			pipe = CompoundPipeRequest.pipe;
			pipe.weave(p);
			pipe.updateStatus(true);
			SimplePipeSWTRequest.swtPipe(pipe);
			pipe.status = 1; // pipe
		} else {
			pipe.weave(p);
			if (pipe.pipeKey != null) {
				p.pipeKey = pipe.pipeKey;
				SimpleRPCSWTRequest.swtRequest(p);
				if (pipe.status < 2) {
					pipe.status = 2; // requested
				}
			}
		}
	}
	
	static void pipeFailed(CompoundPipeRunnable pipe) {
		long now = new Date().getTime();
		if (now - CompoundPipeRequest.lastTried > 5 * 60 * 1000) { // five minutes
			CompoundPipeRequest.count = 0;
		}
		CompoundPipeRequest.count++;
		if (CompoundPipeRequest.count <= 3) {
			pipe.updateStatus(true);
			CompoundPipeRequest.lastTried = now;
			SimplePipeSWTRequest.swtPipe(pipe);
		} else {
			for (int i = 0; i < pipe.pipes.length; i++) {
				if (pipe.pipes[i] != null) {
					pipe.pipes[i].pipeFailed();
				}
				pipe.pipes[i] = null;
			}
			CompoundPipeRequest.pipe = null;
		}
	}
	
	public static void configure(String pipeURL, String pipeMethod, String rpcURL, String rpcMethod) {
		CompoundPipeRequest.configure(pipeURL, pipeMethod, rpcURL, rpcMethod);
	}

}
