package net.sf.j2s.ajax;

import java.util.LinkedList;
import java.util.Queue;

public class ChainedRunnable implements Runnable {

	private Runnable task;
	
	private ChainedRunnable next;
	
	private Object owner;

	private volatile boolean done;
	
	public ChainedRunnable(Object owner, Runnable task) {
		super();
		this.owner = owner;
		this.task = task;
		done = false;
	}
	
	public void runTask() {
		if (task != null) {
			task.run();
		}
	}
	
	public void run() {
		runTask();
		// May run into stack overflow!
		//if (next != null) {
		//	next.run();
		//}
		ChainedRunnable n = next;
		Queue<ChainedRunnable> queue = new LinkedList<ChainedRunnable>(); 
		while (n != null) {
			queue.add(n);
			n.runTask();
			n = n.next;
		}
		// mark task done one by one
		while (!queue.isEmpty()) {
			ChainedRunnable r = queue.poll();
			if (r != null) r.done = true;
		}
		done = true;
	}
	
	public boolean isDone() {
		return done;
	}

	public ChainedRunnable getNext() {
		return next;
	}
	
	public Runnable getTask() {
		return task;
	}

	public void addNext(ChainedRunnable task) {
		ChainedRunnable oThis = this;
		do {
			if (oThis.next == null) {
				oThis.next = task;
				return;
			} else {
				oThis = oThis.next;
			}
		} while (true);
	}

	public Object getOwner() {
		return owner;
	}
	
}
