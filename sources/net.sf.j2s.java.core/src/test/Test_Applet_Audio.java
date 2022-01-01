package test;

import java.applet.AudioClip;
import java.net.MalformedURLException;
import java.net.URL;

import javax.swing.JApplet;

public class Test_Applet_Audio extends JApplet {
	
	@Override
	public void init() {
		try {
			URL u = getCodeBase();
			u = new URL(u + "piano2.wav");
			// looks like Java hangs when the URL is not found. But JavaScript does OK
			AudioClip a = getAudioClip(u);
			a.play();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	/**
	 * fix for applet running in Eclipse, which unfortunately uses /bin/ for the codeBase
	 * 
	 */
	@Override
	public URL getCodeBase() {
		String codeBase = super.getCodeBase().toString();
		if (codeBase.endsWith("/bin/"))  {
			String appletPath = this.getClass().getName();
			codeBase += appletPath.substring(0, appletPath.lastIndexOf(".") + 1).replace('.', '/');
		}
		try {
			return new URL(codeBase);
		} catch (MalformedURLException e) {
			return null;
		}
		
	}
	
}