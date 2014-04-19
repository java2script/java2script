package net.sf.j2s.ajax;

public class SimpleThreadConfig {
	/**
	 * Core thread number. Core threads will be kept in thread pool to
	 * make server more responsible.
	 */
	public static int simpleCoreThreads = 20;

	/**
	 * Max thread number. Server will allow this number of threads at the
	 * peak. Default to 128. If set to -1, if there is no limit.
	 */
	public static int simpleMaxThreads = 128;
	
	/**
	 * If a thread is idle for given seconds, and thread number is greater
	 * than simpleMaxThreads, this thread will be recycled.
	 */
	public static long simpleThreadIdleSeconds = 120L;

}
