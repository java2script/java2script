package test;

public class Test_Anything extends javax.swing.JFrame {

	
	public Test_Anything() {
		javax.swing.JPanel p = new javax.swing.JPanel();
		add(p);
		this.setLocation(300, 300);
		javax.swing.JButton b;
		
		b = new javax.swing.JButton("FilesOpenDialog");
		b.addActionListener(new java.awt.event.ActionListener() {

			@Override
			public void actionPerformed(java.awt.event.ActionEvent e) {
				javax.swing.JFileChooser fc = new javax.swing.JFileChooser();
				fc.setMultiSelectionEnabled(true);
				int f = fc.showOpenDialog(null);
				System.out.println(f);
				java.io.File[] files = fc.getSelectedFiles();
				for (int i = 0; i < files.length; i++) {
					System.out.println(files[i] + " " + files[i].length());
				}
			}

		});
		p.add(b);

		pack();
		setVisible(true);

	}

	public static void main(String[] args) {
		try {
			new Test_Anything();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}