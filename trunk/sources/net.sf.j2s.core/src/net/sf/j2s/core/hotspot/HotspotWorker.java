package net.sf.j2s.core.hotspot;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.net.Socket;
import java.util.Date;
import java.util.Vector;

public class HotspotWorker implements Runnable {
    final static int BUF_SIZE = 2048;

    static final byte[] EOL = {(byte)'\r', (byte)'\n' };

    /* buffer to use for requests */
    byte[] buf;
    /* Socket to client we're handling */
    private Socket s;

    HotspotWorker() {
        buf = new byte[BUF_SIZE];
        s = null;
    }

    synchronized void setSocket(Socket s) {
        this.s = s;
        notify();
    }

    public synchronized void run() {
        while(true) {
            if (s == null) {
                /* nothing to do */
                try {
                    wait();
                } catch (InterruptedException e) {
                    /* should not happen */
                    continue;
                }
            }
            try {
                handleClient();
            } catch (Exception e) {
                e.printStackTrace();
            }
            /* go back in wait queue if there's fewer
             * than numHandler connections.
             */
            s = null;
            Vector pool = InnerHotspotServer.threads;
            synchronized (pool) {
                if (pool.size() >= 5) {
                    /* too many threads, exit this one */
                    return;
                } else {
                    pool.addElement(this);
                }
            }
        }
    }

    void handleClient() throws IOException {
        InputStream is = new BufferedInputStream(s.getInputStream());
        PrintStream ps = new PrintStream(s.getOutputStream());
        /* we will only block in read for this many milliseconds
         * before we fail with java.io.InterruptedIOException,
         * at which point we will abandon the connection.
         */
        s.setSoTimeout(5000);
        s.setTcpNoDelay(true);
        /* zero out the buffer from last time */
        for (int i = 0; i < BUF_SIZE; i++) {
            buf[i] = 0;
        }
        try {
            /* We only support HTTP GET/HEAD, and don't
             * support any fancy HTTP options,
             * so we're only interested really in
             * the first line.
             */
            int nread = 0, r = 0;

 outerloop:
            while (nread < BUF_SIZE) {
                r = is.read(buf, nread, BUF_SIZE - nread);
                if (r == -1) {
                    /* EOF */
                    return;
                }
                int i = nread;
                nread += r;
                for (; i < nread; i++) {
                    if (buf[i] == (byte)'\n' || buf[i] == (byte)'\r') {
                        /* read one line */
                        break outerloop;
                    }
                }
            }

            /* are we doing a GET or just a HEAD */
            boolean doingGet;
            /* beginning of file name */
            int index;
            if (buf[0] == (byte)'G' &&
                buf[1] == (byte)'E' &&
                buf[2] == (byte)'T' &&
                buf[3] == (byte)' ') {
                doingGet = true;
                index = 4;
            } else if (buf[0] == (byte)'H' &&
                       buf[1] == (byte)'E' &&
                       buf[2] == (byte)'A' &&
                       buf[3] == (byte)'D' &&
                       buf[4] == (byte)' ') {
                doingGet = false;
                index = 5;
            } else {
                /* we don't support this method */
                ps.print("HTTP/1.0 405 unsupported method type: ");
                ps.write(buf, 0, 5);
                ps.write(EOL);
                ps.flush();
                s.close();
                return;
            }

            int i = 0;
            for (i = index; i < nread; i++) {
                if (buf[i] == (byte)' ') {
                    break;
                }
            }
            String fname = new String(buf, 0, index, i-index);
            if (fname.startsWith("/") || fname.startsWith("\\")) {
                fname = fname.substring(1);
            }
            int idx = fname.indexOf('.');
            if (idx != -1) {
            	fname = fname.substring(0, idx);
            }
            idx = fname.indexOf('?');
            if (idx != -1) {
                fname = fname.substring(idx + 1);
            }
            long sessionID = -1;
            try {
				sessionID = Long.parseLong(fname);
			} catch (NumberFormatException e) {
			}
            ps.print("HTTP/1.0 200 OK");
            ps.write(EOL);
            ps.print("Server: Java2Script Hotspot Sever");
            ps.write(EOL);
            ps.print("Date: " + (new Date()));
            ps.write(EOL);
            ps.print("Last Modified: " + (new Date()));
            ps.write(EOL);
            ps.print("Content-type: text/javascript");
            ps.write(EOL);
            ps.print("Pragma: no-cache");
            ps.write(EOL);
            ps.print("Cache-Control: no-cache");
            ps.write(EOL);
            if (doingGet) {
            	sendLatestHotspot(sessionID, ps);
            }
        } finally {
            s.close();
        }
    }

    void sendLatestHotspot(long session, PrintStream ps) throws IOException {
        ps.write(EOL);
        StringBuffer strBuf = new StringBuffer();
        strBuf.append("ClazzLoader.updateHotspot (");
//        long time = new Date().getTime();
//        while (new Date().getTime() - time < 5000) {
	        String hotspotJS = InnerHotspotServer.getHotspotJavaScript(session);
	        if (hotspotJS.length() != 0) {
	        	strBuf.append("\r\n");
	        	strBuf.append(hotspotJS);
//	        	break;
//	        } else {
//	        	Thread thread = new Thread(new Runnable() {
//					public void run() {
//						try {
//							Thread.sleep(250);
//						} catch (InterruptedException e) {
//							e.printStackTrace();
//						}
//					}
//				});
//	        	thread.start();
//	        	try {
//					thread.join();
//				} catch (InterruptedException e) {
//					e.printStackTrace();
//				}
	        }
//        }
        strBuf.append("null);");
        ps.write(strBuf.toString().getBytes("utf-8"));
    }

 }

