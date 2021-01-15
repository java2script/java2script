package test;

class Test_Async extends Test_ {

	/**
	 * 
	 * @param args
	 */
	public static void main(String[] args) {

		Thread t = new Thread(() -> {
			for (int i = 0; i < 10; i++) {
				System.out.println("counting " + i);
				try {
					/**
					 * @j2sNative
					 * 
					 * 		await Clazz.Thread.sleep(500);
					 */
					{
						Thread.sleep(2000);
					}
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		});

		/**
		 * @j2sNative
		 * 
		 * 			setTimeout(function() { new Clazz.Thread("t", new
		 *            Clazz.Runnable(t.target.run$)).start();},100);
		 * 
		 */
		{
			t.start();
		}
	}
}