package net.sf.j2s.html;

public class Option {
	public String text;
	public String value;
	public boolean defaultSelected;
	
	public Option(String text, String value) {
		super();
		this.text = text;
		this.value = value;
	}
	
	public Option(String text, String value, boolean defaultSelected, boolean selected) {
		super();
		this.text = text;
		this.value = value;
	}
}
