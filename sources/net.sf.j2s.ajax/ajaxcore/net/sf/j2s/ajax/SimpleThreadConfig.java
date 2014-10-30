package net.sf.j2s.ajax;

import java.util.Properties;

public class SimpleThreadConfig {
	/**
	 * Core thread number. Core threads will be kept in thread pool to
	 * make server more responsible.
	 */
	public static int simpleCoreThreads = 20;

	/**
	 * Max thread number. Server will allow this number of threads at the
	 * peak. Default number is 128. If set to -1, if there is no limit.
	 */
	public static int simpleMaxThreads = 128;

	/**
	 * Idle thread number. Server will keep this number of idle threads if
	 * possible. Default number is 10.
	 */
	public static int simpleIdleThreads = 10;

	/**
	 * If a thread is idle for given seconds, and thread number is greater
	 * than simpleMaxThreads, this thread will be recycled.
	 */
	public static long simpleThreadIdleSeconds = 60L;
	
	/**
	 * Allow threads to time out or not.
	 */
	public static boolean simpleThreadsTimeout = false;

	/**
	 * Queue task number. Server will keep this number of tasks waiting in
	 * Queue. Default is 100.
	 */
	public static int simpleQueueTasks = 100;

	public static void update(Properties props) {
		SimpleThreadHelper.updatePoolConfigurations();
	}
	
}
