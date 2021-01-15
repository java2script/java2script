package test;

import java.awt.Font;

public class Test_EPS extends Test_{

	public static void main(String[] args) {
		String[] fonts = { "Serif", "Serif.plain"
				, "SansSerif", "SansSerif.plain",
				"TimesRoman", "Dialog.plain",
				"Helvetica", "Dialog.plain",
				"Courier", "Dialog.plain",
				"Monospaced", "Monospaced.plain",
				"Dialog", "Dialog.plain",
				"DialogInput", "DialogInput.plain" 
		 };

		for (int i = 0; i < fonts.length; i += 2) {
			System.out.println(fonts[i] + "\t" 
					+ new Font(fonts[i], Font.BOLD|Font.ITALIC, 12).getPSName());
			
			String s = new Font(fonts[i], Font.PLAIN, 12).getPSName();
			String s1 = fonts[i + 1];
			System.out.println(i + " " + fonts[i] + " " + s + " " + s1);
			assert(s.equals(s1));
		}
		System.out.println("Test_EPS OK");
	}
}