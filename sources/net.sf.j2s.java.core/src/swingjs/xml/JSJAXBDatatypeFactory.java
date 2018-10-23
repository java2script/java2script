package swingjs.xml;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.GregorianCalendar;

import javax.xml.datatype.XMLGregorianCalendar;

import org.apache.xerces.jaxp.datatype.DatatypeFactoryImpl;

public class JSJAXBDatatypeFactory extends DatatypeFactoryImpl {

	public JSJAXBDatatypeFactory() {
		super();
	}
	
    public XMLGregorianCalendar newXMLGregorianCalendar() {
        return new JSXMLGregorianCalendarImpl();
    }

	public XMLGregorianCalendar newXMLGregorianCalendar(final String lexicalRepresentation) {
		return new JSXMLGregorianCalendarImpl(lexicalRepresentation);
	}

	public XMLGregorianCalendar newXMLGregorianCalendar(final GregorianCalendar cal) {
		return new JSXMLGregorianCalendarImpl(cal);
	}

	public XMLGregorianCalendar newXMLGregorianCalendar(final int year, final int month, final int day, final int hour,
			final int minute, final int second, final int millisecond, final int timezone) {
		return new JSXMLGregorianCalendarImpl(year, month, day, hour, minute, second, millisecond, timezone);
	}

	public XMLGregorianCalendar newXMLGregorianCalendar(final BigInteger year, final int month, final int day,
			final int hour, final int minute, final int second, final BigDecimal fractionalSecond, final int timezone) {
		return new JSXMLGregorianCalendarImpl(year, month, day, hour, minute, second, fractionalSecond, timezone);
	}


}