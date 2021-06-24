package test;

import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.BoxLayout;
import javax.swing.JApplet;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JScrollBar;
import javax.swing.Timer;

public class TApp4 extends JApplet {
	JLabel label;
	//JSThread ZeitThread;

	public void init() {
//		setSize(500,500);
		((JComponent) getContentPane()).setOpaque(false);
//		((JComponent) getRootPane()).setOpaque(false);
		createGUI();
	}

	private void createGUI() {
		setLayout(new BoxLayout(getContentPane(), BoxLayout.Y_AXIS)); //new GridLayout(2, 1));
		label = new JLabel("You are successfully running a Swing applet!");
		label.setHorizontalAlignment(JLabel.CENTER);
		label.setBorder(BorderFactory.createMatteBorder(1, 1, 1, 1, Color.black));
		label.setAlignmentX(CENTER_ALIGNMENT);
		add(label);
		JScrollBar sb = new JScrollBar(JScrollBar.HORIZONTAL, 0, 1, 0, 10);
		sb.setBlockIncrement(1);
		sb.setUnitIncrement(3);
		sb.setAlignmentX(CENTER_ALIGNMENT);
		add(sb);
		setBackground(Color.green);
	}

	public void start() {
		label.setText("1");
		Timer t = new Timer(1000, new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				label.setText("" + (new Integer(label.getText()).intValue() + 1));
			}
		});
		t.setRepeats(true);
		t.start();
//		if (ZeitThread == null) {
//			label.setText("1");
//			ZeitThread = new JSThread() {
//
//				@Override
//				protected boolean myInit() {
//					// TODO Auto-generated method stub
//					return true;
//				}
//
//				@Override
//				protected boolean isLooping() {
//					return (ZeitThread != null);
//				}
//
//				@Override
//				protected boolean myLoop() {
//					label.setText("" + (new Integer(label.getText()).intValue() + 1));
//					return true;
//				}
//
//				@Override
//				protected void whenDone() {
//					// TODO Auto-generated method stub
//
//				}
//
//				@Override
//				protected int getDelayMillis() {
//					return 1000;
//				}
//
//				@Override
//				protected void onException(Exception e) {
//					// TODO Auto-generated method stub
//
//				}
//
//				@Override
//				protected void doFinally() {
//					// TODO Auto-generated method stub
//
//				}
//			};
//			ZeitThread.start();
//		}

	}
}
