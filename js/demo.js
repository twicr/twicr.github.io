/* Variables */
var AnimEnd = 'animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd';
var nav = $('.nav');
var navButton = $('.nav-el');
var overlay = $('.overlay');

// 时钟
function displayTime(){
    var elt = document.getElementById("clock");
    var now = new Date();
    elt.innerHTML  = now.toLocaleTimeString('chinese', { hour12: false });
    setTimeout(displayTime,1000);
}
window.onload = displayTime;

/* On menu button click event */
$(navButton).click(function(event){

    /* This conditional statement is here to prevent
    clicks on inactive buttons on IE10, as pointer-events
    cannot be applied on non-SVG elements */

    if ($(this).hasClass("inactive")) {

        event.preventDefault();

    } else {

        /* Remove old previous classes */
        $(navButton).removeClass('inactive_reverse active_reverse');
        $(nav).removeClass('fx-box_rotate fx-box_rotate_reverse');
        $(overlay).removeClass('active active_reverse');

        /* Add classes on defined elements */
        $(this).siblings().addClass('inactive');
        $(this).addClass('active');
        $(nav).addClass('fx-box_rotate');

        /* Activate related overlay */
        var o_target = $(this).data('id');
        $('#'+o_target).addClass('active');

        /* Prevent scrolling */
        $("body").addClass('noscroll');

    }

});

/* On close button click event */
$(".close").click(function(){

    /* Add *_reverse classes */
    $('.active', nav).removeClass('active').addClass('active_reverse');
    $('.inactive', nav).addClass('inactive_reverse');
    $(nav).addClass('fx-box_rotate_reverse');
    $(this).parent().addClass('active_reverse');

    /* Remove .noscroll and .inactive when animation is finished */
    $('.inactive_reverse').bind(AnimEnd, function(){

        $('body').removeClass('noscroll');
        $(navButton).removeClass('inactive');
        $('.inactive_reverse').unbind(AnimEnd);

    });
});

// 图片盒子淡化
function change(box, btn, num){
    var alpha=100;
    var img = document.getElementById(box);
    var off = document.getElementById(btn);
    off.onclick=function(){
        startMove(num)
    }
    var timer;
    function startMove(tar) {
        var img = document.getElementById(box);
        clearInterval(timer);
        timer = setInterval(function () {
            var ispeed=0;
            ispeed= alpha<tar?5:-5;
            if(alpha==tar){
                clearInterval(timer)
            }else{
                alpha+=ispeed;
                img.style.filter="alpha(opacity:"+alpha+")";
                img.style.opacity=alpha/100;
            }
        }, 20)
    }
}

function on(myid){
    document.getElementById(myid).style.opacity = '100';
    document.getElementById(myid).style.backgroundSize = '110%';
    document.getElementById(myid).scrollTop = 0;
}

// 滑动条滑动背景淡化
function bgOpacity(bgid, bgclass){
    $(function(){
      bgIDName = $('#' + bgid);
      bgClassName = $('.' + bgclass);
      size = 1.1 * bgClassName.width();
      bgIDName.on('scroll', function(){
        ovTopLeftFromTop = bgIDName.scrollTop();
        newSize = size - ( ovTopLeftFromTop/5 );
        if (newSize > bgClassName.width()) {
            bgClassName.css({
              '-webkit-background-size': newSize,
              '-moz-background-size': newSize,
              '-o-background-size': newSize,
              'background-size': newSize,
              '-webkit-filter':'blur('+ 0 + (ovTopLeftFromTop/50) + 'px)',
              'opacity': 1 - ((ovTopLeftFromTop / $('html').height()) * 1.3)
            });
          }
        });
    });

    $(function (){
        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        if (isChrome || isSafari) {
        } else {
            bgClassName.append('<div class="opaque"></div>');
            bgOpacity.on('scroll', function(){
                var opacity = 0 + (bgOpacity.scrollTop()/5000);
                $('.opaque').css('opacity', opacity);
            });
        }
    });
}

