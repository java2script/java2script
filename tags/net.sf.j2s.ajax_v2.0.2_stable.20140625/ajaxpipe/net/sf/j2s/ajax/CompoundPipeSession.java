package net.sf.j2s.ajax;

public abstract class CompoundPipeSession extends SimplePipeRunnable {

	public static final class PipeSessionClosedEvent extends CompoundSerializable {
		
	}
	
	public String session;

	CompoundPipeRunnable parent;
	
	@Override
	public void ajaxRun() {
		lastLiveDetected = System.currentTimeMillis();
		SimplePipeRunnable pipe = SimplePipeHelper.getPipe(pipeKey);
		if (pipe != null) {
			pipeAlive = pipeSetup();
			updateStatus(pipeAlive);
		} else { // failed!
			updateStatus(false);
		}
	}

	@Override
	public boolean isPipeLive() {
		return super.isPipeLive() && session != null;
	}

	@Override
	public void pipeCreated() {
		super.pipeCreated();
		
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
	public boolean pipeDestroy() {
		if (destroyed) {
			return false; // already destroyed, no further destroy actions
		}
		pipeAlive = false;
		destroyed = true;
		
		/**
		 * @j2sNative
		 */
		{
			PipeSessionClosedEvent evt = new PipeSessionClosedEvent();
			evt.session = session;
			pipeThrough(evt);
		}

		SimplePipeRunnable pipe = SimplePipeHelper.getPipe(pipeKey);
		if (pipe == null) {
			pipe = parent;
		}
		if (pipe instanceof CompoundPipeRunnable) {
			CompoundPipeRunnable cp = (CompoundPipeRunnable) pipe;
			if (cp.status < 3) {
				cp.status = 3; // no matter what happens, mark status as completed
			}
			cp.unweave(this);
		}
		session = null;
		pipeKey = null;
		return true;
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
	
	/**
	 * Convert non-SimpleSerializable objects into SimpleSerializable
	 * objects.
	 * 
	 * To be overrided.  
	 */
	public CompoundSerializable[] convert(Object... args) {
		if (args != null && args.length > 0) {
			CompoundSerializable[] ss = new CompoundSerializable[args.length];
			if (args[0] instanceof CompoundSerializable) { // check the first
				for (int i = 0; i < args.length; i++) {
					ss[i] = (CompoundSerializable) args[i];
				}
				return ss;
			}
		}
		return null;
	}

	@Override
	public void pipeThrough(Object... args) {
		if (args == null || args.length == 0) return;
		
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
			this.pipeClosed();
			return true;
		}
		this.updateStatus(false);
		SimplePipeRunnable pipe = SimplePipeHelper.getPipe(this.pipeKey);
		if (pipe == null) {
			pipe = this.parent;
		}
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
		}
		
		if (pipe != null && !pipe.isPipeLive()) {
			String pipeKey = this.pipeKey;
			pipe.pipeDestroy();
			if (pipeKey != null && pipeKey.length() > 0) {
				SimplePipeHelper.removePipe(pipeKey);
			}
		}
		
		this.pipeClosed();
		
		return true;
	}
	
	@Override
	public String getHttpURL() {
		return parent.getHttpURL();
	}

	@Override
	public String getHttpMethod() {
		return parent.getHttpMethod();
	}

	@Override
	public String getPipeURL() {
		return parent.getPipeURL();
	}

	@Override
	public String getPipeMethod() {
		return parent.getHttpMethod();
	}

}
