package net.sf.j2s.ajax;

public class CompoundPipeRPCHttpServlet extends SimplePipeRPCHttpServlet {

	private static final long serialVersionUID = 1605715722698968061L;

	@Override
	protected SimpleRPCRunnable getRunnableByRequest(String request) {
		SimpleRPCRunnable runnable = super.getRunnableByRequest(request);
		if (runnable instanceof CompoundPipeSession) {
			CompoundPipeSession session = (CompoundPipeSession) runnable;
			SimplePipeRunnable pipe = SimplePipeHelper.getPipe(session.pipeKey);
			if (pipe instanceof CompoundPipeRunnable) {
				CompoundPipeRunnable p = (CompoundPipeRunnable) pipe;
				p.weave(session);
			}
		}
		return runnable;
	}
	
	protected boolean validateRunnable(String clazzName) {
		if ("net.sf.j2s.ajax.CompoundPipeRunnable".equals(clazzName)) {
			return true;
		}
		return runnables.contains(clazzName);
	}

}
