package javajs.api;

import javajs.util.V3;

public interface EigenInterface {

  EigenInterface setM(double[][] n);

  double[] getEigenvalues();

  void fillFloatArrays(V3[] eigenVectors, float[] eigenValues);

  float[][] getEigenvectorsFloatTransposed();

}
