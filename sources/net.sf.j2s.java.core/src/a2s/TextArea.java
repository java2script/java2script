package a2s;

import javax.swing.JScrollPane;
import javax.swing.JTextArea;

public class TextArea extends JScrollPane {
	private JTextArea ta;

	public TextArea(int rows, int cols) {
		super();
		setViewportView(ta = new JTextArea(rows, cols));
		awtDefaults();
	}

	public TextArea() {
		super();
		setViewportView(ta = new JTextArea());
		awtDefaults();
	}

	public TextArea(String text) {
		super();
		setViewportView(ta = new JTextArea(text, 0, 9));
		awtDefaults();
	}

	public TextArea(String text, int rows, int cols) {
		super();
		setViewportView(ta = new JTextArea(text, rows, cols));
		awtDefaults();
	}

	void awtDefaults() {
		// setAutoscrolls(true);
		// setContentType("text/plain");
	}

	// API

	public String getText() {
		return ta.getText();
	}

	public void setEditable(boolean b) {
		ta.setEditable(b);
	}

	public void selectAll() {
		ta.selectAll();
	}

	public void setText(String t) {
		ta.setText(t);
	}

	public void insertText(String str, int pos) {
		ta.insert(str, pos);		
	}
	
	public void insert(String str, int pos) {
		ta.insert(str, pos);		
	}
	
	public void appendText(String str) {
		ta.append(str);		
	}
	
	public void append(String str) {
		ta.append(str);		
	}

	public void replaceRange(String str, int start, int end) {
		ta.replaceRange(str, start, end);
	}
	
	public void replaceText(String str, int start, int end) {
		ta.replaceRange(str, start, end);
	}
	
	public void setColumns(int columns) {
		ta.setColumns(columns);
	}
	
	public void setRows(int rows) {
		ta.setRows(rows);
	}

	public int getColumns() {
		return ta.getColumns();
	}

	
	public int getRows() {
		return ta.getRows();
	}
	
}
