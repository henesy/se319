// GOALS 
// 1. Create Thread by implementing Runnable (second way to create thread!)
// 2. getName() gets name of thread
// 3. start() moves the thread to the ready queue 

// Advantage of using Runnable - you can have ANY object implement Runnable
// and then be able to run it.
// Objects which already extend some other class cannot again extend Thread
// and do not need to - because you can use Runnable.
//


public class ThreadExample_2 {

	public static void main(String[] args) {
		// create 100 threads array
		Thread[] threadArray = new Thread[100];
		for (int i = 0; i < 100; i++) {
			threadArray[i] = new Thread (new MyRunnable(), "MyRunnable-"+i);
		}
		
		// Start all the threads
		for (int i = 0; i < 100; i++) {
			threadArray[i].start();
		}

	}
	
	

}

class MyRunnable implements Runnable {

	public void run() {
	   System.out.println(Thread.currentThread().getName() + " has started working");
	   //fake random ampunt of work by random sleeping instead
		try {
			Thread.sleep((int) (Math.random() * 2000));
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		   
		System.out.println(Thread.currentThread().getName() + " is done");
	}
}
