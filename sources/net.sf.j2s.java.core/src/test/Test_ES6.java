package test;

import java.util.function.Function;

import swingjs.JSUtil;

class Test_ES6 extends Test_ {

	static int nOK;
	
	public static void main(String[] args) {
		
		System.out.println("bhtest is " + bhtest + " j2sHeadless is " + j2sHeadless + " " + new Test_ES6().j2sHeadless);
		if (/** @j2sNative false && */true)
			return;

		Function<Object, Object> ok = new Function<Object, Object>(){

			@Override
			public Object apply(Object value) {
				++nOK;
				System.out.println("test.js module loaded " + nOK + " value is " + (/** @j2sNative (typeof value == "string" ? value : `{$value}`) || */null));
				System.out.println("thread isAlive = " + !Thread.currentThread().getThreadGroup().isDestroyed());
				return "OK " + nOK;
			}
			
		};
		Function<Object, Object> fail = new Function<Object, Object>(){

			@Override
			public Object apply(Object reason) {
				System.out.println("module failed " + reason);
				return reason;
			}
			
		};
				
		System.out.println("thread isAlive = " + !Thread.currentThread().getThreadGroup().isDestroyed());
		System.out.println("checking $J2S$/test/xxtest.js");
		new JSUtil().importModule("$J2S$/test/xxtest.js", ok, fail);
		System.out.println("checking $J2S$/test/test.js");
		new JSUtil().importModule("$J2S$/test/test.js", ok, fail).$then(ok, null);
		

	}

}

