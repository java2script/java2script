package test;

class MyInterfaceImpl implements MyInterface {
	
	static Integer value = MyInterface2.getValue(2);
	static Integer value2 = value1;
	  public Integer getValueImpl() {
	    return value + MyInterface.value + 100 * value2;
	  }
	}