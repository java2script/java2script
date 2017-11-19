package com.polytopemedia.polyhedra.ui;

import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageOutputStream;
import javax.swing.JButton;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.border.TitledBorder;

import com.polytopemedia.PolyhedronApplet;
import com.polytopemedia.polyhedra.nets.NetBuilder;
import com.polytopemedia.polyhedra.ui.io.FileUtils;
import com.polytopemedia.polyhedra.ui.io.ImageFileFilter;
import com.polytopemedia.polyhedra.ui.io.PolyhedronFileFilter;


class ShareSavePanel extends JPanel implements KeyListener, ActionListener, FocusListener{ 

	private static final int FIELD_WIDTH = 30;
	private final BufferedImage image;
	private String encoded;
	private JTextField nameField;
	private JTextField urlField;
	private JTextArea htmlField;
	private final String name;

	ShareSavePanel(NetSource netSource, BufferedImage image, String name) {
		this.image = image;
		this.name = name;
		encoded = new NetBuilder().encode(netSource.getNet());
		this.setLayout(new BorderLayout());
		this.add(namePanel(),"North");
		if (FileUtils.canAccessFileSystem()) this.add(savePanel(),"Center");
		this.add(sharePanel(),"South");
		nameChanged();

	}

	private JPanel namePanel() {
		JPanel namePanel = new JPanel();
		namePanel.setBorder(new TitledBorder("Name your shape :"));
		nameField = new JTextField(40);
		namePanel.add(nameField);
		if (name != null) nameField.setText(name);
		nameField.addKeyListener(this);
		nameField.addActionListener(this);
		nameField.setActionCommand("nameChanged");
		return namePanel;
	}

	private JPanel savePanel() {
		JPanel save = new JPanel();	
		save.setBorder(new TitledBorder("Save"));
		save.setLayout(new GridLayout(1,2));
		save.add(saveButtonPanel());
		save.add(imagePanel());
		return save;
	}

	private JPanel imagePanel() {
		JPanel jp = new ImagePanel(image);
		Dimension size = new Dimension(240,240*image.getHeight()/image.getWidth());
		jp.setPreferredSize(size);
		jp.setMinimumSize(size);
		jp.setMinimumSize(size);
		return jp;
	}

	private JPanel saveButtonPanel() {
		JPanel rtn = new JPanel();
		rtn.setLayout(new GridLayout(2,1));
		addButtons(rtn,new String[] {"Polyhedron","Picture"}, new String[] {"Save your polyhedron", "Save the picture"});
		return rtn;
	}

	private void addButtons(JPanel jp, String[] texts, String[] toolTips) {
		JButton[] jbs = new JButton[texts.length];
		for (int i=0; i<texts.length; i++) {
			String text = texts[i];
			String toolTip = toolTips[i];
			JButton jb = new JButton(text);
			jb.setToolTipText(toolTip);
			jb.addActionListener(this);
			jb.setActionCommand(text);
			JPanel shell = new JPanel();
			shell.add(jb);
			jp.add(shell);
			jbs[i] = jb;
		}
		int maxWidth = -1;
		for (int i=0; i<jbs.length; i++) {
			maxWidth = (int) Math.max(maxWidth,jbs[i].getPreferredSize().getWidth());
		}
		for (int i=0; i<jbs.length; i++) {
			jbs[i].setPreferredSize(new Dimension(maxWidth,(int) jbs[i].getPreferredSize().getHeight()));
		}
	}

	private JPanel sharePanel() {
		JPanel share = new JPanel();
		share.setBorder(new TitledBorder("Share"));
		share.setLayout(new BorderLayout());
		share.add(urlPanel(),"Center");
		share.add(htmlPanel(),"South");
		return share;
	}

	private JPanel urlPanel() {
		JPanel urlPanel = new JPanel();
		urlPanel.setBorder(new TitledBorder("Copy this URL"));
		urlPanel.setToolTipText("Copy this URL and blog/tweet/email/facebook/etc it...");
		urlField = new JTextField(40);
		urlField.setEditable(false);
		urlField.addFocusListener(this);
		urlPanel.add(urlField);
		return urlPanel;
	}

	private JPanel htmlPanel() {
		JPanel htmlPanel = new JPanel();
		htmlPanel.setBorder(new TitledBorder("Copy this HTML"));
		htmlPanel.setToolTipText("Copy this URL and blog/tweet/email/facebook/etc it...");
		htmlField = new JTextArea(8, FIELD_WIDTH+10);
		htmlField.setEditable(false);
		//htmlField.setWrapStyleWord(true);
		htmlField.setLineWrap(true);
		htmlField.addFocusListener(this);
		htmlPanel.add(htmlField);
		return htmlPanel;
	}


	public void actionPerformed(ActionEvent e) {
		String cmd = e.getActionCommand();
		if (cmd.equalsIgnoreCase("nameChanged")) {
			nameChanged();
		} else if (cmd.equalsIgnoreCase("polyhedron")) {
			savePolyhedron();
		} else if (cmd.equalsIgnoreCase("picture")) {
			saveImage();
		}
	}

	private void savePolyhedron() {
		String name = nameField.getText(); // BH added
		if (name.length() == 0)
			name = "net";
		try {
			File file;
			if (PolyhedronApplet.isJS) {
				file = new File(name + ".txt");
			} else {
				PolyhedronFileFilter filter = new PolyhedronFileFilter();
				file = FileUtils.getFile(filter, null, true);
				if (file == null)
					return;
			}
			PrintWriter pw = new PrintWriter(file);
			pw.println("# Polyhedral net created at " + PolyhedronApplet.myURL);
			pw.println("# URL for this net is " + getURL());
			pw.println(encoded);
			pw.println(name);
			pw.close();
		} catch (FileNotFoundException e) {
			showIOError(e);
		}
	}

	private void saveImage() {
		String name = nameField.getText(); // BH added
		if (name.length() == 0)
			name = "net";
		try {
			File file;
			if (PolyhedronApplet.isJS) {
				file = new File(name + ".png");
			} else {
				ImageFileFilter filter = new ImageFileFilter();
				file = FileUtils.getFile(filter, null, true);
				if (file == null)
					return;
			}
			String type = file.getAbsolutePath().substring(file.getAbsolutePath().lastIndexOf('.') + 1);
			ImageIO.write(image, type, file);			
		} catch (IOException e) {
			showIOError(e);
		}
	}

	private void showIOError(IOException e) {
		JOptionPane.showMessageDialog(this, "I couldn't save your file!", "Error!", JOptionPane.ERROR_MESSAGE);
	}

	public void keyTyped(KeyEvent e) {
		nameChanged();
	}

	public void keyPressed(KeyEvent e) {
		nameChanged();
	}

	public void keyReleased(KeyEvent e) {
		nameChanged();
	}

	private void nameChanged() {
		String url = getURL();
		urlField.setText(url);
		String name = nameField.getText();
		if (name.length() == 0) {
			name = "Polyhedral Net";
		}
		String html = "Hi! Check out the <a href=\""+url+"\">"+name+"</a> I made at <a href=\"http://www.dr-mikes-math-games-for-kids.com\">Dr Mike's Math Games for Kids!</a>";
		htmlField.setText(html);
	}

	private String getURL() {
		String name = nameField.getText();
		String urlName = java.net.URLEncoder.encode(name);
		String url = PolyhedronApplet.myURL; // BH allowing for other parameters
		url += (url.indexOf("?") >= 0 ? "&" : "?") + "net="+encoded;
		if (name.length() > 0) {
			url += "&name="+urlName;
		}
		url += "#applet";
		return url;
	}

	public void focusGained(FocusEvent e) {
		Component component = e.getComponent();
		if (component == urlField) {
			urlField.setSelectionStart(0);
			urlField.setSelectionEnd(urlField.getText().length());
		} else if (component == htmlField) {
			htmlField.setSelectionStart(0);
			htmlField.setSelectionEnd(htmlField.getText().length());
		}
	}

	public void focusLost(FocusEvent e) {
		Component component = e.getComponent();
		if (component == e.getOppositeComponent()) return;
		if (component == urlField) {
			urlField.setSelectionStart(0);
			urlField.setSelectionEnd(0);
		} else if (component == htmlField) {
			htmlField.setSelectionStart(0);
			htmlField.setSelectionEnd(0);
		}
	}
//	
//	public static void main(String[] args) throws IOException {
//		BufferedImage bi = new BufferedImage(300, 300, BufferedImage.TYPE_INT_RGB);
//		Graphics gr = bi.getGraphics();
//		for (int a=0; a<60; a++) {
//			for (int b=0; b<60; b++) {
//				int prime = decide(a,59-b);
//				if (b == 0) System.out.println(59-a+" : "+prime);
//				Color[] cc = {Color.black, Color.yellow, Color.blue, Color.green, Color.blue, Color.white};
//				gr.setColor(cc[prime]);
//				gr.fillRect(a*5, b*5, 5,5);
//			}
//		}
//		ImageIO.write(bi, "png", new File("/home/hartleym/Desktop/primes2.png"));
//	}
//
//	private static int decide(int a, int b) {
//		if (a == 0 && b == 0) {
//			return 0;
//		}
//		if (a == 1 && b == 0) {
//			return 1;
//		}
//		boolean pp = isSpecialPrime(a,b);
//		if (b == 0 && isPrime(a)) {
//			if (pp) return 2;
//			return 3;
//		}
//		if (pp) return 4;
//		return 5;
//	}
//
//	private static boolean isPrime(int b) {
//		if (b == 0 || b == 1) return false;
//		if (b == 2 || b == 3 || b == 5 || b == 7) return true;
//		if (b % 2 == 0 || b % 3 == 0  || b % 5 == 0  || b % 7 == 0 ) return false;
//		return true;
//	}
//
//	static boolean[][] composites = new boolean[100][100];
//	static {
//		for (int c = -60; c<=60; c++) {
//			for (int d = -60; d<61; d++) {
//				if (!isUnitOrZero(c, d)) {
//					for (int e = -60; e<61; e++) {
//						for (int f=-60; f<61; f++) {
//							if (!isUnitOrZero(e, f)){
//								int g = c*e-3*d*f;
//								int h = c*f+d*e;
//								if (g >= 0 && g < 100 && h >= 0 && h < 100) {
//									if ((h == 0 )&& !composites[g][h] && g <= 18 && g >= 15) {
//										System.out
//											.println(g+","+h+" = "+c+","+d+" x "+e+","+f);
//									}
//									composites[g][h] = true;
//								}
//							}
//						}
//					}
//				}
//			}
//		}
//	}
//	
//	private static boolean isSpecialPrime(int a, int b) {
//		return !isUnitOrZero(a, b) && !composites[a][b];
//	}
//	
//	private static boolean isUnitOrZero(int c , int d) {
//		int norm = c*c+d*d*3;
//		return norm == 1 || norm == -1 || norm == 0;
//	}


}
