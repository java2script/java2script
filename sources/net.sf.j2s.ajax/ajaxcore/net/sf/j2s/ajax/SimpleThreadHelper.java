package net.sf.j2s.ajax;

import java.util.concurrent.TimeUnit;

public class SimpleThreadHelper {

	private static SimpleThreadPoolExecutor poolExecutor;

	private static boolean poolInitialized = false;
	
	private static int lastCoreThreads = SimpleThreadConfig.simpleCoreThreads;
	private static int lastMaxThreads = SimpleThreadConfig.simpleMaxThreads;
	private static int lastIdleThreads = SimpleThreadConfig.simpleIdleThreads;
	private static int lastQueueTasks = SimpleThreadConfig.simpleQueueTasks;
	private static long lastIdleSeconds = SimpleThreadConfig.simpleThreadIdleSeconds;
	private static boolean lastTimeout = SimpleThreadConfig.simpleThreadsTimeout;

	public static void initializePool() {
		if (poolInitialized) {
			return;
		}
		synchronized (SimpleThreadHelper.class) {
			if (poolInitialized) {
				return;
			}
			lastCoreThreads = SimpleThreadConfig.simpleCoreThreads;
			lastMaxThreads = SimpleThreadConfig.simpleMaxThreads;
			lastIdleThreads = SimpleThreadConfig.simpleIdleThreads;
			lastQueueTasks = SimpleThreadConfig.simpleQueueTasks;
			lastIdleSeconds = SimpleThreadConfig.simpleThreadIdleSeconds;
			lastTimeout = SimpleThreadConfig.simpleThreadsTimeout;
			poolExecutor = new SimpleThreadPoolExecutor(lastCoreThreads,
					lastMaxThreads <= 0 ? Integer.MAX_VALUE : lastMaxThreads,
					lastIdleThreads <= 0 ? 0 : lastIdleThreads,
					lastIdleSeconds, TimeUnit.SECONDS,
					lastQueueTasks <= 0 ? 1 : lastQueueTasks,
					"Simple Worker");
			poolExecutor.allowCoreThreadTimeOut(lastTimeout);
			poolInitialized = true;
		}
	}
	
	public static void updatePoolConfigurations() {
		if (!poolInitialized || poolExecutor == null) {
			return;
		}
		int corePoolSize = SimpleThreadConfig.simpleCoreThreads;
		int maxPoolSize = SimpleThreadConfig.simpleMaxThreads;
		int idlePoolSize = SimpleThreadConfig.simpleIdleThreads;
		int maxQueueSize = SimpleThreadConfig.simpleQueueTasks;
		long keepAliveTime = SimpleThreadConfig.simpleThreadIdleSeconds;
		boolean timeout = SimpleThreadConfig.simpleThreadsTimeout;
		if (lastCoreThreads != corePoolSize) {
			poolExecutor.setCorePoolSize(corePoolSize);
		}
		if (lastMaxThreads != maxPoolSize) {
			poolExecutor.setMaximumPoolSize(maxPoolSize);
		}
		if (lastIdleThreads != idlePoolSize) {
			poolExecutor.setIdlePoolSize(idlePoolSize);
		}
		if (lastQueueTasks != maxQueueSize) {
			poolExecutor.setQueueSize(maxQueueSize);
		}
		if (lastIdleSeconds != keepAliveTime) {
			poolExecutor.setKeepAliveTime(keepAliveTime, TimeUnit.SECONDS);
		}
		if (lastTimeout != timeout) {
			poolExecutor.allowCoreThreadTimeOut(timeout);
		}
		lastCoreThreads = corePoolSize;
		lastMaxThreads = maxPoolSize;
		lastIdleThreads = idlePoolSize;
		lastQueueTasks = maxQueueSize;
		lastIdleSeconds = keepAliveTime;
		lastTimeout = timeout;
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
