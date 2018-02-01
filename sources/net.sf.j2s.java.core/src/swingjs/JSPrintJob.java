package swingjs;

import gnu.jpdf.PDFJob;

import java.awt.Graphics;
import java.awt.print.PageFormat;
import java.io.FileNotFoundException;

import java.awt.JobAttributes;
import java.awt.PageAttributes;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Properties;

public class JSPrintJob extends PDFJob {

	private String fileName;
	private String jobTitle;
	private JobAttributes jobAttributes;
	private PageAttributes pageAttributes;
	private Properties properties;

	/**
	 * Note that a null jobtitle allows retrieving a byte array from a ByteArrayOutputStream.
	 * 
	 * @param jobtitle
	 * @param jobAttributes
	 * @param pageAttributes
	 */
	public void setAttributes(String jobtitle, JobAttributes jobAttributes,
			PageAttributes pageAttributes) {
		setFile(jobtitle);
		this.jobAttributes = jobAttributes;
		this.pageAttributes = pageAttributes;
	}

	/**
	 * Note that a null jobtitle allows retrieving a byte array from a ByteArrayOutputStream.
	 * 
	 * @param jobtitle
	 * @param properties
	 */
	public void setProperties(String jobtitle, Properties properties) {
		setFile(jobtitle);
		this.properties = properties;
	}

	private void setFile(String jobtitle) {
		fileName = jobTitle = jobtitle;
		if (fileName != null && !fileName.endsWith(".pdf"))
			fileName += ".pdf";
		try {
			// coerce jsjava to java
			os = (java.io.OutputStream) (Object) (fileName == null ? new ByteArrayOutputStream() : new FileOutputStream(fileName));
		} catch (FileNotFoundException e) {
		}
	}

	/**
	 * 
	 * @return OutputStream used here.
	 * 
	 */
	public OutputStream getOutputStream() {
		return (OutputStream) (Object) os;
	}

	@Override
	public Graphics getGraphics() {
		String name = (pageAttributes != null ? pageAttributes
				.getOrientationRequested().toString() : properties != null ? properties
				.getProperty("orientation") : null);
		return getGraphics("landscape".equals(name) ? PageFormat.LANDSCAPE
				: PageFormat.PORTRAIT);
	}

	
}
