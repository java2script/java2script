package test;

import java.awt.Component;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.DefaultComboBoxModel;
import javax.swing.DefaultListCellRenderer;
import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JList;
import javax.swing.JPanel;

public class Test_Applet_Combo extends JApplet {

	String[] optionsNew = new String[] { "optionnew1", "optionnew2verylong" };
	String[] options = new String[] { "option1", "option2", "option3long" };
	JLabel[] labels = new JLabel[] { new JLabel("option1"), new JLabel("option2"), new JLabel("option3") };
	
	@Override
	public void init() {

		MouseAdapter ma = new MouseAdapter() {
			@Override
			public void mouseEntered(MouseEvent e) {
				System.out.println("mouse entered: " + ((JLabel)e.getSource()).getText());
			}
		};
//		for (int i = labels.length; --i >= 0;) {
//			labels[i].addMouseListener(ma);
//			labels[i].addMouseMotionListener(ma);
//		}
		JPanel p = new JPanel();
		JComboBox c1 = new JComboBox(options) {
			@Override
			public void addNotify() {
				System.out.println("addNotify");
				super.addNotify();
			}

		};
		c1.setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 24));
		c1.setRenderer(new DefaultListCellRenderer() { 

			@Override
			public Component getListCellRendererComponent(JList list, Object value, int index,
					boolean isSelected, boolean cellHasFocus) {
				System.out.println("Test_Applet_Combo getLCR for list " + value);
				list.setToolTipText(isSelected ? "Item " + index + " is " + value : "");
				return super.getListCellRendererComponent(list, value, index, isSelected, cellHasFocus);
			}
			
		});
		c1.setToolTipText("combo1");
		
		JComboBox c2 = new JComboBox(labels);
		System.out.println(c2.getItemAt(2).toString());
		c2.setPreferredSize(new Dimension(70,20));
		p.add(c1);
		p.add(c2);
		JButton b = new JButton("inc c1");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				c1.setSelectedIndex((c1.getSelectedIndex() + 1)%c1.getItemCount());
			}
			
		});
		p.add(b);
		b = new JButton("new model");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				newModel(c1);
			}
			
		});
		p.add(b);

		c2.addItemListener(new ItemListener() {

			@Override
			public void itemStateChanged(ItemEvent e) {
				System.out.println("Test_Applet_Combo c2 change " + e.getID() + " " + c2.getSelectedIndex());
			}
			
		});

		c1.addItemListener(new ItemListener() {

			@Override
			public void itemStateChanged(ItemEvent e) {
				System.out.println("Test_Applet_Combo c1 change " + e.getID() + " " + c1.getSelectedIndex());
			}
			
		});
		
		c1.setFont(c1.getFont());

		add(p);
	}

	int test = 0;
	protected void newModel(JComboBox cb) {		
		cb.setModel(new DefaultComboBoxModel((test = (1-test)) == 0 ? options: optionsNew));
	}


}
