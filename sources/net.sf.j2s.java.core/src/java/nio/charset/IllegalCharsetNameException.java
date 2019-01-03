package java.nio.charset;

@SuppressWarnings("serial")
public class IllegalCharsetNameException extends IllegalArgumentException {
	private String name;

	public IllegalCharsetNameException(String name) {
		super(name);
		this.name = name;
	}

	public String getCharsetName() {
		return name;
	}
}
