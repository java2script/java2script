package test;

import java.awt.Font;

public class Test_EPS extends Test_{

	public static void main(String[] args) {
		String[] fonts = { "Serif", "Serif.plain"
				, "SansSerif", "SansSerif.plain",
				"TimesRoman", "Serif.plain",
				"Helvetica", "SansSerif.plain",
				"Courier", "Monospaced.plain",
				"Monospaced", "Monospaced.plain",
				"Dialog", "Dialog.plain",
				"DialogInput", "DialogInput.plain" 
		 };

		for (int i = 0; i < fonts.length; i += 2) {
			System.out.println(fonts[i] + "\t" 
					+ new Font(fonts[i], Font.BOLD|Font.ITALIC, 12).getPSName());
			
			assert(new Font(fonts[i], Font.PLAIN, 12).getPSName().equals(fonts[i + 1]));
		}
		System.out.println("Test_EPS OK");
	}
}