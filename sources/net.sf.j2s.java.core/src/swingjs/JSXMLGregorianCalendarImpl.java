package swingjs;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.GregorianCalendar;

import javax.xml.datatype.DatatypeConstants;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.namespace.QName;

import org.apache.xerces.jaxp.datatype.XMLGregorianCalendarImpl;

@SuppressWarnings("serial")
public class JSXMLGregorianCalendarImpl extends XMLGregorianCalendarImpl {

	QName xmlSchema;

	public void setXMLSchemaType(String name) {
		switch (name) {
		case "dateTime":
			xmlSchema = DatatypeConstants.DATETIME;
			break;
		case "time":
			xmlSchema = DatatypeConstants.TIME;
			break;
		case "date":
			xmlSchema = DatatypeConstants.DATE;
			break;
		case "gYearMonth":
			xmlSchema = DatatypeConstants.GYEARMONTH;
			break;
		case "gMonthDay":
			xmlSchema = DatatypeConstants.GMONTHDAY;
			break;
		case "gYear":
			xmlSchema = DatatypeConstants.GYEAR;
			break;
		case "gMonth":
			xmlSchema = DatatypeConstants.GMONTH;
			break;
		case "gDay":
			xmlSchema = DatatypeConstants.GDAY;
			break;
		case "duration":
			xmlSchema = DatatypeConstants.DURATION;
			break;
		case "dayTimeDuration":
			xmlSchema = DatatypeConstants.DURATION_DAYTIME;
			break;
		case "yearMonthDuration":
			xmlSchema = DatatypeConstants.DURATION_YEARMONTH;
			break;
		}
	}

	public JSXMLGregorianCalendarImpl() {
		super();
	}

	public JSXMLGregorianCalendarImpl(String lexicalRepresentation) {
		super(lexicalRepresentation);
	}

	public JSXMLGregorianCalendarImpl(GregorianCalendar cal) {
		super(cal);
	}

	public JSXMLGregorianCalendarImpl(BigInteger year, int month, int day, int hour, int minute, int second,
			BigDecimal fractionalSecond, int timezone) {
		super(year, month, day, hour, minute, second, fractionalSecond, timezone);
	}

	public JSXMLGregorianCalendarImpl(int year, int month, int day, int hour, int minute, int second, int millisecond,
			int timezone) {
		super(year, month, day, hour, minute, second, millisecond, timezone);
	}

	public QName getXMLSchemaType() {
		return (xmlSchema == null ? super.getXMLSchemaType() : xmlSchema);
	}

}
