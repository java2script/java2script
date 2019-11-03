package net.sf.j2s.ajax;

import java.util.concurrent.ThreadPoolExecutor;


public class SimpleThreadHelper {

	static ThreadPoolExecutor poolExecutor;
	
	public static ThreadPoolExecutor getPoolExecutor() {
		return poolExecutor;
	}

	public static void setPoolExecutor(ThreadPoolExecutor poolExecutor) {
		SimpleThreadHelper.poolExecutor = poolExecutor;
	}

	public static void runTask(Runnable r, String name) {
		ThreadPoolExecutor executor = poolExecutor;
		if (executor != null) {
			try {
				executor.execute(r);
				return;
			} catch (Throwable e) {
				e.printStackTrace();
			}
		}
		Thread thread = new Thread(r, name);
		thread.setDaemon(true);
		thread.start();
	}

}
