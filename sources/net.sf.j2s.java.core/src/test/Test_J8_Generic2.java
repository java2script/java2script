package test;

import java.util.Arrays;
import java.util.Objects;
import java.util.Spliterator;
import java.util.Spliterators;
import java.util.function.Consumer;
import java.util.function.IntConsumer;

public class Test_J8_Generic2 {
	
    public interface J8OfInt {

        boolean tryAdvance(IntConsumer action);
        void testing(int i, IntConsumer consumer, long j);

        /**
         * {@inheritDoc}
         * @implSpec
         * If the action is an instance of {@code IntConsumer} then it is cast
         * to {@code IntConsumer} and passed to
         * {@link #tryAdvance(java.util.function.IntConsumer)}; otherwise
         * the action is adapted to an instance of {@code IntConsumer}, by
         * boxing the argument of {@code IntConsumer}, and then passed to
         * {@link #tryAdvance(java.util.function.IntConsumer)}.
         */
        default boolean tryAdvance(Consumer<? super Integer> action) {
        	testing(0, null, 0);
            if (action instanceof IntConsumer) {
                return tryAdvance((IntConsumer) action);
            }
            else {
                return tryAdvance((IntConsumer) action::accept);
            }
        }

    }

	private static abstract class J8EmptySpliterator<T, S extends Spliterator<T>, C> {

        J8EmptySpliterator() { }

        public void testing(int i, C consumer, long j) {
        	System.out.println("testing");
        }
        /**
         * This method must be implemented as tryAdvance$java_util_function_IntConsumer
         * within OfInt. 
         * @param consumer
         * @return
         */
        public boolean tryAdvance(C consumer) {
            Objects.requireNonNull(consumer);
            return false;
        }

		private static final class OfInt extends J8EmptySpliterator<Integer, Spliterator.OfInt, IntConsumer>
				implements J8OfInt {
			OfInt() {}
	        public long estimateSize() {
	        	testing(0, null, 0);
	            return 0;
	        }

	        public int characteristics() {
	            return Spliterator.SIZED | Spliterator.SUBSIZED;
	        }
	        
	        public Spliterator.OfInt trySplit() {
	            return null;
	        }

		}

	}

	public static void main(String[] args) {

		IntConsumer action = new IntConsumer() {

			@Override
			public void accept(int value) {
				System.out.println(value + " accepted");
			}
			
		};
		new J8EmptySpliterator.OfInt().tryAdvance(action);
		
		Arrays.spliterator(new int[] {1,2,3}).forEachRemaining(action);
		Arrays.spliterator(new int[] {1,2,3}).tryAdvance(action);
		Spliterators.emptyIntSpliterator().tryAdvance(action);
		Spliterators.emptyIntSpliterator().forEachRemaining(action);

		
//		Spliterators.emptyIntSpliterator().forEachRemaining(action);
		System.out.println("Test_J8_Generic2 OK");
	}
}
