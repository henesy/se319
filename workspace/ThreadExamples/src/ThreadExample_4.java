// GOALS 
// 1. To show use of synchronized keyword to fix race condition



public class ThreadExample_4 {

	public static void main(String[] args) {
		// CREATE MULTIPLE THREADS
		Thread[] threadArray = new Thread[100];
		
		MyBuffer2 buff = new MyBuffer2(); // this is shared resource
		for (int i = 0; i < 100; i++) {
			threadArray[i] = new Thread(new MyAdder2(i+1, buff));
		}

		// START ALL THREADS
		for (int i = 0; i < 100; i++) {
			threadArray[i].start();
		}

		// WAIT FOR ALL THREADS TO DIE
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

class MyAdder2 implements Runnable {

	private MyBuffer2 buff;
	private int index;

	public MyAdder2(int i, MyBuffer2 buff) {
		index = i;
		this.buff = buff;
	}

	public void run() {
		buff.add(index);
	}
}

class MyBuffer2 {

	int sum = 0;

	synchronized public void add(int i) {
		int s;
		s = sum + i; // READ SUM
		
		// THIS ALLOWS A GAP BETWEEN READ AND WRITE TO SHARED VARIABLE SUM
		try { Thread.sleep((int)(Math.random()*100)); } 
		catch (InterruptedException e) { e.printStackTrace(); }
		
		sum = s; // WRITE TO SUM

	} // end add

}