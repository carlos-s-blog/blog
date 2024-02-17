---
slug: Synchronized synchronization mechanism in Java multi-threaded environment
title: Java多线程环境下的同步机制Synchronized
date: 2022-01-01
tags: [Java]
authors: carlos
keywords: [Java,多线程，并发]
description: Java多线程环境下的同步机制Synchronized
---

大家有没有想过一个问题，Java中的`++`操作是不是线程安全的呢，也就是说在多线程情况下，多个线程一起去执行`++`操作，得到的结果会不会是我们所预期的结果呢，可以写个demo去验证一下。

<!-- truncate -->

```java
public static int count = 0;
	
public static void main(String[] args) {
	for (int j = 0; j < 10000; j++) {
		new Thread(new Runnable() {
			@Override
			public void run() {
				add();
			}
		}).start();
	}
	try {
		Thread.sleep(200);
	} catch (InterruptedException e) {
		e.printStackTrace();
	}
	System.out.println(count);
}

public static void add(){
	count++;
}
```
很明显，Java中的`++`操作，并不是线程安全的。
这就涉及到了多线程环境下，如何才能保证在操作同一个变量或者方法时保证线程安全。

# Synchronized
## 什么是Synchronized？
Synchronized关键字，就是利用一个特定的对象设置一个锁(lock)，在多线程并发访问的时候，只允许一个线程可以获得这个锁，并执行代码，等到代码执行完毕后，释放锁，再继续由其他线程争抢。

## Synchronized的使用
我们可以稍微改造一下上面的demo，让`++`操作变成线程安全的。

```java
	public static int count = 0;
	
	public static void main(String[] args) {
		for (int j = 0; j < 10000; j++) {
			new Thread(new Runnable() {
				@Override
				public void run() {
					add();
				}
			}).start();
		}
		try {
			Thread.sleep(200);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println(count);
	}

	public synchronized static void add(){
		count++;
	}
```
只是做个一个很小的改动，就是在add()方法中加入**synchronized**关键字
多次执行得到的结果都是**10000**，是符合我们预期的，add()方法也变成了一个线程安全的方法。

## Synchronized的使用场景
Synchronized有三种不同的使用场景，同时也对应着不同的锁对象。

### 1.Synchronized代码块
将上面demo的add()方法改造一下
```java
	public static void add(){
		Object o = new Object(); //锁对象
		synchronized (o){
			count++;
		}
	}
```
定义一个**Object**对象，将**Object**作为锁对象，只会有一个线程获得这个锁对象，执行`++`操作，别的线程需要等待锁对象被释放时候，争抢这个锁对象，获得锁对象的才能继续执行`++`。

### 2.Synchronized方法

```java
public synchronized void add(){
		...
		...
}
```

在这个**add()**方法的锁对象又是什么呢，很明显，就是**this**当前对象，线程获得的是当先对象。

### 3.Synchronized静态方法
```java
		public synchronized static void add(){
		count++;
	}
```
最后一种就是demo中的add()方法，这时的锁对象就是当前类的字节码对象，因为是静态方法，静态方法是属于这个类的，所以锁对象就是当前类的字节码对象。

## 总结

```
Synchronized使用在代码块中，锁对象可以是任意对象。
Synchronized使用在方法中，锁对象为当前对象this。
Synchronized使用在静态方法中，锁对象为当前类的字节码对象。
```

# 常见的使用Synchronized类

**Vector**是线程安全的,**ArrayList**、**LinkedList**是线程不安全的
**Properties**是线程安全的，**HashSet**、**TreeSet**是不安全的
**StringBuffer**是线程安全的,**StringBuilder**是线程不安全的
**HashTable**是线程安全的,**HashMap**是线程不安全的

# 四、总结
**Synchronized**虽然可以保证多线程共享数据的数据安全，但是如果使用不当，线程长期持有锁对象，未及时得到释放，很容易造成死锁问题，
而且在性能问题上，**Synchronized**对性能也会有一定的影响，所以请慎用**Synchronized**。
