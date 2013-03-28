package net.sf.j2s.ajax;

import java.util.concurrent.AbstractExecutorService;

import net.sf.j2s.annotation.J2SIgnore;

public class ThreadUtils {

	private static AbstractExecutorService aes;
	
	@J2SIgnore
	public static void setExecutorService(AbstractExecutorService s) {
		aes = s;
	}
	
	@J2SIgnore
	public static void runTask(Runnable r, String name, boolean daemon) {
		if (aes == null || daemon) {
			Thread thread = new Thread(r, name);
			thread.setDaemon(daemon);
			thread.start();
		} else {
			try {
				aes.execute(r);
			} catch (Exception e) {
				//e.printStackTrace();
				Thread thread = new Thread(r, name);
				thread.setDaemon(daemon);
				thread.start();
			}
		}
	}

	@J2SIgnore
	public static void runTask(Runnable r) {
		if (aes == null) {
			Thread thread = new Thread(r);
			thread.start();
		} else {
			try {
				aes.execute(r);
			} catch (Exception e) {
				//e.printStackTrace();
				Thread thread = new Thread(r);
				thread.start();
			}
		}
	}

}
