import{_ as a,c as e,o as i,a3 as s}from"./chunks/framework.BYhES31N.js";const o="/assets/72191579c21981b22500435b3ca1607c.cWcVV0GU.png",l="/assets/8e5008561064af37a0b81a8117fcd11c.Buzf8WYt.png",c="/assets/864597ff2898da1b871f9e5b68089065.BC7f0Mss.png",t="/assets/c2fef8103a58c626a29149a8a1ab0294.DYeXR-hP.png",r="/assets/40554d846aa3db7365a9f9b39d2fea03.KzBxKWhd.png",p="/assets/cec6f59258fde9466f34ca1b4e4aeb2d.CZidEX5p.png",u="/assets/449f80525894316d9a6f8d724b9d7042.DoQ36-qF.png",h="/assets/6c44a1d25ab588201c1bc1dbfdb38105.CtLTAwM4.png",E=JSON.parse('{"title":"携程 ClickHouse 日志分析实践","description":"","frontmatter":{},"headers":[],"relativePath":"big-data/ck/ck-case-ctrip.md","filePath":"big-data/ck/ck-case-ctrip.md","lastUpdated":null}'),n={name:"big-data/ck/ck-case-ctrip.md"},k=s('<h1 id="携程-clickhouse-日志分析实践" tabindex="-1">携程 ClickHouse 日志分析实践 <a class="header-anchor" href="#携程-clickhouse-日志分析实践" aria-label="Permalink to &quot;携程 ClickHouse 日志分析实践&quot;">​</a></h1><p>ElasticSearch 是一种基于 Lucene 的分布式全文搜索引擎，携程用 ES 处理日志，目前服务器规模 500+，日均日志接入量大约 200TB。随着日志量不断增加，一些问题逐渐暴露出来：一方面 ES 服务器越来越多，投入的成本越来越高；另一方面用户的满意度不高，日志写入延迟、查询慢甚至查不出来的问题一直困扰着用户；而从运维人员的角度看，ES 的运维成本较高，运维的压力越来越大。</p><h2 id="一、为什么选择-clickhouse" tabindex="-1">一、为什么选择 ClickHouse <a class="header-anchor" href="#一、为什么选择-clickhouse" aria-label="Permalink to &quot;一、为什么选择 ClickHouse&quot;">​</a></h2><p>ClickHouse 是一款高性能列式分布式数据库管理系统，我们对 ClickHouse 进行了测试，发现有下列优势：</p><ul><li>ClickHouse 写入吞吐量大，单服务器日志写入量在 50MB 到 200MB/s，每秒写入超过 60w 记录数，是 ES 的 5 倍以上。在 ES 中比较常见的写 Rejected 导致数据丢失、写入延迟等问题，在 ClickHouse 中不容易发生。</li><li>查询速度快，官方宣称数据在 pagecache 中，单服务器查询速率大约在 2-30GB/s；没在 pagecache 的情况下，查询速度取决于磁盘的读取速率和数据的压缩率。经测试 ClickHouse 的查询速度比 ES 快 5-30 倍以上。</li><li>ClickHouse 比 ES 服务器成本更低。一方面 ClickHouse 的数据压缩比比 ES 高，相同数据占用的磁盘空间只有 ES 的 1/3 到 1/30，节省了磁盘空间的同时，也能有效的减少磁盘 IO，这也是 ClickHouse 查询效率更高的原因之一；另一方面 ClickHouse 比 ES 占用更少的内存，消耗更少的 CPU 资源。我们预估用 ClickHouse 处理日志可以将服务器成本降低一半。</li><li>相比 ES，ClickHouse 稳定性更高，运维成本更低。ES 中不同的 Group 负载不均衡，有的 Group 负载高，会导致写 Rejected 等问题，需要人工迁移索引；在 ClickHouse 中通过集群和 Shard 策略，采用轮询写的方法，可以让数据比较均衡的分布到所有节点。ES 中一个大查询可能导致 OOM 的问题；ClickHouse 通过预设的查询限制，会查询失败，不影响整体的稳定性。ES 需要进行冷热数据分离，每天 200T 的数据搬迁，稍有不慎就会导致搬迁过程发生问题，一旦搬迁失败，热节点可能很快就会被撑爆，导致一大堆人工维护恢复的工作；ClickHouse 按天分 partition，一般不需要考虑冷热分离，特殊场景用户确实需要冷热分离的，数据量也会小很多，ClickHouse 自带的冷热分离机制就可以很好的解决。</li><li>ClickHouse 采用 SQL 语法，比 ES 的 DSL 更加简单，学习成本更低。</li></ul><p>结合携程的日志分析场景，日志进入 ES 前已经格式化成 JSON，同一类日志有统一的 Schema，符合 ClickHouse Table 的模式；日志查询的时候，一般按照某一维度统计数量、总量、均值等，符合 ClickHouse 面向列式存储的使用场景。</p><p>偶尔有少量的场景需要对字符串进行模糊查询，也是先经过一些条件过滤掉大量数据后，再对少量数据进行模糊匹配，ClickHouse 也能很好的胜任。另外我们发现 90%以上的日志没有使用 ES 的全文索引特性，因此我们决定尝试用 ClickHouse 来处理日志。</p><h2 id="二、用-clickhouse-处理日志" tabindex="-1">二、用 ClickHouse 处理日志 <a class="header-anchor" href="#二、用-clickhouse-处理日志" aria-label="Permalink to &quot;二、用 ClickHouse 处理日志&quot;">​</a></h2><h3 id="_2-1-clickhouse-高可用部署方案" tabindex="-1">2.1 ClickHouse 高可用部署方案 <a class="header-anchor" href="#_2-1-clickhouse-高可用部署方案" aria-label="Permalink to &quot;2.1 ClickHouse 高可用部署方案&quot;">​</a></h3><h4 id="_2-1-1-容灾部署与集群规划" tabindex="-1">2.1.1 容灾部署与集群规划 <a class="header-anchor" href="#_2-1-1-容灾部署与集群规划" aria-label="Permalink to &quot;2.1.1 容灾部署与集群规划&quot;">​</a></h4><p>我们采用多 Shards、2 Replicas 的方式，通过 Zookeeper 进行服务器间互相备份，允许一个 shard 一台服务器 down 机数据不丢失。为了接入不同规模的日志，我们将集群分成 6 台、20 台两种规模的多个集群。</p><p><img src="'+o+'" alt="img"></p><h4 id="_2-1-2-跨-idc-部署" tabindex="-1">2.1.2 跨 IDC 部署 <a class="header-anchor" href="#_2-1-2-跨-idc-部署" aria-label="Permalink to &quot;2.1.2 跨 IDC 部署&quot;">​</a></h4><p>借助于 ClickHouse 分布式表的特性，我们实现了跨集群搜索。携程有多个 IDC，日志分布在不同的 IDC，为了避免跨 IDC 搬迁日志，我们在每个 IDC 都部署一套 ClickHouse，然后配置 ClickHouse 的跨 IDC 的 Cluster，创建分布式表，实现跨多个 IDC 数据搜索，如下图所示：</p><p><img src="'+l+'" alt="img"></p><h4 id="_2-1-3-几个重要的参数说明" tabindex="-1">2.1.3 几个重要的参数说明 <a class="header-anchor" href="#_2-1-3-几个重要的参数说明" aria-label="Permalink to &quot;2.1.3 几个重要的参数说明&quot;">​</a></h4><p>max_threads：32 # 用于控制一个用户的查询线程数</p><p>max_memory_usage：10000000000 #单个查询最多能够使用内存大小 9.31G</p><p>max_execution_time：30 #单个查询最大执行时间</p><p>skip_unavailable_shards：1 # 在通过分布式表查询的时候，当某一个 shard 无法访问时，其他 shard 的数据仍然可以查询</p><h4 id="_2-1-4-踩过的坑" tabindex="-1">2.1.4 踩过的坑 <a class="header-anchor" href="#_2-1-4-踩过的坑" aria-label="Permalink to &quot;2.1.4 踩过的坑&quot;">​</a></h4><p>我们之前将 Cluster 的配置放在 config.d 的目录下，当 ClickHouse 意外重启后，发现查询分布式表时部分 shard 访问不到的问题，因此我们现在不再使用 config.d 配置方式，Cluster 配置放在 metrika.xml 中。</p><h3 id="_2-2-消费数据到-clickhouse" tabindex="-1">2.2 消费数据到 ClickHouse <a class="header-anchor" href="#_2-2-消费数据到-clickhouse" aria-label="Permalink to &quot;2.2 消费数据到 ClickHouse&quot;">​</a></h3><p><img src="'+c+'" alt="img"></p><p>我们使用 gohangout 消费数据到 ClickHouse，关于数据写入的几点建议：</p><p>1）采用轮询的方式写 ClickHouse 集群的所有服务器，保证数据基本均匀分布。</p><p>2）大批次低频率的写入，减少 parts 数量，减少服务器 merge，避免 Too many parts 异常。通过两个阈值控制数据的写入量和频次，超过 10w 记录写一次或者 30s 写一次。</p><p>3）写本地表，不要写分布式表，因为分布式表接收到数据后会将数据拆分成多个 parts，并转发数据到其它服务器，会引起服务器间网络流量增加、服务器 merge 的工作量增加，导致写入速度变慢，并且增加了 Too many parts 的可能性。</p><p>4）建表时考虑 partition 的设置，之前遇到过有人将 partition 设置为 timestamp，导致插入数据一直报 Too many parts 的异常。我们一般按天分 partition。</p><p>5）主键和索引的设置、数据的乱序等也会导致写入变慢。</p><h3 id="_2-3-数据展示" tabindex="-1">2.3 数据展示 <a class="header-anchor" href="#_2-3-数据展示" aria-label="Permalink to &quot;2.3 数据展示&quot;">​</a></h3><p>我们调研了像 Supperset、Metabase、Grafana 等几个工具，最终还是决定采用在 Kibana3 上开发支持 ClickHouse 实现图表展示。主要原因是 Kibana3 这种强大的数据过滤功能，很多系统都不具备，另外也考虑到迁移到其他系统成本较高，用户短期内难以适应。</p><p>目前 K3 上几种常用的图表（terms、histogram、percentiles、ranges、table），我们都开发了对应的 ClickHouse 版本，用户体验与原版基本保持一直，查询效率经过优化大幅提升。</p><h3 id="_2-4-查询优化" tabindex="-1">2.4 查询优化 <a class="header-anchor" href="#_2-4-查询优化" aria-label="Permalink to &quot;2.4 查询优化&quot;">​</a></h3><p>Kibana 中的 Table Panel 用于显示日志的明细数据，一般查询最近 1 小时所有字段的数据，最终只展示前 500 条记录。这种场景对于 ClickHouse 来说非常不友好。</p><p>针对这个问题，我们将 table Panel 的查询分两次进行：第一次查询单位时间间隔的数据量，根据最终显示的数据量计算出合理查询的时间范围；第二次根据修正后的时间范围，结合 Table Panel 中配置的默认显示的 Column 查询明细数据。</p><p>经过这些优化，查询的时间可以缩短到原来的 1/60，查询的列可以减少 50%，最终查询数据量减少到原来的 1/120；ClickHouse 提供了多种近似计算的方法，用于提供相对较高准确性的同时减少计算量；使用 MATERIALIZED VIEW 或者 MATERIALIZED COLUMN 将计算量放在平常完成，也能有效降低查询的数据量和计算量。</p><h3 id="_2-5-dashboard-迁移" tabindex="-1">2.5 Dashboard 迁移 <a class="header-anchor" href="#_2-5-dashboard-迁移" aria-label="Permalink to &quot;2.5 Dashboard 迁移&quot;">​</a></h3><p>因为 Kibana3 上的 Dashboard 很多，我们开发了一个 Dashboard 迁移工具，通过修改 kibana-init-*索引中 Dashboard 的配置来进行 Dashboard 迁移</p><h2 id="三、接入-clickhouse-的效果" tabindex="-1">三、接入 ClickHouse 的效果 <a class="header-anchor" href="#三、接入-clickhouse-的效果" aria-label="Permalink to &quot;三、接入 ClickHouse 的效果&quot;">​</a></h2><p>目前我们一个集群的日志量 100T 左右（压缩前 600T 左右），ClickHouse 服务器主要监控指标如下：</p><p><img src="'+t+'" alt="img"></p><p><img src="'+r+'" alt="img"></p><p><img src="'+p+'" alt="img"></p><p>ClickHouse 相对 ES 占用更少的内存。ES 为了提高查询效率会将很多数据放在内存中，如：segment 的索引数据、filter cache、field data cache、indexing buffer 等；ES 内存的使用量与索引量、数据量、写入量、查询量等成正比。删除（下线）索引、迁移索引或者扩容是应对 ES 内存问题的常用手段。但是删除（下线）索引导致用户希望保存更长时间数据的需求无法满足，而服务器扩容导致又了成本上升。</p><p>ClickHouse 的内存消耗主要包括内存型的 engine，数据索引，加载到内存中待计算的数据，搜索的结果等。在 ClickHouse 中日志的数据量和保存时间主要和磁盘有关。</p><p>相比 ES，ClickHouse 后至少可以节省 60%的磁盘空间。如下图所示，Netflow 的日志占用的磁盘空间 ClickHouse 是 ES 的 32%，CDN 日志占用磁盘空间 ClickHouse 是 ES 的 18%，Dblog 的日志 ClickHouse 是 ES 的 22.5%。</p><p><img src="'+u+'" alt="img"></p><p>比较查询速度提升，ClickHouse 比 ES 提升了 4.4 倍到 38 倍不等，原来 ES 上查询不出来的问题基本得到了解决，查询慢的问题有了很大的提升。</p><p>Netflow 由于数据量非常大，导致 ES 无法查询，ClickHouse 中经过优化，查询耗时 29.5s，CDN 的查询 CK 和 ES 快 38 倍，dbLog 的查询 CK 比 ES 快 4.4 倍；关于查询速度的对比，因为在生产环境，无法保证 ES 和 ClickHouse 的环境一样，ES 使用的是 40 核 256G 的服务器，一台服务器部署一个 ES 实例，单服务器数据量 3T 左右。ClickHouse 采用的是 32 核 128G 的服务器,单服务器数据量大约 18T 左右，一台服务器部署一个 ClickHouse 实例。</p><p><img src="'+h+'" alt="img"></p><p>用 ClickHouse 处理日志查询速度得到了很大的提升，基本解决了数据保存时间短的问题，用户使用体验也得到了提升。我们预估使用现在 ES 日志集群 50%的服务器资源就能就能够完成现有 ES 日志的处理，并能提供比现在更好的用户体验。</p><h2 id="四、clickhouse-基本运维" tabindex="-1">四、ClickHouse 基本运维 <a class="header-anchor" href="#四、clickhouse-基本运维" aria-label="Permalink to &quot;四、ClickHouse 基本运维&quot;">​</a></h2><p>总体来说 ClickHouse 的运维比 ES 简单，主要包括以下几个方面的工作：</p><p>1）新日志的接入、性能优化；</p><p>2）过期日志的清理，我们通过一个定时任务每天删除过期日志的 partition；</p><p>3）ClickHouse 的监控，使用 ClickHouse-exporter+VictoriaMetrics+Grafana 的实现；</p><p>4）数据迁移，通过 ClickHouse 分布式表的特性我们一般不搬迁历史数据，只要将新的数据接入新集群，然后通过分布式表跨集群查询。随着时间的推移，历史数据会被清理下线，当老集群数据全部下线后，新老集群的迁移就完成了。确实需要迁移数据时，采用 ClickHouse_copier 或者复制数据的方式实现。</p><p>5）常见问题处理：</p><ul><li>慢查询，通过 kill query 终止慢查询的执行，并通过前面提到的优化方案进行优化</li><li>Too many parts 异常：Too many parts 异常是由于写入的 part 过多 part 的 merge 速度跟不上产生的速度，导致 part 过多的原因主要包括几个方面：</li><li>a. 设置不合理</li><li>b. 小批量、高频次写 ClickHouse</li><li>c. 写的是 ClickHouse 的分布式表</li><li>d. ClickHouse 设置的 merge 线程数太少了</li><li>无法启动：之前遇到过 ClickHouse 无法启动的问题，主要包括两个方面：</li><li>a. 文件系统损坏，通过修复文件系统可以解决</li><li>b. 某一个表的数据异常导致 ClickHouse 加载失败，可以删除异常数据后启动，也可以把异常的文件搬到 detached 目录，等 ClickHouse 起来后再 attach 文件恢复数据</li></ul><h2 id="五、总结" tabindex="-1">五、总结 <a class="header-anchor" href="#五、总结" aria-label="Permalink to &quot;五、总结&quot;">​</a></h2><p>将日志从 ES 迁移到 ClickHouse 可以节省更多的服务器资源，总体运维成本更低，而且提升了查询速度，特别是当用户在紧急排障的时候，这种查询速度的成倍提升，对用户的使用体验有明显的改善。</p><p>我们将继续致力于将 ES 的日志迁移到 ClickHouse，并优化日志查询性能，让 ClickHouse 在日志分析领域为用户提供更大的价值。</p><p>但是 ClickHouse 毕竟不是 ES，在很多业务场景中 ES 仍然不可替代；ClickHouse 也不仅只能处理日志，进一步深入研究 ClickHouse，让 ClickHouse 在更多领域发挥更大的价值，是我们一直努力的方向。</p><p><strong>作者介绍</strong>：</p><p>Gavin Zhu，携程软件技术专家，负责监控系统运维开发、ES 系统运维及 Clickhouse 技术应用推广及运维工作。</p><p><strong>原文链接</strong>：<a href="https://mp.weixin.qq.com/s/IjOWAPOJXANRQqRAMWXmaw" target="_blank" rel="noreferrer">https://mp.weixin.qq.com/s/IjOWAPOJXANRQqRAMWXmaw</a></p>',67),d=[k];function C(m,H,b,_,S,f){return i(),e("div",null,d)}const q=a(n,[["render",C]]);export{E as __pageData,q as default};
