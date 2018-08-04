package test.function;

public class function {

	public int var = 3;
	private int typeof = 5;

	public function() {
		assert(typeof == 5 && var == 3);
		System.out.println("function OK");
	}
	

}
