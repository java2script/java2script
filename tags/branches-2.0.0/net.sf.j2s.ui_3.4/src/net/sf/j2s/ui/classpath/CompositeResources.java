package net.sf.j2s.ui.classpath;

import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import net.sf.j2s.ui.launching.J2SCyclicProjectUtils;


public class CompositeResources extends Resource implements IClasspathContainer {
	protected List resources;
	protected List abandonedResources;
	private String binRelativePath;

	private String compilerStatus;
	
	public File getAbsoluteFile() {
		if (getRelativePath().startsWith("/")) {
			return new File(getFolder(),  getRelativePath());
		} else {
			return super.getAbsoluteFile();
		}
	}
	public String getName() {
		return super.getName();
	}

	public boolean exists() {
		if (getRelativePath().startsWith("/")) {
			return new File(getFolder(), getRelativePath()).exists();
		} else {
			return super.exists();
		}
	}
	public String getBinRelativePath() {
		if (getRelativePath().startsWith("/")) {
			return getRelativePath().substring(0, getRelativePath().lastIndexOf('/') + 1);
		} else {
			return "";
		}
	}

	public void load() {
		File file = getAbsoluteFile();
		resources = new ArrayList();
		abandonedResources = new ArrayList();
		if (file != null && file.exists()) {
			InputStream fis = null;
			try {
				fis = new FileInputStream(file);
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}
			load(fis);
		}
	}

	public String getCompilerStatus() {
		return compilerStatus;
	}
	public void load(InputStream fis) {
		resources = new ArrayList();
		abandonedResources = new ArrayList();
		if (fis != null) {
			Properties props = new Properties();
			try {
				props.load(fis);
			} catch (FileNotFoundException e1) {
				e1.printStackTrace();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			compilerStatus = props.getProperty("j2s.compiler.status");
			
			binRelativePath = props.getProperty(PathUtil.J2S_OUTPUT_PATH);
			
			String[] reses = PathUtil.getResources(props);
			addResourceByString(resources, reses);
			
			reses = PathUtil.getAbandonedResources(props);
			addResourceByString(abandonedResources, reses);

		}
	}
	
	public Resource[] getAbandonedResources() {
		if (abandonedResources == null) {
			return new Resource[0];
		}
		return (Resource []) abandonedResources.toArray(new Resource[0]);
	}
	private void addResourceByString(List resourcesList, String[] reses) {
		for (int i = 0; i < reses.length; i++) {
			if (reses[i] != null) {
				String res = reses[i].trim();
				if (res.startsWith("|")) {
					res = res.substring(1);
					Resource rr = null;
					if (res.endsWith(".z.js") || res.endsWith(".j2x")) {
						rr = new ContactedClasses();
					} else if (res.endsWith(".css")) {
						rr = new CSSResource();
					} else if (res.endsWith("/.j2s")) {
						rr = new ProjectResources();
					} else if (res.endsWith(".j2s")) {
						rr = new CompositeResources();
					}
					rr.setFolder(new File(res).getParentFile());
					rr.setRelativePath(new File(res).getName());
					rr.setParent(this);
					rr.setAbsolute(true);
					resourcesList.add(rr);
				} else if (res.endsWith(".z.js") || res.endsWith(".j2x")) {
					ContactedClasses jz = new ContactedClasses();
					jz.setFolder(this.getAbsoluteFolder());
					jz.setRelativePath(res);
					jz.setParent(this);
					resourcesList.add(jz);
				} else if (res.endsWith(".js")) {
					UnitClass unit = new UnitClass();
					unit.setFolder(this.getAbsoluteFolder());
					unit.setRelativePath(res);
					unit.setBinRelativePath(binRelativePath);
					unit.parseClassName();
					unit.setParent(this);
					resourcesList.add(unit);
				} else if (res.endsWith(".css")) {
					CSSResource css = new CSSResource();
					css.setFolder(this.getAbsoluteFolder());
					css.setRelativePath(res);
					css.setParent(this);
					resourcesList.add(css);
				} else if (res.endsWith("/.j2s")) {
					ProjectResources prj = new ProjectResources();
					prj.setFolder(this.getAbsoluteFolder().getParentFile());
					prj.setRelativePath(res);
					prj.setParent(this);
					resourcesList.add(prj);
				} else if (res.endsWith(".j2s")) {
					CompositeResources comp = new CompositeResources();
					comp.setFolder(this.getAbsoluteFolder());
					comp.setRelativePath(res);
					comp.setParent(this);
					resourcesList.add(comp);
				}
			}
		}
	}
	public void store(Properties props) {
		Resource[] reses = getChildren();
		StringBuffer buf = new StringBuffer();
		for (int i = 0; i < reses.length; i++) {
			String str = reses[i].toResourceString();
				buf.append(str);
				if (i != reses.length - 1) {
					buf.append(",");
				}
		}
		props.setProperty(PathUtil.J2S_RESOURCES_LIST, buf.toString());
		props.setProperty(PathUtil.J2S_OUTPUT_PATH, binRelativePath);
	}

	public Resource[] getChildren() {
		if (resources == null) {
			this.load();
		}
		return (Resource[]) resources.toArray(new Resource[0]);
	}
	public void addResource(Resource res) {
		if (!resources.contains(res)) {
			resources.add(res);
		}
	}
	public boolean existedResource(Resource res) {
		return resources.contains(res);
	}
	public void removeResource(Resource res) {
		resources.add(res);
	}
	public void removeResource(int res) {
		resources.remove(res);
	}
	public void upResource(Resource res) {
		//for (int i = 0;)
	}
	public void downResource(Resource res) {
		
	}
	public void topResource(Resource res) {
		//for (int i = 0;)
	}
	public void bottomResource(Resource res) {
		
	}
	public void upResource(int res) {
		//for (int i = 0;)
	}
	public void downResource(int res) {
		
	}
	public void topResource(int res) {
		//for (int i = 0;)
	}
	public void bottomResource(int res) {
		
	}

	public void setBinRelativePath(String binRelativePath) {
		this.binRelativePath = binRelativePath;
	}
	public String toHTMLString() {
		StringBuffer buf = new StringBuffer();
		if (resources == null) {
			this.load();
		}
		for (Iterator iter = resources.iterator(); iter.hasNext();) {
			Resource res = (Resource) iter.next();
			if (!J2SCyclicProjectUtils.visit(res)) {
				continue;
			}
			buf.append(res.toHTMLString());
		}
		return buf.toString();
	}
	
	public String toJ2XString() {
		StringBuffer buf = new StringBuffer();
		if (!J2SCyclicProjectUtils.visit(this)) {
			return buf.toString();
		}
		if (resources == null) {
			this.load();
		}
		if (this instanceof ProjectResources) {
			ProjectResources pr = (ProjectResources) this;
			File binFolder = new File(pr.getAbsoluteFolder(), this.binRelativePath);
			File[] files = binFolder.listFiles(new FileFilter() {
				public boolean accept(File pathname) {
					if (pathname.isFile() && pathname.getName().endsWith(".j2x")) {
						return true;
					}
					return false;
				}
			});
			if (files != null && files.length != 0) {
				for (int i = 0; i < files.length; i++) {
					buf.append(files[i].getAbsolutePath());
					buf.append(',');
				}
				return buf.toString();
			}
		}
		for (Iterator iter = resources.iterator(); iter.hasNext();) {
			Resource res = (Resource) iter.next();
			if (res instanceof CompositeResources) {
				CompositeResources c = (CompositeResources) res;
				buf.append(c.toJ2XString());
				buf.append(',');
			}
		}
		for (Iterator iter = resources.iterator(); iter.hasNext();) {
			Resource res = (Resource) iter.next();
			if (res instanceof ContactedClasses) {
				if (!J2SCyclicProjectUtils.visit(res)) {
					continue;
				}
				ContactedClasses unit = (ContactedClasses) res;
				buf.append(unit.toJ2XString());
				buf.append(',');
			}
		}
		return buf.toString();
	}
	
	public String existedClassesString() {
		StringBuffer buf = new StringBuffer();
		if (!J2SCyclicProjectUtils.visit(this)) {
			return buf.toString();
		}
		if (resources == null) {
			this.load();
		}
		if (this instanceof ProjectResources) {
			ProjectResources pr = (ProjectResources) this;
			File binFolder = new File(pr.getAbsoluteFolder(), this.binRelativePath);
			File[] files = binFolder.listFiles(new FileFilter() {
				public boolean accept(File pathname) {
					if (pathname.isFile() && pathname.getName().endsWith(".j2x")) {
						return true;
					}
					return false;
				}
			});
			if (files != null && files.length != 0) { // should always one *.j2x file
				Properties prop = new Properties();
				try {
					prop.load(new FileInputStream(files[0]));
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
				String pkg = prop.getProperty("package.prefix");
				File pkgFile = new File(files[0].getParentFile(), pkg.replace('.', '/') + "/package.js");
				if (pkgFile.exists()) {
					return buf.toString();
				}
			}
		}
		buf.append('[');
		try {
			buf.append(new File(getAbsoluteFolder(), binRelativePath).getCanonicalPath());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		buf.append(']');
		buf.append(',');
		for (Iterator iter = resources.iterator(); iter.hasNext();) {
			Resource res = (Resource) iter.next();
			if (res instanceof UnitClass) {
				if (!J2SCyclicProjectUtils.visit(res)) {
					continue;
				}
				UnitClass unit = (UnitClass) res;
				buf.append(unit.getClassName());
				buf.append(',');
			}
		}
		for (Iterator iter = resources.iterator(); iter.hasNext();) {
			Resource res = (Resource) iter.next();
			if (res instanceof CompositeResources) {
				CompositeResources c = (CompositeResources) res;
				buf.append(c.existedClassesString());
				buf.append(',');
			}
		}
		return buf.toString();
	}
	
	public String ignoredClassesString() {
		StringBuffer buf = new StringBuffer();
		if (!J2SCyclicProjectUtils.visit(this)) {
			return buf.toString();
		}
		if (resources == null) {
			this.load();
		}
		for (Iterator iter = resources.iterator(); iter.hasNext();) {
			Resource res = (Resource) iter.next();
			if (res instanceof CompositeResources) {
				if (!J2SCyclicProjectUtils.visit(res)) {
					continue;
				}
				CompositeResources c = (CompositeResources) res;
				buf.append(c.ignoredClassesString());
				buf.append(',');
			}
		}
		for (Iterator iter = abandonedResources.iterator(); iter.hasNext();) {
			Resource res = (Resource) iter.next();
			if (res instanceof UnitClass) {
				if (!J2SCyclicProjectUtils.visit(res)) {
					continue;
				}
				UnitClass unit = (UnitClass) res;
				buf.append(unit.getClassName());
				buf.append(',');
			}
		}
		return buf.toString();
	}
	
	public int getType() {
		return VARIABLE;
	}
}
