package javajs.util;

import java.awt.Toolkit;
import java.awt.event.InvocationEvent;

//import javajs.J2SRequireImport;
import javajs.api.JSFunction;


/**
 * An abstract class that takes care of simple threading in Java or JavaScript.
 * 
 * To use it, subclass it and complete the necessary methods.
 * 
 * 
 * There are three states: INIT, LOOP, and DONE.
 * 
 * These states are passed into run1
 * 
 * 
 * @author Bob Hanson
 * 
 */
//@J2SRequireImport(swingjs.JSToolkit.class)
public abstract class JSThread extends Thread {

	public static final int INIT = 0;
	public static final int LOOP = 1;
	public static final int DONE = 2;
	
	public static int threadCount = 0;

	protected boolean isJS = /** @j2sNative true || */false;
	
	public JSThread() {
		this(null, "JSThread-" + (++threadCount));
	}
	
	public JSThread(String name) {
		this(null, name);
	}
	
	public JSThread(ThreadGroup group, String name) {
		super(group, name);
		}

	@Override
	public void run() {
		run1(INIT);
	}

	@Override
	public synchronized void start() {

		
		/**
		 * @j2sNative
		 * 
		 * 			  Clazz.load("swingjs.JSToolkit").dispatch$O$I$I(this, 1, 0);
		 * 
		 */
		{
			super.start();
		}

	}

	/**
	 * thread initialization
	 * 
	 * @return false to exit thread before any looping
	 */
	protected abstract boolean myInit();
	
	/**
	 * check for continuing to loop
	 * 
	 * @return true if we are to continue looping
	 */
	protected abstract boolean isLooping();
	
	/**
	 * 
	 * @return false to handle sleepAndReturn yourself
	 */
	protected abstract boolean myLoop();
	/**
	 * what to do when the DONE state is reached
	 * 
	 */
	protected abstract void whenDone();
	
	/**
	 * 
	 * @return the sleep time in milliseconds
	 */
	protected abstract int getDelayMillis();
	
	/**
	 * handle an exception -- state will be set to DONE no matter what you do here
	 * 
	 * @param e
	 */
	protected abstract void onException(Exception e);
	
	/**
	 * anything you want done in  try{}catch(}finally().
	 * Note that this method is not fired if we are in JavaScript
	 * mode and the normal return from sleepAndReturn() is taken. 
	 *  
	 */
	protected abstract void doFinally();
	
	/**
	 * a generic method that loops until done, either in Java or JavaScript.
	 * 
	 * In JavaScript it will reenter and continue at the appropriate spot.
	 * 
	 * This method may be overridden if desired.
	 * 
	 * @see org.uwi.SimThread
	 * 
	 * @param state
	 */
	protected void run1(int state) {
		boolean executeFinally = true;
		// called by thisThread.run();
		try {
			while (!interrupted()) {
				switch (state) {
				case INIT:
					if (!myInit())
						return;
					// initial code here
					state = LOOP;
					continue;
				case LOOP:
					// to stop looping, return false from isLooping()
					if (!isLooping()) {
						state = DONE;
						continue;
					}
					// To handle sleepAndReturn yourself, or to skip the
					// sleep when desired, return false from myLoop();
					// Note that doFinally must not be executed in this case.
					// This is because JavaScript will do a return here
					// for every loop, and Java will not.
					if (myLoop() && sleepAndReturn(getDelayMillis(), state)) {
						executeFinally = false;
						return;						
					}
					continue;
				case DONE:
					whenDone();
					// whatever
					return;
				}
			}
		} catch (Exception e) {
			onException(e);
			state = DONE;
		} finally {
			if (executeFinally)
				doFinally();
		}
		// normal exit
	}

	/**
	 * 
	 * @param r2
	 * @param state
	 * @return true if we should interrupt (i.e. JavaScript)
	 * @throws InterruptedException
	 */
	protected boolean sleepAndReturn(final int delay, final int state)
			throws InterruptedException {
		if (!isJS) {
			sleep(delay);
			return false;
		}

		// in JavaScript, we need to do this through the system event queue,
		// which in JSToolkit takes care of all the "thread" handling.

		final JSThread me = this;
		Runnable r = new Runnable() {
			@Override
			public void run() {
				me.run1(state);
			}
		};
		/**
		 * @j2sNative
		 * 
		 *            setTimeout(
		 *              function() {
		 *              java.awt.Toolkit.getDefaultToolkit$().getSystemEventQueue$().postEvent$java_awt_AWTEvent(
		 *              Clazz.new_(java.awt.event.InvocationEvent.c$$O$Runnable,[me, r]))}, 
		 *              delay);
		 * 
		 */
		{
			Toolkit.getDefaultToolkit().getSystemEventQueue()
					.postEvent(new InvocationEvent(me, r));
		}
		return true;
	}
	
}
