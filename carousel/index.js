console.log('123')


function Carousel($ct){
    console.log('345')
    this.init($ct)
    this.bind()
    //this.autoPlay()
}

Carousel.prototype = {
    init: function($ct){
        this.$ct = $ct
        this.$imgCt = this.$ct.find('.img-ct')
        this.$imgs = this.$ct.find('.img-ct>li')
        this.$preBtn = this.$ct.find('.pre')
        this.$nextBtn = this.$ct.find('.next')
        this.$bullets = this.$ct.find('.bullet li')

        this.imgWidth = this.$imgs.width()
        this.imgCount = this.$imgs.length
        this.index = 0
        this.isAnimate = false


        this.$imgCt.append(this.$imgs.first().clone())
        this.$imgCt.prepend(this.$imgs.last().clone())
        this.$imgCt.width((this.imgCount + 2) * this.imgWidth)
        this.$imgCt.css('left',-this.imgWidth)

    },
    bind: function(){
        var _this = this
        this.$preBtn.on('click',function(){
            console.log('pre...')
            _this.playPre(1)
        })
        this.$nextBtn.on('click',function(){
            console.log('next...')
            _this.playNext(1)
        })
        this.$bullets.on('click',function(){
            console.log($(this).index())
            var index = $(this).index()
            if(_this.index > index){
                _this.playPre(_this.index - index)
            }else{
                _this.playNext(index - _this.index)
            }
        })
        this.$imgs.on('mouseover',function(){
            console.log('stop')
            _this.stopAuto()
        })
        this.$imgs.on('mouseleave',function(){
            _this.autoPlay()
        })
    },
    playPre: function(len){
        if(this.isAnimate) return
        this.isAnimate = true
        var _this = this
        this.$imgCt.animate({
            left: '+=' + this.imgWidth * len
        },function(){
            _this.index -= len
            if(_this.index < 0){
                _this.$imgCt.css('left',-_this.imgWidth * _this.imgCount)
                _this.index = _this.imgCount - 1
            }
            _this.setBullet()
            _this.isAnimate = false
        })
    },
    playNext: function(len){
        if(this.isAnimate) return
        this.isAnimate = true
        var _this = this
        this.$imgCt.animate({
            left: '-=' + this.imgWidth * len
        },function(){
            _this.index += len
            if(_this.index === _this.imgCount){
                _this.$imgCt.css('left',-_this.imgWidth)
                _this.index = 0
            }
            _this.setBullet()
            _this.isAnimate = false
        })
    },
    setBullet: function(){
        this.$bullets.eq(this.index).addClass('active')
            .siblings().removeClass('active')
    },
    autoPlay: function(){
        var _this = this
        this.autoClock = setInterval(function(){
            _this.playNext(1)
        },2000)
    },
    stopAuto: function(){
        clearInterval(this.autoClock)
    },


}
var carousel1 = new Carousel($('.carousel').eq(0))
var carousel2 = new Carousel($('.carousel').eq(1))





























































