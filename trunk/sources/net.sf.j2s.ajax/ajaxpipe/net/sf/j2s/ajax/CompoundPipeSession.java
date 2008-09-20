package net.sf.j2s.ajax;

public abstract class CompoundPipeSession extends SimplePipeRunnable {

	public static class PipeSessionClosedEvent extends CompoundSerializable {
		
	}
	
	public String session;

	@Override
	public void ajaxRun() {
		SimplePipeRunnable pipe = SimplePipeHelper.getPipe(pipeKey);
		if (pipe != null) {
			pipeAlive = pipeSetup();
			updateStatus(pipeAlive);
		} else { // failed!
			updateStatus(false);
		}
	}

	@Override
	public void pipeCreated() {
		SimplePipeRunnable pipe = SimplePipeHelper.getPipe(pipeKey);
		if (pipe instanceof CompoundPipeRunnable) {
			CompoundPipeRunnable cp = (CompoundPipeRunnable) pipe;
			if (cp.status < 3) {
				cp.status = 3; // connected
			}
			updateStatus(true);
		}
	}

	@Override
	public void pipeDestroy() {
		PipeSessionClosedEvent evt = new PipeSessionClosedEvent();
		evt.session = session;
		pipeThrough(evt);

		SimplePipeRunnable pipe = SimplePipeHelper.getPipe(pipeKey);
		if (pipe instanceof CompoundPipeRunnable) {
			CompoundPipeRunnable cp = (CompoundPipeRunnable) pipe;
			cp.unweave(this);
		}
	}
	
	@Override
	final public SimpleSerializable[] through(Object... args) {
		CompoundSerializable[] cs = convert(args);
		if (cs != null) {
			for (int i = 0; i < cs.length; i++) {
				if (cs[i] != null) {
					cs[i].session = session;
				}
			}
		}
		return cs;
	}
	
	public abstract CompoundSerializable[] convert(Object... args);

	@Override
	protected void pipeThrough(Object... args) {
		SimplePipeRunnable pipe = SimplePipeHelper.getPipe(pipeKey);
		if (!(pipe instanceof CompoundPipeRunnable)) return;
		CompoundPipeRunnable cp = (CompoundPipeRunnable) pipe;
		CompoundPipeSession sp = cp.getSession(session);
		if (sp == null) return;
		SimpleSerializable[] objs = sp.through(args);
		
		if (objs == null || objs.length == 0) return;
		
		if (pipe instanceof SimplePipeRunnable) {
			SimplePipeRunnable pipeRunnable = (SimplePipeRunnable) pipe;
			if (pipeRunnable.helper != null) {
				pipeRunnable.helper.helpThrough(pipe, objs);
				return;
			}
		}
		
		for (int i = 0; i < objs.length; i++) {
			pipe.deal(objs[i]);
		}
	}
	
	@Override
	public boolean deal(SimpleSerializable ss) {
		if (ss instanceof CompoundSerializable) {
			CompoundSerializable cs = (CompoundSerializable) ss;
			if (cs.session == null || !cs.session.equals(session)) {
				return false;
			}
			return super.deal(cs);
		}
		return false;
	}
	
	public boolean deal(PipeSessionClosedEvent evt) {
		if (SimplePipeRequest.getRequstMode() == SimplePipeRequest.MODE_LOCAL_JAVA_THREAD) {
			return true;
		}
		this.updateStatus(false);
		SimplePipeRunnable pipe = SimplePipeHelper.getPipe(this.pipeKey);
		if (pipe instanceof CompoundPipeRunnable) {
			CompoundPipeRunnable p = (CompoundPipeRunnable) pipe;
			if (p.pipes != null) {
				for (int i = 0; i < p.pipes.length; i++) {
					CompoundPipeSession s = p.pipes[i];
					if (s != null && s.session.equals(evt.session)) {
						p.pipes[i] = null;
						break;
					}
				}
			}
			
			if (!p.isPipeLive()) {
				p.pipeDestroy();
				SimplePipeHelper.removePipe(this.pipeKey);
			}
		}
		return true;
	}
	
	@Override
	public String getHttpURL() {
		return CompoundPipeRequest.rpcURL;
	}

	@Override
	public String getHttpMethod() {
		return CompoundPipeRequest.rpcMethod;
	}

	@Override
	public String getPipeURL() {
		return CompoundPipeRequest.pipeURL;
	}

	@Override
	public String getPipeMethod() {
		return CompoundPipeRequest.pipeMethod;
	}

}
