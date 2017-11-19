package com.polytopemedia.polyhedra.ui;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.JPanel;

public final class ImagePanel extends JPanel {
	private final BufferedImage image;

	ImagePanel(BufferedImage image) {
		this.image = image;
	}

	public void paintComponent(Graphics gr) {
		super.paintComponent(gr);
		gr.drawImage(image, 0, 0, getWidth(), getHeight(), null);
	}
	
	public static ImagePanel defaultImage() {
		try {
			BufferedImage im = ImageIO.read(ImagePanel.class.getResource("DodecahedronNetForApplet.jpeg").openStream());
			return new ImagePanel(im);
		} catch (IOException e) {
		}
		return null;
	}
}