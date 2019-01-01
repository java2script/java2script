package test;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;

class Test_Path extends Test_ {

	public static void main(String[] args) {
		File f;
		Path p,p2;

		f = new File("C:/testing/now");
		p = f.toPath();
		System.out.println(p);

		ThreadGroup g = Thread.currentThread().getThreadGroup();
		String myDir = /**@j2sNative g.html5Applet._j2sPath + "/" ||*/"src/";
		String cl = Test_Path.class.getName().replace('.','/');
		myDir += cl.substring(0, cl.indexOf("/") + 1);
		f = new File(myDir + "test.txt");
		p = f.toPath();
		
		try {
			byte[] b = Files.readAllBytes(p);
			System.out.println(new String(b));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	  System.out.println("Test_Path OK");
  }
	
}