---
title: Next主题升级
categories:
  - hexo
tags:
  - hexo
copyright: true
comments: true
abbrlink: cfd6f544
date: 2020-01-24 11:55:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 突然发现,hexo和next升级了好几个版本,新增了一些小功能,记录一下升级的过程

<!--more-->

hexo升级比较简单,`npm i hexo-cli -g`,重新升级一下就好,主要来看看Next修改了哪些功能

### 下载新版Next

`Git clone https://github.com/theme-next/hexo-theme-next themes/next` 下载到/themes的文件夹目录下,假设名字为next-v7.4.2

### 修改根目录的_config.yml

1. language改为: language: zh-CN
2. theme改为: theme: next-v7.4.2 # 这里的名字对应目录下的名字

### 配置Next主题文件夹的_config.yml

关于这个配置,我也是看别人的博客一点一点改的,可是版本就算一样,也有可能不信,所以最好大家改的时候多试几个版本

#### 主题修改

```
# Schemes
#scheme: Muse
scheme: Mist
#scheme: Pisces
#scheme: Gemini
```

### 设置菜单及对应页面

```
menu:
  home: / || home
  tags: /tags/ || tags
  categories: /categories/ || th
  archives: /archives/ || archive
  about: /about/ || user
  #comments: /comments/ || comments
  #schedule: /schedule/ || calendar
  #sitemap: /sitemap.xml || sitemap
  #commonweal: /404/ || heartbeat
```

新增的菜单需要修改中文的,在/languages的zh-CN.yml中自行修改

### 配置底部显示

```
footer:
  # 配置年份
  since: 2016

  # 配置图标
  icon:
    # 样式
    name: heart
    # 动画
    animated: true
    # 颜色
    color: "#ff0000"

  # 作者
  copyright: 陈晟

  powered:
    # 显示驱动
    enable: true
    # 不显示版本
    version: false

  theme:
    # 显示主题
    enable: true
    # 不显示版本
    version: false
```

然后在/languages的zh-CN.yml中修改 

```
footer:
  powered: "欢迎访问"
  theme: Mr.Chen的小前端
```

### 开启文章版权信息

```
creative_commons:
  license: by-nc-sa
  sidebar: true
  post: true
  language:
```

### Tag 标签前图标修改

tag_icon: true

### 站点访问量统计

新版的Next已经自动集成了不蒜子统计

```
busuanzi_count:
  enable: true #设true 开启
  total_visitors: true  #总阅读人数 uv数
  total_visitors_icon: user  #阅读总人数的图标
  total_views: true #总阅读次数 pv数
  total_views_icon: eye #阅读总次数的图标
  post_views: false #开启内容阅读次数
  post_views_icon: eye #内容页阅读数的图标
```

> 高阶用法：通过修改代码来自定义统计文案

编辑themes/next-v-7.4.2/layout/_partials/analytics/busuanzi-counter.swig,修改为下面这样

```
{%- if theme.busuanzi_count.enable %}
<div class="busuanzi-count">
  <script{{ pjax }} async src="https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>

  {%- if theme.busuanzi_count.total_visitors %}
      <span class="site-uv">
        {{ __('footer.total_visitors', '<span class="busuanzi-value" id="busuanzi_value_site_uv"></span>') }}
      </span>

  {%- endif %}

  {%- if theme.busuanzi_count.total_views %}
    <span class="site-pv">
     {{ __('footer.total_views', '<span class="busuanzi-value" id="busuanzi_value_site_pv"></span>') }}
    </span>
  {% endif %}
</div>
{%- endif %}
```

编辑：themes\next-v-7.4.2\languages\zh-CN.yml

```
footer:
  total_views: "历经 %s 次回眸才与你相遇"
  total_visitors: "我的第 %s 位朋友，"
```

在自定义样式文件中添加如下样式：

```
//修改不蒜子数据颜色
.busuanzi-value {
  color: #1890ff;
}
```

{% note info  %}
新版本的Next主题说是在`custom_file_path`字段配置一下,然后再对应的文件夹下新增目录_data,写文件样式就可以了,但是我试过之后不行,所以我在`/source/css/_custom`下新增`_custom/.styl`,在外层的main.styl中引入`@import "_custom/custom";`
{% endnote %}

### 站点及文章字数统计

新版本也自动集成了

```
symbols_count_time:
  separated_meta: false
  item_text_post: false
  item_text_total: true
  awl: 4
  wpm: 275
```

### 站内搜索

```
local_search:
  enable: true
  # If auto, trigger search by changing input.
  # If manual, trigger search by pressing enter key or search button.
  trigger: auto
  # Show top n results per article, show all results by setting to -1
  top_n_per_article: 1
  # Unescape html strings to the readable one.
  unescape: false
  # Preload the search data when the page loads.
  preload: false
```

### 添加打赏功能

```
reward_settings:
  # If true, reward would be displayed in every article by default.
  # You can show or hide reward in a specific article throuth `reward: true | false` in Front-matter.
  enable: true
  animation: false
  comment: 没办法,总要恰饭的嘛~~

reward:
  wechatpay: /images/wxpay.png
  alipay: /images/alipay.png
  #bitcoin: /images/bitcoin.png
```

### 添加图片灯箱

> 添加灯箱功能，实现点击图片后放大聚焦图片，并支持幻灯片播放、全屏播放、缩略图、快速分享到社交媒体等，该功能由 fancyBox 提供

在根目录下执行以下命令安装相关依赖：

`git clone https://github.com/theme-next/theme-next-fancybox3 themes/next/source/lib/fancybox`

在主题配置文件中设置 `fancybox: true`


### 新增gittalk评论

之前评论用畅言的,但是会给我塞广告,所以打算换成gittalk

新增Next也集成了!! 这就是为什么我要升级到新版本的原因

首先建立评论仓库

很简单建立一个名blogIssues的评论仓库

在git中github沿路径setting/Developer setting/OAuth Apps，新建自己的OAuth Apps

url都填写自己的域名,建立完成后可以看到client_id和client_secret,就可以记录下来

然后再主题文件中进行配置

```
gitalk:
  enable: true
  github_id: 328921371 # GitHub repo owner
  repo: blogIssues # Repository name to store issues
  client_id: 你的client_id # GitHub Application Client ID
  client_secret: 你的client_secret # GitHub Application Client Secret
  admin_user: 328921371 # GitHub repo owner and collaborators, only these guys can initialize gitHub issues
  distraction_free_mode: false # Facebook-like distraction free mode
  redirect_uri: https://www.chensheng.group
  id: location.pathname
  # Gitalk's display language depends on user's browser or system environment
  # If you want everyone visiting your site to see a uniform language, you can set a force language value
  # Available values: en | es-ES | fr | ru | zh-CN | zh-TW
  language: zh-CN
```

初始化的时候我也遇到过问题,点击按钮的时候一直返回首页,应该是标题太长的问题,后来又可以了,我也不知道原因

### 彩蛋

博客中,边缘波动,打字礼花等有趣的,等着你们自己挖掘吧,自己建博客,享受的就是这个过程
