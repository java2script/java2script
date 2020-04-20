package test;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.color.ColorSpace;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.ComponentColorModel;
import java.awt.image.DataBuffer;
import java.awt.image.DataBufferByte;
import java.awt.image.DataBufferUShort;
import java.awt.image.IndexColorModel;
import java.awt.image.PackedColorModel;
import java.awt.image.Raster;
import java.awt.image.WritableRaster;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;
import javax.swing.JPanel;
import javax.swing.WindowConstants;
import javax.swing.border.EmptyBorder;

import sun.awt.image.PixelConverter;
import swingjs.JSUtil;

/**
 * Test of <video> tag.
 * 
 * @author RM
 *
 */
public class Test_Video extends Test_ {

	public static void main(String[] args) {
		new Test_Video();
	}

	public Test_Video() {
		JFrame main = new JFrame();
		main.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
		ImageIcon icon;

		String video = (
		// "test/jmoljana_960x540.png");
		// fails"test/EnergyTransfer.mp4"
		"test/jmoljana.mp4");
		URL videoURL;
		try {
			videoURL = new URL("https://chemapps.stolaf.edu/test/duet.mp4");
		} catch (MalformedURLException e1) {
			videoURL = null;
		}
		boolean testRemote = false;
		boolean isJS = /** @j2sNative true || */
				false;
		boolean asBytes = true;

		if (!isJS) {
			icon = new ImageIcon("src/test/video_image.png");
		} else if (asBytes) {
			try {
				byte[] bytes = Files.readAllBytes(new File(video).toPath());
				icon = new ImageIcon(bytes, "jsvideo");
			} catch (IOException e1) {
				icon = null;
			}
		} else if (testRemote) {
			icon = new ImageIcon(videoURL, "jsvideo");
		} else {
			icon = new ImageIcon(video, "jsvideo");
		}
		JLabel label = new JLabel(icon);
		int w = 1920 / 4;
		Dimension dim = new Dimension(w, w * 9 / 16);
		addLayerPane(label, main, dim);
		addControls(label, main);
		main.pack();
		main.setVisible(true);
	}
	private JLayeredPane layerPane;
	private JPanel drawLayer;

	private List<Point> points = new ArrayList<Point>();
	
	private void addLayerPane(JLabel label, JFrame main, Dimension dim) {
		label.setPreferredSize(dim);
		label.setMinimumSize(dim);
		label.setMaximumSize(dim);
		label.setBounds(0,0, dim.width, dim.height);

		
		drawLayer = new JPanel() {
			@Override
			public void paintComponent(Graphics g) {
				super.paintComponent(g); // takes care of the background clearing
				g.setColor(Color.red);
				for (int i = 0, n = points.size(); i < n; i++) {
					Point p = points.get(i);
					g.drawLine(p.x-5, p.y, p.x+5, p.y);
					g.drawLine(p.x, p.y-5, p.x, p.y+5);
				}
			}
		};
		drawLayer.setBounds(0,0, dim.width, dim.height);
		drawLayer.setOpaque(false);
		//drawLayer.setBackground(new Color(255,255,255,0));
		// note -- setting this to opaque/{255 255 255 0} does not quite work as expected. 
		// rather than paint a white background over the image in Java, Java paints
		// the default background color. This of course makes no sense; I consider it a Java bug.
		// 
		drawLayer.putClientProperty("jscanvas", "true");

		drawLayer.addMouseListener(new MouseAdapter() {
			
			@Override
			public void mouseClicked(MouseEvent e) {
				System.out.println("Draw layer mouse click " + e.getX() + " " + e.getY());
				points.add(new Point(e.getX(), e.getY()));
				drawLayer.repaint();
			}
		});

		layerPane = new JLayeredPane();
		layerPane.setMinimumSize(dim);
		layerPane.setPreferredSize(dim);
		layerPane.setMaximumSize(dim);

		layerPane.add(drawLayer, JLayeredPane.PALETTE_LAYER);
		layerPane.add(label, JLayeredPane.DEFAULT_LAYER);

		JPanel p = new JPanel();
		p.add(layerPane, BorderLayout.CENTER);
		main.add(p, BorderLayout.CENTER);
		System.out.println(main.getLayeredPane());
		System.out.println(layerPane);
	}

	private void addControls(JLabel label, JFrame main) {
		JButton play = new JButton("play");
		play.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				/**
				 * @j2sNative
				 * 
				 * 			label.ui.imageNode.play();
				 */
			}

		});
		JButton pause = new JButton("pause");
		pause.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				/**
				 * @j2sNative
				 * 
				 * 			label.ui.imageNode.pause();
				 */
			}

		});
		
		JButton clear = new JButton("clear");
		clear.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				points.clear();
				drawLayer.repaint();
			}

		});
	
		JButton undo = new JButton("undo");
		undo.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				if (points.size() > 0)
					points.remove(points.size() - 1);
				drawLayer.repaint();
			}

		});
	
		JPanel controls = new JPanel();
		controls.add(new JLabel("click to mark     "));
		controls.add(play);
		controls.add(pause);
		controls.add(undo);
		controls.add(clear);
		main.add(controls, BorderLayout.SOUTH);
	}

}
