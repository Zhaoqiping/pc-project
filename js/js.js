

$(function(){
	var scrollBox = {
		//初始化属性和方法
		init: function(){
			//可视区域
			this.scrollbox = $('.scrollBox'); 
			//图片盒子
			this.imgBox = this.scrollbox.find('.imgBox');
			//图片
			this.imgs = this.imgBox.find('img');

			//小圆圈
			this.circle = this.scrollbox.find('.circleItem');

			//找到第一张图片和最后一张图片
			var firstImg = this.imgs.first().clone(true);
			var lastImg = this.imgs.last().clone(true);

			//在第一个位置添加最后一张图片
			this.imgBox.prepend(lastImg);
			//在最后一个位置添加第一张图片
			this.imgBox.append(firstImg);

			//获取图片个数及宽度
			this.imgLength = this.imgBox.find('img').length;
			this.imgWidth = firstImg.width();

			//设置图片盒子的宽度
			this.imgBox.css({
				width: (this.imgLength * this.imgWidth),
				marginLeft: -400
			});

			this.index = 1;
			this.timer = null;

			this.leftBtn = $('.leftBtn');
			this.rightBtn = $('.rightBtn');

			this.autoPlay();
			this.mouseHover();
			this.rightBtnDown();
			this.leftBtnDown();
			this.clickCricle();
		},
		autoPlay: function(){
			var that = this;
			this.timer = setInterval(function(){
				that.index++;
				that.switchImg();
			},1500);
		},
		switchImg: function(){
			var that = this;
			this.imgBox.stop(true,true).animate({
				marginLeft: -that.imgWidth * that.index
			},function(){
				//右边界处理  最后一张图片运动完成 拉回到真正的第一张图片
				if (that.index >= that.imgLength-1) {
					that.index = 1;
				}
				//左边界处理  第一张图片运动完成 拉回到真正的最后一张图片
				if (that.index <= 0){
					that.index = that.imgLength - 2;
				}
				that.imgBox.css({
					marginLeft: -that.imgWidth * that.index
				});
				//图片  1 ~ 6  小圆圈  0 ~ 5
				that.circle.eq(that.index-1)
					.addClass('active')
					.siblings().removeClass('active');
			});	
		},
		mouseHover: function(){
			var that = this;
			this.scrollbox.hover(function(){
				clearInterval(that.timer);
			},function(){
				that.autoPlay();
			});
		},
		rightBtnDown: function(){
			var that = this;
			this.rightBtn.click(function(){
				that.index++;
				that.switchImg();
			});
		},
		leftBtnDown: function(){
			var that = this;
			this.leftBtn.click(function(){
				that.index--;
				that.switchImg();
			});
		},
		clickCricle: function(){
			var that = this;
			this.circle.click(function(){
				that.index = $(this).index() + 1;
				that.switchImg();
			});
		}
	};

	scrollBox.init();
});