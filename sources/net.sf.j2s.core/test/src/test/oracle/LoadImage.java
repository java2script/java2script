package test.oracle;

/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1995, 2008, Oracle and/or its affiliates. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 *   - Neither the name of Oracle or the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import javax.imageio.ImageIO;
import javax.swing.JApplet;

// SwingJS[1] Applet -> JApplet
// SwingJS[2] getCodebase() --> getDocumentBase()
// SwingJS[3] fixing /bin/ --> /html/ for local version in Eclipse

/**
 * from https://docs.oracle.com/javase/tutorial/2d/images/loadimage.html
 * 
 */
public class LoadImage extends JApplet {

	private BufferedImage img;

	@Override
	public void init() {
		URL url = null;
		try {
			url = pathTo("strawberry.jpg");			
			System.out.println("image loading from " + url);
			img = ImageIO.read(url);
		} catch (IOException e) {
			System.out.println(e + " : " + url);
		}
	}

	/**
	 * SwingJS[2]: The original Applet called getCodebase(), but that is not
	 * appropriate for this demo. Instead, we switch to getDocumentBase()
	 * 
	 * SwingJS[3]: We do a switch of /bin/ to /html/ so that we can run it 
	 * as a Java applet within Eclipse.
	 *  
	 * @param file
	 * @return
	 * @throws MalformedURLException
	 */
	private URL pathTo(String file) throws MalformedURLException {
		String path = getCodeBase().toString() + "test/oracle/images/" + file;
		if (path.startsWith("/"))
			path = "file://" + path;
		return new URL(path);
	}

	@Override
	public void paint(Graphics g) {
		g.drawImage(img, 50, 50, null);
	}
	

}
