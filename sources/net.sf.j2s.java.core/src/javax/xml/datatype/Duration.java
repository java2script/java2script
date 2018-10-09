package javax.xml.datatype;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import javax.xml.namespace.QName;

public abstract class Duration {

    public Duration() {
    }

	public QName getXMLSchemaType() {

		boolean yearSet = isSet(DatatypeConstants.YEARS);
		boolean monthSet = isSet(DatatypeConstants.MONTHS);
		boolean daySet = isSet(DatatypeConstants.DAYS);
		boolean hourSet = isSet(DatatypeConstants.HOURS);
		boolean minuteSet = isSet(DatatypeConstants.MINUTES);
		boolean secondSet = isSet(DatatypeConstants.SECONDS);

		if (yearSet && monthSet && daySet && hourSet && minuteSet && secondSet) {
			return DatatypeConstants.DURATION;
		}

		if (!yearSet && !monthSet && daySet && hourSet && minuteSet && secondSet) {
			return DatatypeConstants.DURATION_DAYTIME;
		}

		if (yearSet && monthSet && !daySet && !hourSet && !minuteSet && !secondSet) {
			return DatatypeConstants.DURATION_YEARMONTH;
		}

		throw new IllegalStateException("javax.xml.datatype.Duration exception");
	}

    public abstract int getSign();

    public int getYears() {
        return getField(DatatypeConstants.YEARS).intValue();
    }

    public int getMonths() {
        return getField(DatatypeConstants.MONTHS).intValue();
    }

    public int getDays() {
        return getField(DatatypeConstants.DAYS).intValue();
    }

    public int getHours() {
        return getField(DatatypeConstants.HOURS).intValue();
    }

    public int getMinutes() {
        return getField(DatatypeConstants.MINUTES).intValue();
    }

    public int getSeconds() {
        return getField(DatatypeConstants.SECONDS).intValue();
    }

    public long getTimeInMillis(final Calendar startInstant) {
        Calendar cal = (Calendar) startInstant.clone();
        addTo(cal);
        return getCalendarTimeInMillis(cal)
                    - getCalendarTimeInMillis(startInstant);
    }

    public long getTimeInMillis(final Date startInstant) {
        Calendar cal = new GregorianCalendar();
        cal.setTime(startInstant);
        this.addTo(cal);
        return getCalendarTimeInMillis(cal) - startInstant.getTime();
    }

    private static long getCalendarTimeInMillis(final Calendar cal) {
        return cal.getTime().getTime();
    }

    public abstract Number getField(final DatatypeConstants.Field field);

    public abstract boolean isSet(final DatatypeConstants.Field field);

    public abstract Duration add(final Duration rhs);

    public abstract void addTo(Calendar calendar);

    public void addTo(Date date) {

        if (date == null) {
            throw new NullPointerException("Duration.addTo(Date): date is null");
        }

        Calendar cal = new GregorianCalendar();
        cal.setTime(date);
        addTo(cal);
        date.setTime(getCalendarTimeInMillis(cal));
    }

    public Duration subtract(final Duration rhs) {
        return add(rhs.negate());
    }

    public Duration multiply(int factor) {
        return multiply(new BigDecimal(String.valueOf(factor)));
    }

    public abstract Duration multiply(final BigDecimal factor);

    public abstract Duration negate();

    public abstract Duration normalizeWith(final Calendar startTimeInstant);

    public abstract int compare(final Duration duration);

    public boolean isLongerThan(final Duration duration) {
        return compare(duration) == DatatypeConstants.GREATER;
    }

    public boolean isShorterThan(final Duration duration) {
        return compare(duration) == DatatypeConstants.LESSER;
    }

    public boolean equals(final Object duration) {

        if (duration == null || !(duration instanceof Duration)) {
            return false;
        }

        return compare((Duration) duration) == DatatypeConstants.EQUAL;
    }

    public abstract int hashCode();

    public String toString() {

        StringBuffer buf = new StringBuffer();

        if (getSign() < 0) {
            buf.append('-');
        }
        buf.append('P');

        BigInteger years = (BigInteger) getField(DatatypeConstants.YEARS);
        if (years != null) {
            buf.append(years + "Y");
        }

        BigInteger months = (BigInteger) getField(DatatypeConstants.MONTHS);
        if (months != null) {
            buf.append(months + "M");
        }

        BigInteger days = (BigInteger) getField(DatatypeConstants.DAYS);
        if (days != null) {
            buf.append(days + "D");
        }

        BigInteger hours = (BigInteger) getField(DatatypeConstants.HOURS);
        BigInteger minutes = (BigInteger) getField(DatatypeConstants.MINUTES);
        BigDecimal seconds = (BigDecimal) getField(DatatypeConstants.SECONDS);
        if (hours != null || minutes != null || seconds != null) {
            buf.append('T');
            if (hours != null) {
                buf.append(hours + "H");
            }
            if (minutes != null) {
                buf.append(minutes + "M");
            }
            if (seconds != null) {
                buf.append(toString(seconds) + "S");
            }
        }

        return buf.toString();
    }

    private String toString(BigDecimal bd) {
        String intString = bd.unscaledValue().toString();
        int scale = bd.scale();

        if (scale == 0) {
            return intString;
        }

        StringBuffer buf;
        int insertionPoint = intString.length() - scale;
        if (insertionPoint == 0) { /* Point goes right before intVal */
            return "0." + intString;
        } else if (insertionPoint > 0) { /* Point goes inside intVal */
            buf = new StringBuffer(intString);
            buf.insert(insertionPoint, '.');
        } else { /* We must insert zeros between point and intVal */
            buf = new StringBuffer(3 - insertionPoint + intString.length());
            buf.append("0.");
            for (int i = 0; i < -insertionPoint; i++) {
                buf.append('0');
            }
            buf.append(intString);
        }
        return buf.toString();
    }

}
