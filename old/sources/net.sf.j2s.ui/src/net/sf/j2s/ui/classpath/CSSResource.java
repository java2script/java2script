package net.sf.j2s.ui.classpath;


public class CSSResource extends Resource implements IExternalResource {

	public String toHTMLString() {
		Resource p = this.getParent();
		if (p != null) {
			if (p instanceof ContactedClasses) {
				Resource pp = p.getParent();
				if (pp != null && pp instanceof ContactedClasses) {
					return "";
				}
			}
		}
		StringBuffer buf = new StringBuffer();
		buf.append("<link rel=\"stylesheet\" href=\"");
		if (p != null) {
			if (p instanceof ContactedClasses) {
				ContactedClasses cc = (ContactedClasses) p;
				String path = cc.getRelativePath();
				int idx = path.lastIndexOf('/');
				if (idx != -1) {
					buf.append(path.substring(0, idx + 1));
				}
			} else if (p instanceof CompositeResources) {
				CompositeResources cc = (CompositeResources) p;
				String path = cc.getBinRelativePath();
				if (path != null) {
					buf.append(path);
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
