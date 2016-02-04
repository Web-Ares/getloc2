$(function(){

    $('.popup').each(function(){
        popup = new Popup($(this));
    });

    $('.tabs').each(function() {
        Tabs($(this));
    });

    $('.site__aside-filter').each(function() {
        Accordion($(this));
    });

    $('.btn-lock').on({
        'click': function(){
            if (!($(this).hasClass('btn-lock_on'))){
                $(this).addClass('btn-lock_on')
            } else {
                $(this).removeClass('btn-lock_on')
            }

            if ($(this).hasClass('control__btn-lock')){

                var _father = $(this).parents('.language__item');

                if (_father.hasClass('language_inactive')){
                    _father.addClass('language__animate');
                    setTimeout(function(){
                        _father.removeClass('language_inactive');
                        _father.removeClass('language__animate');
                    }, 300)
                } else {
                    _father.addClass('language__animate');
                    setTimeout(function(){
                        _father.addClass('language_inactive');
                        _father.removeClass('language__animate');
                    }, 300)
                }
            }
        }
    });

    $('.site').delegate( "input", "focus blur", function() {
        var elem = $( this );
        setTimeout(function() {
            elem.parent().toggleClass( "focused", elem.is( ":focus" ) );
        }, 0 );
    });

    $('.menu').each(function () {
        mobileMenu($(this));
    });

    $(document).bind('click',function(e){
        if ($(e.target).closest('.menu').length == 0){
            $('.menu__icon').removeClass('close-menu');
            $('.menu').removeClass('open-menu');
        }
    });

} );

var Accordion = function(obj) {

    //private properties
    var _self = this,
        _obj = obj,
        _btn = _obj.children( ' span ' ),
        _content = _obj.children( ' div ' );

    //private methods
    var _addEvents = function() {
            _btn.on({
                click: function () {

                    if (_content.is(' :visible ')) {
                        _content.slideUp(300);
                        _btn.removeClass( ' active ' )
                    }else{
                        _content.slideDown(300);
                        _btn.addClass( ' active ' )
                    }

                }
            });
        },
        _init = function() {
            _addEvents();
        };

    //public properties

    //public methods

    _init();
};

var Tabs = function(obj) {

    //private properties
    var _self = this,
        _tabs = obj.find('.tabs__links > a'),
        _wraps = obj.find('.tabs__content > div'),
        _i = 0,
        _obj = obj;

    //private methods
    var _addEvents = function() {
            showPages = function(i) {
                _wraps.hide().removeClass("active");
                _wraps.eq(i).show(100).addClass('active');
                _tabs.removeClass("active");
                _tabs.eq(i).addClass("active");
            };

            showPages(0);

            _tabs.each(function(index, element) {
                $(element).attr("data-page", _i);
                _i++;
            });

            _tabs.click(function() {
                showPages(parseInt($(this).attr("data-page")));
            });
        },
        _init = function() {
            _addEvents();
        };

    //public properties

    //public methods

    _init();
};

var mobileMenu = function (obj) {
    //private properties
    var _obj = obj,
        _menu = $('.menu'),
        _openBtn = $('.menu__icon'),
        _closeBtn = $('.close-menu'),
        _site = $('.site'),
        _window = $(window),
        _windowWidth = $(window).width();

    //private methods
    var _addEvents = function () {
            _openBtn.on({
                click: function () {
                    console.log('ddd');
                    if (_openBtn.hasClass('close-menu')){
                        _openBtn.removeClass('close-menu');
                        _obj.removeClass('open-menu');
                    } else {
                        _openBtn.addClass('close-menu');
                        _obj.addClass('open-menu');
                        _menu.addClass('mobile-menu');
                    }
                }
            });
        },
        _init = function () {
            _addEvents();
        };

    //public properties

    //public methods

    _init();
};
