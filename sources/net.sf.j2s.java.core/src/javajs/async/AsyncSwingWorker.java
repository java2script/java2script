package javajs.async;

import java.awt.Component;

import javax.swing.ProgressMonitor;
import javax.swing.SwingUtilities;
import javax.swing.SwingWorker;

import javajs.async.SwingJSUtils.StateHelper;
import javajs.async.SwingJSUtils.StateMachine;

/**
 * Executes asynchronous tasks using a SwingWorker in Java or JavaScript,
 * equivalently.
 * 
 * Unlike a standard SwingWorker, AsyncSwingWorker may itself be asynchronous.
 * For example, it might load a file asynchronously, or carry out a background
 * process in JavaScript much like one might be done in Java, but with only a
 * single thread.
 * 
 * Whereas a standard SwingWorker would execute done() long before the
 * asynchronous task completed, this class will wait until progress has been
 * asynchronously set to 100 or the task is cancelled before executing that
 * method.
 * 
 * Three methods must be supplied by the subclass:
 * 
 * void initAsync()
 * 
 * int doInBackgroundAsync(int progress)
 * 
 * void doneAsync()
 * 
 * Both init() and doneAsync() are technically optional - they may be empty.
 * doInBackground(), however, is the key method where, like SwingWorker's
 * doInBackground, the main work is done. The supplied progress parameter
 * reminds the subclass of where it is at, and the return value allows the
 * subclass to update the progress field in both the SwingWorker and the
 * ProgressMonitor.
 * 
 * 
 * @author hansonr
 *
 */
public abstract class AsyncSwingWorker extends SwingWorker<Void, Void> implements StateMachine {
	

	protected int progress = 0;
	
	/**
	 * Override to provide initial tasks.
	 */
	abstract public void initAsync();
	
	/**
	 * Given the last progress, do some portion of the task that the SwingWorker would do in the background, and return the new progress.
	 * returning 100 will complete the task.
	 * 
	 * @param progress
	 * @return new progress
	 */
	abstract public int doInBackgroundAsync(int progress);
	
	/**
	 * Do something when the task is finished or cancelled.
	 * 
	 */
	abstract public void doneAsync();


	private ProgressMonitor progressMonitor;
	private int delayMillis;
	private String note;

	/**
	 * Construct an asynchronous SwingWorker task that optionally will display a
	 * ProgressMonitor. Progress also can be monitored by adding a PropertyChangeListener
	 * to the AsyncSwingWorker and looking for the "progress" event, just the same as for a 
	 * standard SwingWorker.
	 * 
	 * @param owner optional owner for the ProgressMonitor, typically a JFrame or JDialog.
	 * 
	 * @param title A non-null title indicates we want to use a ProgressMonitor with that title line.
	 * 
	 * @param delayMillis A positive number indicating the delay we want before executions, during which progress will be reported. 
	 */
	public AsyncSwingWorker(Component owner, String title, int delayMillis) {
		if (title != null) {
			progressMonitor = new ProgressMonitor(owner, title, "", 0, 100);
			progressMonitor.setProgress(0); // displays monitor
		}
		this.delayMillis = Math.max(1, delayMillis);
	}

	/**
	 * Cancel the asynchronous process.
	 * 
	 */
	public void cancelAsync() {
		helper.interrupt();
	}

	/**
	 * Check to see if the asynchronous process has been cancelled. 
	 *
	 * @return true if StateHelper is not alive anymore
	 * 
	 */
	public boolean isCancelledAsync() {
		return !helper.isAlive();
	}
	
	/**
	 * Check to see if the asynchronous process is completely done.
	 * 
	 * @return true only if the StateMachine is at STATE_DONE
	 * 
	 */
	public boolean isDoneAsync() {
		return helper.getState() == STATE_DONE;
	}

	/**
	 * Override to set a more informed note for the ProcessMonitor.
	 * 
	 * @param progress
	 * @return
	 */
	public String setNote(int progress) {
		return String.format("Completed %d%%.\n", progress);
	}
	
	/**
	 * Retrieve the last note delivered by the ProcessMonitor.
	 * 
	 * @return
	 */
	public String getNote() {
		return note;
	}

	public int getProgressAsync() {
		return progress;
	}

	
	
	///// the StateMachine /////
	
	
	private final static int STATE_INIT = 0;
	private final static int STATE_LOOP = 1;
	private final static int STATE_WAIT = 2;
	private final static int STATE_DONE = 99;

	private StateHelper helper;
	
	/**
	 * The StateMachine's main loop.
	 * 
	 * Note that a return from this method will exit doInBackground, trigger the
	 * isDone() state on the underying worker, and scheduling its done() for
	 * execution on the AWTEventQueue.
	 *
	 * Since this happens essentially immediately, it is unlikely that
	 * SwingWorker.isCancelled() will ever be true. Thus, the SwingWorker task
	 * itself won't be cancelable in Java or in JavaScript, since its
	 * doInBackground() method is officially complete, and isDone() is true well
	 * before we are "really" done. FutureTask will not set isCancelled() true once
	 * the task has run.
	 * 
	 * We are using an asynchronous task specifically because we want to have the
	 * opportunity for the ProgressMonitor to report in JavaScript. We will have to
	 * cancel our task and report progress explicitly using our own methods.
	 * 
	 */
	@Override
	public boolean stateLoop() {
		while (helper.isAlive()) {
			switch (helper.getState()) {
			case STATE_INIT:
				initAsync();
				helper.setState(STATE_WAIT);
				continue;
			case STATE_LOOP:
				progress = doInBackgroundAsync(progress);
				progress = Math.min(progress, 100);
				note = setNote(progress);
				if (progressMonitor != null) {
					progressMonitor.setNote(note);
					progressMonitor.setProgress(progress);
				}
				if (progress >= 100 || isCancelled()) {
					helper.setState(STATE_DONE);
				} else {
					helper.setState(STATE_WAIT);
				}
				setProgress(progress);
				continue;
			case STATE_WAIT:
				helper.setState(STATE_LOOP);
				helper.sleep(delayMillis);
				return true;
			case STATE_DONE:
				// Put the reallyDone() method on the AWTEventQueue
				// just as the done() method was.
				SwingUtilities.invokeLater(new Runnable() {

					@Override
					public void run() {
						doneAsync();
					}

				});
				return false;
			}
		}
		return false;
	}

    //// final SwingWorker methods not to be used by subclasses ////
	
	/**
	 * see SwingWorker, made final here.
	 * 
	 */
	@Override
	final protected Void doInBackground() throws Exception {
		helper = new StateHelper(AsyncSwingWorker.this);
		setProgress(0);
		helper.next(STATE_INIT);
		return null;
	}

	/**
	 * see SwingWorker, made final here. Nothing to do.
	 * 
	 */
	@Override
	final public void done() {
	}


}
