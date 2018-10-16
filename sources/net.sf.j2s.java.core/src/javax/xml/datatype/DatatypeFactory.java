package javax.xml.datatype;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.GregorianCalendar;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import swingjs.api.Interface;

/**
 * hand written based on API documentation
 * 
 * Does not use BigDecimal
 * 
 * @author hansonr
 *
 */

public abstract class DatatypeFactory {

	private BigInteger bigI(int x) {
		return (x == DatatypeConstants.FIELD_UNDEFINED ? null : BigInteger.valueOf(x));
	}

	private BigDecimal bigD(int x) {
		return (x == DatatypeConstants.FIELD_UNDEFINED ? null : BigDecimal.valueOf(x));
	}

	protected DatatypeFactory() {
	}

	public static DatatypeFactory newInstance() throws DatatypeConfigurationException {
		return (DatatypeFactory) Interface.getInstance("swingjs.xml.JSJAXBDatatypeFactory", false);
	}

	public abstract Duration newDuration(String s);

	public abstract Duration newDuration(long ms);

	public abstract Duration newDuration(boolean isPositive, BigInteger years, BigInteger months, BigInteger days,
			BigInteger hours, BigInteger minutes, BigDecimal seconds);

	public Duration newDuration(boolean isPositive, int years, int months, int days, int hours, int minutes,
			int seconds) {
		return newDuration(isPositive, bigI(years), bigI(months), bigI(days), bigI(hours), bigI(minutes), bigD(seconds));
	}

	public Duration newDurationDayTime(String s) {
		if (s == null) {
			throw new NullPointerException("DatatypeFactory.newDurationDayTime null parameter");
		}
		return newDuration(s);
	}

	public Duration newDurationDayTime(long ms) {
		return newDuration(ms);
	}

	public Duration newDurationDayTime(boolean isPositive, BigInteger day, BigInteger hour, BigInteger minute,
			BigInteger second) {
		return newDuration(isPositive, null, null, day, hour, minute, 
				(second == null ? null : new BigDecimal(second)));
	}

	public Duration newDurationDayTime(boolean isPositive, int day, int hour, int minute, int second) {
		return newDurationDayTime(isPositive, bigI(day), bigI(hour),
				bigI(minute), bigI(second));
	}

	public Duration newDurationYearMonth(String s) {
		if (s == null) {
			throw new NullPointerException("DatatypeFactory.newDerationYearMonth null value");
		}
		return newDuration(s);
	}

	public Duration newDurationYearMonth(long ms) {
		Duration d = newDuration(ms);
		BigInteger years = (BigInteger) d.getField(DatatypeConstants.YEARS);
		BigInteger months = (BigInteger) d.getField(DatatypeConstants.MONTHS);
		return newDurationYearMonth((d.getSign() == -1), years, months);
	}

	public Duration newDurationYearMonth(boolean isPositive, BigInteger year, BigInteger month) {
		return newDuration(isPositive, year == null ? BigInteger.ZERO : year, month == null ? BigInteger.ZERO : month,
				null, null, null, null);
	}

	public Duration newDurationYearMonth(boolean isPositive, int year, int month) {
		return newDurationYearMonth(isPositive, bigI(year), bigI(month));
	}

	public abstract XMLGregorianCalendar newXMLGregorianCalendar();
	public abstract XMLGregorianCalendar newXMLGregorianCalendar(String s);
	public abstract XMLGregorianCalendar newXMLGregorianCalendar(GregorianCalendar cal);
	public abstract XMLGregorianCalendar newXMLGregorianCalendar(BigInteger year, int month, int day, int hour,
			int minute, int second, BigDecimal fractionalSecond, int timezone);
	
	public abstract XMLGregorianCalendar newXMLGregorianCalendar(int year, int month, int day, int hour, int minute, int second,
			int millisecond, int timezone);

	public XMLGregorianCalendar newXMLGregorianCalendarDate(int year, int month, int day, int timezone) {

		return newXMLGregorianCalendar(year, month, day, DatatypeConstants.FIELD_UNDEFINED,
				DatatypeConstants.FIELD_UNDEFINED, 
				DatatypeConstants.FIELD_UNDEFINED, 
				DatatypeConstants.FIELD_UNDEFINED, 
				timezone);
	}

	public XMLGregorianCalendar newXMLGregorianCalendarTime(int hours, int minutes, int seconds, int timezone) {

		return newXMLGregorianCalendar(DatatypeConstants.FIELD_UNDEFINED, // Year
				DatatypeConstants.FIELD_UNDEFINED, // Month
				DatatypeConstants.FIELD_UNDEFINED, // Day
				hours, minutes, seconds, 
				DatatypeConstants.FIELD_UNDEFINED, // Millisecond
				timezone);
	}

	public XMLGregorianCalendar newXMLGregorianCalendarTime(int hours, int minutes, int seconds,
			BigDecimal fractionalSeconds, int timezone) {

		return newXMLGregorianCalendar(null,
				DatatypeConstants.FIELD_UNDEFINED,
				DatatypeConstants.FIELD_UNDEFINED,
				hours, minutes, seconds, fractionalSeconds, timezone);
	}

	public XMLGregorianCalendar newXMLGregorianCalendarTime(int hours, int minutes, int seconds, int milliseconds,
			int timezone) {
		BigDecimal bdMS = null; // undefined value
		if (milliseconds != DatatypeConstants.FIELD_UNDEFINED) {
			if (milliseconds < 0 || milliseconds > 1000) {
				throw new IllegalArgumentException("milliseconds must be between 0 and 1000");
			}
			bdMS = bigD(milliseconds);
		}
		return newXMLGregorianCalendarTime(hours, minutes, seconds, bdMS, timezone);
	}
}
