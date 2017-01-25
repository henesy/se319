// GOALS 
// 1. To show race condition causing problems when threads use same resource
// sum of numbers 1+2+...+100 should be 5050

public class ThreadExample_3 {

	public static void main(String[] args) {
		// CREATE MULTIPLE THREADS
		Thread[] threadArray = new Thread[100];
		
		MyBuffer buff = new MyBuffer(); // this is shared resource
		for (int i = 0; i < 100; i++) {
			threadArray[i] = new Thread(new MyAdder(i+1, buff));
		}

		// START ALL THREADS
		for (int i = 0; i < 100; i++) {
			threadArray[i].start();
		}

		// WAIT FOR ALL THREADS TO DIE (USING JOIN)
		try {
			for (int i = 0; i < 100; i++) {
				threadArray[i].join();
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		System.out.println("All threads are dead, sum should be 5050 but is : " + buff.sum);

	}
}

class MyAdder implements Runnable {

	private MyBuffer buff;
	private int index;

	public MyAdder(int i, MyBuffer buff) {
		index = i;
		this.buff = buff;
	}

	public void run() {
		buff.add(index);
	}
}

class MyBuffer {

	int sum = 0;

	public void add(int i) {
		int s;
		s = sum + i; // READ SUM
		
		// THIS ALLOWS A GAP BETWEEN READ AND WRITE TO SHARED VARIABLE SUM
		// forces context switches
		try { Thread.sleep((int)(Math.random()*100)); } 
		catch (InterruptedException e) { e.printStackTrace(); }
		
		sum = s; // WRITE TO SUM

	} // end add

}
