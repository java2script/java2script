package test;


/**
 * This test discovers the issue of a class requiring a qualified super()
 * invocation because its superclass is an inner class.
 * 
 * Found in the OSP Tracker application. 
 * 
 * @author hansonr
 *
 */
public class Test_InnerBo {

// verified report is:
	
//	xtest is x atest=Ao* 0
//	-init Ai atest=Ao* is Ao* 2nd itest=1 iteststatic=1
//	-test Ai atest=Ao* is Ao* itest=2 iteststatic=2 stest=2nd
//	-init Ai atest=Ao* is Ao* from ao.Bi itest=3 iteststatic=3
//	-init ao.Bi
//	-stest in Bi is null
//	-test Ai atest=Ao* is Ao* itest=4 iteststatic=4 stest=from ao.Bi
//	xtest is x atest=Ao* 0
//	-init Ai atest=Ao* is Ao* from ao.Bi itest=1 iteststatic=5
//	-init ao.Bi
//	-stest in Bi is null
//	-test Ai atest=Ao* is Ao* itest=2 iteststatic=6 stest=from ao.Bi
//	xtest is x atest=Ao* 0
//	-init Ai atest=Ao* is Ao* from ao.Bi itest=1 iteststatic=7
//	-init ao.Bi
//	-stest in Bi is null
//	-test Ai atest=Ao* is Ao* itest=2 iteststatic=8 stest=from ao.Bi
//	xtest is x atest=Ao* 0
//	-init Ai atest=Ao* is Ao* from aob.Bi itest=1 iteststatic=9
//	-init aobBi
//	-stest in Bi is null
//	-test Ai atest=Ao* is Ao* itest=2 iteststatic=10 stest=from aob.Bi
//	xtest is x atest=Ao* 0
//	-init Ai atest=Ao* is Ao* from ao.Bi itest=1 iteststatic=11
//	-init ao.Bi
//	xtest is x atest=Ao* 0
//	-init Ai atest=Ao* is Ao* ai.bii itest=1 iteststatic=12
//	--init Aii atest=Ao* is Ao* atesti=Ai from ai.Bii itest=2 iteststatic=13
//	--init ai.Bii setting stest to from ai.Bii
//	--stest in Bii is from ai.Bii
//	--test Aii atest=Ao* is Ao* atesti=Ai itest=3 iteststatic=14 stest=from ai.Bii
//	xtest is x atest=Ao* 0
//	-init Ai atest=Ao* is Ao* from aob.Bi itest=1 iteststatic=15
//	-init aobBi
//	xtest is x atest=Ao* 0
//	-init Ai atest=Ao* is Ao* ai.bii itest=1 iteststatic=16
//	--init Aii atest=Ao* is Ao* atesti=Ai from ai.Bii itest=2 iteststatic=17
//	--init ai.Bii setting stest to from ai.Bii
//	--stest in Bii is from ai.Bii
//	--test Aii atest=Ao* is Ao* atesti=Ai itest=3 iteststatic=18 stest=from ai.Bii	
	
	public String stest;

	public class Bi extends Test_InnerAo.Ai {
		
		
		public class Bii extends Test_InnerAo.Ai.Aii {
			
			public Bii(Test_InnerAo.Ai ai) {
				ai.super("from ai.Bii");
				stest = "from ai.Bii";
				System.out.println("--init ai.Bii setting stest to " + stest);
			}

			// different constructors can reference different objects
			public Bii(Test_InnerAo.Ai aib, boolean b) {
				aib.super("from aib.Bii");
				stest = "from aib.Bii";
				System.out.println("--init aib.Bii setting stest to " + stest);

			}
			
			@Override
			public void test() {
				System.out.println("--stest in Bii is " + stest);
				super.test();
			}
			
		}

		public Bi(Test_InnerAo ao) {
			ao.super("from ao.Bi");
			System.out.println("-init ao.Bi");

		}

		public Bi(Test_InnerAo aob, boolean b) {
			aob.super("from aob.Bi");
			System.out.println("-init aobBi");

		}
		
		@Override
		public void test() {
			System.out.println("-stest in Bi is " + stest);
			super.test();
		}
		
	}

	
	public static void main(String[] args) {
		Test_InnerAo a =  new Test_InnerAo();
		Test_InnerAo.Ai ai = a.new Ai("2nd");
		ai.test();
		new Test_InnerBo().new Bi(a).test();
		new Test_InnerBo().new Bi(new Test_InnerAo()).test();
		new Test_InnerBo().new Bi(new Test_InnerAo()).test();
		new Test_InnerBo().new Bi(new Test_InnerAo(), true).test();
		
		new Test_InnerBo().new Bi(new Test_InnerAo()).new Bii(new Test_InnerAo().new Ai("ai.bii")).test();
		new Test_InnerBo().new Bi(new Test_InnerAo(), true).new Bii(new Test_InnerAo().new Ai("ai.bii")).test();
		
		
	}

}