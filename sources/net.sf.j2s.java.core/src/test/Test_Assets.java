package test;

import javajs.async.Assets;

class Test_Assets extends Test_ {

	public static void main(String[] args) {

		if (Assets.isJS) {
			/**
			 * @j2sNative
			 * 
			 * javajs.async.Assets.add$O({name:"test",zipPath:"test/t.zip",classPath:"xl"});
			 */
		} else {
			Assets.add(new Assets.Asset("test",  "src/test/t.zip", "xl"));
		}

		String worksheet = Assets.getAssetStringFromZip("xl/worksheets/sheet1.xml");
		System.out.println(worksheet.substring(0, 100) + "...(" + worksheet.length() + " bytes)");
		assert(worksheet.length() == 86144);
		System.out.println("Test_Assets OK");
	}


}