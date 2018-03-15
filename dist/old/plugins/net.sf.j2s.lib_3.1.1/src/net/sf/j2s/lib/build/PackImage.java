package net.sf.j2s.lib.build;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

public class PackImage {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		if (args == null || args.length < 6) {
			System.out.println("Usage: PackImage <type> <margin> <path> <target> <image1> <image2> [...]");
			return;
		}
		
		String type = args[0];
		int margin = -1;
		try {
			margin = Integer.parseInt(args[1]);
		} catch (NumberFormatException e1) {
			e1.printStackTrace();
			return;
		}
		if (margin < 0) {
			System.out.println("Margin should be greater than 0!");
			return;
		}
		String path = args[2];
		String target = args[3];
		List images = new ArrayList();
		for (int i = 4; i < args.length; i++) {
			String file = args[i];
			File f = new File(path, file);
			if (f.exists()) {
				try {
					BufferedImage image = ImageIO.read(f);
					if (image != null) {
						images.add(image);
						System.out.println("\t\t\"" + f.getName() + "\",");
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		int size = images.size();
		if (size < 2) {
			System.out.println("Warning: no need to pack image");
			return;
		}
		BufferedImage[] allImages = (BufferedImage[]) images.toArray(new BufferedImage[size]);
		int maxWidth = 0;
		int maxHeight = 0;
		for (int i = 0; i < allImages.length; i++) {
			BufferedImage image = allImages[i];
			int w = image.getWidth();
			if (w > maxWidth) {
				maxWidth = w;
			}
			int h = image.getHeight();
			if (h > maxHeight) {
				maxHeight = h;
			}
		}
		
		int arraySize = (int) Math.ceil(Math.sqrt(allImages.length));
		int imageWidth = arraySize * maxWidth + margin * (arraySize + 1);
		int imageHeight = arraySize * maxHeight + margin * (arraySize + 1);
		BufferedImage bigImage = new BufferedImage(imageWidth,
				imageHeight, BufferedImage.TYPE_INT_ARGB);
		Graphics2D gfx = null;
		try {
			gfx = bigImage.createGraphics();
			for (int i = 0; i < allImages.length; i++) {
				BufferedImage image = allImages[i];
				
				int ix = i % arraySize;
				int x = ix * maxWidth + (ix + 1) * margin;
				int iy = i / arraySize;
				int y = iy * maxHeight + (iy + 1) * margin;
				
				gfx.drawImage(image, x, y, null);
			}
			if ("gif".equals(type)) {
				for (int i = 0; i < imageHeight; i++) {
					for (int j = 0; j < imageWidth; j++) {
						int rgb = bigImage.getRGB(j, i);
						if ((rgb & 0x7f000000) == 0) {
							bigImage.setRGB(j, i, -0xff3456);
						}
					}
				}
			}
			ImageIO.write(bigImage, type, new File(path, target));
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (gfx != null) {
				gfx.dispose();
			}
		}
		
		System.out.println("Done!");
		System.out.println("margin=" + margin);
		System.out.println("width=" + maxWidth);
		System.out.println("height=" + maxHeight);
	}

}
