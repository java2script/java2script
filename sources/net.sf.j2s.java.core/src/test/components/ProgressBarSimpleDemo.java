package test.components;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.function.Function;

import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JProgressBar;
import javajs.async.SwingJSUtils.StateHelper;
import javajs.async.SwingJSUtils.StateMachine;

/**
 * Asynchronous SwingJS version for Java or JavaScript
 * 
 * @author hansonr
 *
 */
public class ProgressBarSimpleDemo {

	private int min = 0;
	private int max = 10;
	private int count = 0;

	private final JProgressBar progressBar;

	private final State state;
	protected long delaySynchronous = 1000;
	private JCheckBox jcb;

	ProgressBarSimpleDemo(int min, int max, boolean asynchronous) {

		this.min = min;
		this.max = max;

		state = (asynchronous ? new State() : null);

		progressBar = new JProgressBar(min, max);
		progressBar.setString("Not running");
		progressBar.setStringPainted(true);
		progressBar.setBackground(Color.red);
		progressBar.setForeground(Color.yellow);

		JFrame frame = new JFrame("Progress Bar with Thread");
		frame.setLayout(new BorderLayout());

		JPanel panel = new JPanel();
		panel.setLayout(new FlowLayout());

		JLabel label = new JLabel("Progress Bar Test");

		JButton button = new JButton();
		button.setText("Count");
		button.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				count();
			}
		});

		panel.add(label);
		panel.add(button);

		jcb = new JCheckBox("indet");
		panel.add(jcb);
		
		JPanel sliderPanel = new JPanel();
		sliderPanel.setBackground(Color.GREEN);
		sliderPanel.setSize(300, 50);
		sliderPanel.add(progressBar);

		frame.setSize(300, 300);
		frame.add(panel, BorderLayout.NORTH);
		frame.add(sliderPanel, BorderLayout.SOUTH);
		frame.setLocationRelativeTo(null);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setVisible(true);
	}

	void count() {
		count = 0;
		progressBar.setIndeterminate(jcb.isSelected());
		progressBar.setString("Running");
		System.out.println("\nCounting");
		longJob();
		progressBar.setValue(count);
	}

	public boolean persists() {
		return state.persists;
	}

	public void setPersists(boolean persists) {
		state.persists = persists;
	}

	public int getDelayMillis() {
		return state.delayMillis;
	}

	public void setDelayMillis(int delayMillis) {
		state.delayMillis = delayMillis;
	}

	public Function<Integer, Void> getOnExit() {
		return state.onExit;
	}

	public void setOnExit(Function<Integer, Void> onExit) {
		state.onExit = onExit;
	}

	public int getState() {
		return state.helper.getState();
	}

	public void setState(int newState) {
		state.helper.setState(newState);
	}

	public int getNextState() {
		return state.helper.getNextState();
	}

	public void setNextState(int newState) {
		state.helper.setNextState(newState);
	}

	public void delayedState(int nextState, int startDelayMillis) {
		state.helper.delayedState(startDelayMillis, nextState);
	}

	public void done() {
		state.helper.setState(State.STATE_DONE);
	}

	public void kill() {
		state.helper.setState(State.STATE_INTERRUPTED);
		state.helper.interrupt();
	}

	private class State implements StateMachine {

		public final static int STATE_INTERRUPTED = -99;
		public final static int STATE_IDLE = -1;
		public final static int STATE_INIT = 0;
		public final static int STATE_PROGRESSING = 1;
		public final static int STATE_DONE = 99;

		final private StateHelper helper;

		protected int delayMillis = 1000;
		protected Function<Integer, Void> onExit;

		/**
		 * set true to allow restarts, false to close upon completion
		 */
		protected boolean persists = false;

		State() {
			helper = new StateHelper(this);
			helper.setState(STATE_IDLE);
		}

		protected void start() {
			switch (helper.getState()) {
			case STATE_IDLE:
			case STATE_DONE:
			case STATE_INTERRUPTED:
				helper.restart();
				helper.next(STATE_INIT);
				break;
			default:
				helper.setNextState(STATE_INIT);
				break;
			}
		}

		@Override
		public boolean stateLoop() {

			out: while (helper.isAlive()) {
				switch (helper.getState()) {
				case STATE_INTERRUPTED:
					break out;
				case STATE_IDLE:
					helper.delayedState(delayMillis, StateHelper.UNCHANGED);
					return true;
				case STATE_INIT:
					helper.setState(STATE_PROGRESSING);
					helper.delayedState(delayMillis, StateHelper.UNCHANGED);
					return true;
				case STATE_PROGRESSING:
					if (!isDone()) {
						onProgress();
						helper.delayedState(delayMillis, StateHelper.UNCHANGED);
					} else {
						helper.next(persists ? STATE_IDLE : STATE_DONE);
					}
					return true;
				case STATE_DONE:
					onDone();
					break out;
				}
			}
			if (onExit != null) {
				onExit.apply(helper.getState());
			}
			return false;
		}

	}

	Runnable counting = new Runnable() {
		@Override
		public void run() {
			while (!isDone()) { // doing long job
				try {
					Thread.sleep(delaySynchronous);
				} // sleep one second
				catch (InterruptedException ie) {
					System.err.println("Thread interrupted.");
				}
				onProgress();
			}
			onDone();
		} // end of run
	};

	public void longJob() {
		System.out.println("Start long job.");
		if (state != null) {
			state.start();
		} else {
			new Thread(counting).start();
		}
	}

	protected boolean isDone() {
		return (count >= max);
	}

	protected void onIdle() {
		progressBar.setValue(min);
	}

	protected void onProgress() {
		progressBar.setValue((int) (Math.random() * max));
	}

	protected void onDone() {
		progressBar.setValue(count);
		System.out.println("Done long job.\n");
		progressBar.setString("Done");
	}

	public static void main(String[] args) {
		new ProgressBarSimpleDemo(0, 10, true);
	}

}
