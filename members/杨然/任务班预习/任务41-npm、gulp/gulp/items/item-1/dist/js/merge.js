var Carousel=function(t){var i=function(t){this.$carousel=t,this.init(),this.bind()};return i.prototype={init:function(){var t=this.$ct=this.$carousel.find(".img-ct"),i=this.$items=t.children(),e=(this.imgCount=i.size(),this.imgWidth=i.width());this.$bullet=this.$carousel.siblings(".bullet"),this.$next=this.$carousel.siblings(".next"),this.$pre=this.$carousel.siblings(".pre");this.clock,this.curIdx=0,this.isAnimate=!1,this.autoPlay(),this.bullet(),t.prepend(i.last().clone()),t.append(i.first().clone()),imgRealCount=this.imgRealCount=t.children().size(),this.$itemsReal=t.children(),this.setBg(),t.css({left:0-e,width:imgRealCount*e})},bind:function(){console.log(this.$next),console.log(this.$pre);var t=this;this.$next.on("click",function(){t.playNext()}),this.$pre.on("click",function(){t.playPre()}),this.$bullet.on("click","li",function(){var i=$(this).index();i>t.curIdx?t.playNext(i-t.curIdx):i<t.curIdx&&t.playPre(t.curIdx-i)})},playNext:function(t){var i=this,t=t||1;this.isAnimate||(this.isAnimate=!0,this.$ct.animate({left:"-="+this.imgWidth*t},function(){i.curIdx=(i.curIdx+t)%i.imgCount,0==i.curIdx&&i.$ct.css({left:0-i.imgWidth}),i.isAnimate=!1,i.setBullet()}))},playPre:function(t){console.log("pre");var i=this,t=t||1;this.isAnimate||(this.isAnimate=!0,this.$ct.animate({left:"+="+this.imgWidth*t},function(){i.curIdx=(i.imgCount+i.curIdx-t)%i.imgCount,i.curIdx==i.imgCount-1&&i.$ct.css({left:0-i.imgWidth*i.imgCount}),i.isAnimate=!1,i.setBullet()}))},bullet:function(){console.log(this.$bullet);for(var t=0;t<this.imgCount;t++)this.$bullet.append("<li></li>");this.$bullet.children().first().addClass("active")},autoPlay:function(){var t=this;clock=setInterval(function(){t.playNext()},3e3)},setBullet:function(){this.$bullet.children().removeClass("active").eq(this.curIdx).addClass("active")},setBg:function(){console.log(this.$itemsReal);for(var t=0;t<this.imgRealCount;t++)this.$itemsReal.eq(t).css({background:"url("+this.$itemsReal.eq(t).attr("data-bg")+") no-repeat center","background-size":"cover"})}},{init:function(t){t.each(function(t,e){new i($(e))})}}}();Carousel.init($(".carousel"));var Exposure=function(t){var i=function(t){this.$target=t,this.init(),this.bind(),this.checkShow()};return i.prototype.init=function(){this.clock},i.prototype.bind=function(){var t=this;$(window).on("scroll",function(){t.clock&&clearTimeout(t.clock),t.clock=setTimeout(function(){t.lock||(t.lock=!0,t.checkShow(),t.lock=!1)},50)})},i.prototype.checkShow=function(){this.isShow(this.$target)&&(this.lock=!1,this.$target.animate({opacity:1},200))},i.prototype.isShow=function(t){var i=this.scrollH=$(window).scrollTop(),e=this.winH=$(window).height(),o=this.top=t.offset().top;return!!(o<e+i)},{init:function(t){t.each(function(t,e){new i($(e))})}}}();Exposure.init($(".about-order li"));var GoTop=function(){this.target,this.createNode(),this.bindEvent()};GoTop.prototype.bindEvent=function(){var t=this;this.target.addEventListener("click",function(){window.scrollTo(0,0)}),window.addEventListener("scroll",function(){document.documentElement.scrollTop>500||document.body.scrollTop>500?t.target.style.display="block":t.target.style.display="none"})},GoTop.prototype.createNode=function(){var t=document.createElement("div");this.target=t,this.target.style.cssText="display: none; background: #fed136; color:#fff; position:fixed; right:30px; bottom:20px;   padding: 10px;border-radius: 3px;cursor: pointer;",this.target.innerHTML="回到顶部",document.body.appendChild(this.target)};var GoTop=new GoTop,Lazy=function(){var t=function(t){this.$target=t,this.init(),this.bind()};t.prototype.init=function(){this.curPage=1,this.perPageCount=10},t.prototype.bind=function(){var t=this;$(".load").on("click",function(){console.log("click"),t.loadAndPlace()})},t.prototype.loadAndPlace=function(){var t=this;$.ajax({url:"http://platform.sina.com.cn/slide/album_tech",dataType:"jsonp",jsonp:"jsoncallback",data:{app_key:"1271687855",num:this.perPageCount,page:this.curPage}}).done(function(i){i&&i.status&&"0"===i.status.code?(t.place(i.data),t.curPage++):console.log("获取数据错误")})},t.prototype.place=function(t){var i=this.renderData(t),o=this;i.find("img").on("load",function(){e($(this).parents(".item"),o.$target)})},t.prototype.renderData=function(t){for(var i,e="",o=0;o<t.length;o++)e+='<li class="item">',e+='<a href="'+t[o].cmnt_url+'" class="link">',e+=' <img src=" '+t[o].img_url+' " alt="">',e+='<h4 class="header">'+t[o].short_name+"</h4>",e+='<p class="brief">'+t[o].short_intro+"</p>",e+="</a></li>";return i=$(e),this.$target.prepend(i),i};var i=[],e=function(t,e){function o(t,e){var o=$(".item").outerWidth(!0),n=parseInt(e.width()/o);if(0==i.length)for(var s=0;s<n;s++)i.push(0);t.each(function(){for(var t=$(this),n=0,s=i[0],c=0;c<i.length;c++)i[c]<s&&(n=c,s=i[c]);t.css({left:o*n,top:s,opacity:1}),i[n]=t.outerHeight(!0)+i[n],e.height(Math.max.apply(null,i)+100)})}return o(t,e)};return{init:function(i){i.each(function(i,e){new t($(e))})}}}();Lazy.init($(".portfolio-ct")),$(".load").click();var Stickup=function(t){var i=function(t){this.$cur=t,this.offsetTop=this.$cur.offset().top,this.offsetLeft=this.$cur.offset().left,this.curH=this.$cur.height(),this.scrollTop,this.curW=this.$cur.width(),this.init(),this.bind()};return i.prototype={init:function(){this.$curClone=this.$cur.clone().css({opacity:0}).insertBefore(this.$cur).hide()},bind:function(){var t=this;$(window).on("scroll",function(){t.scrollTop=$(this).scrollTop(),t.scrollTop>=t.offsetTop?t.isFixed()||t.setFixed():t.scrollTop<t.offsetTop&&t.isFixed()&&(t.unsetFixed(),console.log("执行unsetFixed"))})},isFixed:function(){return!!this.$cur.data("data-fixed")},setFixed:function(){this.$cur.data("data-fixed",!0).css({position:"fixed",top:0,left:"offsetLeft",width:this.curW,"z-index":999}),this.$curClone.show()},unsetFixed:function(){this.$cur.data("data-fixed",!1).removeAttr("style"),this.$curClone.hide()}},{init:function(t){t.each(function(t,e){new i($(e))})}}}();Stickup.init($(".head"));var $head=$(".head").eq(1);$(window).on("scroll",function(){$(this).scrollTop()>300?$head.css("background-color","#000"):$head.css("background-color","")});