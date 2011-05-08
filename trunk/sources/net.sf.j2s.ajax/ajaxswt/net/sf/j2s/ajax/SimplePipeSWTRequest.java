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
import java.io.IOException;

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
			(new Thread("Simple Pipe RPC Request") {
				public void run() {
					try {
						runnable.ajaxRun();
					} catch (RuntimeException e) {
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
			}).start();

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
		Thread thread = new Thread("Pipe Live Notifier Thread") {
			
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
						if (r != null) {
							HttpRequest request = getRequest();
							String pipeKey = runnable.pipeKey;
							String pipeMethod = runnable.getPipeMethod();
							String pipeURL = runnable.getPipeURL();

							String pipeRequestData = constructRequest(pipeKey, PIPE_TYPE_NOTIFY);
							sendRequest(request, pipeMethod, pipeURL, pipeRequestData, false);
							String response = request.getResponseText();
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
							}
						} else {
							break;
						}
					}
				} while (true);
			}
		
		};
		thread.setDaemon(true);
		thread.start();
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
		request.open(method, url, true);
		request.registerOnReadyStateChange(new XHRCallbackSWTAdapter() {
			public void swtOnLoaded() {
				String responseText = request.getResponseText();
				if (responseText == null || responseText.length() == 0) {
					runnable.ajaxFail(); // should seldom fail!
					return;
				}
				runnable.deserialize(responseText);
				runnable.ajaxOut();
				
				SimplePipeHelper.registerPipe(runnable.pipeKey, runnable);

				if (getPipeMode() == MODE_PIPE_CONTINUUM) {
					(new Thread(){
						public void run() {
							swtPipeContinuum(runnable);
						}
					}).start();
				} else {
					final String key = runnable.pipeKey;
					(new Thread("Pipe Monitor Thread") {
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
					}).start();
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
						String destroyedKey = PIPE_STATUS_DESTROYED;
						if (retStr.indexOf(destroyedKey) == 0) {
							int beginIndex = destroyedKey.length() + 1;
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

		String pipeRequestData = constructRequest(pipeKey, PIPE_TYPE_QUERY);
		sendRequest(pipeRequest, pipeMethod, pipeURL, pipeRequestData, false);
	}
	
    @J2SIgnore
	static void swtPipeContinuum(final SimplePipeRunnable runnable) {
		HttpRequest pipeRequest = getRequestWithMonitor(new HttpRequest.IXHRReceiving() {
			public boolean receiving(ByteArrayOutputStream baos, byte b[], int off, int len) {
				baos.write(b, off, len);
				/*
				 * It is OK to convert to string as SimpleSerialize's
				 * serialized string contains only ASCII chars.
				 */
				String string = baos.toString();
				String resetString = swtParseReceived(string);
				if (resetString != null) {
					String destroyedKey = PIPE_STATUS_DESTROYED;
					if (resetString.indexOf(destroyedKey) == 0) {
						int beginIndex = destroyedKey.length() + 1;
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
				}
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

		String pipeRequestData = constructRequest(pipeKey, PIPE_TYPE_CONTINUUM);
		sendRequest(pipeRequest, pipeMethod, pipeURL, pipeRequestData, true);
	}
	
    @J2SIgnore
	static String swtParseReceived(String string) {
		SimpleSerializable ss = null;
		int start = 0;
		while (string.length() > start + PIPE_KEY_LENGTH) { // should be bigger than 48 ( 32 + 6 + 1 + 8 + 1)
			String destroyedKey = PIPE_STATUS_DESTROYED;
			int end = start + PIPE_KEY_LENGTH;
			if (PIPE_STATUS_DESTROYED.equals(string.substring(end, 
					end + destroyedKey.length()))) {
				return destroyedKey + ":" + string.substring(start, end) 
						+ ":" + string.substring(end + destroyedKey.length());
			}
			String okKey = PIPE_STATUS_OK;
			end = start + PIPE_KEY_LENGTH;
			if (okKey.equals(string.substring(end, end + okKey.length()))) {
				String key = string.substring(start, end);
				SimplePipeRunnable runnable = SimplePipeHelper.getPipe(key);
				if (runnable != null) { // should always satisfy this condition
					runnable.lastPipeDataReceived = System.currentTimeMillis();
				}
				start = end + okKey.length();
				if (start == string.length()) {
					return string.substring(start);
				}
			}
			if ((ss = SimpleSerializable.parseInstance(string, end)) == null
					|| !ss.deserialize(string, end)) {
				break;
			}
			String key = string.substring(start, end);
			final SimplePipeRunnable runnable = SimplePipeHelper.getPipe(key);
			if (runnable != null) { // should be always fulfill this condition
				//runnable.deal(ss);
				final SimpleSerializable instance = ss;
				SWTHelper.syncExec(Display.getDefault(), new Runnable() {
					public void run() {
						runnable.deal(instance);
					}
				});
			}
			
			start = restStringIndex(string, start);
		}
		if (start != 0) {
			return string.substring(start);
		}
		return string;
	}

}
