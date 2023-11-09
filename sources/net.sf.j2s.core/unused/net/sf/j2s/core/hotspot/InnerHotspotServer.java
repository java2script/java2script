package net.sf.j2s.core.hotspot;

import java.io.*;
import java.net.*;
import java.util.*;

/**
 * Only send out *.js about current modified *.js.
 *
 */
public class InnerHotspotServer {

    /* Where worker threads stand idle */
    static Vector threads = new Vector();

    static Vector hotspotItems = new Vector();
    
    static long latestSessionID = 1;
    
    private static boolean serverStarted = false;
    
    private static int port = -1;

    private static InnerHotspotServer server = null;
    
    private ServerSocket ss;
    
    private InnerHotspotServer() {
    	// prevent ...
    }
    
    public static InnerHotspotServer getSingletonServer() {
    	if (server == null) {
    		server = new InnerHotspotServer();
    	}
    	return server;
    }
    
    public static boolean isServerStarted() {
    	return serverStarted;
    }
    
    public static int getHotspotPort() {
    	if (port == -1) {
    		return getSingletonServer().startServer();
    	}
    	return port;
    }
    
    public static void addCompiledItem(String name) {
    	if (!serverStarted) return; // no need to cached!
    	
    	Java2ScriptCompiledItem item = new Java2ScriptCompiledItem(new Date().getTime(), latestSessionID, name);
    	latestSessionID++;
    	synchronized (hotspotItems) {
    		List toRemoveList = new ArrayList();
    		long now = new Date().getTime();
    		for (Iterator iterator = hotspotItems.iterator(); iterator.hasNext();) {
    			Java2ScriptCompiledItem i = (Java2ScriptCompiledItem) iterator.next();
    			if (i.getTime() < now - 10000) { // 10 seconds delay!
    				toRemoveList.add(i);
    			}
    		}
    		if (toRemoveList.size() > 0) {
    			hotspotItems.removeAll(toRemoveList);
    		}
    		hotspotItems.add(item);
    	}
    }
    
    public static String getHotspotJavaScript(long session) {
    	StringBuffer buf = new StringBuffer();
    	long now = new Date().getTime();
    	synchronized (hotspotItems) {
    		for (Iterator iterator = hotspotItems.iterator(); iterator.hasNext();) {
    			Java2ScriptCompiledItem item = (Java2ScriptCompiledItem) iterator.next();
    			if ((session > 0 && item.getId() > session) 
    					|| (session <= 0 && item.getTime() >= now - 10000)) { // 10 seconds delay!
    				buf.append(item.getTime());
    				buf.append(", ");
    				buf.append(item.getId());
    				buf.append(", \"");
    				buf.append(item.getName());
    				buf.append("\",\r\n");
    			}
    		}
    	}
    	return buf.toString();
    }
    
    public synchronized int startServer() {
        if (!serverStarted) {
        	serverStarted = true;
        	
            try {
				port = tryToGetAPort();
			} catch (Exception e1) {
				e1.printStackTrace();
				return -1;
			}
            System.out.println("Listening on port " + port + " ...");
            
            new Thread(new Runnable() {
                public void run() {
                    try {
                        serverLoop();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }).start();
            return port;
        }
        return 0;
    }
    
    public synchronized void stopServer() {
    	try {
			ss.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
    	ss = null;
    	synchronized (threads) {
    		threads.clear();
		}
    	serverStarted = false;
    	synchronized (hotspotItems) {
    		hotspotItems.clear();
		}
    }
    
    private void serverLoop() throws Exception {
        
        threads.clear();
        /* start worker threads */
        for (int i = 0; i < 5; ++i) {
            HotspotWorker w = new HotspotWorker();
            (new Thread(w, "worker #" + i)).start();
            threads.addElement(w);
        }

        while (ss != null) {
            Socket s = null;
            try {
                s = ss.accept();
            } catch (IOException e) {
                //e.printStackTrace();
            }
            if (s == null) continue;
            HotspotWorker w = null;
            synchronized (threads) {
                if (threads.isEmpty()) {
                    HotspotWorker ws = new HotspotWorker();
                    ws.setSocket(s);
                    (new Thread(ws, "additional worker")).start();
                } else {
                    w = (HotspotWorker) threads.elementAt(0);
                    threads.removeElementAt(0);
                    w.setSocket(s);
                }
            }
        }
    }


	private int tryToGetAPort() throws Exception {
        int port = 1725;
		int maxTryTimes = 200;
        ArrayList failedPortList = new ArrayList();
        
        ss = null;
        int triedTimes = 0;
        while (triedTimes < maxTryTimes) {
            triedTimes ++;
	        try {
	            ss = new ServerSocket(port);
		        break;
	        } catch (IOException e) {
	            while (true) {
		            port = 1024 + Math.round((float) Math.random() * (65535 - 1024));
		            Integer integerPort = new Integer(port);
		            if (!failedPortList.contains(integerPort)) {
		                break;
		            }
	            }
	        }
        }
        if (triedTimes >= maxTryTimes) {
            throw new Exception("Failed to setup inner Java2Script hotspot HTTP Server!");
        }
        return port;
	}
}

