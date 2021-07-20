package test;

import java.net.URL;
import javax.swing.SwingUtilities;
import javax.swing.SwingWorker;

import javajs.async.SwingJSUtils;
import javajs.async.SwingJSUtils.StateHelper;
import javajs.async.SwingJSUtils.StateMachine;

public class Test_SwingWorker extends Test_ {
	
	public static void main(String[] args) {

		SwingUtilities.invokeLater(new Runnable() {

			@Override
			public void run() {
				// TODO Auto-generated method stub

				new Test_SwingWorker();	
			}
			
		});

	}


	SwingWorker sw1 = newSwingWorker(1);
	SwingWorker sw2 = newSwingWorker(2);
	SwingWorker sw3 = newSwingWorker(3);
	
	class State implements StateMachine {

		final static int STATE_INIT = 0;
		final static int STATE_LOOP = 1;
		final static int STATE_DONE = 2;
		private StateHelper helper;
		
		State() {
			this.helper = new SwingJSUtils.StateHelper(this);
			this.helper.next(STATE_INIT);
		}
		@Override
		public boolean stateLoop() {
			
			while (helper.isAlive()){
				println("cycling" + " " + Thread.currentThread());
				switch (helper.getState()) {
				case STATE_INIT:
					println("init1 " + sw1.getState() + " " + sw2.getState() + " " + sw3.getState());
					sw1.execute();
					println("init2 " + sw1.getState() + " " + sw2.getState() + " " + sw3.getState());
					sw2.execute();
					println("init3 " + sw1.getState() + " " + sw2.getState() + " " + sw3.getState());
					sw3.execute();
					println("init4 " + sw1.getState() + " " + sw2.getState() + " " + sw3.getState());
					helper.delayedState(10, STATE_LOOP);
					return true;
				case STATE_LOOP:
					println("loop " + sw1.getState() + " " + sw2.getState() + " " + sw3.getState());
					if (sw1.isDone() && sw2.isDone() && sw3.isDone()) {
						helper.setState(STATE_DONE);
						continue;
					}
					println("Still looping... " + 
							sw1.isDone() + " " + sw2.isDone() + " " + sw3.isDone());
					helper.delayedState(10, STATE_LOOP);
					return true;
				case STATE_DONE:
					println("done " + sw1.getState() + " " + sw2.getState() + " " + sw3.getState());
					
					return false;
				}
			}
			return false;
		}
		
	}
	
	public Test_SwingWorker() {
		
		new State();
		
		println("OK...done"+ " " + Thread.currentThread());
//		try {
//			//Thread.sleep(500);
//		} catch (InterruptedException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}

		
	}
	
	public static void println(String s) {
		System.out.println(s);
		/**@j2sNative J2S.showStatus(s,true);*/
		}
	
	private static SwingWorker newSwingWorker(int me) {
		return new SwingWorker() {

			int ime;

			@Override
			public void done() {
				println("done() " + me + " " + Thread.currentThread());
			}

			@Override
			protected Object doInBackground() throws Exception {
				for (int i = 0; i < 3; i++) {
					println("running " + me + " opening stream");
					new URL("https://physlets.org").openStream().close();
					println("running " + me + " closed stream");
					Runnable r = new Runnable() {
						public void run() {
							println(Thread.currentThread().getName() + " " + me + " sleeping...");
//							try {
//								Thread.sleep(5000 + ime * 33);
//							} catch (InterruptedException e) {
//								// TODO Auto-generated catch block
//								e.printStackTrace();
//							}
							println(Thread.currentThread().getName() + " " + me  + " ...waking");
							println("sw" + "        ".substring(0, me*2) + me+"." + ime++);
							
						}
						
					};
					SwingUtilities.invokeLater(r);
				}
				return null;
			}
			
		};
	}


} 