import{_ as l,c as i,o as t,a3 as a}from"./chunks/framework.BYhES31N.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"base/linux/cpu-land/cpu-land-05.md","filePath":"base/linux/cpu-land/cpu-land-05.md","lastUpdated":1716462420000}'),n={name:"base/linux/cpu-land/cpu-land-05.md"},e=a('<h3 id="第五章-计算机中的翻译器" tabindex="-1">第五章：计算机中的翻译器 <a class="header-anchor" href="#第五章-计算机中的翻译器" aria-label="Permalink to &quot;第五章：计算机中的翻译器&quot;">​</a></h3><blockquote><p>这篇文章深入探讨了计算机内存管理，特别是虚拟内存、分页（paging）和内存保护机制。</p></blockquote><p><strong>1. 内存是虚拟的：</strong></p><ul><li>CPU访问的内存地址实际上是虚拟内存空间中的地址，而不是物理内存（RAM）中的确切位置。</li><li>内存管理单元（MMU）充当翻译器，将虚拟内存地址转换为RAM中的物理地址。</li></ul><p><strong>2. 分页机制：</strong></p><ul><li>操作系统创建一个页表（page table），用于存储虚拟内存到物理内存的映射关系。</li><li>页表中的每个条目（page）代表虚拟内存中的一块内存映射到RAM中。</li><li>x86-64架构默认使用4 KiB大小的页，但也可以启用更大的2 MiB或4 GiB页。</li></ul><p><strong>3. 页表和地址转换：</strong></p><ul><li>页表位于RAM中，每个条目大小仅为几字节。</li><li>启用分页时，操作系统将页表的物理地址存储在页表基址寄存器（PTBR）中，并通过设置控制寄存器来启用MMU。</li></ul><p><strong>4. 内存隔离和安全性：</strong></p><ul><li>通过分页，每个进程可以拥有自己隔离的内存空间，提高了代码的易用性和安全性。</li></ul><p><strong>5. 内核内存和用户内存：</strong></p><ul><li>Linux将虚拟内存空间的上半部分分配给内核，称为高半部内核（higher half kernel）。</li><li>页表条目中的权限标志可以保护内核内存，防止用户态进程访问。</li></ul><p><strong>6. 层次化分页和优化：</strong></p><ul><li>64位系统具有极大的虚拟内存空间，如果为每个4 KiB的虚拟内存部分都需要一个页表条目，将非常不实用。</li><li>层次化分页（hierarchical paging）通过多级页表解决了这个问题，形成了树状结构。</li></ul><p><strong>7. 5级分页：</strong></p><ul><li>最新的处理器实现了5级分页，增加了一个间接层并扩展了地址空间。</li></ul><p><strong>8. 交换（Swapping）和按需分页（Demand Paging）：</strong></p><ul><li>当内存访问失败时，MMU会触发一个称为“页面错误”（page fault）的硬件中断。</li><li>操作系统可以有意让内存访问失败，然后解决问题并将控制权交回CPU。</li><li>按需分页允许操作系统将磁盘上的文件映射到虚拟内存，然后在需要时才加载到物理内存中。</li></ul><p><strong>9. 页面错误和段错误：</strong></p><ul><li>如果页面错误是无效或禁止的访问，内核可能会以段错误（segmentation fault）终止程序。</li></ul><p>文章通过解释虚拟内存、分页和内存保护的概念，帮助读者理解计算机如何从启动到运行当前软件的过程。这些机制对于确保系统的稳定性和安全性至关重要。</p>',21),o=[e];function p(r,s,u,c,g,_){return t(),i("div",null,o)}const f=l(n,[["render",p]]);export{h as __pageData,f as default};