package net.sf.j2s.ui.classpathviewer;


public class CSSResource extends Resource implements IExternalResource {

//	public String getName() {
//		return getAbsoluteFile().getName();
//	}
	public String toHTMLString() {
		StringBuffer buf = new StringBuffer();
		buf.append("<link rel=\"stylesheet\" href=\"");
		Resource p = getParent();
		if (p != null) {
			if (p instanceof ContactedClasses) {
				ContactedClasses cc = (ContactedClasses) p;
				String path = cc.getRelativePath();
				int idx = path.lastIndexOf('/');
				if (idx != -1) {
					buf.append(path.substring(0, idx + 1));
				}
			}
			buf.append(getRelativePath());
			
		} else {
			buf.append(getRelativePath());
		}
		buf.append("\"/>\r\n");
		return buf.toString();
	}
	public int getType() {
		return OTHER;
	}
}
