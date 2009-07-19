/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.ajax;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import net.sf.j2s.ajax.SimpleSerializable;
import net.sf.j2s.annotation.J2SIgnore;
import net.sf.j2s.annotation.J2SNative;

/**
 * 
 * @author zhou renjian
 */
public class SimplePipeHelper {
	
	static interface IPipeThrough {
		public void helpThrough(SimplePipeRunnable pipe, SimpleSerializable[] objs);
	}
	
	static interface IPipeClosing {
		public void helpClosing(SimplePipeRunnable pipe);
	}
	
	@J2SIgnore
	private static Map<String, Vector<SimpleSerializable>> pipeMap = null;
	
	@J2SIgnore
	private static boolean monitored = false;
	
	@J2SIgnore
	private static long monitoringInterval = 10000; // 10s
	
	static Map<String, SimplePipeRunnable> pipes;

	@J2SIgnore
	private SimplePipeHelper() {
		//
	}

	/*
	 * Browser mode
	 */
	@J2SNative({
		"if (key == null || pipe == null) return;",
		"if (net.sf.j2s.ajax.SimplePipeHelper.pipes == null) {",
		"	net.sf.j2s.ajax.SimplePipeHelper.pipes = new Object ();",
		"}",
		"net.sf.j2s.ajax.SimplePipeHelper.pipes[key] = pipe;"
	})
	public static void registerPipe(String key, SimplePipeRunnable pipe) {
		if (key == null || pipe == null) return;
		if (pipes == null) {
			pipes = Collections.synchronizedMap(new HashMap<String, SimplePipeRunnable>(50));
		}
		pipes.put(key, pipe);
	}
	
	/*
	 * Server side
	 */
	@J2SIgnore
	static String registerPipe(SimplePipeRunnable pipe) {
		if (pipe.pipeKey != null) {
			System.out.println("ERROR!!! pipeKey should be null here! " + pipe.pipeKey);
		}
		// if (pipe == null) return null; // should never register null pipe!
		if (pipes == null) {
			pipes = Collections.synchronizedMap(new HashMap<String, SimplePipeRunnable>(50));
		}
		
		// TODO: Synchronize pipe key
		String key = nextPipeKey();
		while (pipes.get(key) != null) {
			key = nextPipeKey();;
		}
		pipes.put(key, pipe);
		
		if (pipeMap == null) {
			pipeMap = Collections.synchronizedMap(new HashMap<String, Vector<SimpleSerializable>>());
		}
		Vector<SimpleSerializable> vector = pipeMap.get(key);
		if (vector == null) {
			vector = new Vector<SimpleSerializable>();
			pipeMap.put(key, vector);
		}
		
		return key;
	}

	/*
	 * Generate random pipe key.
	 */
	@J2SIgnore
	static String nextPipeKey() {
		StringBuffer buf = new StringBuffer();
		for (int i = 0; i < SimplePipeRequest.PIPE_KEY_LENGTH; i++) {
			int r = (int) Math.round((float) Math.random() * 61); // 0..61, total 62 numbers
			if (r < 10) {
				buf.append((char) (r + '0'));
			} else if (r < 10 + 26) {
				buf.append((char) ((r - 10) + 'a'));
			} else {
				buf.append((char) ((r - 10 - 26) + 'A'));
			}
		}
		return buf.toString();
	}
	
	@J2SNative({
		"delete net.sf.j2s.ajax.SimplePipeHelper.pipes[key];"
	})
	static void removePipe(String key) {
		if (key == null) {
			System.out.println("Removing pipe for null key???");
			return;
		}
		if (pipes != null) {
			SimplePipeRunnable removedPipe = pipes.remove(key);
			if (removedPipe != null) {
				removedPipe.pipeAlive = false;
			//} else {
			//	System.out.println("Pipe " + key + " is already removed!");
			}
		}
		if (pipeMap != null) {
			Vector<SimpleSerializable> removedVector = pipeMap.remove(key);
			if (removedVector != null) {
				synchronized (removedVector) {
					removedVector.notifyAll();
				}
			}
		}
	}

	@J2SNative({
		"var ps = net.sf.j2s.ajax.SimplePipeHelper.pipes;",
		"if (ps == null || key == null) return null;",
		"return ps[key];"
	})
	public static SimplePipeRunnable getPipe(String key) {
		if (pipes == null || key == null) return null;
		return pipes.get(key);
	}
	
	@J2SIgnore
	static Vector<SimpleSerializable> getPipeVector(String key) {
		if (pipeMap == null) {
			return null;
		}
		return pipeMap.get(key);
	}

	@J2SIgnore
	static void pipeIn(String key, SimpleSerializable[] ss) {
		Vector<SimpleSerializable> vector = getPipeVector(key);
		if (vector == null) {
			System.out.println("There are no pipe listening?!!!!");
			return; // throw exception?
		}
		for (int i = 0; i < ss.length; i++) {
			vector.add(ss[i]);
		}
		synchronized (vector) {
			// Notify pipe in!
			vector.notifyAll();
		}
	}

	@J2SIgnore
	static boolean isPipeLive(String key) {
		SimplePipeRunnable pipe = getPipe(key);
		if (pipe != null) {
			return pipe.isPipeLive();
		}
		return false;
	}
	
	@J2SIgnore
	static boolean notifyPipeStatus(String key, boolean live) {
		SimplePipeRunnable pipe = getPipe(key);
		if (pipe != null && pipe.isPipeLive()) {
			pipe.updateStatus(live);
			return true;
		}
		return false;
	}

	@J2SIgnore
	public static void helpClosing(SimplePipeRunnable pipe) {
		if (pipe.closer != null) {
			pipe.closer.helpClosing(pipe);
		} else {
			pipe.pipeClosed();
		}
	}
	
	@J2SIgnore
	public static void printStatistics() {
		if (pipes != null) {
			System.out.println("Totoal pipe count: " + pipes.size());
			System.out.println("Totoal pipe map count: " + pipeMap.size());
//			int toooooooCount = 0;
			System.out.println(new Date());
			Object[] keys = pipeMap.keySet().toArray();
			for (int i = 0; i < keys.length; i++) {
				String key = (String) keys[i];
				Vector<?> vector = pipeMap.get(key);
				SimplePipeRunnable p = pipes.get(key);
//				if (p != null) {
//					if (System.currentTimeMillis() - p.lastLiveDetected > 150000) { // 2.5 minutes
//						System.out.println("Pipe " + p.pipeKey + " is too old!");
//						toooooooCount++;
//					}
//				}
				if (p instanceof CompoundPipeRunnable) {
					CompoundPipeRunnable cp = (CompoundPipeRunnable) p;
					if (cp.status < 3) {
						System.out.println("Error status for pipe " + cp.pipeKey + " with status " + cp.status);
					}
					if (cp.isEmpty()) {
						System.out.println("Pipe " + cp.pipeKey + " was created at " + new Date(cp.lastSetup));
					}
					System.out.println(i + " :: CompoundPipeRunnable status " + cp.status + " and live status is " + cp.isPipeLive());
					for (int j = 0; j < cp.pipes.length; j++) {
						if (cp.pipes[j] != null) {
							System.out.println(j + " : " + cp.pipes[j].session + " / " + cp.pipes[j].isPipeLive());
						}
					}
				}
				if (vector != null) {
					int size = vector.size();
					//if (size > 5) {
						if (p != null) {
							System.out.println("::: pipe " + p.pipeKey + " size : " + size + " / " + p.pipeAlive);
						} else {
							System.out.println("Error pipe " + key + " with size : " + size);
						}
					//}
				}
			}
			//System.out.println("Totoal old pipe count: " + toooooooCount);
		}
	}

	@J2SIgnore
	public static long getMonitoringInterval() {
		return monitoringInterval;
	}

	@J2SIgnore
	public static void setMonitoringInterval(long monitoringInterval) {
		SimplePipeHelper.monitoringInterval = monitoringInterval;
	}

	@J2SIgnore
	private static void monitoringAllPipes() {
		while (true) {
			try {
				Thread.sleep(getMonitoringInterval());
			} catch (InterruptedException e) {
			}
			if (pipes == null) {
				System.err.println("Pipe sessions are null or empty! Managed pipe session monitor exited!");
				break;
			}
			Object[] allPipes = pipes.values().toArray();
			if (allPipes.length > 500) {
				System.out.println("Monitoring " + allPipes.length + " pipes ... ");
			}
			int nonManaged = 0;
			for (int i = 0; i < allPipes.length; i++) {
			    final SimplePipeRunnable pipe = (SimplePipeRunnable) allPipes[i];
			    if (!pipe.pipeManaged) {
			    	nonManaged++;
			    	continue;
			    }
			    try {
					if (!pipe.isPipeLive() || (pipe instanceof CompoundPipeRunnable
							&& ((CompoundPipeRunnable) pipe).isEmpty()
							&& System.currentTimeMillis() - ((CompoundPipeRunnable) pipe).lastSetup > 30000)) {
						//System.out.println("Pipe " + pipe.pipeKey + " live status is " + pipe.isPipeLive());
                        if (System.currentTimeMillis() - pipe.lastLiveDetected > pipe.pipeWaitClosingInterval()) {
                        	String pipeKey = pipe.pipeKey;
                        	(new Thread("Destroy Pipe Thread") {
                        		@Override
                        		public void run() {
                        			//System.out.println("pipe.pipeDestroy...." + pipe.pipeKey);
                        			try {
                        				pipe.pipeDestroy();
                        			} catch (Throwable e) {
                        				e.printStackTrace();
                        			}
                        			try {
                        				if (pipe.closer != null) {
                        					//System.out.println("pipe.closer.helpClosing...." + pipe.pipeKey);
                        					pipe.closer.helpClosing(pipe);
                        				} else {
                        					//System.out.println("pipe.pipeClosed...." + pipe.pipeKey);
                        					pipe.pipeClosed();
                        				}
                        			} catch (Throwable e) {
                        				e.printStackTrace();
                        			}
                        		}
                        	}).start();
                        	//System.out.println("Use pipe monitor's thread to destroy pipe! " + pipe.pipeKey);
                        	removePipe(pipeKey);
                        }
					} else {
					    pipe.lastLiveDetected = System.currentTimeMillis();
					}
            	} catch (Throwable e) {
            		e.printStackTrace();
            	}
			}
			//System.out.println("Monitoring skip " + nonManaged + " pipes ... ");

			if (pipes == null || pipes.isEmpty()) {
				monitored = false;
				break;
			}
		}
		System.err.println("Pipe sessions are null or empty! Pipe session monitor exited!");
	}

	@J2SIgnore
	static void monitoringPipe(SimplePipeRunnable pipe) {
		long now = System.currentTimeMillis();
		pipe.lastLiveDetected = now;
		if (monitored) {
			return;
		}
		monitored = true;
		Thread thread = new Thread("Managed Pipe Session Monitor") {
			public void run() {
				monitoringAllPipes();
			}
		};
		thread.setDaemon(true);
		thread.start();
	}
	
}
