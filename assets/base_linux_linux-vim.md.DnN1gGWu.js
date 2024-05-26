import{_ as t,c as a,o as e,a3 as i}from"./chunks/framework.BYhES31N.js";const d="/assets/vim%E4%B8%8D%E5%90%8C%E6%A8%A1%E5%BC%8F%E9%97%B4%E7%9A%84%E5%88%87%E6%8D%A2.Dpaz5V09.png",r="/assets/vim%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B.kXNQ6S-5.png",q=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"base/linux/linux-vim.md","filePath":"base/linux/linux-vim.md","lastUpdated":1716375814000}'),l={name:"base/linux/linux-vim.md"},o=i('<h2 id="为啥要用vim" tabindex="-1">为啥要用vim？ <a class="header-anchor" href="#为啥要用vim" aria-label="Permalink to &quot;为啥要用vim？&quot;">​</a></h2><p>在服务器上，总有编辑文件内容的需求。此时，vi/vim就能派上大用场。</p><details class="details custom-block"><summary>延伸1</summary><p>至于一些大佬们将vim打造成个人IDE，优劣见仁见智。我的意见是不建议，让工具回归工具（比如汇编可以写网站，但显然使用高级语言会开发更快）。当然有兴趣、有时间搞的，不在讨论之列。</p></details><details class="details custom-block"><summary>延伸2</summary><p>Visual Studio Code 也有远程编辑的场景，但是它和掌握vim并不冲突。然而，并不是所有环境都有Visual Studio Code，但Linux上默认会安装vi/vim。从学习性价比上讲，建议优先学习vim。</p></details><p>vim的优点很明显：轻量级、可定制性高、强大的文本处理能力。</p><p>vim就没有缺点吗？当然有的！它的学习曲线有点陡峭。然而，别因此产生畏难情绪，只是「有点」陡峭而已！总体来说，学会vim性价比极高！</p><div class="warning custom-block"><p class="custom-block-title">学习小贴士</p><p>vim也有大巧不工的学习方式，比如参考文末列出的vim学习资源：<a href="https://github.com/wsdjeg/Learn-Vim_zh_cn" target="_blank" rel="noreferrer">https://github.com/wsdjeg/Learn-Vim_zh_cn</a> 。</p></div><h2 id="开始使用vim" tabindex="-1">开始使用vim <a class="header-anchor" href="#开始使用vim" aria-label="Permalink to &quot;开始使用vim&quot;">​</a></h2><blockquote><p>本节内容来自 <a href="https://www.linuxprobe.com/basic-learning-04.html" target="_blank" rel="noreferrer">刘遄 | 《Linux就该这么学》第4章 Vim编辑器与Shell命令脚本</a>]</p></blockquote><p>Vim之所以能得到广大厂商与用户的认可，原因在于Vim编辑器中设置了3种模式—命令模式、末行模式和编辑模式，每种模式分别又支持多种不同的命令快捷键，这大大提高了工作效率，而且用户在习惯之后也会觉得相当顺手。要想高效地操作文本，就必须先搞清这3种模式的操作区别以及模式之间的切换方法（见下图）。</p><div class="tip custom-block"><p class="custom-block-title">三种模式</p><ul><li><strong>命令模式</strong>：控制光标移动，可对文本进行复制、粘贴、删除和查找等工作。</li><li><strong>输入模式</strong>：正常的文本录入。</li><li><strong>末行模式</strong>：保存或退出文档，以及设置编辑环境。</li></ul></div><p><img src="'+d+'" alt="Vim编辑器模式的切换方法"></p><h3 id="命令模式" tabindex="-1">命令模式 <a class="header-anchor" href="#命令模式" aria-label="Permalink to &quot;命令模式&quot;">​</a></h3><p>在每次运行Vim编辑器时，默认进入命令模式，此时需要先切换到输入模式后再进行文档编写工作。而每次在编写完文档后需要先返回命令模式，然后再进入末行模式，执行文档的保存或退出操作。在Vim中，无法直接从输入模式切换到末行模式。</p><h4 id="命令模式中最常用的一些命令" tabindex="-1">命令模式中最常用的一些命令 <a class="header-anchor" href="#命令模式中最常用的一些命令" aria-label="Permalink to &quot;命令模式中最常用的一些命令&quot;">​</a></h4><p>Vim编辑器中内置的命令有成百上千种用法，为了能够帮助读者更快地掌握Vim编辑器，下表总结了在命令模式中最常用的一些命令。</p><table><thead><tr><th>命令</th><th>作用</th></tr></thead><tbody><tr><td>dd</td><td>删除（剪切）光标所在整行</td></tr><tr><td>5dd</td><td>删除（剪切）从光标处开始的5行</td></tr><tr><td>yy</td><td>复制光标所在整行</td></tr><tr><td>5yy</td><td>复制从光标处开始的5行</td></tr><tr><td>n</td><td>显示搜索命令定位到的下一个字符串</td></tr><tr><td>N</td><td>显示搜索命令定位到的上一个字符串</td></tr><tr><td>u</td><td>撤销上一步的操作</td></tr><tr><td>p</td><td>将之前删除（dd）或复制（yy）过的数据粘贴到光标后面</td></tr></tbody></table><h3 id="末行模式" tabindex="-1">末行模式 <a class="header-anchor" href="#末行模式" aria-label="Permalink to &quot;末行模式&quot;">​</a></h3><p>末行模式主要用于保存或退出文件，以及设置Vim编辑器的工作环境，还可以让用户执行外部的Linux命令或跳转到所编写文档的特定行数。要想切换到末行模式，在命令模式中输入一个冒号就可以了。</p><h4 id="末行模式中最常用的一些命令" tabindex="-1">末行模式中最常用的一些命令 <a class="header-anchor" href="#末行模式中最常用的一些命令" aria-label="Permalink to &quot;末行模式中最常用的一些命令&quot;">​</a></h4><table><thead><tr><th>命令</th><th>作用</th></tr></thead><tbody><tr><td>:w</td><td>保存</td></tr><tr><td>:q</td><td>退出</td></tr><tr><td>:q!</td><td>强制退出（放弃对文档的修改内容）</td></tr><tr><td>:wq!</td><td>强制保存退出</td></tr><tr><td>:set nu</td><td>显示行号</td></tr><tr><td>:set nonu</td><td>不显示行号</td></tr><tr><td>:命令</td><td>执行该命令</td></tr><tr><td>:整数</td><td>跳转到该行</td></tr><tr><td>😒/one/two</td><td>将当前光标所在行的第一个one替换成two</td></tr><tr><td>😒/one/two/g</td><td>将当前光标所在行的所有one替换成two</td></tr><tr><td>:%s/one/two/g</td><td>将全文中的所有one替换成two</td></tr><tr><td>?字符串</td><td>在文本中从下至上搜索该字符串</td></tr><tr><td>/字符串</td><td>在文本中从上至下搜索该字符串</td></tr></tbody></table><h2 id="快捷键助力提升效率" tabindex="-1">快捷键助力提升效率 <a class="header-anchor" href="#快捷键助力提升效率" aria-label="Permalink to &quot;快捷键助力提升效率&quot;">​</a></h2><p>作为一款生产力工具，怎么才能提高使用效率呢？</p><p>答案是：掌握并熟练使用快捷键！</p><p><img src="'+r+'" alt="vim快速上手"></p><h2 id="一些不容忽视的vim小技巧" tabindex="-1">一些不容忽视的vim小技巧 <a class="header-anchor" href="#一些不容忽视的vim小技巧" aria-label="Permalink to &quot;一些不容忽视的vim小技巧&quot;">​</a></h2><h3 id="撤销与恢复" tabindex="-1">撤销与恢复 <a class="header-anchor" href="#撤销与恢复" aria-label="Permalink to &quot;撤销与恢复&quot;">​</a></h3><ul><li>u ：撤销刚才做的动作。</li><li>ctrl+r ：恢复刚才撤销的动作。</li></ul><h3 id="列式编辑" tabindex="-1">列式编辑 <a class="header-anchor" href="#列式编辑" aria-label="Permalink to &quot;列式编辑&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">小贴士</p><p>notepad++ 或 IDEA 中使用 Alt 可以进行列式编辑，vim 也可以有一样的效果。</p></div><p>参考上图中的 <a href="#快捷键助理提升效率">可视模式</a>。</p><ul><li><code>v</code>进入可视模式，可以进行多行选择。</li><li><code>V</code>进入可视行模式，选择整行。</li></ul><h3 id="快速跳转" tabindex="-1">快速跳转 <a class="header-anchor" href="#快速跳转" aria-label="Permalink to &quot;快速跳转&quot;">​</a></h3><p>参考上图中的 移动。</p><h3 id="自动补全" tabindex="-1">自动补全 <a class="header-anchor" href="#自动补全" aria-label="Permalink to &quot;自动补全&quot;">​</a></h3><p><code>Ctrl+n</code>和 <code>Ctrl+p</code>在插入模式下自动补全。</p><h3 id="设置和配置" tabindex="-1">设置和配置 <a class="header-anchor" href="#设置和配置" aria-label="Permalink to &quot;设置和配置&quot;">​</a></h3><ul><li><code>:set number</code>显示行号。</li><li><code>:set nowrap</code>禁用自动换行。</li></ul><h3 id="全局命令" tabindex="-1">全局命令 <a class="header-anchor" href="#全局命令" aria-label="Permalink to &quot;全局命令&quot;">​</a></h3><ul><li><code>:g/pattern/p</code>打印所有匹配模式的行。</li><li><code>:v/pattern/d</code>删除所有不匹配模式的行。</li></ul><h3 id="插入模式下的命令" tabindex="-1">插入模式下的命令 <a class="header-anchor" href="#插入模式下的命令" aria-label="Permalink to &quot;插入模式下的命令&quot;">​</a></h3><ul><li><code>Ctrl+o</code>执行普通模式命令。</li><li><code>Ctrl+h</code>删除前一个字符。</li><li><code>Ctrl+w</code>删除前一个单词。</li></ul><h3 id="代码折叠" tabindex="-1">代码折叠 <a class="header-anchor" href="#代码折叠" aria-label="Permalink to &quot;代码折叠&quot;">​</a></h3><ul><li><code>za</code>折叠/展开代码块。</li><li><code>zM</code>最大化当前窗口的代码折叠。</li><li><code>zR</code>还原所有代码折叠。</li></ul><h3 id="窗口分割" tabindex="-1">窗口分割 <a class="header-anchor" href="#窗口分割" aria-label="Permalink to &quot;窗口分割&quot;">​</a></h3><ul><li><code>:split</code>或 <code>:sp</code>水平分割窗口。</li><li><code>:vsplit</code>或 <code>:vs</code>垂直分割窗口。</li><li><code>Ctrl+w</code> + 方向键在窗口间切换。</li></ul><h3 id="命令行模式快速更改单词" tabindex="-1">命令行模式快速更改单词 <a class="header-anchor" href="#命令行模式快速更改单词" aria-label="Permalink to &quot;命令行模式快速更改单词&quot;">​</a></h3><ul><li>ciw：change in the word，可以快速更改当前的单词，表现是直接删除了，并且插入了一个 I 的光标。</li><li>diw：delete in the word。</li></ul><h2 id="推荐的vim学习资源" tabindex="-1">推荐的vim学习资源 <a class="header-anchor" href="#推荐的vim学习资源" aria-label="Permalink to &quot;推荐的vim学习资源&quot;">​</a></h2><ul><li>聪明地学习 Vim： <a href="https://github.com/wsdjeg/Learn-Vim_zh_cn" target="_blank" rel="noreferrer">https://github.com/wsdjeg/Learn-Vim_zh_cn</a></li></ul><h2 id="另一种视角看编辑文件" tabindex="-1">另一种视角看编辑文件 <a class="header-anchor" href="#另一种视角看编辑文件" aria-label="Permalink to &quot;另一种视角看编辑文件&quot;">​</a></h2><p>vim始终还是需要交互式操作的。有没有既能编辑文本内容，还不需要交互式操作的？</p><p>当然有的，那就是下节要讲的grep/sed/awk三剑客。</p>',53),h=[o];function c(s,n,m,u,p,b){return e(),a("div",null,h)}const _=t(l,[["render",c]]);export{q as __pageData,_ as default};