package javajs.async;

import java.awt.Component;

import javax.swing.ProgressMonitor;
import javax.swing.SwingUtilities;
import javax.swing.SwingWorker;

import javajs.async.SwingJSUtils.StateHelper;
import javajs.async.SwingJSUtils.StateMachine;

/**
 * v. 2020.06.03 
 *
 * Executes synchronous or asynchronous tasks using a SwingWorker in Java or
 * JavaScript, equivalently.
 * 
 * Unlike a standard SwingWorker, AsyncSwingWorker may itself be asynchronous.
 * For example, it might load a file asynchronously, or carry out a background
 * process in JavaScript much like one might be done in Java, but with only a
 * single thread.
 * 
 * Whereas a standard SwingWorker would execute done() long before the
 * asynchronous task completed, this class will wait until progress has been
 * asynchronously set greater or equal to its max value or the task is canceled
 * before executing that method.
 * 
 * Three methods must be supplied by the subclass:
 * 
 * void initAsync()
 * 
 * int doInBackgroundAsync(int progress)
 * 
 * void doneAsync()
 * 
 * Both initAsync() and doneAsync() are technically optional - they may be
 * empty. doInBackgroundAsync(), however, is the key method where, like
 * SwingWorker's doInBackground, the main work is done. The supplied progress
 * parameter reminds the subclass of where it is at, and the return value allows
 * the subclass to update the progress field in both the SwingWorker and the
 * ProgressMonitor.
 * 
 * If it is desired to run the AsyncSwingWorker synchronously, call the
 * executeSynchronously() method rather than execute(). Never call
 * SwingWorker.run().
 * 
 * Note that doInBackgroundAsync runs on the Java AWT event queue. This means
 * that, unlike a true SwingWorker, it will run in event-queue sequence, after
 * anything that that method itself adds to the queue. This is what SwingWorker itself
 * does with its done() signal. 
 * 
 * If doInBackgroundAsync has tasks that are time intensive, the thing to do is to
 * 
 * (a) pause the timer so that when doInBackgroundAsync returns, the timer is not fired:
 * 
 *    setPaused(true);
 * 
 * (b) set the value of progress to a value you want it to have when we resume:
 * 
 *    setProgressAsync(n);  // Do not call SwingWorker.setProgress(int) here!
 *    
 * (c) start your process as new Thread, which bypasses the AWT EventQueue:
 * 
 *    new Thread(Runnable).start();
 *    
 * (d) have your thread, when it is done, return control to this worker:
 * 
 *    setPaused(false);
 *    
 * This final call restarts the worker with the currently specified progress value.
 * Step b could be done just before Step d.
 * 
 * The inner class this.AsyncSubtask is designed to make pausing especially easy:
 * 
 *   subtask = new AsyncSubtask(35); // nextProgress value
 *   subtask.start(new Runnable() {....});
 * 
 * Then, somewhere in your runnable, you would call subtask.done(), which
 * set the progress value and make the call to setPaused(false) for you.
 * 
 * @author hansonr
 *
 */
public abstract class AsyncSwingWorker extends SwingWorker<Void, Void> implements StateMachine {


	// PropertyChangeEvent getPropertyName()
	
	private static final String PROPERTY_STATE = "state";
	private static final String PROPERTY_PAUSE = "pause";
	
	// PropertyChangeEvent getNewValue()
	
	public static final String STARTED_ASYNC = "STARTED_ASYNC";
	public static final String STARTED_SYNC = "STARTED_SYNC";
	
	public static final String DONE_ASYNC = "DONE_ASYNC";
	public static final String CANCELED_ASYNC = "CANCELED_ASYNC";
	
	public static final String PAUSED = "PAUSED";
	public static final String RESUMED = "RESUMED";

	protected int progressAsync;

	/**
	 * Override to provide initial tasks.
	 */
	abstract public void initAsync();

	/**
	 * Given the last progress, do some portion of the task that the SwingWorker
	 * would do in the background, and return the new progress. returning max or
	 * above will complete the task.
	 * 
	 * @param progress
	 * @return new progress
	 */
	abstract public int doInBackgroundAsync(int progress);

	/**
	 * Do something when the task is finished or canceled.
	 * 
	 */
	abstract public void doneAsync();

	protected ProgressMonitor progressMonitor;

	protected int delayMillis;
	protected String note;
	protected int min;
	protected int max;
	protected int progressPercent;

	protected boolean isAsync;
	private Exception exception;

	/**
	 * Construct an asynchronous SwingWorker task that optionally will display a
	 * ProgressMonitor. Progress also can be monitored by adding a
	 * PropertyChangeListener to the AsyncSwingWorker and looking for the "progress"
	 * event, just the same as for a standard SwingWorker.
	 * 
	 * @param owner       optional owner for the ProgressMonitor, typically a JFrame
	 *                    or JDialog.
	 * 
	 * @param title       A non-null title indicates we want to use a
	 *                    ProgressMonitor with that title line.
	 * 
	 * @param delayMillis A positive number indicating the delay we want before
	 *                    executions, during which progress will be reported.
	 * 
	 * @param min         The first progress value. No range limit.
	 * 
	 * @param max         The last progress value. No range limit; may be greater
	 *                    than min.
	 * 
	 */
	public AsyncSwingWorker(Component owner, String title, int delayMillis, int min, int max) {
		if (title != null && delayMillis > 0) {
			progressMonitor = new ProgressMonitor(owner, title, "", Math.min(min, max), Math.max(min, max));
			progressMonitor.setProgress(Math.min(min, max)); // displays monitor
		}
		this.delayMillis = Math.max(0, delayMillis);
		this.isAsync = (delayMillis > 0);

		this.min = min;
		this.max = max;
	}

	public void executeAsync() {
		firePropertyChange(PROPERTY_STATE, null, STARTED_ASYNC);
		super.execute();
	}

	public void executeSynchronously() {
		firePropertyChange(PROPERTY_STATE, null, STARTED_SYNC);
		isAsync = false;
		delayMillis = 0;
		try {
			doInBackground();
		} catch (Exception e) {
			exception = e;
			e.printStackTrace();
			cancelAsync();
		}
	}

	public Exception getException() {
		return exception;
	}

	public int getMinimum() {
		return min;
	}

	public void setMinimum(int min) {
		this.min = min;
		if (progressMonitor != null) {
			progressMonitor.setMinimum(min);
		}
	}

	public int getMaximum() {
		return max;
	}

	public void setMaximum(int max) {
		if (progressMonitor != null) {
			progressMonitor.setMaximum(max);
		}
		this.max = max;
	}

	public int getProgressPercent() {
		return progressPercent;
	}

	public void setNote(String note) {
		this.note = note;
		if (progressMonitor != null) {
			progressMonitor.setNote(note);
		}
	}

	/**
	 * Cancel the asynchronous process. This will fire the PROPERTY_STATE property
	 * change with value CANCELED_ASYNC
	 * 
	 */
	public void cancelAsync() {
		helper.interrupt();
		firePropertyChange(PROPERTY_STATE, null, CANCELED_ASYNC);
	}

	/**
	 * Check to see if the asynchronous process has been canceled.
	 *
	 * @return true if StateHelper is not alive anymore
	 * 
	 */
	public boolean isCanceledAsync() {
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
	public String getNote(int progress) {
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
		return progressAsync;
	}

	/**
	 * Set the [min,max] progress safely.
	 * 
	 * SwingWorker only allows progress between 0 and 100. This method safely
	 * translates [min,max] to [0,100].
	 * 
	 * @param n
	 */
	public void setProgressAsync(int n) {
		n = (max > min ? Math.max(min, Math.min(n, max)) : Math.max(max, Math.min(n, min)));
		progressAsync = n;
		n = (n - min) * 100 / (max - min);
		n = (n < 0 ? 0 : n > 100 ? 100 : n);
		progressPercent = n;
	}

	///// the StateMachine /////

	private final static int STATE_INIT = 0;
	private final static int STATE_LOOP = 1;
	private final static int STATE_WAIT = 2;
	private final static int STATE_DONE = 99;
	
	private StateHelper helper;

	protected StateHelper getHelper() {
		return helper;
	}

	private boolean isPaused;

	protected void setPaused(boolean tf) {
		if (isPaused == tf)
			return;
		isPaused = tf;
		firePropertyChange(PROPERTY_PAUSE, null, (tf ? PAUSED : RESUMED));
		if (!tf)
			stateLoop();
	}

	protected boolean isPaused() {
		return isPaused;
	}

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
		while (helper.isAlive() && !isPaused) {
			switch (helper.getState()) {
			case STATE_INIT:
				setProgressAsync(min);
				initAsync();
				helper.setState(STATE_WAIT);
				continue;
			case STATE_LOOP:
				if (checkCanceled()) {
					helper.setState(STATE_DONE);
					cancelAsync();
				} else {
					int ret = doInBackgroundAsync(progressAsync);					
					if (!helper.isAlive() || isPaused) {
						continue;
					}
					progressAsync = ret;
					setProgressAsync(progressAsync);
					setNote(getNote(progressAsync));
					setProgress(progressPercent);
					if (progressMonitor != null) {
						progressMonitor.setProgress(max > min ? progressAsync : max + min - progressAsync);
					}
					helper.setState(progressAsync == max ? STATE_DONE : STATE_WAIT);
				}
				continue;
			case STATE_WAIT:
				// meaning "sleep" and then "loop"
				helper.setState(STATE_LOOP);
				helper.sleep(delayMillis);
				return true;
			default:
			case STATE_DONE:
				stopProgressMonitor();
				// Put the doneAsync() method on the AWTEventQueue
				// just as for SwingWorker.done().
				if (isAsync) {
					SwingUtilities.invokeLater(doneRunnable);
				} else {
					doneRunnable.run();
				}

				return false;
			}
		}
		if (!helper.isAlive()) {
			stopProgressMonitor();
		}
		return false;
	}

	private void stopProgressMonitor() {
		if (progressMonitor != null) {
			progressMonitor.close();
			progressMonitor = null;
		}
	}

	private Runnable doneRunnable = new Runnable() {
		@Override
		public void run() {
			doneAsync();
			firePropertyChange(PROPERTY_STATE, null, DONE_ASYNC);
		}

	};

	private boolean checkCanceled() {
		if (isMonitorCanceled() || isCancelled()) {
			helper.interrupt();
			return true;
		}
		return false;
	}

	//// final SwingWorker methods not to be used by subclasses ////

	private boolean isMonitorCanceled() {
		return (progressMonitor != null && progressMonitor.isCanceled());
	}

	/**
	 * see SwingWorker, made final here.
	 * 
	 */
	@Override
	final protected Void doInBackground() throws Exception {
		helper = new StateHelper(this);
		setProgressAsync(min);
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

	public class AsyncSubtask {
	
		private int nextProgress;

		public AsyncSubtask(int nextProgress) {
			this.nextProgress = nextProgress;
		}
		
		public void start(Runnable r) {
			setPaused(true);
			new Thread(r).start();
		}
		
		public void done() {
			setProgressAsync(nextProgress);
			setPaused(false);
		}
	
	}
}
