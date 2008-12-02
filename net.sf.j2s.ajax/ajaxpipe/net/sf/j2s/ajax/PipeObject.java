package net.sf.j2s.ajax;

public class PipeObject {

	private SimplePipeRunnable pipe;

	public PipeObject(SimplePipeRunnable pipe) {
		super();
		this.pipe = pipe;
	}

	public SimplePipeRunnable getPipe() {
		return pipe;
	}

	public void setPipe(SimplePipeRunnable pipe) {
		this.pipe = pipe;
	}
	
}
