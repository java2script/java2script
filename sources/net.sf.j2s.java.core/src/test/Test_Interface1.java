package test;

public interface Test_Interface1 extends Test_Interface {
	@Override
	public default int isTestInterface() {
		return 1;
	}
}
