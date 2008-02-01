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
import net.sf.j2s.ajax.XHRCallbackAdapter;
import net.sf.j2s.ajax.XHRCallbackSWTAdapter;

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
					Display disp = Display.getDefault();
					if (disp != null) {
						disp.syncExec(new Runnable() {
							public void run() {
								for (int i = 0; i < objs.length; i++) {
									pipe.deal(objs[i]);
								}
							}
						});
					} else {
						for (int i = 0; i < objs.length; i++) {
							pipe.deal(objs[i]);
						}
					}
				}
			
			});
			new Thread(new Runnable(){
				public void run() {
					try {
						runnable.ajaxRun();
					} catch (RuntimeException e) {
						e.printStackTrace(); // should never fail in Java thread mode!
						Display disp = Display.getDefault();
						if (disp != null) {
							disp.syncExec(new Runnable() {
								public void run() {
									runnable.ajaxFail();
								}
							});
						} // else ?
						return;
					}
					Display disp = Display.getDefault();
					if (disp != null) {
						swtKeepPipeLive(runnable, disp);
						disp.syncExec(new Runnable() {
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
	 * 
	 * @j2sIgnore
	 */
	static void swtKeepPipeLive(final SimplePipeRunnable runnable, final Display disp) {
		new Thread(new Runnable() {
			
			public void run() {
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
						} else {
							// runnable.pipeClosed(); //?
							if (!disp.isDisposed()) {
								disp.syncExec(new Runnable() {
									public void run() {
										runnable.pipeClosed(); //?
									}
								});
							}
							break;
						}
					} else {
						SimplePipeRunnable r = SimplePipeHelper.getPipe(runnable.pipeKey);
						if (r != null) {
							HttpRequest request = new HttpRequest();
							String pipeKey = runnable.pipeKey;
							String pipeMethod = runnable.getPipeMethod();
							String pipeURL = runnable.getPipeURL();

							String pipeRequestData = constructRequest(pipeKey, PIPE_TYPE_NOTIFY, false);
							sendRequest(request, pipeMethod, pipeURL, pipeRequestData, false);
							String response = request.getResponseText();
							if (response != null && response.indexOf(PIPE_STATUS_LOST) != -1) {
								//runnable.pipeLost();
								if (!disp.isDisposed()) {
									disp.syncExec(new Runnable() {
										public void run() {
											runnable.pipeLost();
										}
									});
								}
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
		
		}, "Pipe Live Notifier Thread").start();
	}

	/**
	 * 
	 * @param runnable
	 * 
	 * @j2sIgnore
	 */
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
		final HttpRequest request = new HttpRequest();
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
					new Thread(new Runnable(){
						public void run() {
							swtPipeContinuum(runnable);
						}
					}).start();
				} else {
					final String key = runnable.pipeKey;
					new Thread(new Runnable() {
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
					}, "Pipe Monitor Thread").start();
				}

			}
		});
		request.send(serialize);
	}

	/**
	 * 
	 * @param runnable
	 * @j2sIgnore
	 */
	static void swtPipeQuery(SimplePipeRunnable runnable) {
		final HttpRequest pipeRequest = new HttpRequest();
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
							String pipeKeyStr = retStr.substring(beginIndex, beginIndex + 32);
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

		String pipeRequestData = constructRequest(pipeKey, PIPE_TYPE_QUERY, false);
		sendRequest(pipeRequest, pipeMethod, pipeURL, pipeRequestData, false);
	}
	
	/**
	 * 
	 * @param runnable
	 * @j2sIgnore
	 */
	static void swtPipeContinuum(final SimplePipeRunnable runnable) {
		HttpRequest pipeRequest = new HttpRequest() {
			
			@Override
			protected IXHRReceiving initializeReceivingMonitor() {
				return new HttpRequest.IXHRReceiving() {
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
								String pipeKeyStr = resetString.substring(beginIndex, beginIndex + 32);
								SimplePipeRunnable pipe = SimplePipeHelper.getPipe(pipeKeyStr);
								if (pipe != null) {
									pipe.pipeClosed();
									SimplePipeHelper.removePipe(pipeKeyStr);
								}
								resetString = resetString.substring(beginIndex + 32 + 1);
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
				
				};
			}
		
		};
		
		pipeRequest.registerOnReadyStateChange(new XHRCallbackAdapter() {
		
			@Override
			public void onReceiving() {
				keepPipeLive(runnable);
			}
		
		});
		
		String pipeKey = runnable.pipeKey;
		String pipeMethod = runnable.getPipeMethod();
		String pipeURL = runnable.getPipeURL();

		String pipeRequestData = constructRequest(pipeKey, PIPE_TYPE_CONTINUUM, false);
		sendRequest(pipeRequest, pipeMethod, pipeURL, pipeRequestData, true);
	}
	
	/**
	 * 
	 * @param string
	 * @return
	 * 
	 * @j2sIgnore
	 */
	static String swtParseReceived(String string) {
		SimpleSerializable ss = null;
		int start = 0;
		while (string.length() > start + 32) { // should be bigger than 48 ( 32 + 6 + 1 + 8 + 1)
			String destroyedKey = PIPE_STATUS_DESTROYED;
			if (PIPE_STATUS_DESTROYED.equals(string.substring(start + 32, 
					start + 32 + destroyedKey.length()))) {
				/**
				 * @j2sNative
				 * var key = string.substring(start, start + 32);
				 * net.sf.j2s.ajax.SimplePipeHelper.removePipe(key);
				 */ {}
				return destroyedKey + ":" + string.substring(start, start + 32) + ":" + string.substring(start + 32 + destroyedKey.length());
			}
			if ((ss = SimpleSerializable.parseInstance(string, start + 32)) == null
					|| !ss.deserialize(string, start + 32)) {
				break;
			}
			String key = string.substring(start, start + 32);
			final SimplePipeRunnable runnable = SimplePipeHelper.getPipe(key);
			if (runnable != null) { // should be always fulfill this condition
				//runnable.deal(ss);
				Display disp = Display.getDefault();
				if (disp != null) {
					final SimpleSerializable instance = ss;
					disp.syncExec(new Runnable() {
						public void run() {
							runnable.deal(instance);
						}
					});
				} // else ?
			}
			
			start = restStringIndex(string, start);
		}
		if (start != 0) {
			return string.substring(start);
		}
		return string;
	}

}
