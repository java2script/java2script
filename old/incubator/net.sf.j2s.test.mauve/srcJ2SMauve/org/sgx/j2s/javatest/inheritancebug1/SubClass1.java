package org.sgx.j2s.javatest.inheritancebug1;

public class SubClass1 extends Class1 {
@Override
public String method1(int i, int j) {
	return new Class3.InnerClass31(super.method1(i, j)).toString();
}
}
