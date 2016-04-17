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

import java.io.ByteArrayOutputStream;

import net.sf.j2s.ajax.HttpRequest;
import net.sf.j2s.ajax.SimpleRPCRequest;
import net.sf.j2s.ajax.SimpleSerializable;
import net.sf.j2s.ajax.XHRCallbackSWTAdapter;
import net.sf.j2s.annotation.J2SIgnore;

import org.eclipse.swt.widgets.Display;

/**
 * 
 * @author zhou renjian
 */
public class SimplePipeSWTRequest extends SimplePipeRequest {
	
	/**
	 * @param runnable
	 * 
	 * @j2sNative
	 * runnable.ajaxIn ();
	 * net.sf.j2s.ajax.SimplePipeRequest.pipeRequest(runnable);
	 */
	public static void swtPipe(final SimplePipeRunnable runnable) {
		runnable.ajaxIn();
		if (getRequstMode() == MODE_LOCAL_JAVA_THREAD) {
			runnable.setPipeHelper(new SimplePipeHelper.IPipeThrough() {
				
				public void helpThrough(final SimplePipeRunnable pipe, final SimpleSerializable[] objs) {
					SWTHelper.syncExec(Display.getDefault(), new Runnable() {
						public void run() {
							for (int i = 0; i < objs.length; i++) {
								pipe.deal(objs[i]);
							}
						}
					});
				}
			
			});
			SimpleThreadHelper.runTask(new Runnable() {
				public void run() {
					try {
						runnable.ajaxRun();
					} catch (Throwable e) {
						e.printStackTrace(); // should never fail in Java thread mode!
						SWTHelper.syncExec(Display.getDefault(), new Runnable() {
							public void run() {
								runnable.ajaxFail();
							}
						});
						return;
					}
					Display disp = Display.getDefault();
					if (disp != null) {
						swtKeepPipeLive(runnable, disp);
						SWTHelper.syncExec(disp, new Runnable() {
							public void run() {
								runnable.ajaxOut();
							}
						});
					} // else ?
				}
			}, "Simple Pipe Simulator");

			//SimpleRPCSWTRequest.swtRequest(runnable);
		} else {
			swtPipeRequest(runnable);
		}
	}

	/**
	 * Be used in Java mode to keep the pipe live.
	 * 
	 * @param runnable
	 */
    @J2SIgnore
	static void swtKeepPipeLive(final SimplePipeRunnable runnable, final Display disp) {
    	Thread notifyThread = new Thread(new Runnable() {
			
			public void run() {
				long lastLiveDetected = System.currentTimeMillis();
				do {
					long interval = pipeLiveNotifyInterval;
					
					while (interval > 0) {
						try {
							Thread.sleep(Math.min(interval, 1000));
							interval -= 1000;
						} catch (InterruptedException e) {
							//e.printStackTrace();
						}
						if (getRequstMode() == MODE_LOCAL_JAVA_THREAD) {
							if (!runnable.isPipeLive()) {
								break;
							}
						} else {
							if (SimplePipeHelper.getPipe(runnable.pipeKey) == null) {
								break;
							}
						}
					}
					
					if (getRequstMode() == MODE_LOCAL_JAVA_THREAD) {
						boolean pipeLive = runnable.isPipeLive();
						if (pipeLive) {
							runnable.keepPipeLive();
							lastLiveDetected = System.currentTimeMillis();
						} else {
							if (System.currentTimeMillis() - lastLiveDetected > runnable.pipeWaitClosingInterval()) {
								runnable.pipeDestroy();
								SWTHelper.syncExec(disp, new Runnable() {
									public void run() {
										runnable.pipeClosed();
									}
								});
								break;
							}
						}
					} else {
						SimplePipeRunnable r = SimplePipeHelper.getPipe(runnable.pipeKey);
						if (r != null && r.isPipeLive()) {
							HttpRequest request = getRequest();
							String pipeKey = runnable.pipeKey;
							String pipeMethod = runnable.getPipeMethod();
							String pipeURL = runnable.getPipeURL();
							long sequence = runnable.pipeSequence;
							String pipeRequestData = constructRequest(pipeKey, PIPE_TYPE_NOTIFY, sequence);
							sendRequest(request, pipeMethod, pipeURL, pipeRequestData, false);
							String response = request.getResponseText();
							if (response != null && runnable.notifySequence < sequence && response.indexOf("$p1p3b$") != 0) {
								runnable.notifySequence = sequence;
							}
							if (response != null && response.indexOf("\"" + PIPE_STATUS_LOST + "\"") != -1) {
								SWTHelper.syncExec(disp, new Runnable() {
									public void run() {
										runnable.pipeAlive = false;
										runnable.pipeLost();
									}
								});
								SimplePipeHelper.removePipe(pipeKey);
								// may need to inform user that connection is already lost!
								break;
							} else {
								runnable.lastLiveDetected = System.currentTimeMillis();
								runnable.updateStatus(true);
							}
						} else {
							break;
						}
					}
				} while (true);
			}
		
		}, "Simple Pipe Live Notifier");
    	notifyThread.setDaemon(true);
    	notifyThread.start();
	}

    @J2SIgnore
	private static void swtPipeRequest(final SimplePipeRunnable runnable) {
		String url = runnable.getHttpURL();
		String method = runnable.getHttpMethod();
		String serialize = runnable.serialize();
		if (method == null) {
			method = "POST";
		}
		String url2 = SimpleRPCRequest.adjustRequestURL(method, url, serialize);
		if (url2 != url) {
			serialize = null;
		}
		final HttpRequest request = getRequest();
		if (!runnable.supportsKeepAlive()) {
			request.setRequestHeader("Connection", "close");
		}
		if (runnable instanceof ISimpleRequestInfo) {
			ISimpleRequestInfo reqInfo = (ISimpleRequestInfo) runnable;
			String ua = reqInfo.getRemoteUserAgent();
			if (ua != null) {
				request.setRequestHeader("User-Agent", ua);
			}
		}
		request.open(method, url, true);
		request.registerOnReadyStateChange(new XHRCallbackSWTAdapter() {
			public void swtOnLoaded() {
				boolean isJavaScript = false;
				/**
				 * @j2sNative
				 * isJavaScript = true;
				 */ {}
				if (isJavaScript) { // for SCRIPT mode only
					// For JavaScript, there is no #getResponseBytes
					String responseText = request.getResponseText();
					if (responseText == null || responseText.length() == 0
							|| !runnable.deserialize(responseText)) {
						runnable.ajaxFail(); // should seldom fail!
						return;
					}
				} else {
					// For Java, use #getResponseBytes for performance optimization
					byte[] responseBytes = request.getResponseBytes();
					if (responseBytes == null || responseBytes.length == 0
							|| !runnable.deserializeBytes(responseBytes)) {
						runnable.ajaxFail(); // should seldom fail!
						return;
					}
				}
				runnable.ajaxOut();
				
				if (!runnable.isPipeLive()) {
					return;
				}
				
				SimplePipeHelper.registerPipe(runnable.pipeKey, runnable);

				if (getPipeMode() == MODE_PIPE_CONTINUUM) {
					SimpleThreadHelper.runTask(new Runnable(){
						public void run() {
							swtPipeContinuum(runnable);
						}
					}, "Simple Pipe Continuum Worker");
				} else {
					final String key = runnable.pipeKey;
					Thread queryThread = new Thread(new Runnable() {
						public void run() {
							SimplePipeRunnable runnable = null;
							while ((runnable = SimplePipeHelper.getPipe(key)) != null) {
								swtPipeQuery(runnable);
								try {
									Thread.sleep(getQueryInterval());
								} catch (InterruptedException e) {
									//e.printStackTrace();
								}
							}
						}
					}, "Simple Pipe Query Worker");
					queryThread.setDaemon(true);
					queryThread.start();
				}

			}
		});
		request.send(serialize);
	}

    @J2SIgnore
	static void swtPipeQuery(SimplePipeRunnable runnable) {
		final HttpRequest pipeRequest = getRequest();
		final String pipeKey = runnable.pipeKey;
		String pipeMethod = runnable.getPipeMethod();
		String pipeURL = runnable.getPipeURL();
		
		pipeRequest.registerOnReadyStateChange(new XHRCallbackSWTAdapter() {
		
			@Override
			public void swtOnLoaded() {
				String responseText = pipeRequest.getResponseText();
				if (responseText != null) {
					String retStr = swtParseReceived(responseText);
					if (retStr != null && retStr.length() > 0) {
						if (PIPE_STATUS_DESTROYED == retStr.charAt(0)) {
							int beginIndex = 1 + 1;
							String pipeKeyStr = retStr.substring(beginIndex, beginIndex + PIPE_KEY_LENGTH);
							SimplePipeRunnable pipe = SimplePipeHelper.getPipe(pipeKeyStr);
							if (pipe != null) {
								pipe.pipeClosed();
								SimplePipeHelper.removePipe(pipeKeyStr);
							}
						}
					}
				}
			}
		
		});

		String pipeRequestData = constructRequest(pipeKey, PIPE_TYPE_QUERY, runnable.pipeSequence);
		sendRequest(pipeRequest, pipeMethod, pipeURL, pipeRequestData, false);
	}
	
    @J2SIgnore
	static void swtPipeContinuum(final SimplePipeRunnable runnable) {
		HttpRequest pipeRequest = getRequestWithMonitor(new HttpRequest.IXHRReceiving() {
			public boolean receiving(ByteArrayOutputStream baos, byte b[], int off, int len) {
				baos.write(b, off, len);
				byte[] bytes = baos.toByteArray();
				int resetIndex = 0;
				try {
					resetIndex = swtParseReceivedBytes(bytes);
				} catch (RuntimeException e) { // invalid simple format
					int length = bytes.length;
					if (length < 100) {
						System.out.println("[ERROR]: " + new String(bytes));
					} else {
						System.out.println("[ERROR]: " + new String(bytes, 0, 100) + " ..");
					}
					throw e;
				}
				if (resetIndex > 0) {
					baos.reset();
					if (resetIndex < bytes.length) {
						baos.write(bytes, resetIndex, bytes.length - resetIndex);
					}
				}

				/*
				// It is OK to convert to string as SimpleSerialize's
				// serialized string contains only ASCII chars.
				// [20151228] ASCII characters only is broken after 2.0.0
				String string = baos.toString();
				String resetString = swtParseReceived(string);
				if (resetString != null && resetString.length() > 0) {
					if (PIPE_STATUS_DESTROYED == resetString.charAt(0)) {
						int beginIndex = 1 + 1;
						final String pipeKeyStr = resetString.substring(beginIndex, beginIndex + PIPE_KEY_LENGTH);
						final SimplePipeRunnable pipe = SimplePipeHelper.getPipe(pipeKeyStr);
						if (pipe != null) {
							SWTHelper.syncExec(Display.getDefault(), new Runnable() {
								public void run() {
									pipe.pipeClosed();
									SimplePipeHelper.removePipe(pipeKeyStr);
								}
							});
						}
						resetString = resetString.substring(beginIndex + PIPE_KEY_LENGTH + 1);
					}
					baos.reset();
					try {
						baos.write(resetString.getBytes());
					} catch (IOException e) {
						e.printStackTrace();
					}
				} else if (resetString != null && resetString.length() == 0) {
					baos.reset();
				}
				// */
				return true;
			}
		
		});
		
		pipeRequest.registerOnReadyStateChange(new XHRCallbackSWTAdapter() {
		
			@Override
			public void onReceiving() {
				swtKeepPipeLive(runnable, Display.getDefault());
			}

			@Override
			public void swtOnLoaded() { // on case that no destroy event is sent to client
				String pipeKey = runnable.pipeKey;
				if (SimplePipeHelper.getPipe(pipeKey) != null) {
					runnable.pipeClosed(); // may set runnable.pipeKey = null
					SimplePipeHelper.removePipe(pipeKey);
				}
			}
		
		});
		pipeRequest.setCometConnection(true);

		String pipeKey = runnable.pipeKey;
		String pipeMethod = runnable.getPipeMethod();
		String pipeURL = runnable.getPipeURL();

		String pipeRequestData = constructRequest(pipeKey, PIPE_TYPE_CONTINUUM, runnable.pipeSequence);
		sendRequest(pipeRequest, pipeMethod, pipeURL, pipeRequestData, true);
	}
	
    @J2SIgnore
	static String swtParseReceived(String string) {
		SimpleSerializable ss = null;
		int start = 0;
		while (string.length() > start + PIPE_KEY_LENGTH) { // should be bigger than 48 ( 32 + 6 + 1 + 8 + 1)
			int end = start + PIPE_KEY_LENGTH;
			if (PIPE_STATUS_DESTROYED == string.charAt(end)) {
				return PIPE_STATUS_DESTROYED + ":" + string.substring(start, end) 
						+ ":" + string.substring(end + 1);
			}
			if (PIPE_STATUS_OK == string.charAt(end)) {
				String key = string.substring(start, end);
				SimplePipeRunnable runnable = SimplePipeHelper.getPipe(key);
				if (runnable != null) { // should always satisfy this condition
					runnable.lastPipeDataReceived = System.currentTimeMillis();
				}
				start = end + 1;
				if (start == string.length()) {
					return string.substring(start);
				}
			}
			if ((ss = SimpleSerializable.parseInstance(string, end)) == null
					|| ss == SimpleSerializable.ERROR
					|| !ss.deserialize(string, end)) {
				break;
			}
			String key = string.substring(start, end);
			final SimplePipeRunnable runnable = SimplePipeHelper.getPipe(key);
			if (runnable != null) { // should be always fulfill this condition
				runnable.lastPipeDataReceived = System.currentTimeMillis();
				if (ss != SimpleSerializable.UNKNOWN) {
					if (ss instanceof SimplePipeSequence) {
						long sequence = ((SimplePipeSequence) ss).sequence;
						if (sequence > runnable.pipeSequence) {
							runnable.pipeSequence = sequence;
						}
					} else {
						//runnable.deal(ss);
						final SimpleSerializable instance = ss;
						SWTHelper.syncExec(Display.getDefault(), new Runnable() {
							public void run() {
								runnable.deal(instance);
							}
						});
					}
				}
			}
			
			start = restStringIndex(string, start);
		}
		if (start != 0) {
			return string.substring(start);
		}
		return string;
	}

    @J2SIgnore
	static int swtParseReceivedBytes(final byte[] bytes) {
		if (bytes == null) {
			return -1;
		}
		SimpleSerializable ss = null;
		int start = 0;
		while (bytes.length > start + PIPE_KEY_LENGTH) { // should be bigger than 48 ( 32 + 6 + 1 + 8 + 1)
			int end = start + PIPE_KEY_LENGTH;
			if (PIPE_STATUS_DESTROYED == bytes[end]) {
				final String key = new String(bytes, start, PIPE_KEY_LENGTH);
				final SimplePipeRunnable pipe = SimplePipeHelper.getPipe(key);
				if (pipe != null) {
					if (key.equals(pipe.pipeKey)) {
						pipe.pipeAlive = false;
						//pipe.pipeClosed();
						SWTHelper.syncExec(Display.getDefault(), new Runnable() {
							public void run() {
								pipe.pipeClosed();
								//SimplePipeHelper.removePipe(key);
							}
						});
					}
					SimplePipeHelper.removePipe(key);
				}
				return end + 1;
			}
			if (PIPE_STATUS_OK == bytes[end]) {
				String key = new String(bytes, start, PIPE_KEY_LENGTH);
				SimplePipeRunnable runnable = SimplePipeHelper.getPipe(key);
				if (runnable != null) { // should always satisfy this condition
					runnable.lastPipeDataReceived = System.currentTimeMillis();
				}
				start = end + 1;
				if (start == bytes.length) {
					return start;
				}
				continue;
			}
			ss = SimpleSerializable.parseInstance(bytes, end);
			if (ss == null) {
				break;
			}
			if (ss == SimpleSerializable.ERROR) {
				return -1; // error
			}
			if (!ss.deserializeBytes(bytes, end)) {
				break;
			}
			String key = new String(bytes, start, PIPE_KEY_LENGTH);
			final SimplePipeRunnable runnable = SimplePipeHelper.getPipe(key);
			if (runnable != null) { // should always satisfy this condition
				runnable.lastPipeDataReceived = System.currentTimeMillis();
				if (ss != SimpleSerializable.UNKNOWN) {
					if (ss instanceof SimplePipeSequence) {
						long sequence = ((SimplePipeSequence) ss).sequence;
						if (sequence > runnable.pipeSequence) {
							runnable.pipeSequence = sequence;
						}
					} else {
						//runnable.deal(ss);
						final SimpleSerializable instance = ss;
						SWTHelper.syncExec(Display.getDefault(), new Runnable() {
							public void run() {
								runnable.deal(instance);
							}
						});
					}
				}
			}
			
			start = restBytesIndex(bytes, start);
		}
		if (start != 0) {
			return start;
		}
		return 0;
    }
    
}
