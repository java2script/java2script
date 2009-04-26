package net.sf.j2s.ajax;

import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import net.sf.j2s.annotation.J2SIgnore;

public class ManagedPipeHelper {

	@J2SIgnore
	private static Map<String, SimplePipeRunnable> pipeSessions = null;
	@J2SIgnore
	private static boolean monitored = false;
	
	@J2SIgnore
	private static boolean monitorRunning = false;

	@J2SIgnore
	private static long monitoringInterval = 10000; // 10s
	
	
    @J2SIgnore
	public static long getMonitoringInterval() {
		return monitoringInterval;
	}

    @J2SIgnore
	public static void setMonitoringInterval(long monitoringInterval) {
		ManagedPipeHelper.monitoringInterval = monitoringInterval;
	}

	@J2SIgnore
	public static void stopMonitor() {
		monitorRunning = false;
	}
	
	static synchronized void init() {
		if (pipeSessions == null) {
			pipeSessions = Collections.synchronizedMap(new HashMap<String, SimplePipeRunnable>(20));
		}
	}

	@J2SIgnore
	static void startMonitor() {
		init();
		monitorRunning = true;
		new Thread(new Runnable() {
			
			public void run() {
				while (monitorRunning) {
					try {
						Thread.sleep(getMonitoringInterval());
					} catch (InterruptedException e) {
					}
					if (pipeSessions == null) {
						System.err.println("Pipe sessions are null or empty! Managed pipe session monitor exited!");
						break;
					}
					Set<SimplePipeRunnable> pipes = new HashSet<SimplePipeRunnable>(pipeSessions.values());
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
		                        	pipeSessions.remove(pipe.pipeKey);
		                        }
							} else {
							    pipe.lastLiveDetected = System.currentTimeMillis();
							}
                    	} catch (Throwable e) {
                    		e.printStackTrace();
                    	}
					}
				}
			}
		
		}, "Managed Pipe Session Monitor").start();
	}

    @J2SIgnore
	public static void monitoringPipe(SimplePipeRunnable pipe) {
    	init();
	    pipeSessions.put(pipe.pipeKey, pipe);
	    pipe.lastLiveDetected = System.currentTimeMillis();
	    if (monitored) {
            return;
        }
        monitored = true;
        startMonitor();
	}

}
