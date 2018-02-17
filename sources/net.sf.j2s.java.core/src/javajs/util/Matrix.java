package javajs.util;

/**
 * 
 * streamlined and refined for Jmol by Bob Hanson
 * 
 * from http://math.nist.gov/javanumerics/jama/
 * 
 * Jama = Java Matrix class.
 * 
 * @author The MathWorks, Inc. and the National Institute of Standards and
 *         Technology.
 * @version 5 August 1998
 */

public class Matrix implements Cloneable {

  public double[][] a;
  protected int m, n;

  /**
   * Construct a matrix quickly without checking arguments.
   * 
   * @param a
   *        Two-dimensional array of doubles or null
   * @param m
   *        Number of rows.
   * @param n
   *        Number of colums.
   */

  public Matrix(double[][] a, int m, int n) {
    this.a = (a == null ? new double[m][n] : a);
    this.m = m;
    this.n = n;
  }

  /**
   * Get row dimension.
   * 
   * @return m, the number of rows.
   */

  public int getRowDimension() {
    return m;
  }

  /**
   * Get column dimension.
   * 
   * @return n, the number of columns.
   */

  public int getColumnDimension() {
    return n;
  }

  /**
   * Access the internal two-dimensional array.
   * 
   * @return Pointer to the two-dimensional array of matrix elements.
   */

  public double[][] getArray() {
    return a;
  }

  /**
   * Copy the internal two-dimensional array.
   * 
   * @return Two-dimensional array copy of matrix elements.
   */

  public double[][] getArrayCopy() {
    double[][] x = new double[m][n];
    for (int i = m; --i >= 0;)
      for (int j = n; --j >= 0;)
        x[i][j] = a[i][j];
    return x;
  }

  /**
   * Make a deep copy of a matrix
   * 
   * @return copy
   */

  public Matrix copy() {
    Matrix x = new Matrix(null, m, n);
    double[][] c = x.a;
    for (int i = m; --i >= 0;)
      for (int j = n; --j >= 0;)
        c[i][j] = a[i][j];
    return x;
  }

  /**
   * Clone the Matrix object.
   */

  @Override
  public Object clone() {
    return copy();
  }

  /**
   * Get a submatrix.
   * 
   * @param i0
   *        Initial row index
   * @param j0
   *        Initial column index
   * @param nrows
   *        Number of rows
   * @param ncols
   *        Number of columns
   * @return submatrix
   * 
   */

  public Matrix getSubmatrix(int i0, int j0, int nrows, int ncols) {
    Matrix x = new Matrix(null, nrows, ncols);
    double[][] xa = x.a;
    for (int i = nrows; --i >= 0;)
      for (int j = ncols; --j >= 0;)
        xa[i][j] = a[i0 + i][j0 + j];
    return x;
  }

  /**
   * Get a submatrix for a give number of columns and selected row set.
   * 
   * @param r
   *        Array of row indices.
   * @param n
   *        number of rows 
   * @return submatrix
   */

  public Matrix getMatrixSelected(int[] r, int n) {
    Matrix x = new Matrix(null, r.length, n);
    double[][] xa = x.a;
    for (int i = r.length; --i >= 0;) {
      double[] b = a[r[i]];
      for (int j = n; --j >= 0;)
        xa[i][j] = b[j];
    }
    return x;
  }

  /**
   * Matrix transpose.
   * 
   * @return A'
   */

  public Matrix transpose() {
    Matrix x = new Matrix(null, n, m);
    double[][] c = x.a;
    for (int i = m; --i >= 0;)
      for (int j = n; --j >= 0;)
        c[j][i] = a[i][j];
    return x;
  }

  /**
   * add two matrices
   * @param b
   * @return new Matrix this + b
   */
  public Matrix add(Matrix b) {
    return scaleAdd(b, 1);
  }

  /**
   * subtract two matrices
   * @param b
   * @return new Matrix this - b
   */
  public Matrix sub(Matrix b) {
    return scaleAdd(b, -1);
  }
  
  /**
   * X = A + B*scale
   * @param b 
   * @param scale 
   * @return X
   * 
   */
  public Matrix scaleAdd(Matrix b, double scale) {
    Matrix x = new Matrix(null, m, n);
    double[][] xa = x.a;
    double[][] ba = b.a;
    for (int i = m; --i >= 0;)
      for (int j = n; --j >= 0;)
        xa[i][j] = ba[i][j] * scale + a[i][j];
    return x;
  }

  /**
   * Linear algebraic matrix multiplication, A * B
   * 
   * @param b
   *        another matrix
   * @return Matrix product, A * B or null for wrong dimension
   */

  public Matrix mul(Matrix b) {
    if (b.m != n)
      return null;
    Matrix x = new Matrix(null, m, b.n);
    double[][] xa = x.a;
    double[][] ba = b.a;
    for (int j = b.n; --j >= 0;)
      for (int i = m; --i >= 0;) {
        double[] arowi = a[i];
        double s = 0;
        for (int k = n; --k >= 0;)
          s += arowi[k] * ba[k][j];
        xa[i][j] = s;
      }
    return x;
  }

  /**
   * Matrix inverse or pseudoinverse
   * 
   * @return inverse (m == n) or pseudoinverse (m != n)
   */

  public Matrix inverse() {
    return new LUDecomp(m, n).solve(identity(m, m), n);
  }

  /**
   * Matrix trace.
   * 
   * @return sum of the diagonal elements.
   */

  public double trace() {
    double t = 0;
    for (int i = Math.min(m, n); --i >= 0;)
      t += a[i][i];
    return t;
  }

  /**
   * Generate identity matrix
   * 
   * @param m
   *        Number of rows.
   * @param n
   *        Number of columns.
   * @return An m-by-n matrix with ones on the diagonal and zeros elsewhere.
   */

  public static Matrix identity(int m, int n) {
    Matrix x = new Matrix(null, m, n);
    double[][] xa = x.a;
    for (int i = Math.min(m, n); --i >= 0;)
      xa[i][i] = 1;
    return x;
  }

  /**
   * similarly to M3/M4 standard rotation/translation matrix
   * we set a rotationTranslation matrix to be:
   * 
   * [   nxn rot    nx1 trans
   * 
   *     1xn  0     1x1 1      ]
   * 
   * 
   * @return rotation matrix
   */
  public Matrix getRotation() {
    return getSubmatrix(0, 0, m - 1, n - 1);
  }

  public Matrix getTranslation() {
    return getSubmatrix(0, n - 1, m - 1, 1);
  }

  public static Matrix newT(T3 r, boolean asColumn) {
    return (asColumn ? new Matrix(new double[][] { new double[] { r.x },
        new double[] { r.y }, new double[] { r.z } }, 3, 1) : new Matrix(
        new double[][] { new double[] { r.x, r.y, r.z } }, 1, 3));
  }

  @Override
  public String toString() {
    String s = "[\n";
    for (int i = 0; i < m; i++) {
      s += "  [";
      for (int j = 0; j < n; j++)
        s += " " + a[i][j];
      s += "]\n";
    }
    s += "]";
    return s;
  }

  /**
   * 
   * Edited down by Bob Hanson for minimum needed by Jmol -- just constructor
   * and solve
   * 
   * LU Decomposition.
   * <P>
   * For an m-by-n matrix A with m >= n, the LU decomposition is an m-by-n unit
   * lower triangular matrix L, an n-by-n upper triangular matrix U, and a
   * permutation vector piv of length m so that A(piv,:) = L*U. If m < n, then L
   * is m-by-m and U is m-by-n.
   * <P>
   * The LU decompostion with pivoting always exists, even if the matrix is
   * singular, so the constructor will never fail. The primary use of the LU
   * decomposition is in the solution of square systems of simultaneous linear
   * equations. This will fail if isNonsingular() returns false.
   */

  private class LUDecomp {

    /* ------------------------
       Class variables
     * ------------------------ */

    /**
     * Array for internal storage of decomposition.
     * 
     */
    private double[][] LU;

    /**
     * Internal storage of pivot vector.
     * 
     */
    private int[] piv;

    private int pivsign;

    /* ------------------------
       Constructor
     * ------------------------ */

    /**
     * LU Decomposition Structure to access L, U and piv.
     * @param m 
     * @param n 
     * 
     */

    protected LUDecomp(int m, int n) {
      
      // Use a "left-looking", dot-product, Crout/Doolittle algorithm.

      LU = getArrayCopy();
      piv = new int[m];
      for (int i = m; --i >= 0;)
        piv[i] = i;
      pivsign = 1;
      double[] LUrowi;
      double[] LUcolj = new double[m];

      // Outer loop.

      for (int j = 0; j < n; j++) {

        // Make a copy of the j-th column to localize references.

        for (int i = m; --i >= 0;)
          LUcolj[i] = LU[i][j];

        // Apply previous transformations.

        for (int i = m; --i >= 0;) {
          LUrowi = LU[i];

          // Most of the time is spent in the following dot product.

          int kmax = Math.min(i, j);
          double s = 0.0;
          for (int k = kmax; --k >= 0;)
            s += LUrowi[k] * LUcolj[k];

          LUrowi[j] = LUcolj[i] -= s;
        }

        // Find pivot and exchange if necessary.

        int p = j;
        for (int i = m; --i > j;)
          if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p]))
            p = i;
        if (p != j) {
          for (int k = n; --k >= 0;) {
            double t = LU[p][k];
            LU[p][k] = LU[j][k];
            LU[j][k] = t;
          }
          int k = piv[p];
          piv[p] = piv[j];
          piv[j] = k;
          pivsign = -pivsign;
        }

        // Compute multipliers.

        if (j < m & LU[j][j] != 0.0)
          for (int i = m; --i > j;)
            LU[i][j] /= LU[j][j];
      }
    }

    /* ------------------------
       default Methods
     * ------------------------ */

    /**
     * Solve A*X = B
     * 
     * @param b
     *        A Matrix with as many rows as A and any number of columns.
     * @param n 
     * @return X so that L*U*X = B(piv,:) or null for wrong size or singular matrix
     */

    protected Matrix solve(Matrix b, int n) {
      for (int j = 0; j < n; j++)
        if (LU[j][j] == 0)
          return null; // matrix is singular

      // Copy right hand side with pivoting
      int nx = b.n;
      Matrix x = b.getMatrixSelected(piv, nx);
      double[][] a = x.a;

      // Solve L*Y = B(piv,:)
      for (int k = 0; k < n; k++)
        for (int i = k + 1; i < n; i++)
          for (int j = 0; j < nx; j++)
            a[i][j] -= a[k][j] * LU[i][k];

      // Solve U*X = Y;
      for (int k = n; --k >= 0;) {
        for (int j = nx; --j >= 0;)
          a[k][j] /= LU[k][k];
        for (int i = k; --i >= 0;)
          for (int j = nx; --j >= 0;)
            a[i][j] -= a[k][j] * LU[i][k];
      }
      return x;
    }
  }

}
