package test;

import java.io.File;
import java.io.IOException;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

import swingjs.JSUtil;


class Test_Path extends Test_ {

	public static void main(String[] args) {
		
		
		assert(checkDBName("none", "https://4virology.net/ca.virology/xml/DBPrefs.xml", null));
		
		File f;
		Path p,p2;

		f = new File("C:/testing/now");
		p = f.toPath();
		System.out.println(p);

		ThreadGroup g = Thread.currentThread().getThreadGroup();
		String myDir = ((/**@j2sNative true ||*/false) ? JSUtil.J2S.getResourcePath("", true) : "src/");
		String cl = Test_Path.class.getName().replace('.','/');
		myDir += cl.substring(0, cl.indexOf("/") + 1);
		f = new File(myDir + "test.txt");
		p = f.toPath();
		
		try {
			byte[] b = Files.readAllBytes(p);
			System.out.println(new String(b));
		} catch (IOException e) {
			e.printStackTrace();
			assert(false);
		}

		try {
			Files.createFile(p);
			assert(false);
		} catch (IOException e) {
			assert(true);
		}
		
		p = new File(myDir + "test2.txt").toPath();
		
		try {
			FileChannel channel = FileChannel.open(p, StandardOpenOption.WRITE, StandardOpenOption.CREATE);			
		} catch (IOException e) {
			e.printStackTrace();
			assert(false);
		}
		

		
		
		
	  System.out.println("Test_Path OK");
  }
	
	  private static boolean checkDBName (String dbname, String dbprefs, String dbprefs_prefix) {
		    test.bsml.DBPrefs dbp = new test.bsml.DBPrefs(dbprefs, dbprefs_prefix);
		    if (dbp.checkDBExists(dbname)) //bdname exists in xml file
		      return true;
		    else
		      return false;
		  }
		 
	
}