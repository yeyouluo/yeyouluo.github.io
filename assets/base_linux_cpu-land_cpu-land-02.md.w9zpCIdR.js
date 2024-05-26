import{_ as l,c as i,o as t,a3 as n}from"./chunks/framework.BYhES31N.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"base/linux/cpu-land/cpu-land-02.md","filePath":"base/linux/cpu-land/cpu-land-02.md","lastUpdated":1716462420000}'),o={name:"base/linux/cpu-land/cpu-land-02.md"},s=n('<h3 id="第二章-时间片调度" tabindex="-1">第二章：时间片调度 <a class="header-anchor" href="#第二章-时间片调度" aria-label="Permalink to &quot;第二章：时间片调度&quot;">​</a></h3><blockquote><p>这篇文章是关于操作系统如何通过时间片轮转调度（timeslice round-robin scheduling）来实现多任务处理的。</p></blockquote><p><strong>1. 多任务处理的挑战：</strong></p><ul><li>假设你在构建一个操作系统，用户需要同时运行多个程序。</li><li>你的CPU不支持多核处理，只能一次执行一个指令。</li></ul><p><strong>2. 模拟并行性：</strong></p><ul><li>通过让进程轮流在CPU上运行，可以模拟并行性。</li><li>通过周期性地在进程间切换并执行每个进程的几个指令，可以使得所有进程都保持响应，而没有单一进程独占CPU。</li></ul><p><strong>3. 如何控制进程切换：</strong></p><ul><li>利用大多数计算机自带的定时器芯片（timer chips），可以设置在一定时间后触发操作系统中断处理程序。</li><li>这涉及到硬件中断的使用，与软件中断不同，硬件中断是由硬件（如定时器芯片）触发的。</li></ul><p><strong>4. 硬件中断的工作原理：</strong></p><ul><li>设置定时器芯片在一段时间后触发中断。</li><li>操作系统切换到用户模式并执行程序的下一条指令。</li><li>定时器到期时触发硬件中断，切换到内核模式并跳转到操作系统代码。</li><li>操作系统保存当前程序的状态，加载不同的程序，并重复此过程。</li></ul><p><strong>5. 时间片计算：</strong></p><ul><li>时间片（timeslice）是操作系统调度器允许一个进程运行的时间长度，然后进行抢占。</li><li>最简单的方法是给每个进程相同的时间片，例如10毫秒，并按顺序循环执行任务，这称为固定时间片轮转调度。</li></ul><p><strong>6. 时间片术语：</strong></p><ul><li>时间片也常被称为“量子”（quantums）。</li><li>Linux内核开发人员使用“jiffy”时间单位来计算固定频率的定时器滴答声，用于测量时间片的长度。</li></ul><p><strong>7. 目标延迟与动态时间片：</strong></p><ul><li>改进固定时间片调度的方法是选择一个目标延迟，即进程响应的理想最长时间为被抢占后恢复执行的时间。</li><li>时间片通过将目标延迟除以总任务数来计算，这比固定时间片调度更好，因为它减少了在进程较少时的浪费任务切换。</li></ul><p><strong>8. 时间片的最小粒度：</strong></p><ul><li>进程切换在计算上是昂贵的，因为它需要保存当前程序的整个状态并恢复不同的状态。</li><li>时间片持续时间有一个下限（最小粒度），这意味着当进程数量足够多，以至于最小粒度生效时，目标延迟可能会被超过。</li></ul><p><strong>9. Linux调度器：</strong></p><ul><li>文章撰写时，Linux的调度器使用6毫秒的目标延迟和0.75毫秒的最小粒度。</li><li>Linux自2007年以来使用的调度器称为完全公平调度器（Completely Fair Scheduler, CFS），它执行许多复杂的计算机科学操作来优先级排序任务和分配CPU时间。</li></ul><p><strong>10. 内核抢占性：</strong></p><ul><li>现代内核，包括Linux，是可抢占的内核，这意味着内核代码本身可以像用户空间进程一样被中断和调度。</li></ul><p><strong>11. 历史背景：</strong></p><ul><li>早期操作系统，包括经典的Mac OS和早期的Windows版本，使用了抢占式多任务处理的前身，称为合作式多任务处理。</li><li>在合作式多任务处理中，程序本身选择让操作系统接管，通过触发软件中断来允许其他程序运行。</li></ul><p>这篇文章提供了操作系统多任务处理的基础知识，特别是时间片轮转调度的概念和实现方式。通过阅读这篇文章，你可以了解到操作系统如何通过时间片来管理多个进程的执行，以及Linux内核调度器的工作原理。</p>',25),e=[s];function u(r,a,p,c,d,_){return t(),i("div",null,e)}const h=l(o,[["render",u]]);export{m as __pageData,h as default};