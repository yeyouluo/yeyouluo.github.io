import{_ as e,c as r,o as t,a3 as a}from"./chunks/framework.BYhES31N.js";const x=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"base/linux/linux-core.md","filePath":"base/linux/linux-core.md","lastUpdated":1716375814000}'),n={name:"base/linux/linux-core.md"},i=a('<h2 id="linux-内核简介" tabindex="-1">Linux 内核简介 <a class="header-anchor" href="#linux-内核简介" aria-label="Permalink to &quot;Linux 内核简介&quot;">​</a></h2><blockquote><p>参考链接：<a href="https://www.redhat.com/zh/topics/linux/what-is-the-linux-kernel" target="_blank" rel="noreferrer">RedHat文档 | 什么是Linux内核？</a></p></blockquote><p>Linux® 内核是 <a href="https://www.redhat.com/zh/topics/linux/what-is-linux" target="_blank" rel="noreferrer">Linux 操作系统（OS）</a>的主要组件，也是计算机硬件与其进程之间的核心接口。它负责两者之间的通信，还要尽可能高效地管理资源。</p><p>之所以称为内核，是因为在操作系统中就像果实硬壳中的种子一样，控制着硬件（无论是电话、笔记本电脑、服务器，还是任何其他类型的计算机）的所有主要功能。</p><h2 id="linux内核地图" tabindex="-1">Linux内核地图 <a class="header-anchor" href="#linux内核地图" aria-label="Permalink to &quot;Linux内核地图&quot;">​</a></h2><p><a href="https://makelinux.github.io/kernel/map/" target="_blank" rel="noreferrer">Linux Kernel Map V5.1</a></p><h2 id="内核在操作系统中的位置" tabindex="-1">内核在操作系统中的位置 <a class="header-anchor" href="#内核在操作系统中的位置" aria-label="Permalink to &quot;内核在操作系统中的位置&quot;">​</a></h2><blockquote><p>参考链接：<a href="https://www.redhat.com/zh/topics/linux/what-is-the-linux-kernel" target="_blank" rel="noreferrer">RedHat文档 | 什么是Linux内核？</a></p></blockquote><p>为了更具象地理解内核，不妨将 <a href="https://www.redhat.com/zh/topics/linux" target="_blank" rel="noreferrer">Linux</a> 计算机想象成有三层结构：</p><ol><li>**硬件：**物理机（这是系统的底层结构或基础）是由内存（RAM）、处理器（或 CPU）以及输入/输出（I/O）设备（例如<a href="https://www.redhat.com/zh/topics/data-storage" target="_blank" rel="noreferrer">存储</a>、<a href="https://www.redhat.com/zh/topics/hyperconverged-infrastructure/what-is-software-defined-networking" target="_blank" rel="noreferrer">网络</a>和图形）组成的。其中，CPU 负责执行计算和内存的读写操作。</li><li>**Linux 内核：**操作系统的核心。（没错，内核正处于核心的位置）它是驻留在内存中的软件，用于告诉 CPU 要执行哪些操作。</li><li>**用户进程：**这些是内核所<a href="https://www.redhat.com/zh/topics/management" target="_blank" rel="noreferrer">管理</a>的运行程序。用户进程共同构成了用户空间。用户进程有时也简称为<em>进程</em>。内核还允许这些进程和服务器彼此进行通信（称为进程间通信或 IPC）。</li></ol><p>系统执行的代码通过以下两种模式之一在 CPU 上运行：内核模式或用户模式。在内核模式下运行的代码可以不受限制地访问硬件，而用户模式则会限制 SCI 对 CPU 和内存的访问。内存也存在类似的分隔情况（内核空间和用户空间）。这两个小细节构成了一些复杂操作的基础，例如<a href="https://www.redhat.com/zh/topics/security" target="_blank" rel="noreferrer">安全防护</a>、<a href="https://www.redhat.com/zh/topics/containers" target="_blank" rel="noreferrer">构建容器</a>和<a href="https://www.redhat.com/zh/topics/virtualization/what-is-a-virtual-machine" target="_blank" rel="noreferrer">虚拟机</a>的权限分隔。</p><p>这也意味着：如果进程在用户模式下失败，则损失有限，无伤大雅，可以由内核进行修复。另一方面，由于内核进程要访问内存和处理器，因此内核进程的崩溃可能会引起整个系统的崩溃。由于用户进程之间会有适当的保护措施和权限要求，因此一个进程的崩溃通常不会引起太多问题。 此外，由于 Linux 内核可以在<a href="https://www.redhat.com/zh/topics/linux/what-is-linux-kernel-live-patching" target="_blank" rel="noreferrer">实时修补</a>期间持续工作，因此在应用补丁进行安全修复时不会出现停机。</p>',12),o=[i];function l(h,s,c,p,u,d){return t(),r("div",null,o)}const _=e(n,[["render",l]]);export{x as __pageData,_ as default};
