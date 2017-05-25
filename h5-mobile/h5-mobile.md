1, Meta基础知识
    H5页面窗口自动调整到设备宽度，并禁止用户缩放页面
    一、HTML页面结构（快捷键生成）meta:vp
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
        width    设置viewport宽度，为一个正整数，或字符串‘device-width’
        height   设置viewport高度，一般设置了宽度，会自动解析出高度，可以不用设置
        initial-scale    默认缩放比例，为一个数字，可以带小数
        user-scalable    是否允许手动缩放
        minimum-scale    允许用户最小缩放比例，为一个数字，可以带小数
        maximum-scale    允许用户最大缩放比例，为一个数字，可以带小数
         
    二、JS动态判断
        var phoneWidth =  parseInt(window.screen.width);
        var phoneScale = phoneWidth/640;
        var ua = navigator.userAgent;
        if (/Android (\d+\.\d+)/.test(ua)){
            var version = parseFloat(RegExp.$1);
            if(version>2.3){
                document.write('<meta name="viewport" content="width=640, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');
            }else{
                document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
            }
        } else {
            document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
        }

    H5空白页基本meta标签
        <!-- 设置缩放 -->
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui" />
        <!-- 可隐藏地址栏，仅针对IOS的Safari（注：IOS7.0版本以后，safari上已看不到效果） -->
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <!-- 仅针对IOS的Safari顶端状态条的样式（可选default/black/black-translucent ） -->
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <!-- IOS中禁用将数字识别为电话号码/忽略Android平台中对邮箱地址的识别 -->
        <meta name="format-detection"content="telephone=no, email=no" />

    PC端基础meta标签
        <!-- 页面关键词-->
        <meta name="keywords" content="your tags" />
        <!-- 页面描述-->
        <meta name="description" content="150 words" />
        <!-- 搜索引擎索引方式：robotterms是一组使用逗号(,)分割的值，通常有如下几种取值：none，noindex，nofollow，all，index和follow。确保正确使用nofollow和noindex属性值。-->
        <meta name="robots" content="index,follow" />
        <!--
            all：文件将被检索，且页面上的链接可以被查询；
            none：文件将不被检索，且页面上的链接不可以被查询；
            index：文件将被检索；
            follow：页面上的链接可以被查询；
            noindex：文件将不被检索；
            nofollow：页面上的链接不可以被查询。
        -->

        页面重定向和刷新：
            content内的数字代表时间（秒），既多少时间后刷新。
            如果加url,则会重定向到指定网页（搜索引擎能够自动检测，
            也很容易被引擎视作误导而受到惩罚）。-->
            <meta http-equiv="refresh" content="0;url=" />

         页面缓存设置
            <!-- 清除缓存 -->
            <meta http-equiv="pragma" content="no-cache">
            <meta http-equiv="cache-control" content="no-cache">
            <meta http-equiv="expires" content="0">   

        其他meta标签
            <!-- 启用360浏览器的极速模式(webkit) -->
            <meta name="renderer" content="webkit">
            <!-- 避免IE使用兼容模式 -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
            <meta name="HandheldFriendly" content="true">
            <!-- 微软的老式浏览器 -->
            <meta name="MobileOptimized" content="320">
            <!-- uc强制竖屏 -->
            <meta name="screen-orientation" content="portrait">
            <!-- QQ强制竖屏 -->
            <meta name="x5-orientation" content="portrait">
            <!-- UC强制全屏 -->
            <meta name="full-screen" content="yes">
            <!-- QQ强制全屏 -->
            <meta name="x5-fullscreen" content="true">
            <!-- UC应用模式 -->
            <meta name="browsermode" content="application">
            <!-- QQ应用模式 -->
            <meta name="x5-page-mode" content="app">
            <!-- windows phone 点击无高光 -->
            <meta name="msapplication-tap-highlight" content="no">
            <meta name="author" content="author name" /> <!-- 定义网页作者 -->
            <meta name="google" content="index,follow" />
            <meta name="googlebot" content="index,follow" />
            <meta name="verify" content="index,follow" />

2, 移动端字体相关
    1)移动端如何定义字体font-family
        iOS 系统
            默认中文字体是Heiti SC
            默认英文字体是Helvetica
            默认数字字体是HelveticaNeue
            无微软雅黑字体
        Android 系统
            默认中文字体是Droidsansfallback
            默认英文和数字字体是Droid Sans
            无微软雅黑字体
        Winphone 系统
            默认中文字体是Dengxian(方正等线体)
            默认英文和数字字体是Segoe
            无微软雅黑字体

        说明：
            各个手机系统有自己的默认字体，且都不支持微软雅黑，如无特殊需求，
            手机端无需定义中文字体，使用系统默认英文字体和数字字体可使用 Helvetica，三种系统都支持。
            body{font-family:Helvetica;}

    2）中文字体的英文名称
        @ 宋体      SimSun
        @ 黑体      SimHei
        @ 微信雅黑   Microsoft Yahei
        @ 微软正黑体 Microsoft JhengHei
        @ 新宋体    NSimSun
        @ 新细明体  MingLiU
        @ 细明体    MingLiU
        @ 标楷体    DFKai-SB
        @ 仿宋     FangSong
        @ 楷体     KaiTi
        @ 仿宋_GB2312  FangSong_GB2312
        @ 楷体_GB2312  KaiTi_GB2312  
        @
        @ 说明：中文字体多数使用宋体、雅黑，英文用Helvetica
        body { font-family: Microsoft Yahei,SimSun,Helvetica; } 

    3）字体单位
        移动端字体单位font-size选择px还是rem？
            一，如需适配多种移动设备，建议使用rem。以下为参考值：            
                html { font-size: 62.5%; }   //10*16 = 62.5%
                设置12px字体   这里注意在rem前要加上对应的px值，解决不支持rem的浏览器的兼容问题，做到优雅降级
                body { font-size:12px; font-size:1.2rem; }   

                例如只需要适配iPhone和iPad等分辨率差别比较挺大的设备
                html {font-size:10px}
                @media screen and (min-width:480px) and (max-width:639px) {
                    html {
                        font-size: 15px
                    }
                }
                @media screen and (min-width:640px) and (max-width:719px) {
                    html {
                        font-size: 20px
                    }
                }
                @media screen and (min-width:720px) and (max-width:749px) {
                    html {
                        font-size: 22.5px
                    }
                }
                @media screen and (min-width:750px) and (max-width:799px) {
                    html {
                        font-size: 23.5px
                    }
                }
                @media screen and (min-width:800px) and (max-width:959px) {
                    html {
                        font-size: 25px
                    }
                }
                @media screen and (min-width:960px) and (max-width:1079px) {
                    html {
                        font-size: 30px
                    }
                }
                @media screen and (min-width:1080px) {
                    html {
                        font-size: 32px
                    }
                }
            二， 对于只需要适配手机设备，使用px即可
            
3, 电话、短信、邮件
     一、打电话
    <a href="tel:0755-10086">打电话给:0755-10086</a>

      二、发短信，winphone系统无效
    <a href="sms:10086">发短信给: 10086</a>

 三、写邮件
    注：在添加这些功能时，第一个功能以"?"开头，后面的以"&"开头
    //1.普通邮件
    <a href="mailto:863139978@qq.com">点击我发邮件</a>
    //2.收件地址后添加?cc=开头，可添加抄送地址（Android存在兼容问题）
    <a href="mailto:863139978@qq.com?cc=zhangqian0406@yeah.net">点击我发邮件</a>
    //3.跟着抄送地址后，写上&bcc=,可添加密件抄送地址（Android存在兼容问题）
    <a href="mailto:863139978@qq.com?cc=zhangqian0406@yeah.net&bcc=384900096@qq.com">点击我发邮件</a>
    //4.包含多个收件人、抄送、密件抄送人，用分号(;)隔开多个邮件人的地址
    <a href="mailto:863139978@qq.com;384900096@qq.com">点击我发邮件</a>
    //5.包含主题，用?subject=
    <a href="mailto:863139978@qq.com?subject=邮件主题">点击我发邮件</a>
    //6.包含内容，用?body=;如内容包含文本，使用%0A给文本换行 
    <a href="mailto:863139978@qq.com?body=邮件主题内容%0A腾讯诚信%0A期待您的到来">点击我发邮件</a>
    //7.内容包含链接，含http(s)://等的文本自动转化为链接
    <a href="mailto:863139978@qq.com?body=http://www.baidu.com">点击我发邮件</a>
    //8.内容包含图片（PC不支持）
    <a href="mailto:863139978@qq.com?body=<img src='images/1.jpg' />">点击我发邮件</a>

    //9.完整示例
    <a href="mailto:863139978@qq.com;
    384900096@qq.com?cc=zhangqian0406@yeah.net&bcc=993233461@qq.com&subject=[邮件主题]&body=腾讯诚邀您参与%0A%0Ahttp://www.baidu.com%0A%0A
    <img src='images/1.jpg' />">点击我发邮件</a>

4，移动端touch事件（区分webkit和winphone）
    /* 当用户手指放在移动设备在屏幕上滑动会触发的touch事件 */
    以下支持webkit
    touchstart——当手指触碰屏幕时候发生。不管当前有多少只手指
    touchmove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用event的preventDefault()可以阻止默认情况的发生：阻止页面滚动
    touchend——当手指离开屏幕时触发
    touchcancel——系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面alert()一个提示框，此时会触发该事件，这个事件比较少用

    TouchEvent说明：
        touches：屏幕上所有手指的信息
        targetTouches：手指在目标区域的手指信息
        changedTouches：最近一次触发该事件的手指信息
        touchend时，touches与targetTouches信息会被删除，changedTouches保存的最后一次的信息，最好用于计算手指信息

    参数信息(changedTouches[0])
        clientX、clientY在显示区的坐标
        target：当前元素
    事件响应顺序
        ontouchstart  > ontouchmove  > ontouchend > onclick

5，Rentina显示屏原理及设计方案
    说明：retina屏是一种具备超高像素密度的液晶屏，
    同样大小的屏幕上显示的像素点由1个变为多个，如在同样带下的屏幕上，苹果设备的retina显示屏中，像素点1个变为4个。
    在高清显示屏中的位图被放大，图片会变得模糊，因此移动端的视觉稿通常会设计为传统PC的2倍。
    那么，前端的应对方案是：
        设计稿切出来的图片长宽保证为偶数，并使用backgroud-size把图片缩小为原来的1/2
        例如图片宽高为：200px*200px，那么写法如下
        .css{width:100px;height:100px;background-size:100px 100px;}
        其它元素的取值为原来的1/2，例如视觉稿40px的字体，使用样式的写法为20px
        .css{font-size:20px}

        image-set设计Rentina背景图
        image-set,webkit私有属性，也是CSS4的属性，为解决Rentina屏幕下的图像而生。
        .css {
            background: url(images/bg.jpg) no-repeat center;
            background: -webkit-image-set(
            url(images/bg.jpg) 1x,     //支持image-set普通屏
            url(images/bg-2x.jpg) 2x); //支持image-set的Rentinan
        }

6，点击元素产生背景或边框怎么去掉
    ios用户点击一个链接，会出现一个半透明灰色遮罩, 如果想要禁用，
    可设置-webkit-tap-highlight-color的alpha值为0去除灰色半透明遮罩；

    android用户点击一个链接，会出现一个边框或者半透明灰色遮罩, 不同生产商定义出来额效果不一样，
    可设置-webkit-tap-highlight-color的alpha值为0去除部分机器自带的效果；

    winphone系统,点击标签产生的灰色半透明背景，
    通过设置<meta name="msapplication-tap-highlight" content="no">去掉；

    特殊说明：有些机型去除不了，如小米2。对于按钮类还有个办法，不使用a或者input标签，直接用div标签
    a,button,input,textarea { 
        -webkit-tap-highlight-color: rgba(0,0,0,0); 
        -webkit-user-modify:read-write-plaintext-only; //-webkit-user-modify有个副作用，就是输入法不再能够输入多个字符
    }   
     也可以 
    * { -webkit-tap-highlight-color: rgba(0,0,0,0); }

    winphone下
    <meta name="msapplication-tap-highlight" content="no">

7，表单元素
    一、使用appearance改变webkit浏览器的默认外观
        input,select { -webkit-appearance:none; appearance: none; }

        webkit表单输入框placeholder的颜色值改变
           ::-webkit-input-placeholder { /* WebKit browsers */
            color: #999; }
            :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color: #999; }
            ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: #999; }
            :-ms-input-placeholder { /* Internet Explorer 10+ */
            color: #999; }
            input:focus::-webkit-input-placeholder{ color:#999; }

        webkit表单输入框placeholder的文字能换行么
            iOS可以，Android不行~
        关闭iOS键盘首字母自动大写
            在iOS中，默认情况下键盘是开启首字母大写的功能的，如果启用这个功能，可以这样：
            <input type="text" autocapitalize="off" />
        关闭iOS输入自动修正
            <input type="text" autocorrect="off" />
    二、winphone下，使用伪元素改变表单元素默认外观
        1.禁用select默认箭头，::-ms-expand修改表单控件下拉箭头，设置隐藏并使用背景图片来修饰
            select::-ms-expand { display:none; }

        2.禁用radio和checkbox默认样式，::-ms-check修改表单复选框或单选框默认图标，设置隐藏并使用背景图片来修饰
            input[type=radio]::-ms-check,
            input[type=checkbox]::-ms-check { display:none; }

        3.禁用pc端表单输入框默认清除按钮，::-ms-clear修改清除按钮，设置隐藏并使用背景图片来修饰
            input[type=text]::-ms-clear,
            input[type=tel]::-ms-clear,
            input[type=number]::-ms-clear { display:none; }

8，移动端click屏幕产生200-300 ms的延迟响应
    解决方案：
    fastclick可以解决在手机上点击事件的300ms延迟
    zepto的touch模块，tap事件也是为了解决在click的延迟问题
    通过绑定ontouchstart事件，加快对事件的响应。

9, 禁止文本缩放
    当移动设备横竖屏切换时，文本的大小会重新计算，进行相应的缩放，当我们不需要这种情况时，可以选择禁止：
    html {
    　　   -webkit-text-size-adjust: 100%;
    }
10, 快速回弹滚动
    在iOS上如果你想让一个元素拥有像 Native 的滚动效果，你可以这样做：
     .xxx {
        overflow: auto; /* auto | scroll */
        -webkit-overflow-scrolling: touch;
    }
    PS：iScroll用过之后感觉不是很好，有一些诡异的bug，
    这里推荐另外一个 iDangero Swiper，
    iDangero官方地址： :www.idangero.us/swiper/#.VX_t9PmEB8Y

11, 移动端禁止选中内容
    .user-select-none {
    -webkit-user-select: none;  /* Chrome all / Safari all */
    -moz-user-select: none;     /* Firefox all （移动端不需要） */
    -ms-user-select: none;      /* IE 10+ */      
    }
12, 如何禁止保存或拷贝图像（IOS）
    img { -webkit-touch-callout: none; }

13, 去掉webkit的滚动条
    ——display: none;
    其他参数
    ::-webkit-scrollba //滚动条整体部分
    ::-webkit-scrollbar-thumb   //滚动条内的小方块
    ::-webkit-scrollbar-track   //滚动条轨道
    ::-webkit-scrollbar-button  //滚动条轨道两端按钮
    ::-webkit-scrollbar-track-piece  //滚动条中间部分，内置轨道
    ::-webkit-scrollbar-corner       //边角，两个滚动条交汇处
    ::-webkit-resizer            //两个滚动条的交汇处上用于通过拖动调整元素大小的小控件   
    
14, android上去掉语音输入按钮
        input::-webkit-input-speech-button {display: none}

15, 手机拍照和上传图片
        IOS有拍照、录像、选取本地图片功能，部分Android只有选择本地图片功能。
        <input type="file" accept="images/*" />
        <input type="file" accept="video/*" />

16, 屏幕旋转的事件和样式
    JS处理
        function orientInit(){
            var orientChk = document.documentElement.clientWidth > document.documentElement.clientHeight?'landscape':'portrait';
            if(orientChk =='lapdscape'){
                //这里是横屏下需要执行的事件
            }else{
                //这里是竖屏下需要执行的事件
            }
        }

        orientInit();
        window.addEventListener('onorientationchange' in window?'orientationchange':'resize', function(){
            setTimeout(orientInit, 100);
        },false)    

    CSS处理
        竖屏时样式
        @media all and (orientation:portrait){   }
        横屏时样式
        @media all and (orientation:landscape){   }
    切换横竖屏
        function detectOrientatioin(){
            if(window.orientation==180 || window.orientation==0){
                //竖屏
            }
            if(window.orientation==90 || window.orientation==-90){
                //横屏
            }
        }

17, audio元素和video元素在ios和andriod中无法自动播放
    音频，写法一
        <audio src="music/bg.mp3" autoplay loop controls>你的浏览器还不支持哦</audio>
    音频，写法二
        <audio controls="controls"> 
            <source src="music/bg.ogg" type="audio/ogg"></source>
            <source src="music/bg.mp3" type="audio/mpeg"></source>
            优先播放音乐bg.ogg，不支持在播放bg.mp3
        </audio>

    应对方案：触屏即播
    $('html').one('touchstart',function(){
        music.play()
    })

    微信下兼容处理
    document.addEventListener("WeixinJSBridgeReady", function () {
        music.play();
    }, false);
    小结
    1.audio元素的autoplay属性在IOS及Android上无法使用，在PC端正常
    2.audio元素没有设置controls时，在IOS及Android会占据空间大小，而在PC端Chrome是不会占据任何空间

18, 重力感应事件
        运用HTML5的deviceMotion，调用重力感应事件
        if(window.DeviceMotionEvent){
            document.addEventListener('devicemotion', deviceMotionHandler, false)
        }   

        var speed = 30;
        var x = y = z = lastX = lastY = lastZ = 0;
        function deviceMotionHandler(eventData){
            var acceleration = event.accelerationIncludingGravity;
            x = acceleration.x;
            y = acceleration.y; 
            z = acceleration.z;
            if(Math.abs(x-lastX)>speed || Math.abs(y-lastY)>speed || Math.abs(z-lastZ)>speed ){
                //这里是摇动后要执行的方法 
                yaoAfter();
            }
            lastX = x;
            lastY = y;
            lastZ = z;
        }

        function yaoAfter(){
            //do something
        }

19, 用户调整字体大小后页面矬了，怎么阻止用户调整?
    以下代码可使Android机页面不再受用户字体缩放强制改变大小，但是会有1S左右延时，期间可以考虑loading来处理
        if (typeof(WeixinJSBridge) == "undefined") {
            document.addEventListener("WeixinJSBridgeReady", function (e) {
                setTimeout(function(){
                    WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize':0}, function(res){
                        alert(JSON.stringify(res));
                    })
                }, 0)
            });
        }else{  
            setTimeout(function(){
                WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize':0}, function(res){
                    alert(JSON.stringify(res));
                })
            }, 0)   
        }

    IOS下可使用 -webkit-text-size-adjust禁止用户调整字体大小
        body { -webkit-text-size-adjust:100%!important; }

20, 定位的坑
    fixed定位:
        1.ios下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位
        2.android下fixed表现要比iOS更好，软键盘弹出时，不会影响fixed元素定位
        3.ios4下不支持position:fixed
            解决方案：使用[Iscroll](http://cubiq.org/iscroll-5)，如：
            <div id="wrapper">
                <ul>
                    <li></li>
                    .....
                </ul>
            </div>
            <script src="iscroll.js"></script>
            <script>
                var myscroll;
                function loaded(){
                    myscroll=new iScroll("wrapper");
                }
                window.addEventListener("DOMContentLoaded",loaded,false);
            </script>

    position定位:
        Android下弹出软键盘弹出时，影响absolute元素定位
        解决方案:
        var ua = navigator.userAgent.indexOf('Android');
        if(ua>-1){
            $('.ipt').on('focus', function(){
                $('.css').css({'visibility':'hidden'})
            }).on('blur', function(){
                $('.css').css({'visibility':'visible'})
            })
        }

21, 播放视频不全屏
    1.ios7+支持自动播放
    2.支持Airplay的设备（如：音箱、Apple TV)播放
        x-webkit-airplay="true" 
    3.播放视频不全屏
        webkit-playsinline="true" 
        <video x-webkit-airplay="true" webkit-playsinline="true" preload="auto" autoplay src="http://"></video>
22, JS判断设备
        function deviceType(){
            var ua = navigator.userAgent;
            var agent = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];    
            for(var i=0; i<len,len = agent.length; i++){
                if(ua.indexOf(agent[i])>0){         
                    break;
                }
            }
        }
        deviceType();
        window.addEventListener('resize', function(){
            deviceType();
        })

23, JS判断微信浏览器
    function isWeixin(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=='micromessenger'){
            return true;
        }else{
            return false;
        }
    }

24，开启硬件加速
    目前，像Chrome/Filefox/Safari/IE9+以及最新版本Opera都支持硬件加速，
    当检测到某个DOM元素应用了某些CSS规则时就会自动开启，从而解决页面闪白，保证动画流畅。
    .css {
        -webkit-transform: translate3d(0,0,0);
        -moz-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }
25, 渲染优化
    1.禁止使用iframe（阻塞父文档onload事件）
    2.禁止使用gif图片实现loading效果（降低CPU消耗，提升渲染性能）
    3,使用CSS3代码代替JS动画；
    4,开启GPU加速；
    5,对于一些小图标，可以使用base64位编码，以减少网络请求。但不建议大图使用，比较耗费CPU。小图标优势在于：
        1.减少HTTP请求；
        2.避免文件跨域；
        3.修改及时生效；

android 2.3 bug
   -webkit-keyframes 需要以0%开始100%结束，0%的百分号不能去掉
   fter和before伪类无法使用动画animation
   order-radius不支持%单位，如要兼容，可以给radius设置一下较大的值
   ranslate百分比的写法和scale在一起会导致失效，例如：
   ebkit-transform: translate(-50%,-50%) scale(-0.5, 1)
android 4.x bug
   1.三星 Galaxy S4中自带浏览器不支持border-radius缩写
   2.同时设置border-radius和背景色的时候，背景色会溢出到圆角以外部分
   3.部分手机(如三星)，a链接支持鼠标:visited事件，也就是说链接访问后文字变为紫色
   4.android无法同时播放多音频audio
    消除transition闪屏
    .css {
        -webkit-transform-style: preserve-3d;
        -webkit-backface-visibility: hidden;
        -webkit-perspective: 1000;
    }