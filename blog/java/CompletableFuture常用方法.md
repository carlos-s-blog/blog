---
slug: Common methods for CompletableFuture
title: CompletableFuture常用方法
date: 2023-05-09
authors: carlos
tags: [Java]
keywords: [Java,多线程,异步]
description: CompletableFuture常用方法
---

<!-- truncate -->

## 1.创建异步任务

### CompletableFuture.runAsync():创建一个没有返回值的异步任务。
```
CompletableFuture<Void> runComplete = CompletableFuture.runAsync(()-> System.out.println("没有返回值的异步任务")); 
```

### CompletableFuture.supplyAsync():常见一个有返回值的异步任务。
```java
CompletableFuture<String> supportComplete = CompletableFuture.supplyAsync(()-> "有返回值的异步任务");
```

可以传入自定义的线程池执行任务:
```
ExecutorService executor = Executors.newCachedThreadPool(); 
CompletableFuture<Void> runComplete = CompletableFuture.runAsync(()-> System.out.println("没有返回值的异步任务"),executor); 
CompletableFuture<String> supportComplete = CompletableFuture.supplyAsync(()-> "有返回值的异步任务",executor);
```

## 2.异步任务完成之后的回调

### 1️⃣ thenRun/thenRunAsync

thenRun通俗点讲就是，做完一个任务后，再做第二个任务。某个任务执行完成后，执行回调方法，但是前后两个任务没有参数传递，第二个任务也没有返回值。

```
CompletableFuture<String> supportComplete = CompletableFuture.supplyAsync(()->{
    System.out.println("有返回值的异步任务"); 
    return "有返回值的异步任务"; 
}); 
CompletableFuture<Void> thenRun = supportComplete.thenRun(() -> System.out.println("完成任务之后的回调，没有参数也没有返回值")); 

System.out.println(thenRun.join());
```
**thenRun/thenRunAsync的区别**：

如果你执行第一个任务的时候，传入了一个自定义线程池：

-   调用thenRun方法执行第二个任务时，则第二个任务和第一个任务是共用同一个线程池。
-   调用thenRunAsync执行第二个任务时，则第一个任务使用的是你自己传入的线程池，第二个任务使用的是ForkJoin线程池。

### 2️⃣ thenAccept/thenAcceptAsync

thenAccept和thenAcceptAsync指的是做完第一个任务之后，将第一个任务的返回值作为参数传到thenAccept方法中，thenAccept和thenAcceptAsync没有返回值。

```
CompletableFuture<String> supportComplete = CompletableFuture.supplyAsync(()-> { 
    System.out.println("有返回值的异步任务");
    return "有返回值的异步任务";
}); 
CompletableFuture<Void> thenRun = supportComplete.thenAccept((s) -> System.out.println("完成任务之后的回调，有参数，参数为" + s + "没有返回值")); 

System.out.println(thenRun.join());
```
两者的区别依然是共用线程池或者是第二个任务用ForkJoin线程池的区别。

### 3️⃣ thenApply和thenApplyAsync

thenApply和thenApplyAsync指的是第一个任务执行完成后，执行第二个回调方法任务，会将该任务的执行结果，作为入参，传递到回调方法中，并且回调方法是有返回值的。
```
CompletableFuture<String> supportComplete = CompletableFuture.supplyAsync(()-> { 
    System.out.println("有返回值的异步任务");
    return "有返回值的异步任务"; 
});
CompletableFuture<String> thenRun = supportComplete.thenApplyAsync((s) -> { 
    System.out.println("完成任务之后的回调，有参数，参数为" + s + "有返回值");
    return "完成任务之后的回调，有参数，参数为" + s + "有返回值"; 
}); 

System.out.println(thenRun.join());
```
thenApply和thenApplyAsync的区别和上面两者一样。

### 4️⃣ exceptionally

exceptionally方法表示，某个任务执行异常时，执行的回调方法;并且有抛出异常作为参数，传递到回调方法。参数为异常，有返回值。
```
CompletableFuture<String> supportComplete = CompletableFuture.supplyAsync(()-> { 
    System.out.println("有返回值的异步任务"); 
    throw new RuntimeException(); 
}); 
CompletableFuture<String> exceptionFuture = supportComplete.exceptionally((e) -> { 
    e.printStackTrace();
    return "程序出现异常"; 
}); 
System.out.println(exceptionFuture.get());
```
### 5️⃣ whenComplete

whenComplete方法表示，某个任务执行完成后，执行的回调方法，无返回值；并且whenComplete方法的参数是上个任务的结果。
```
CompletableFuture<String> supportComplete = CompletableFuture.supplyAsync(()-> { 
    System.out.println("有返回值的异步任务"); 
    return "有返回值的异步任务"; 
}); 
CompletableFuture<String> whenComplete = supportComplete.whenComplete((e,throwable) -> {
    System.out.println(e); 
}); 
System.out.println(whenComplete.get());
```
whenComplete接收的参数为两个，第一个是上个任务的结果，另一个是异常。因此即使主任务有异常，依然会执行。

### 6️⃣：handle

handle和whenComplete差不多，都是表示某个任务执行完成后，执行的回调方法，handle方法的参数时上个任务的结果，但是handle是有返回值的，whenComplete没有返回值。
```
CompletableFuture<String> supportComplete = CompletableFuture.supplyAsync(()-> { 
    System.out.println("当前线程名称为:" + Thread.currentThread().getName()); 
    System.out.println("有返回值的异步任务"); 
    return "有返回值的异步任务"; 
});
CompletableFuture<String> handle = supportComplete.handle((e,throwable) -> { 
    System.out.println("当前线程名称为:" + Thread.currentThread().getName());
    System.out.println(e); 
    return "有返回值"; 
}); 
System.out.println(handle.get());
```
## 3.多任务组合处理：

### 1️⃣：AND组合关系：thenCombine / thenAcceptBoth / runAfterBoth

三者都表示：将两个CompletableFuture组合起来，只有这两个都正常执行完了，才会执行某个任务。

区别在于：

-   thenCombine：会将两个任务的执行结果作为方法入参，传递到指定方法中，且有返回值
-   thenAcceptBoth: 会将两个任务的执行结果作为方法入参，传递到指定方法中，且无返回值
-   runAfterBoth 不会把执行结果当做方法入参，且没有返回值。
```
thenCombine/ thenCombineAsync实例

CompletableFuture<String> completableFuture = CompletableFuture.supplyAsync(()->"第一个异步任务");
ExecutorService executorService = Executors.newFixedThreadPool(10); 
CompletableFuture<String> supportComplete = CompletableFuture.supplyAsync(() -> "第二个异步任务",executorService) 
.thenCombineAsync(completableFuture,(s, w) -> { 
    System.out.println(w); 
    System.out.println(s); 
    return "两个异步任务的组合"; },executorService); 
System.out.println(supportComplete.get()); 
executorService.shutdown();
```
### 2️⃣ OR 组合的关系：applyToEither / acceptEither / runAfterEither

三者都表示：将两个CompletableFuture组合起来，只要其中一个执行完了,就会执行某个任务。感觉业务应用场景不会很多

区别在于：

-   applyToEither：会将已经执行完成的任务，作为方法入参，传递到指定方法中，且有返回值
-   acceptEither: 会将已经执行完成的任务，作为方法入参，传递到指定方法中，且无返回值
-   runAfterEither：不会把执行结果当做方法入参，且没有返回值。
```
CompletableFuture<String> completableFuture = CompletableFuture.supplyAsync(()->{ 
    try { 
        Thread.sleep(2000);
    } catch (InterruptedException e) { 
        e.printStackTrace();
    }
    return "第一个异步任务"; 
}); 
ExecutorService executorService = Executors.newFixedThreadPool(10); 
CompletableFuture.supplyAsync(() -> "第二个异步任务",executorService) 
        .acceptEitherAsync(completableFuture, System.out::println,executorService); 
executorService.shutdown();
```
## 3️⃣ AllOf

所有任务都执行完成后，才执行 allOf返回的CompletableFuture。如果任意一个任务异常，allOf的CompletableFuture，执行get方法，会抛出异常。
```
CompletableFuture<Void> completableFuture = CompletableFuture.runAsync(()->{ System.out.println("第一个异步任务执行完了"); });
CompletableFuture<Void> runAsync = CompletableFuture.runAsync(() -> { System.out.println("第二个异步任务执行完了"); }); 
CompletableFuture.allOf(completableFuture,runAsync).whenComplete((a,b) -> { 
    System.out.println("finish");
});
```
### 4️⃣ AnyOf

任意一个任务执行完，就执行anyOf返回的CompletableFuture。如果执行的任务异常，anyOf的CompletableFuture，执行get方法，会抛出异常。
```
CompletableFuture<Void> completableFuture = CompletableFuture.runAsync(()->{ 
    try { 
        Thread.sleep(2000);
    } catch (InterruptedException e) { 
        e.printStackTrace();
    } 
    System.out.println("第一个异步任务执行完了"); 
}); 
CompletableFuture<Void> runAsync = CompletableFuture.runAsync(() -> { 
    System.out.println("第二个异步任务执行完了"); 
}); 
CompletableFuture.anyOf(completableFuture,runAsync).whenComplete((a,b) -> { 
    System.out.println("finish"); 
});
```
### 5️⃣ thenCompose

thenCompose方法会在某个任务执行完成后，将该任务的执行结果,作为方法入参,去执行指定的方法。该方法会返回一个新的CompletableFuture实例

-   如果该CompletableFuture实例的result不为null，则返回一个基于该result新的CompletableFuture实例；
-   如果该CompletableFuture实例为null，然后就执行这个新任务
```
CompletableFuture<String> completableFuture = CompletableFuture.completedFuture("第一个任务");
CompletableFuture<String> stringCompletableFuture = CompletableFuture.supplyAsync(() -> "第二个任务") 
.thenCompose(data -> { 
    System.out.println(data); 
    return completableFuture; 
}); 
System.out.println(stringCompletableFuture.get());
```
## 4.注意事项

### 1️⃣ Future需要获取返回值，才能获取异常信息

Future需要获取返回值，才能获取到异常信息。如果不加 get()/join()方法，看不到异常信息。

### 2️⃣CompletableFuture的get()方法是阻塞的。

如果使用它来获取异步调用的返回值，需要添加超时时间~

//反例  CompletableFuture.get(); //正例 CompletableFuture.get(5, TimeUnit.SECONDS);

### 3️⃣默认线程池的注意点

CompletableFuture代码中又使用了默认的线程池，处理的线程个数是电脑CPU核数-1。在大量请求过来的时候，处理逻辑复杂的话，响应会很慢。一般建议使用自定义线程池，优化线程池配置参数。

### 4️⃣自定义线程池时，注意饱和策略

CompletableFuture的get()方法是阻塞的，我们一般建议使用future.get(3, TimeUnit.SECONDS)。并且一般建议使用自定义线程池。

但是如果线程池拒绝策略是DiscardPolicy或者DiscardOldestPolicy，当线程池饱和时，会直接丢弃任务，不会抛弃异常。因此建议，CompletableFuture线程池策略最好使用AbortPolicy，然后耗时的异步线程，做好线程池隔离哈。