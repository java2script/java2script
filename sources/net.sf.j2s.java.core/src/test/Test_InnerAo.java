package test;


public class Test_InnerAo extends Test_ { 

	
	public static int iteststatic = 0;
	
	public String atest = "Ao";

	public int itest = 0; 
	
	public String stest = "Aos";
	
	Test_InnerAo() {
		atest = "Ao*";
		String xtest = "x";
		Runnable x = new Runnable() {
			
			@Override
			public void run() {
				System.out.println("xtest is " + xtest + " atest=" + atest + " " + itest);
				// TODO Auto-generated method stub
				
			}
			
		};
		
		x.run();
	}
	
	public static class AiStat {
		public AiStat() {
			System.out.println("loaded " + getClass().getName());
		}
	}
	
    class Ai {
    	 
    	 public String atesti = "Ai";
    	 
         class Aii {
        	 
        	 // inner objects can point to "far" outer objects
        	 public Aii(String string) {
        		 stest = string;
        		 System.out.println("--init Aii atest=Ao* is " + atest + " atesti=" + atesti + " " + string + " itest=" + ++itest + " iteststatic=" + ++iteststatic);
        	 }
        	 
        	 public void test() {
        		 System.out.println("--test Aii atest=Ao* is " + atest + " atesti=" + atesti + " itest=" + ++itest + " iteststatic=" + ++iteststatic + " stest=" + stest);
        	 }
        	 
         } 
    	 
    	 public Ai(String string) {
    		 stest = string;
    		 System.out.println("-init Ai atest=Ao* is " + atest + " " + string + " itest=" + ++itest + " iteststatic=" + ++iteststatic);
    	 }
    	 
    	 public void test() {
    		 System.out.println("-test Ai atest=Ao* is " + atest + " itest=" + ++itest + " iteststatic=" + ++iteststatic + " stest=" + stest);
    	 }
    	 
     }

}