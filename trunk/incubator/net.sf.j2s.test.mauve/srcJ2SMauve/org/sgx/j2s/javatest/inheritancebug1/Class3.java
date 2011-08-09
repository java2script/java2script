package org.sgx.j2s.javatest.inheritancebug1;

public class Class3 {
	
static class InnerClass31 {
	String s;
	public InnerClass31(String s) {
		this.s=s;
	}
	@Override
	public String toString() {
		return s+" - out";
	}
}

}
