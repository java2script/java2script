package net.sf.j2s.ui.launching.template;
/**
 * Object for representing a template internally.
 * @author sgurin
 *
 */
public class TemplateInfo {
	private String templateName, templateCode, fileOutputName, filePath;
	public TemplateInfo(String templateName, String templateCode, String fileOutputName) {
		this.templateName = templateName;
		this.templateCode = templateCode;
		this.fileOutputName = fileOutputName;
	}
	public String getTemplateName() {
		return templateName;
	}
	public String getTemplateCode() {
		return templateCode;
	}
	public String getFileOutputName() {
		return fileOutputName;
	}
	public void setFilePath(String s) {
		this.filePath=s;
	}
	public String getFilePath() {
		return filePath;
	}
	public boolean equals(Object obj) {
		if(obj instanceof TemplateInfo) {
			return templateName!=null && templateName.equals(((TemplateInfo)obj).getTemplateName());
		}
		return false;
	}
}