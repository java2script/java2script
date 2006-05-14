package net.sf.j2s.ui.classpath;

import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;


public class ContactedClasses extends Resource implements IExternalResource, IClasspathContainer {
//	private ContactedUnitClass[] children;
//	private IExternalResource[] externals;
	private String binRelativePath;
	private List classList;
	private List externalList;

	public void load() {
		File file = getAbsoluteFile();
		classList = new ArrayList();
		externalList = new ArrayList();
		if (file.exists()) {
			Properties props = PathUtil.loadJZ(file);
			//setFolder(file.getParentFile());
			//setRelativePath(file.getName());
			String[] reses = PathUtil.getResources(props);
			binRelativePath = props.getProperty(PathUtil.J2S_OUTPUT_PATH);
			for (int i = 0; i < reses.length; i++) {
				if (reses[i] != null) {
					String res = reses[i].trim();
					if (res.endsWith(".z.js")) {
						ContactedClasses jz = new ContactedClasses();
						jz.setFolder(this.getAbsoluteFolder());
						jz.setRelativePath(res);
						jz.setParent(this);
						externalList.add(jz);
					} else if (res.endsWith(".js")) {
						ContactedUnitClass unit = new ContactedUnitClass();
						unit.setFolder(this.getAbsoluteFolder());
						unit.setRelativePath(res);
						unit.parseClassName();
						unit.setParent(this);
						classList.add(unit);
					} else if (res.endsWith(".css")) {
						CSSResource css = new CSSResource();
						css.setFolder(this.getAbsoluteFolder());
						css.setRelativePath(res);
						css.setParent(this);
						externalList.add(css);
					}
				}
			}
//			this.children = new ContactedUnitClass[classList.size()];
//			for (int i = 0; i < classList.size(); i++) {
//				ContactedUnitClass res = (ContactedUnitClass) classList.get(i);
//				this.children[i] = res;
//				res.setParent(this);
//			}
//			this.externals = new IExternalResource[externalList.size()];
//			for (int i = 0; i < externalList.size(); i++) {
//				Resource res = (Resource) externalList.get(i);
//				this.externals[i] = (IExternalResource) res;
//				res.setParent(this);
//			}
		}
	}

	public void store(Properties props) {
		Resource[] reses = getChildren();
		StringBuffer buf = new StringBuffer();
		for (int i = 0; i < reses.length; i++) {
			String str = reses[i].toResourceString();
			//if (str != null) {
				buf.append(str);
				if (i != reses.length - 1) {
					buf.append(",");
				}
			//}
		}
		props.setProperty(PathUtil.J2S_RESOURCES_LIST, buf.toString());
		props.setProperty(PathUtil.J2S_OUTPUT_PATH, binRelativePath);
	}

	public Resource[] getChildren() {
		if (externalList == null || classList == null) {
			this.load();
		}
		int size = externalList.size();
		Resource[] res = new Resource[classList.size() + size];
		for (int i = 0; i < size; i++) {
			res[i] = (Resource) externalList.get(i);
		}
		for (int i = 0; i < classList.size(); i++) {
			res[i + size] = (Resource) classList.get(i);
		}
		
		/*
		Resource[] res = new Resource[children.length + externals.length];
		for (int i = 0; i < externals.length; i++) {
			res[i] = (Resource) externals[i];
		}
		for (int i = 0; i < children.length; i++) {
			res[i + externals.length] = children[i];
		}
		*/
		return res;
	}

	public ContactedUnitClass[] getClasses() {
		//return children;
		return (ContactedUnitClass[]) classList.toArray(new ContactedClasses[0]);
	}

	public IExternalResource[] getExternals() {
		//return externals;
		return (IExternalResource[]) externalList.toArray(new IExternalResource[0]);
	}
	
	public String getBinRelativePath() {
		return binRelativePath;
	}

	public void setBinRelativePath(String binRelativePath) {
		this.binRelativePath = binRelativePath;
	}

	public String toHTMLString() {
		StringBuffer buf = new StringBuffer();
		if (externalList == null) {
			this.load();
		}
		for (Iterator iter = externalList.iterator(); iter.hasNext();) {
			Resource res = (Resource) iter.next();
			buf.append(res.toHTMLString());
		}
		buf.append("<script type=\"text/javascript\" src=\"");
		String binFolder = getBinRelativePath();
		if (binFolder != null) {
			String binPath = binFolder.trim();
			if (binPath.length() != 0) {
				buf.append(binPath);
				if (!binPath.endsWith("/")) {
					buf.append("/");
				}
			}
		}
		if (this.getParent() != null 
				&& (this.getParent() instanceof CompositeResources)) {
			CompositeResources cc = (CompositeResources) this.getParent();
			String binRelative = cc.getBinRelativePath();
			if (binRelative != null) {
				if (binRelative.length() != 0 && getRelativePath().endsWith(".z.js")) {
					return "";
				}
				buf.append(binRelative);
			}
		}
		buf.append(getRelativePath());
		buf.append("\"></script>\r\n");
		return buf.toString();
	}
	public int getType() {
		return CONTAINER;
	}
}
