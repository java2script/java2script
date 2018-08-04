package test.baeldung.doublecolon.function;

import test.baeldung.doublecolon.Computer;

@FunctionalInterface
public interface ComputerPredicate {

    boolean filter(Computer c);

}
