package test;

import java.applet.AudioClip;
import java.net.MalformedURLException;
import java.net.URL;

import javax.swing.JApplet;

public class Test_Audio extends JApplet {
	
	public void init() {
		try {
			URL u = new URL(getCodeBase() + "test/t.wav");
			AudioClip a = getAudioClip(u);
			a.play();
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
}