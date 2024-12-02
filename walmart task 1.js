
import java.util.ArrayList;

public class PowerOfTwoMaxHeap {
    private int power;
    private ArrayList<Integer> heap;

    public PowerOfTwoMaxHeap(int power) {
        if (power < 0) {
            throw new IllegalArgumentException("Power must be non-negative.");
        }
        this.power = power;
        this.heap = new ArrayList<>();
    }

    public void insert(int value) {
        heap.add(value);
        bubbleUp(heap.size() - 1);
    }

    public int popMax() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Cannot pop from an empty heap.");
        }
        int maxValue = heap.get(0);
        int lastValue = heap.remove(heap.size() - 1);
        if (!heap.isEmpty()) {
            heap.set(0, lastValue);
            sinkDown(0);
        }
        return maxValue;
    }

    private void bubbleUp(int index) {
        while (index > 0) {
            int parentIndex = (index - 1) / (1 << power);
            if (heap.get(index) > heap.get(parentIndex)) {
                swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    private void sinkDown(int index) {
        int maxIndex = index;
        int startChildIndex = (1 << power) * index + 1;
        int endChildIndex = startChildIndex + (1 << power);

        for (int i = startChildIndex; i < Math.min(endChildIndex, heap.size()); i++) {
            if (heap.get(i) > heap.get(maxIndex)) {
                maxIndex = i;
            }
        }

        if (maxIndex != index) {
            swap(index, maxIndex);
            sinkDown(maxIndex);
        }
    }

    private void swap(int index1, int index2) {
        int temp = heap.get(index1);
        heap.set(index1, heap.get(index2));
        heap.set(index2, temp);
    }

    public void printHeap() {
        System.out.println(heap);
    }

    public static void main(String[] args) {
        PowerOfTwoMaxHeap heap = new PowerOfTwoMaxHeap(2);
        heap.insert(10);
        heap.insert(20);
        heap.insert(5);
        heap.insert(30);
        heap.insert(25);
        heap.printHeap();
        System.out.println("Max: " + heap.popMax());
        heap.printHeap();
        System.out.println("Max: " + heap.popMax());
        heap.printHeap();
    }
}
