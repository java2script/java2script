package net.sf.j2s.core.hotspot;

public class Java2ScriptCompiledItem {

	private long time;
	private long id;
	private String name;
	
	public Java2ScriptCompiledItem(long time, long id, String name) {
		super();
		this.time = time;
		this.id = id;
		this.name = name;
	}

	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean equals(Object obj) {
		if (this == obj) return true;
		if (obj == null || !(obj instanceof Java2ScriptCompiledItem)) {
			return false;
		}
		Java2ScriptCompiledItem item = (Java2ScriptCompiledItem) obj;
		if (time != item.time || id != item.id) {
			return false;
		}
		if (name != null) {
			return name.equals(item.name);
		} else {
			return item.name == null;
		}
	}

	public int hashCode() {
		if (name != null) {
			return (int) (name.hashCode() + time + id);
		} else {
			return (int) (time + id);
		}
	}
	
}
