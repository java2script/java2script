package org.sgx.j2s.mauve.report;

public class TestSubResult {

public static final String FAIL="FAIL", PASS="PASS"/*, CHECKPOINT="CHECK"*/;
String type;
String testName;
public TestSubResult(String type, String testName) {
	super();
	this.testName = testName;
	this.type = type;
}
public String getTestName() {
	return testName;
}
public void setTestName(String testName) {
	this.testName = testName;
}
public String getType() {
	return type;
}
public void setType(String type) {
	this.type = type;
}

@Override
	public String toString() {
		return  testName+":"+type;
	}
}
