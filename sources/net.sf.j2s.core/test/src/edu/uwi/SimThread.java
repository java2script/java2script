package edu.uwi;

import javajs.util.JSThread;

public class SimThread extends JSThread {

	private Boltzmann boltzmann;

	public SimThread(Boltzmann boltzmann) {
		super(null, "BoltzmannThread");
		this.boltzmann = boltzmann;
	}

	@Override
	protected boolean myInit() {
		boltzmann.sjs_initSimulation();
		// false would mean we want the equivalent of a thread.run()
		// -- once through this, but on a different thread.
		return true;
	}

	@Override
	protected boolean isLooping() {
		// when we are done, we return false here
		return boltzmann.sjs_loopSimulation();
	}

	@Override
	protected boolean myLoop() {
		// in this case we only repaint every 100 time or so;
		// and we only sleep if we are repainting
		return boltzmann.sjs_checkRepaint();
	}

	@Override
	protected int getDelayMillis() {
		// the program is too fast to see in Java!
		return (isJS ? 0 : 1);
	}

	@Override
	protected void whenDone() {
		boltzmann.sjs_finalizeGraph();
	}

	@Override
	protected void onException(Exception e) {
		System.out.println(e.getMessage());
	}

	@Override
	protected void doFinally() {
		// in all cases what we want to do in the end
		// nothing to do here
	}

}
