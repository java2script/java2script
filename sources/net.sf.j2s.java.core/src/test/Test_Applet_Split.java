package test;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Frame;
import java.awt.Label;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.JApplet;
import javax.swing.JComboBox;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JSplitPane;
import javax.swing.border.EmptyBorder;
import javax.swing.border.LineBorder;

public class Test_Applet_Split extends JApplet {

	static {
		
		/**
		 * @j2sNative
		 * 
		 * 	thisApplet.__Info.width = 500;
		 *  thisApplet.__Info.height = 400;
		 *  thisApplet.__Info.isResizable = true;
		 */
	}

	private JScrollPane sp;

	@Override
	public void init() {
		add(newSplitPane());
		resize(500,400);		
	}

	private JPanel newSplitPane() {
		JPanel top = new JPanel();
		top.setBackground(Color.green);
		top.add(new Label("testing"));
		JPanel bottom = new JPanel();
		Label lblBottom = new Label("enabled");
		bottom.add(lblBottom);
		bottom.setBackground(Color.yellow);

		JSplitPane pleft = new JSplitPane(JSplitPane.VERTICAL_SPLIT, top, bottom);
		pleft.setDividerSize(3);

		JComboBox cb = new JComboBox();
		cb.addItem("test1");
		cb.addItem("test2");
		cb.addItem("test3");
		sp = new JScrollPane();
		sp.setBorder(new LineBorder(Color.GREEN,5));
		sp.setViewportBorder(new EmptyBorder(5,5,5,5));
		JPanel jp = new JPanel();
		jp.add(cb);
		jp.add(new Label("here"));
		sp.getViewport().add(jp);
		sp.getViewport().setBackground(Color.yellow);
		sp.setBackground(Color.red);
		JSplitPane p = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, pleft, sp);
		p.setSize(500, 400);
		//p.setDividerLocation(0.24);
		p.setDividerSize(3);
		p.addPropertyChangeListener(new PropertyChangeListener() {

			@Override
			public void propertyChange(PropertyChangeEvent evt) {
				switch (evt.getPropertyName()) {
				case "dividerLocation":
					pleft.setEnabled(false);
					lblBottom.setText("disabled");
					cb.setEnabled(false);
					if (p.getDividerLocation() > p.getWidth() * 0.75) {
						//p.setDividerLocation(0.75);
						p.setDividerLocation((int)(p.getWidth() * 0.45));
					}
					break;
				case "lastDividerLocation":
					break;
				}
			}
			
		});
		JPanel pp = new JPanel();
		pp.add(p);
		return pp;
	}
	
	public static void main(String[] args) {
		JPanel p = new Test_Applet_Split().newSplitPane();
		JFrame f = new JFrame();
		JDialog jd;
		int mode = 3;
		switch (mode) {
		case 0:
			f.add(p);
			f.pack();
			f.setVisible(true);
			break;
		case 1:
			jd = new JDialog((Frame) f, "test", true);
			jd.add(p);
			jd.setSize(new Dimension(600, 300));
			jd.setVisible(true);
			break;
		case 2:
			jd = new JDialog((Frame) null, true);
			jd.add(p);
			jd.setSize(new Dimension(600, 300));
			jd.setVisible(true);
			break;
		case 3:
			jd = new JDialog((Frame) null, true);
			jd.setContentPane(p);
			jd.setSize(new Dimension(600, 300));
			jd.pack();
			jd.setVisible(true);
		}
		
		
	}
}
