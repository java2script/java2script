package com.falstad;

public class Complex {
	public double re, im, mag, phase;

	public Complex() {
		re = im = mag = phase = 0;
	}

	public double magSquared() {
		return mag * mag;
	}

	public void set(Complex c) {
		re = c.re;
		im = c.im;
		mag = c.mag;
		phase = c.phase;
	}

	public void setRe(double r) {
		re = r;
		im = 0;
		setMP();
	}

	public Complex setReIm(double r, double i) {
		re = r;
		im = i;
		setMP();
		return this;
	}

	public void setMagPhase(double magnitude, double phase) {
		mag = magnitude;
		this.phase = phase;
		re = magnitude * Math.cos(phase);
		im = magnitude * Math.sin(phase);
	}

	public void add(Complex c) {
		re += c.re;
		im += c.im;
		setMP();
	}

	public void addRe(double r) {
		re += r;
		setMP();
	}

	public void addReIm(double r, double i) {
		re += r;
		im += i;
		setMP();
	}

	/**
	 * Quick add without setting the magnitude or phase.
	 * Must be followed by setMP() at some point.
	 * 
	 * @param r
	 * @param i
	 */
	public void addQuick(double r, double i) {
		re += r;
		im += i;
	}

	public void subtract(Complex c) {
		re -= c.re;
		im -= c.im;
		setMP();
	}

	public void mult(Complex c) {
		multReIm(c.re, c.im);
	}

	public void multRe(double c) {
		re *= c;
		im *= c;
		mag *= c;
	}

	public void multReIm(double r, double i) {
		setReIm(re * r - im * i, re * i + im * r);
	}

	public void divide(Complex c) {
		double n = c.re * c.re + c.im * c.im;
		multReIm(c.re / n, -c.im / n);
	}

	public void scaleAdd(double x, Complex z) {
		re += z.re * x;
		im += z.im * x;
		setMP();
	}

	public void scaleAdd2(double x, Complex c1, Complex c2) {
		re += x * (c1.re * c2.re - c1.im * c2.im);
		im += x * (c1.re * c2.im + c1.im * c2.re);
		setMP();
	}

	public void square() {
		setReIm(re * re - im * im, 2 * re * im);
	}

	public void sqrt() {
		setMagPhase(Math.sqrt(mag), phase * .5);
	}

	public void recip() {
		double n = re * re + im * im;
		setReIm(re / n, -im / n);
	}

	public void rotate(double a) {
		setMagPhase(mag, (phase + a) % (2 * Math.PI));
	}

	public void conjugate() {
		im = -im;
		phase = -phase;
	}

	public void pow(double p) {
		phase *= p;
		double abs = Math.pow(re * re + im * im, p * .5);
		setMagPhase(abs, phase);
	}

	@Override
	public String toString() {
		return re + "+" + im + "i";
	}

	public void setMP() {
		mag = Math.sqrt(re * re + im * im);
		phase = Math.atan2(im, re);
	}

	public void log() {
	    setReIm(java.lang.Math.log(re*re+im*im),
		java.lang.Math.atan2(im, re));
	}
	void arcsin() {
	    Complex z2 = new Complex();
	    z2.set(this);
	    z2.square();
	    z2.multRe(-1);
	    z2.addRe(1);
	    z2.pow(.5);
	    multReIm(0, 1);
	    add(z2);
	    log();
	    multReIm(0, -1);
	}

}