$(document).ready(function() {

    var on = false;
    var menu = false;
    var about = false;
    var portfolio = false;

    var urls = ['/shifting.html','/sketching.html','/lightbricks.html','orchestra.html','vivid.html','about.html'];

    var character_count = $('.animated-text').text().length;

    var anchors = ['intro','lightshifting', 'sketching', 'lightbricks', 'orchestra', 'vivid', 'about'];

    $(window).scroll(function() {

        console.log("scroll");

        var height = $(window).scrollTop();
        var url = ""+window.location;

        if(url.indexOf("about") != -1) {

            if(height > $(window).height()*0.8){
                $('.header-top').css('opacity','0');
                //console.log("scroll "+height+" "+$(window).height()+" "+window.location);
            }else{
                $('.header-top').css('opacity','1');
            }
            if(height  < $(window).height()/2 && about) {
                $('.header-top').css('opacity','1');
                //console.log("scroll "+height+" "+$(window).height()+" "+window.location);
                about = false;
                $.fn.pagepiling.moveSectionUp();

            }
        }
    });

    $('.luxbar-item').click(function(event) {
        console.log("luxbar-item click");
        menu = !menu;
        $('#luxbar-checkbox').prop('checked', false);
        if(menu){
            $('.luxbar-menu').css('background-color','rgba(0,0,0,0.6)');
            $('body').css('overflow', 'hidden');
            $('html').css('overflow', 'hidden');
        }else{
            $('.luxbar-menu').css('background-color','rgba(0,0,0,0)');
            $('body').css('overflow', 'auto');
            $('html').css('overflow', 'auto');
        }
    });

    $('.luxbar-hamburger').click(function(event) {
        console.log("luxbar-hamburger click");
        menu = !menu;
        if(menu){
            $('.luxbar-menu').css('background-color','rgba(0,0,0,0.6)');
            $('body').css('overflow', 'hidden');
            $('html').css('overflow', 'hidden');
        }else{
            $('.luxbar-menu').css('background-color','rgba(0,0,0,0)');
            $('body').css('overflow', 'auto');
            $('html').css('overflow', 'auto');
        }
    });

    function initLazy() {
        $('.lazy').lazy({
            effect: "fadeIn",
            effectTime: 1000,
            threshold: 0
        });
    }
    /*
     * Plugin intialization
     */
    $('#pagepiling').pagepiling({
        direction: 'horizontal',
        menu: '#menu',
        anchors: anchors,
        sectionsColor: ['black', 'black', 'black', 'black', 'black', 'black', 'black'],
        sectionsImage: ['url(imgs/about.jpg)','url(imgs/light_shifting_display.jpg)','url(imgs/sketching.jpg)','url(imgs/lightbricks.jpg)','url(imgs/orchestra.jpg)','url(imgs/vivid.jpg)','url(imgs/about.jpg)'],
        sectionsPercent: ['50%','50%','30%','30%','30%','30%','50%'],

        afterRender: function(){

            //console.log("afterRender");

            $('#pp-nav').addClass('custom');

            $('.pp-tableCell img').css('display','none');

            $('#header_about').append("<a href=#"+anchors[anchors.length-1]+">About</a>");
            $('#header_portfolio').append("<a href=#"+anchors[1]+">Portfolio</a>");

            $('#header_name').addClass('activeMenuItem');

            //$('#header_name').addClass('active');

            $('#pp-nav li').css('opacity','0');

            //console.log("after pagepilling");

            // Init ScrollMagic
            var controller = new ScrollMagic.Controller();

            // get all slides
            var slides = ["#slide01", "#slide02", "#slide03"];

            // move bcg container when slide gets into the view
            slides.forEach(function (slide, index) {

                var $bcg = $(slide).find('.section');

                var slideParallaxScene = new ScrollMagic.Scene({
                    triggerElement: slide,
                    triggerHook: 1,
                    duration: "100%"
                })
                    .setTween(TweenMax.from($bcg, 1, {y: '-40%', autoAlpha: 0.3, ease:Power0.easeNone}))
                    .addTo(controller);
            });

            // SCENE 5 - parallax effect on the intro slide
            // move bcg container when intro gets out of the the view

            var introTl = new TimelineMax();

            introTl
                .to($('.abstract, .tools'), 0.4, {autoAlpha: 0, ease:Power1.easeNone})
                .to($('.section .bcg'), 1.4, {y: '40%', ease:Power1.easeOut}, '-=0.4')
                .to($('.section .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone}, '-=1.4');

            var introScene = new ScrollMagic.Scene({
                triggerElement: '#intro',
                triggerHook: 0,
                duration: "100%"
            })
                .setTween(introTl)
                .addTo(controller);
        },
        onLeave: function(index, nextIndex, direction){

            //console.log("leave"+index+" "+nextIndex+" "+portfolio);

            if(index==1){
                $('.fa-hand-pointer-o').css('display','none');
            }
            if(index==7){
                $('.content').empty();
                about = false;
            }
            if(nextIndex==1 && direction=="up"){
                //$('#pp-nav').animate({opacity:"0"}, 400);

                $('#pp-nav li').each(function(i)
                {
                    $(this).delay($('#pp-nav li').length*100-100*parseInt(i)).animate({opacity:"0.0"}, 300);
                });

            }else if(nextIndex==7 && direction=="down"){
                $('#pp-nav li').animate({opacity:"0"}, 400);
            }
        },
        afterLoad: function(anchorLink, index){

            //console.log("afterload: "+index);

            close();

            if(index==1){
                $('.fa-hand-pointer-o').css('display','block');
            }
            if(index>1 && index<7){
                //$('#pp-nav').animate({opacity:"1"}, 400);
                $('#pp-nav li').each(function(i)
                {
                    $(this).delay(100*parseInt(i)).animate({opacity:"1.0"}, 300);
                });
            }

            if(index!= 7){
                about = false;
            }


            if(index>1){
                $('#pp-nav').removeClass('custom');
                $('.scroll-downs').css('display','none');
            }else{
                $('#pp-nav').addClass('custom');
                $('.scroll-downs').css('display','block');
            }
            if(anchorLink == "about"){

                initLazy();

                $('.content').load(urls[index-2], function() {

                    $('#wrapper').css('position', 'absolute');
                    $('.mousey').animate({opacity: "0"}, 400);
                    //$('html, body').scrollTop(0);
                    console.log(about);
                    $('html, body').animate({
                        scrollTop: $('.headers h1').offset().top
                    }, 'slow', function () {
                        //console.log(anchorLink);
                        $('body').css('overflow', 'auto');
                        $('html').css('overflow', 'auto');
                        about = true;
                    });

                });

            } else {
                $('.header-top').removeClass('about');

                $('body').css('overflow', 'hidden');
                $('html').css('overflow', 'hidden');

                $('#wrapper').css('position', 'fixed');
            };

            //$('h1').css('text-decoration','none');

            $('#menu h1').removeClass('activeMenuItem');

            if(anchorLink=="intro"){
                $('#header_name').addClass('activeMenuItem');//.css('text-decoration','underline');
                //$('#header_portfolio').removeClass('activeMenuItem');
            }else if(anchorLink!="intro" && anchorLink!="about"){
                $('#header_portfolio').addClass('activeMenuItem');//.css('text-decoration','underline');
            }else if(anchorLink=="about"){
                $('#header_about').addClass('activeMenuItem');//.css('text-decoration','underline');
                //$('#header_portfolio').removeClass('activeMenuItem');
            }

        }
    }, function(){

    });

    $('.luxbar-hamburger').click(function(){
        //console.log("luxbar menu");
    });

    $('.luxbar-item').click(function(){
        //console.log($(this));
    });

    $('.toggle-menu').click(function(){
        console.log("toggle-menu");
        menu = true;
        $('.mobile_navigation').css('display','block');
        $('#menu').css('display','none');
        $('.header-top').append("<a class='l-right close'><i class='fa fa-times' aria-hidden='true'></i></a>");
    });

    /*$('.close').click(function(){
     $('.menu').css('display','none');
     $('#menu').css('display','block');
     $('.header-top').removeClass('open');

     })*/

    $('.button').click(function(){

        $.fn.pagepiling.setAllowScrolling(false);

        var index = $( ".button" ).index( this );
        $('#luxbar').css('display','none');
        //console.log(index);

        function doSomethingWithData(data) {

            var teaser = $(data).clone();
            //var iframe = $(data).find("iframe");

            //teaser = $.trim($("iframe",teaser).remove().end().html());

            $('.content').append(teaser);

            if(bowser.ios==true && bowser.safari==true){
                $('.row').css('margin-top', '-30px');
            }

            $('body').css('overflow', 'auto');
            $('html').css('overflow', 'auto');

            $('#wrapper').css('position', 'absolute');

            $('.button').animate({opacity: "0"}, 1, function(){
                $('.button').css('display', 'none');
            });

            $('#pp-nav').animate({opacity:"0"}, 400);
            $('.mousey').animate({opacity:"0"}, 400);

            $('.header-top').addClass('open');
            $('#header_about').css('display', 'none');
            $('#header_portfolio').css('display', 'none');
            $('#menu').append("<a class='l-right close'><i class='fa fa-times' aria-hidden='true'></i></a>");

            $('html, body').animate({
                    scrollTop:$('.headers h2').offset().top -90
                }, 700,
                'swing',
                function(){
                    //$('.embed-container').append(iframe);
                });

            initLazy();

        }

        var content;
        //$.get(urls[index], doSomethingWithData);

        $.ajax({
            url: urls[index],
            timeout: 3000,
            type: 'GET',
            success: function (data){
                doSomethingWithData(data);
            },
            error: function(data){
                close();
                //alert('Error');
            }
        })


    });

    function close(){

        //console.log("close");

        $('#luxbar').css('display','block');

        $('.content').empty();
        $('.header-top').removeClass('open');
        $('a').remove('.close');
        //$('.menu').css('display','none');
        $('#header_about').css('display', 'block');
        $('#header_portfolio').css('display', 'block');
        $('.button').css('display', 'table-cell');
        $('.button').css('opacity', '1.0');
        $('.abstract').css('opacity', '1.0');
        $('.abstract').css('visibility', 'inherit');
        $('.tools').css('opacity', '1.0');
        $('.tools').css('visibility', 'inherit');
        $('.bcg').css('transform', 'translate(0%, 0%)');
        $('.bcg').css('opacity', '1.0');

        $('#pp-nav').css('opacity','1');
        $('.mousey').css('opacity','1');

        $('body').css('overflow', 'hidden');
        $('html').css('overflow', 'hidden');

        $('#wrapper').css('position', 'fixed');
        $('#pp-nav').animate({opacity:"1"}, 400);

        $.fn.pagepiling.setAllowScrolling(true);
    }


    $('.header-top').on('click', '.close', function(){
        //console.log("close1");
        close();
    });


    if(bowser.mobile==true && bowser.safari==true){

        var height = $(window).height() - 0;

        $('.pp-section').css('height', height);

    }

    if(bowser.mobile==true && bowser.chrome==true){

        $('.pp-tableCell').css('padding-bottom', '0px');

        $('.button').css('margin-bottom', '0px');

        $('.tools').css('margin-bottom', '15px');

    }

    if(bowser.android==true && bowser.chrome==true){

        $('.pp-tableCell').css('padding-bottom', '65px');

        $('.button').css('margin-bottom', '65px');

        //if(bowser.chrome==true) {
        $('.bcg').css('top', '-50px');
        //}

    }
});