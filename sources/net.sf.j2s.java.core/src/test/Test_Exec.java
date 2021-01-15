package test;

import java.awt.Font;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ScheduledExecutorService;

import javax.swing.JFrame;

import javajs.async.SwingJSUtils.StateHelper;
import javajs.async.SwingJSUtils.StateMachine;

public class Test_Exec implements StateMachine {

	
	StateHelper helper;
	ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
	static Set<Integer> pending = new HashSet<>();
	int N = 10, j = 0;

	public static void main(String[] args) {
		new Test_Exec();
	}

	Test_Exec() {
		JFrame f = new JFrame();
		f.setSize(100,100);
		f.setVisible(true);
		helper = new StateHelper(this);
		helper.next(0);
	}

	@Override
	public boolean stateLoop() {
		while (helper.isAlive()) {
			switch (helper.getState()) {
			case 0:
				helper.setState(1);
				for (int j = 0; j < N; j++) {
					int i = j;
					pending.add(i);
					System.out.println(pending.size());
					executor.submit(() -> {
						pending.remove(i);
						System.out.println(pending.size());
						if (pending.size() == 0) {
							helper.next(2);
						}
						return;
					});
				}
				return false;
			case 2:
				System.out.println(pending);
				System.out.println("Test_Exec OK");
				return false;
			}
		}
		return false;
	}
}
