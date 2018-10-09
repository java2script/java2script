
package javax.xml.datatype;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.GregorianCalendar;
import java.util.TimeZone;

import javax.xml.namespace.QName;

public abstract class XMLGregorianCalendar implements Cloneable {
	public XMLGregorianCalendar() {
	}

	public abstract void clear();

	public abstract void reset();

	public abstract void setYear(BigInteger year);

	public abstract void setYear(int year);

	public abstract void setMonth(int month);

	public abstract void setDay(int day);

	public abstract void setTimezone(int offset);

	public abstract void setHour(int hour);

	public abstract void setMinute(int minute);

	public abstract void setSecond(int second);

	public abstract void setMillisecond(int millisecond);

	public abstract void setFractionalSecond(BigDecimal fractional);

	public abstract BigInteger getEon();

	public abstract int getYear();

	public abstract BigInteger getEonAndYear();

	public abstract int getMonth();

	public abstract int getDay();

	public abstract int getTimezone();

	public abstract int getHour();

	public abstract int getMinute();

	public abstract int getSecond();

	public abstract BigDecimal getFractionalSecond();

	public abstract int compare(XMLGregorianCalendar xmlGregorianCalendar);

	public abstract XMLGregorianCalendar normalize();

	public abstract String toXMLFormat();

	public abstract QName getXMLSchemaType();

	public abstract boolean isValid();

	public abstract void add(Duration duration);

	public abstract GregorianCalendar toGregorianCalendar();

// not supported	public abstract GregorianCalendar toGregorianCalendar(TimeZone timezone, Locale aLocale,
//			XMLGregorianCalendar defaults);
	public abstract TimeZone getTimeZone(int defaultZoneoffset);

	public abstract Object clone();

	
	public int getMillisecond() {
		BigDecimal f = getFractionalSecond();
		return (f == null ? DatatypeConstants.FIELD_UNDEFINED
				: f.movePointRight(3).intValue());
	}
	
	public void setTime(int hour, int minute, int second) {
		setTime(hour, minute, second, null);
	}

	public void setTime(int hour, int minute, int second, BigDecimal fractional) {
		setHour(hour);
		setMinute(minute);
		setSecond(second);
		setFractionalSecond(fractional);
	}

	public void setTime(int hour, int minute, int second, int millisecond) {
		setHour(hour);
		setMinute(minute);
		setSecond(second);
		setMillisecond(millisecond);
	}

	public boolean equals(Object obj) {
		if (obj == null || !(obj instanceof XMLGregorianCalendar)) {
			return false;
		}
		return compare((XMLGregorianCalendar) obj) == DatatypeConstants.EQUAL;
	}

	public int hashCode() {
		int timezone = getTimezone();
		if (timezone == DatatypeConstants.FIELD_UNDEFINED) {
			timezone = 0;
		}
		XMLGregorianCalendar gc = this;
		if (timezone != 0) {
			gc = normalize();
		}
		return gc.getYear() + gc.getMonth() + gc.getDay() + gc.getHour() + gc.getMinute() + gc.getSecond();
	}

	public String toString() {
		return toXMLFormat();
	}

}
