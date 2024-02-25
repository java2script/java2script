package test;

import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.IOException;

public class Test implements ITest {
	
	int tnoinit;
	int tinit = 1;
	static int i = '2';
	final static String s = "test " + "here";
	final static String s1 = new String("test5");
	static String s3 = new String("test8");
	static String s2 = "s2";
	static char c = 'c';
	
	
	int j = 'j';
	String ss = "sst";
	String st = new String("st");
	char d = 'd';	
	char e = (char) ('1' + d);
	char f = (char) ('1' + '\1');
	
	char cChar2char = new Character('w'); // fixed
	
	Character char2Char = 'g';

	int iChar2int = new Character('h'); // fixed
	
	static char Char2char_static = new Character('\121');
		Character int2Char = 121; // fixed
	
	Character short2Char = (short) 120; //fixed
	
	static Character int2Char_static = 121; // fixed
	static int iChar2int_static = new Character('c');

	Integer int2Int = 122;
	int iInt2int = Integer.valueOf("200"); // fixed
	
	public Test(){
		int iInt2int = Integer.valueOf("201"); // fixed
		
	}

	static 
	
	/**
	 * @j2sNative
	 * 
	 *  c$.i = 4;
	 */
	{
		i = 3;
	}
	
	public final static void main(String[] args) {
	
		new javax.swing.JButton(); 
		
		ByteArrayInputStream bis = new ByteArrayInputStream(new byte[] {'t','e','s','t'});
		DataInputStream dis = new DataInputStream(bis);
		byte[] bytes = new byte[4];
		try {
			dis.read(bytes, 0, 4);
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		char ch = '1';
	    switch (ch) {
	    case 0b111111:
	    case 0x100:
		case '\u0123':
	    case '\1':	
	    case '\12':
	    case '\377': 
	    }

	    String a = "mouseClicked";
	    
	    String b = "mousePressed";
	    
	    MouseListener m = new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent e) {
				System.out.println(a);
			}

			@Override
			public void mousePressed(MouseEvent e) {
				System.out.println(b);
			}

			@Override
			public void mouseReleased(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mouseExited(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}
	    	
	    };
		
		/**
		 * @j2sNative
		 * 
		 * var s = "OK - should be button only";
		 * 
		 */
		{
			new javax.swing.JLabel(); 
			
		}
		
		
		
		
	}

	@Override
	public String itest() {
//		String a = atest;
//		String b = btest;
		String c = "c";
		String d = new String("d");
		String e = s1;
		String f = s;
		return "OK1";//this.stest;
	}
	
	
}