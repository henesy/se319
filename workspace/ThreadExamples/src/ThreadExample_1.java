// GOALS 
// 1. Create Thread by Extending Thread
// 2. getName() gets name of thread
// 3. start() moves the thread to the ready queue 

public class ThreadExample_1 {

	public static void main(String[] args) {
	
		// create 100 threads array
		Thread[] threadArray = new Thread[100];
		for (int i = 0; i < 100; i++) {
			threadArray[i] = new MyThread("MyThread-");
		}
		System.out.println();

		// Start all the threads
		for (int i = 0; i < 100; i++) {
			threadArray[i].start();
		}
		System.out.println();

	}

}

class MyThread extends Thread {
	static int threadCount = 0;

	public MyThread(String name) {
		super(name + threadCount);
		threadCount++;
	}

	public void run() {
		System.out.println(this.getName() + " has started working");
		// fake random ampunt of work by random sleeping instead
		try {
			sleep((int) (Math.random() * 2000)); // Thread.sleep
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		System.out.println(this.getName() + " is done");
	}
}
