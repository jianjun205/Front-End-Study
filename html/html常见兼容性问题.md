## 常见兼容问题
1. 双边距BUG float引起的  使用_display：inline
2. 3像素问题 使用float引起的 使用dislpay:inline -3px  
3. 超链接hover 点击后失效  使用正确的书写顺序 link visited hover active
4. Ie z-index问题 给父级添加position:relative
5. Png 透明 使用js代码 改
6. Min-height 最小高度 ！Important 解决’
7. select 在ie6下遮盖 使用iframe嵌套
8. 为什么没有办法定义1px左右的宽度容器（IE6默认的行高造成的，使用over:hidden,   zoom:0.08 line-height:1px）
9. IE5-8不支持opacity，解决办法：
    .opacity {
        opacity: 0.4
        filter: alpha(opacity=60); /* for IE5-7 */
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; /* for IE 8*/
    }
10. IE6不支持PNG透明背景，解决办法: IE6下使用gif图片