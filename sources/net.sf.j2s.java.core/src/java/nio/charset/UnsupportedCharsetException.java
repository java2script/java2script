package java.nio.charset;

@SuppressWarnings("serial")
public class UnsupportedCharsetException extends IllegalArgumentException {
	private String name;

	public UnsupportedCharsetException(String name) {
		super(name);
		this.name = name;
	}

	public String getCharsetName() {
		return name;
	}
}
