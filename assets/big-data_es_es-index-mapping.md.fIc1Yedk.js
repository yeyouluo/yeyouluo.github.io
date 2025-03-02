import{_ as i,c as a,o as n,ag as t}from"./chunks/framework.BZemHgQ6.js";const e="/assets/es-index-manage-1.Co7MLdhg.png",l="/assets/es-index-manage-2.DVUP6EM4.png",p="/assets/es-index-manage-3.BHSKRArg.png",h="/assets/es-index-manage-4.DSr2NPIz.png",k="/assets/es-index-manage-5.Q8FigvNz.png",r="/assets/es-index-manage-7.CT7UITQe.png",d="/assets/es-index-manage-8.DHFQ6llM.png",g="/assets/es-index-manage-9.WwIlM7IC.png",o="/assets/es-index-manage-10._hlgvUl1.png",F="/assets/es-index-manage-11.DEUJrwDa.png",c="/assets/es-index-manage-12.BbxiFMDS.png",u="/assets/es-index-manage-13.LwlH9eAm.png",E="/assets/es-index-manage-6.Drhb9-h1.png",x=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"big-data/es/es-index-mapping.md","filePath":"big-data/es/es-index-mapping.md","lastUpdated":1732556045000}'),y={name:"big-data/es/es-index-mapping.md"};function C(m,s,b,B,q,_){return n(),a("div",null,s[0]||(s[0]=[t(`<nav class="table-of-contents"><ul><li><a href="#引言">引言</a></li><li><a href="#索引管理的引入">索引管理的引入</a></li><li><a href="#索引的格式">索引的格式</a></li><li><a href="#索引管理操作">索引管理操作</a><ul><li><a href="#创建索引">创建索引</a></li><li><a href="#修改索引">修改索引</a></li><li><a href="#打开-关闭索引">打开/关闭索引</a></li><li><a href="#删除索引">删除索引</a></li><li><a href="#查看索引">查看索引</a></li></ul></li><li><a href="#kibana管理索引">Kibana管理索引</a></li><li><a href="#参考文章">参考文章</a></li></ul></nav><h2 id="引言" tabindex="-1">引言 <a class="header-anchor" href="#引言" aria-label="Permalink to &quot;引言&quot;">​</a></h2><p>了解基本使用后，我们从索引操作的角度看看如何对索引进行管理。</p><h2 id="索引管理的引入" tabindex="-1">索引管理的引入 <a class="header-anchor" href="#索引管理的引入" aria-label="Permalink to &quot;索引管理的引入&quot;">​</a></h2><p>我们在前文中增加文档时，如下的语句会动态创建一个customer的index：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PUT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /customer/_doc/1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  &quot;name&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;John Doe&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>而这个index实际上已经自动创建了它里面的字段（name）的类型。我们不妨看下它自动创建的mapping：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;mappings&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;_doc&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;properties&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">          &quot;fields&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            &quot;keyword&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">              &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;keyword&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">              &quot;ignore_above&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">256</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>那么如果我们需要对这个建立索引的过程做更多的控制：比如想要确保这个索引有数量适中的主分片，并且在我们索引任何数据之前，分析器和映射已经被建立好。那么就会引入两点：第一个<strong>禁止自动创建索引</strong>，第二个是<strong>手动创建索引</strong>。</p><ul><li>禁止自动创建索引</li></ul><p>可以通过在 config/elasticsearch.yml 的每个节点下添加下面的配置：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">action.auto_create_index:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span></span></code></pre></div><p>手动创建索引就是接下来文章的内容。</p><h2 id="索引的格式" tabindex="-1">索引的格式 <a class="header-anchor" href="#索引的格式" aria-label="Permalink to &quot;索引的格式&quot;">​</a></h2><p>在请求体里面传入设置或类型映射，如下所示：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PUT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /my_index</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    &quot;settings&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ...</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> any</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> settings</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ...</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    &quot;mappings&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        &quot;properties&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ...</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> any</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> properties</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ...</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><ul><li><p><strong>settings</strong>: 用来设置分片,副本等配置信息</p></li><li><p>mappings</p><p>: 字段映射，类型等</p><ul><li><strong>properties</strong>: 由于type在后续版本中会被Deprecated, 所以无需被type嵌套</li></ul></li></ul><h2 id="索引管理操作" tabindex="-1">索引管理操作 <a class="header-anchor" href="#索引管理操作" aria-label="Permalink to &quot;索引管理操作&quot;">​</a></h2><blockquote><p>我们通过kibana的devtool来学习索引的管理操作。</p></blockquote><h3 id="创建索引" tabindex="-1">创建索引 <a class="header-anchor" href="#创建索引" aria-label="Permalink to &quot;创建索引&quot;">​</a></h3><p>我们创建一个user 索引<code>test-index-users</code>，其中包含三个属性：name，age, remarks; 存储在一个分片一个副本上。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PUT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /test-index-users</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  &quot;settings&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">		&quot;number_of_shards&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 1,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">		&quot;number_of_replicas&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	},</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  &quot;mappings&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    &quot;properties&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      &quot;name&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        &quot;type&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;text&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        &quot;fields&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          &quot;keyword&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            &quot;type&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;keyword&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            &quot;ignore_above&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 256</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      &quot;age&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        &quot;type&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;long&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      &quot;remarks&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        &quot;type&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;text&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>执行结果</p><p><img src="`+e+'" alt="img"></p><ul><li><strong>插入测试数据</strong></li></ul><p><img src="'+l+'" alt="img"></p><p>查看数据</p><p><img src="'+p+`" alt="img"></p><ul><li>我们再<strong>测试下不匹配的数据类型</strong>(age)：</li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">POST</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /test-index-users/_doc</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  &quot;name&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;test user&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  &quot;age&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;error_age&quot;,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  &quot;remarks&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;hello eeee&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>你可以看到无法类型不匹配的错误：</p><p><img src="`+h+`" alt="img"></p><h3 id="修改索引" tabindex="-1">修改索引 <a class="header-anchor" href="#修改索引" aria-label="Permalink to &quot;修改索引&quot;">​</a></h3><p>查看刚才的索引,<code>curl &#39;localhost:9200/_cat/indices?v&#39; | grep users</code></p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yellow</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> open</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test-index-users</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                          LSaIB57XSC6uVtGQHoPYxQ</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   4.4kb</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   4.4kb</span></span></code></pre></div><p>我们注意到刚创建的索引的状态是yellow的，因为我测试的环境是单点环境，无法创建副本，但是在上述<code>number_of_replicas</code>配置中设置了副本数是1； 所以在这个时候我们需要修改索引的配置。</p><p>修改副本数量为0</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PUT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /test-index-users/_settings</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  &quot;settings&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    &quot;number_of_replicas&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><img src="`+k+'" alt="img"></p><p>再次查看状态：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">green</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> open</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test-index-users</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                          LSaIB57XSC6uVtGQHoPYxQ</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   4.4kb</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   4.4kb</span></span></code></pre></div><h3 id="打开-关闭索引" tabindex="-1">打开/关闭索引 <a class="header-anchor" href="#打开-关闭索引" aria-label="Permalink to &quot;打开/关闭索引&quot;">​</a></h3><ul><li><strong>关闭索引</strong></li></ul><p>一旦索引被关闭，那么这个索引只能显示元数据信息，<strong>不能够进行读写操作</strong>。</p><p><img src="'+r+'" alt="img"></p><p>当关闭以后，再插入数据时：</p><p><img src="'+d+'" alt="img"></p><ul><li><strong>打开索引</strong></li></ul><p><img src="'+g+'" alt="img"></p><p>打开后又可以重新写数据了</p><p><img src="'+o+'" alt="img"></p><h3 id="删除索引" tabindex="-1">删除索引 <a class="header-anchor" href="#删除索引" aria-label="Permalink to &quot;删除索引&quot;">​</a></h3><p>最后我们将创建的test-index-users删除。</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">DELETE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /test-index-users</span></span></code></pre></div><p><img src="'+F+'" alt="img"></p><h3 id="查看索引" tabindex="-1">查看索引 <a class="header-anchor" href="#查看索引" aria-label="Permalink to &quot;查看索引&quot;">​</a></h3><p>由于test-index-users被删除，所以我们看下之前bank的索引的信息</p><ul><li><strong>mapping</strong></li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /bank/_mapping</span></span></code></pre></div><p><img src="'+c+'" alt="img"></p><ul><li><strong>settings</strong></li></ul><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GET</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /bank/_settings</span></span></code></pre></div><p><img src="'+u+'" alt="img"></p><h2 id="kibana管理索引" tabindex="-1">Kibana管理索引 <a class="header-anchor" href="#kibana管理索引" aria-label="Permalink to &quot;Kibana管理索引&quot;">​</a></h2><p>在Kibana如下路径，我们可以查看和管理索引</p><p><img src="'+E+'" alt="img"></p><h2 id="参考文章" tabindex="-1">参考文章 <a class="header-anchor" href="#参考文章" aria-label="Permalink to &quot;参考文章&quot;">​</a></h2><ul><li><a href="https://www.elastic.co/guide/cn/elasticsearch/guide/current/_creating_an_index.html" target="_blank" rel="noreferrer">https://www.elastic.co/guide/cn/elasticsearch/guide/current/_creating_an_index.html</a></li><li><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html" target="_blank" rel="noreferrer">https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html</a></li><li><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/removal-of-types.html" target="_blank" rel="noreferrer">https://www.elastic.co/guide/en/elasticsearch/reference/current/removal-of-types.html</a></li><li><a href="https://www.cnblogs.com/quanxiaoha/p/11515057.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/quanxiaoha/p/11515057.html</a></li></ul><hr><p>著作权归@pdai所有 原文链接：<a href="https://pdai.tech/md/db/nosql-es/elasticsearch-x-index-mapping.html" target="_blank" rel="noreferrer">https://pdai.tech/md/db/nosql-es/elasticsearch-x-index-mapping.html</a></p>',70)]))}const f=i(y,[["render",C]]);export{x as __pageData,f as default};
