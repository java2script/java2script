package test;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.util.Timer;
import java.util.TimerTask;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.SwingUtilities;

public class Test_Future2 extends JFrame {

	private JButton b1, b2;
	
	public Test_Future2() {
		setLocation(400,200);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		b1 = new JButton("fixed");
		b1.setPreferredSize(new Dimension(120,40));
		b1.addActionListener((ActionEvent e) -> {
			btnAction(b1,true);
		});
		b1.setName("b1");
		add(b1, BorderLayout.NORTH);
		b2 = new JButton("delay");
		b2.setPreferredSize(new Dimension(120,40));
		b2.addActionListener((ActionEvent e) -> {
			btnAction(b2,false);
		});
		add(b2, BorderLayout.SOUTH);
		b2.setName("b2");
		pack();
		setVisible(true);
	}

	Timer timer = new Timer("test_future");

	Color lastColor, lastColor1, lastColor2;

	int nFlash = Integer.MAX_VALUE;
	long t0 = 0;

	private void btnAction(JButton button, boolean isFixed) {
		System.out.println("button pressed");
		if (nFlash < 20 && (button == b1 ? lastColor1 : lastColor2) != null)
			return;
		nFlash = 0;
		t0 = 0;
		Runnable r = new Runnable() {

			@Override
			public void run() {
				if (t0 == 0)
					t0 = System.currentTimeMillis();
				System.out.println(button.getName() + " " + nFlash + " " + ((System.currentTimeMillis() - t0) / 1000.));
				if (nFlash++ >= 20) {
					System.out.println("done");
					lastColor1 = lastColor2 = null;
					timer.cancel();
				} else {
					Color lc = (button == b1 ? lastColor1 : lastColor2);
					lc = (lc == Color.green ? Color.blue : Color.green);
					button.setForeground(lc);
					if (button == b1)
						lastColor1 = lc;
					else
						lastColor2 = lc;
				}
			}
			
		};
		
		if (isFixed)
			timer.scheduleAtFixedRate(newTask(r), 2000, 500);
		else
			timer.schedule(newTask(r), 2000, 500);
			
		timer.schedule(newTask(() -> {
			button.setBackground(lastColor = (lastColor == Color.gray ? Color.lightGray : Color.gray));
			System.out.println("task complete");
		}), 3000);

	}

	private TimerTask newTask(Runnable r) {
		return new TimerTask() {

			@Override
			public void run() {
				r.run();
			}
			
		};
	}

	String getValue() {
		return "Hello";
	}

	public static void main(String[] args) {
		SwingUtilities.invokeLater(Test_Future2::new);
	}
}
