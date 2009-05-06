package net.sf.j2s.ajax;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.locks.ReentrantLock;

import net.sf.j2s.annotation.J2SIgnore;

public class ManagedPipeHelper {

	@J2SIgnore
	private static Map<String, SimplePipeRunnable> pipeSessions = null;
	
	@J2SIgnore
	private static boolean monitored = false;
	
	@J2SIgnore
	private static long monitoringInterval = 10000; // 10s

	@J2SIgnore
	private static ReentrantLock lock = new ReentrantLock();
	
    @J2SIgnore
	public static long getMonitoringInterval() {
		return monitoringInterval;
	}

    @J2SIgnore
	public static void setMonitoringInterval(long monitoringInterval) {
		ManagedPipeHelper.monitoringInterval = monitoringInterval;
	}

	@J2SIgnore
	private static void startMonitor() {
		Thread thread = new Thread("Managed Pipe Session Monitor") {
			
			public void run() {
				while (true) {
					try {
						Thread.sleep(getMonitoringInterval());
					} catch (InterruptedException e) {
					}
					if (pipeSessions == null) {
						System.err.println("Pipe sessions are null or empty! Managed pipe session monitor exited!");
						break;
					}
					Set<SimplePipeRunnable> pipes = null;
					try {
				    	synchronized (pipeSessions) {
				    		pipes = new HashSet<SimplePipeRunnable>(pipeSessions.values());
				    	}
					} catch (Throwable e) {
						e.printStackTrace();
						continue; //
					}
					for (Iterator<SimplePipeRunnable> itr = pipes.iterator(); itr.hasNext();) {
					    SimplePipeRunnable pipe = itr.next();
					    try {
							if (!pipe.isPipeLive()) {
		                        if (System.currentTimeMillis() - pipe.lastLiveDetected > pipe.pipeWaitClosingInterval()) {
		                        	try {
		                        		pipe.pipeDestroy();
		                        	} catch (Throwable e) {
		                        		e.printStackTrace();
		                        	}
		                        	try {
			                        	if (pipe.closer != null) {
			                        		pipe.closer.helpClosing(pipe);
			                        	} else {
			                        		pipe.pipeClosed();
			                        	}
		                        	} catch (Throwable e) {
		                        		e.printStackTrace();
		                        	}
		                        	synchronized (pipeSessions) {
		                        		pipeSessions.remove(pipe.pipeKey);
									}
		                        }
							} else {
							    pipe.lastLiveDetected = System.currentTimeMillis();
							}
                    	} catch (Throwable e) {
                    		e.printStackTrace();
                    	}
					}
					lock.lock();
					try {
						if (pipeSessions == null || pipeSessions.isEmpty()) {
							monitored = false;
							break;
						}
					} finally {
						lock.unlock();
					}
				}
			}
		
		};
		thread.setDaemon(true);
		thread.start();
	}

    @J2SIgnore
	public static void monitoringPipe(SimplePipeRunnable pipe) {
    	long now = System.currentTimeMillis();
    	lock.lock();
    	try {
			if (pipeSessions == null) {
				pipeSessions = new HashMap<String, SimplePipeRunnable>(20);
			}
			pipeSessions.put(pipe.pipeKey, pipe);
			pipe.lastLiveDetected = now;
			if (monitored) {
				return;
			}
			monitored = true;
    	} finally {
    		lock.unlock();
    	}
    	startMonitor();
	}

}
