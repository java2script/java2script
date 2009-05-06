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
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import net.sf.j2s.ajax.SimpleSerializable;
import net.sf.j2s.annotation.J2SIgnore;

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
	
	private static Map<String, Vector<SimpleSerializable>> pipeMap = null;

	private SimplePipeHelper() {
		//
	}
	
	private static Map<String, SimplePipeRunnable> pipes;

	/**
	 * 
	 * @param key
	 * @param pipe
	 * 
	 * @j2sNative
	 * if (key == null || pipe == null) return;
	 * if (net.sf.j2s.ajax.SimplePipeHelper.pipes == null) {
	 * 	net.sf.j2s.ajax.SimplePipeHelper.pipes = new Object ();
	 * }
	 * net.sf.j2s.ajax.SimplePipeHelper.pipes[key] = pipe;
	 */
	public static void registerPipe(String key, SimplePipeRunnable pipe) {
		if (key == null || pipe == null) return;
		if (pipes == null) {
			pipes = Collections.synchronizedMap(new HashMap<String, SimplePipeRunnable>(50));
		}
		pipes.put(key, pipe);
	}
	
	@J2SIgnore
	static String registerPipe(SimplePipeRunnable pipe) {
		// if (pipe == null) return null; // should never register null pipe!
		if (pipes == null) {
			pipes = Collections.synchronizedMap(new HashMap<String, SimplePipeRunnable>(50));
		}
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

	/**
	 * Generate random pipe key.
	 * @return
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
	
	/**
	 * 
	 * @param key
	 * 
	 * @j2sNative
	 * delete net.sf.j2s.ajax.SimplePipeHelper.pipes[key];
	 */
	static void removePipe(String key) {
		if (pipes == null || key == null) return;
		SimplePipeRunnable removedPipe = pipes.remove(key);
		if (removedPipe != null && pipeMap != null) {
			Vector<SimpleSerializable> removedVector = pipeMap.remove(key);
			if (removedVector != null) {
				synchronized (removedVector) {
					removedVector.notifyAll();
				}
			}
		}
	}

	/**
	 * 
	 * @param key
	 * @return
	 * 
	 * @j2sNative
	 * var ps = net.sf.j2s.ajax.SimplePipeHelper.pipes;
	 * if (ps == null || key == null) return null;
	 * return ps[key];
	 */
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
	
	/**
	 * Tear down the pipe and release its resources.
	 * @param key
	 */
	@J2SIgnore
	static void pipeTearDown(String key) {
		if (pipeMap == null) return;
		Vector<SimpleSerializable> vector = pipeMap.get(key);
		if (vector == null) return;
		vector.add(null); // terminating signal
		synchronized (vector) {
			// Tear down...
			vector.notifyAll();
		}
		pipeMap.remove(key);
	}

	@J2SIgnore
	static void pipeIn(String key, SimpleSerializable[] ss) {
		Vector<SimpleSerializable> vector = getPipeVector(key);
		if (vector == null) return; // throw exception?
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
	
}
