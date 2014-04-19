package net.sf.j2s.ajax;

import java.util.concurrent.AbstractExecutorService;
import java.util.concurrent.SynchronousQueue;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public class SimpleThreadHelper {

	private static class NamedThreadFactory implements ThreadFactory {
	    final ThreadGroup group;
	    final AtomicInteger threadNumber = new AtomicInteger(1);
	    final String namePrefix;

	    public NamedThreadFactory(String prefix) {
	        SecurityManager s = System.getSecurityManager();
	        group = (s != null)? s.getThreadGroup() :
	                             Thread.currentThread().getThreadGroup();
	        namePrefix = prefix + "-";
	    }

	    public Thread newThread(Runnable r) {
	        Thread t = new Thread(group, r,
	                              namePrefix + threadNumber.getAndIncrement(),
	                              0);
	        t.setDaemon(true);
	        if (t.getPriority() != Thread.NORM_PRIORITY)
	            t.setPriority(Thread.NORM_PRIORITY);
	        return t;
	    }

	}
	
	private static AbstractExecutorService poolExecutor;

	private static boolean poolInitialized = false;
	
	public static void initializePool() {
		if (poolInitialized) {
			return;
		}
		poolInitialized = true;
		
		poolExecutor = new ThreadPoolExecutor(SimpleThreadConfig.simpleCoreThreads,
				SimpleThreadConfig.simpleMaxThreads <= 0 ? Integer.MAX_VALUE : SimpleThreadConfig.simpleMaxThreads,
				SimpleThreadConfig.simpleThreadIdleSeconds, TimeUnit.SECONDS,
				new SynchronousQueue<Runnable>(),
				new NamedThreadFactory("Simple Worker"));
	}
	
	public static void runTask(Runnable r, String name) {
		if (poolExecutor != null) {
			try {
				poolExecutor.execute(r);
				return;
			} catch (Throwable e) {
				e.printStackTrace();
			}
		}
		Thread thread = new Thread(r, name);
		thread.start();
	}

}
