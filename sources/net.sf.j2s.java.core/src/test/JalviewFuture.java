package test;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class JalviewFuture {

  public static void main(String[] args) {
    ExecutorService executor = Executors.newSingleThreadExecutor();
    Future<?> f = executor.submit(() -> {
      System.out.println("runnable is running");
    });
    System.out.println("Future " + f + " started");
    System.out.println(f.toString() + " done=" + f.isDone());
  }

}