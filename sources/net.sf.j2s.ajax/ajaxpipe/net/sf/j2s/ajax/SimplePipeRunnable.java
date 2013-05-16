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

import java.lang.reflect.Method;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import net.sf.j2s.ajax.SimpleRPCRunnable;
import net.sf.j2s.ajax.SimpleSerializable;
import net.sf.j2s.annotation.J2SIgnore;
import net.sf.j2s.annotation.J2SNative;

/**
 * 
 * @author zhou renjian
 */
public abstract class SimplePipeRunnable extends SimpleRPCRunnable {
	
	/**
	 * Pipe's id
	 */
	public String pipeKey;

	public boolean pipeAlive;
	
	@J2SIgnore
	SimplePipeHelper.IPipeThrough helper; // For Java server side
	
	@J2SIgnore
	SimplePipeHelper.IPipeClosing closer; // For Java server side
	
	boolean destroyed;
	
	int queryFailedRetries; // >=3 will mark pipe broken
	
	boolean queryEnded;
	
	long lastPipeDataReceived;
	
	@J2SIgnore
	boolean pipeManaged; // For Java server side's monitoring thread
	
	@J2SIgnore
	long lastLiveDetected;
	
	@J2SIgnore
	long lastPipeNotified;
	
	@J2SIgnore
	long lastHash;
	
	long pipeSequence = 1;
	
	long notifySequence = 1;
	
	@J2SIgnore
	int sequenceIndex; // Index of last SimplePipeSequence in pipeData 
	
	@J2SIgnore
	int bufferedIndex; // Index of last buffered object in pipeData 
	
	@J2SIgnore
	List<SimpleSerializable> pipeData;
	
	@J2SIgnore
	public List<SimpleSerializable> getPipeData() {
		return pipeData;
	}

	@J2SIgnore
	public void setLastPipeSequenceIndex(int index) {
		sequenceIndex = index;
	}
	
	@J2SIgnore
	public int getLastPipeSequenceIndex() {
		return sequenceIndex;
	}
	
	@J2SIgnore
	public int getLastBufferedIndex() {
		return bufferedIndex;
	}

	@J2SIgnore
	public void setLastBufferedIndex(int index) {
		bufferedIndex = index;
	}

	@J2SIgnore
	public long getSequence() {
		return pipeSequence;
	}

	@J2SIgnore
	public long increaseSequence() {
		return ++pipeSequence;
	}

	@J2SIgnore
	public void setSequence(long sequence) {
		pipeSequence = sequence;
	}

	@J2SIgnore
	public void setPipeHelper(SimplePipeHelper.IPipeThrough helper) {
		pipeManaged = true;
		this.helper = helper;
	}
	
	@J2SIgnore
	void setPipeCloser(SimplePipeHelper.IPipeClosing closer) {
		this.closer = closer;
	}
	
	public String getPipeURL() {
		return "simplepipe"; // url is relative to the servlet!
	}

	public String getPipeMethod() {
		return "GET";
	}

	@Override
	public void ajaxIn() {
		pipeSequence = 1;
		notifySequence = 1;
		pipeInit();
	}
	
	@Override
	public void ajaxRun() {
		lastLiveDetected = System.currentTimeMillis();
		pipeKey = SimplePipeHelper.registerPipe(this);
		pipeAlive = pipeSetup();
		if (!pipeAlive) {
			SimplePipeHelper.removePipe(pipeKey);
			pipeKey = null;
			return; // setup failed
		}
		keepPipeLive();
		pipeMonitoring();
	}

	@Override
	public void ajaxFail() {
		pipeFailed();
	}
	
	@Override
	public void ajaxOut() {
		if (pipeAlive) {
			pipeCreated();
		} else {
			pipeFailed();
		}
	}
	
	/**
	 * Listening on given events and pipe events from Simple RPC to client.
	 */
	public abstract boolean pipeSetup();
	
	/**
	 * Clear existed pipe data, if any.
	 * 
	 * For server side only.
	 */
	@J2SNative("")
	protected void pipeClearData() {
		if (pipeData != null) {
			pipeData = null;
		}
	}
	
	/**
	 * Check if there is any pipe data left.
	 * @return
	 */
	@J2SIgnore
	protected boolean hasPipeData() {
		if (pipeData == null) {
			return false;
		}
		return !pipeData.isEmpty();
	}
	
	@J2SIgnore
	protected void pipeCloneData(SimplePipeRunnable anotherPipe, SimpleFilter filter, boolean clearOriginalData) {
		if (anotherPipe == this) {
			return;
		}
		if (anotherPipe != null && anotherPipe.pipeData != null && anotherPipe.pipeData.size() > 0) {
			if (pipeData == null) {
				List<SimpleSerializable> data = new Vector<SimpleSerializable>(anotherPipe.pipeData.size());
				pipeData = data;
			}
			synchronized (pipeData) {
				synchronized (anotherPipe.pipeData) {
					for (Iterator<SimpleSerializable> itr = anotherPipe.pipeData.iterator(); itr.hasNext();) {
						SimpleSerializable event = (SimpleSerializable) itr.next();
						if (event instanceof SimplePipeSequence) {
							continue;
						}
						if (filter != null && filter.accept(event.getClass().getName())) {
							pipeData.add(event);
						}
					}
					if (clearOriginalData) {
						anotherPipe.pipeData.clear();
					}
				}
			}
			synchronized (this) {
				this.notifyAll();
			}
		}
	}
	
	/**
	 * Destroy the pipe and remove listeners.
	 * After pipe is destroyed, {@link #isPipeLive()} must be false
	 */
	public boolean pipeDestroy() {
		if (destroyed) {
			return false; // already destroyed, no further destroy actions
		}
		pipeAlive = false;
		destroyed = true;
		if (pipeKey != null) {
			SimplePipeHelper.removePipe(pipeKey);
			pipeKey = null;
		}
		pipeClearData();
		return true;
	}

	/**
	 * To initialize pipe with given parameters.
	 */
	public void pipeInit() {
		// to be override
		queryFailedRetries = 0;
		lastPipeDataReceived = -1;
	}
	
	/**
	 * Success to create a pipe.
	 */
	public void pipeCreated() {
		// notify pipe is created
		destroyed = false;
	}
	
	/**
	 * Failed to setup a pipe.
	 */
	public void pipeFailed() {
		// to be override
		// notify that pipe is not created correctly.
		pipeDestroy();
	}
	
	/**
	 * The pipe is lost. Reasons may be server is down, physical connection
	 * is broken or client side failed to keep pipe alive.
	 */
	public void pipeLost() {
		// to be override
		// notify that pipe is lost. Maybe trying to reconnect the pipe
		pipeDestroy();
	}
	
	/**
	 * The pipe is closed by the server side. Pipe could only be closed from
	 * server side. If client want to close a pipe, s/he should send a 
	 * SimpleRPCRunnable request to break down the pipe.
	 */
	public void pipeClosed() {
		// to be override
		// notify that pipe is closed by server.
		pipeDestroy();
	}
	
	public void pipeReset() {
		destroyed = false;
	}
	
	/**
	 * Return whether the pipe is still live or not.
	 * @return pipe is live or not.
	 */
	public boolean isPipeLive() {
		return pipeAlive && !destroyed && pipeKey != null;
	}
	
	/**
	 * Notify that the pipe is still alive.
	 * 
	 * This method is run on server side
	 */
	public void keepPipeLive() {
		// to be override
	}

	/**
	 * Start pipe monitor to monitor the pipe status. If pipe is non-active,
	 * try to destroy pipe by calling {@link #pipeDestroy()} and then close
	 * pipe by calling {@link #pipeClosed()}.
	 * 
	 * User may override this method to use its own monitoring method.
	 * 
	 * This method is run on server side
	 */
	protected void pipeMonitoring() {
		lastLiveDetected = System.currentTimeMillis();
		if (pipeManaged) {
			SimplePipeHelper.monitoringPipe(this);
			return;
		}
		ThreadUtils.runTask(new Runnable() {
			
			public void run() {
				long interval = pipeMonitoringInterval();
				if (interval <= 0) {
					interval = 1000;
				}
				while (true) {
					try {
						Thread.sleep(interval);
					} catch (InterruptedException e) {
						//e.printStackTrace();
					}
					if (!isPipeLive()) {
						if (System.currentTimeMillis() - lastLiveDetected > pipeWaitClosingInterval()) {
							pipeDestroy();
							if (closer != null) {
								closer.helpClosing(SimplePipeRunnable.this);
							} else {
								pipeClosed();
							}
							break;
						}
					} else {
						lastLiveDetected = System.currentTimeMillis();
					}
				}
			}
		
		}, "Pipe Monitor", true);
	}

	/**
	 * Return interval time between two pipe status checking by monitor.
	 * If return interval is less than or equals to 0, the interval time will
	 * be set to 1000 in {@link #pipeMonitoring()}. 
	 * @return time interval in millisecond.
	 */
	protected long pipeMonitoringInterval() {
		return 1000;
	}

	/**
	 * Return interval time before a pipe is closed.
	 * For compound pipe, two pipe session may have some milliseconds interval. 
	 * @return time interval in millisecond.
	 */
	public long pipeWaitClosingInterval() {
		return 5000;
	}
	
	/**
	 * Update pipe's live status.
	 * 
	 * @param live if live is true, just notify the pipe is still alive. if live is false
	 * and {@link #isPipeLive()} is true, {@link #pipeDestroy()} will be called.
	 */
	protected void updateStatus(boolean live) {
		if (live) {
			keepPipeLive();
			pipeAlive = true;
		} else if (isPipeLive()) {
			pipeDestroy();
			pipeAlive = false;
		}
	}

	/**
	 * Convert input objects into SimpleSerializable objects.
	 * 
	 * @param args
	 * @return SimpleSerializable objects to be sent through the pipe.
	 * If return null, it means that this pipe does not recognize the
	 * argument objects.
	 * 
	 * @j2sIgnore
	 */
	public SimpleSerializable[] through(Object ... args) {
		return null;
	}

	/**
	 * Deal the object from pipe.
	 * @param ss
	 * @return boolean Whether the object is dealt
	 */
	public boolean deal(SimpleSerializable ss) {
		try {
			Class<?> clazz = ss.getClass();
			if ("net.sf.j2s.ajax.SimpleSerializable".equals(clazz.getName())) {
				return true; // seldom or never reach this branch, just ignore
			}
			Method method = null;
			
			Class<?> clzz = getClass();
			String clazzName = clzz.getName();
			int idx = -1;
			while ((idx = clazzName.lastIndexOf('$')) != -1) {
				if (clazzName.length() > idx + 1) {
					char ch = clazzName.charAt(idx + 1);
					if (ch < '0' || ch > '9') { // not a number
						break; // inner class
					}
				}
				clzz = clzz.getSuperclass();
				if (clzz == null) {
					break; // should never happen!
				}
				clazzName = clzz.getName();
			}
			if (clzz != null) {
				do {
					try {
						method = clzz.getMethod("deal", clazz);
					} catch (Exception e) {
					}
					if (method != null) {
						Class<?> returnType = method.getReturnType();
						if (returnType == boolean.class) {
							Object result = method.invoke(this, ss);
							return ((Boolean) result).booleanValue();
						}
					}
					clazz = clazz.getSuperclass();
				} while (clazz != null);
			}
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return false; // unknown object
	}

	/**
	 * A method used to pipe a bundle of instances through.
	 * 
	 * @param args Normal objects
	 * 
	 * @j2sIgnore
	 */
	public void pipeThrough(Object ... args) {
		SimplePipeRunnable pipe = SimplePipeHelper.getPipe(pipeKey);
		if (pipe == null) return;
		SimpleSerializable[] objs = pipe.through(args);
		
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

	/**
	 * A method used to pipe a bundle of instances through.
	 * 
	 * @param args SimpleSerializable objects
	 * 
	 * @j2sIgnore
	 */
	public void pipeThrough(SimpleSerializable ... args) {
		if (args == null || args.length == 0) return;
		SimplePipeRunnable pipe = SimplePipeHelper.getPipe(pipeKey);
		if (pipe == null) return;
		if (pipe instanceof SimplePipeRunnable) {
			SimplePipeRunnable pipeRunnable = (SimplePipeRunnable) pipe;
			if (pipeRunnable.helper != null) {
				pipeRunnable.helper.helpThrough(pipe, args);
				return;
			}
		}
		for (int i = 0; i < args.length; i++) {
			pipe.deal(args[i]);
		}
	}
	
}
