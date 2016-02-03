$(function(){

    $('.menu').each(function () {
        mobileMenu($(this));
    });

    $.each( $('.discount__form'), function(){
        new FormValidation ( $(this) )
    } );

    $('.popup').each(function(){
        popup = new Popup($(this));
    });

    $('.statistic').each(function() {
        Tabs($(this));
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
    })

    $('.site').delegate( "input", "focus blur", function() {
        var elem = $( this );
        setTimeout(function() {
            elem.parent().toggleClass( "focused", elem.is( ":focus" ) );
        }, 0 );
    });

    $('.anchor').on({
        'click':function(){
            var elementClick = $(this).data("href");
            var destination = $(elementClick).offset().top - 100;
            jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
            return false;
        }
    });

    $('.logo').on({
        'click':function(){
            if ($(window).scrollTop() < 1){
                return false
            }
        }
    });

    start = $(".site__header").offset().top + $(".site__header").outerHeight();
    navigation();

    $(window).scroll(function() {
        navigation();
    })

    function navigation(){
        scrolling = $(window).scrollTop();
        if (scrolling > start) {
            $('.site__header').addClass('header-fix')
        }
        else{
            $('.site__header').removeClass('header-fix')
        }
    }

    if ( $(".gallery").length ){
        var gallery = $( '.gallery' );
        new Gallery( {
            obj: gallery,
            duration: gallery.data('duration'),
            items: gallery.find( '.gallery__item' ),
            btnNext: gallery.find( '.gallery__next' ),
            btnPrev: gallery.find('.gallery__prev')
        } );
    }

    $(".gallery__next, .gallery__prev").on({
        click: function(event){
            event = event || window.event;
            event.stopPropagation();
        }
    });

} );

var Tabs = function(obj) {

    //private properties
    var _self = this,
        _tabs = obj.find('.tabs-links > a'),
        _wraps = obj.find('.tabs > div'),
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

var FormValidation = function (obj) {

    var _obj = obj,
        _action = _obj.find( 'form' ).attr( 'action' ),
        _inputs = _obj.find($("[required]")),
        _select = _obj.find( $("select[required]") );

    var _addEvents = function () {

            _obj.on({
                'submit': function(){

                    $.each( _inputs, function(){

                        var curItem = $(this),
                            curAttr = curItem.attr("type");

                        if ( curAttr == "checkbox" ){
                            var curCheck = this.checked;
                            if ( !curCheck ){
                                curItem.addClass("site__required-error");
                                curItem.closest("fieldset").addClass('error');
                            }

                        }
                        else if ( curItem.is("select") ){

                            if ( !curItem.parents(".site__connection-hide_true").length ){
                                if ( curItem.val() == "0" ){
                                    curItem.closest("fieldset").addClass('error');
                                }
                            }

                        }
                        else if ( curItem.val() == '' ) {

                            if ( !curItem.parents(".site__connection-hide_true").length ){
                                curItem.addClass("site__required-error");
                                curItem.closest("fieldset").addClass('error');
                            }
                        }
                        else if ( curAttr == "email" ){
                            var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                            if ( pattern.test(curItem.val()) == false ){
                                curItem.addClass("site__required-error");
                                curItem.closest("fieldset").addClass('error');
                            }
                        }

                    } );

                    if(!(_obj.find('.error').length) ){

                        if (_obj.hasClass('enroll__form')) {
                            $.ajax({
                                url: _action,
                                dataType: 'html',
                                timeout: 20000,
                                type: "GET",
                                data: {
                                    enroll: 'true',
                                    email: $('#enroll__email').val()
                                },
                                success: function (msg) {
                                    $('.enroll__form').addClass('success');
                                    $('.enroll__thanks').addClass('success');
                                },
                                error: function (XMLHttpRequest) {
                                    if (XMLHttpRequest.statusText != "abort") {
                                        alert(XMLHttpRequest.statusText);
                                    }
                                }
                            });
                            return false;
                        }

                        if (_obj.hasClass('discount__form')) {

                            var selectsVal = [];

                            $.each( $('.discount__selects-language select'), function(i){
                                selectsVal[i] = this.value;
                            } );

                            $.ajax({
                                url: 'php/form.php',
                                dataType: 'html',
                                timeout: 20000,
                                type: "GET",
                                data: {
                                    discount: 'true',
                                    name: $('#discount__name').val(),
                                    email: $('#discount__email').val(),
                                    phone: $('#discount__phone').val(),
                                    address: $('#discount__address').val(),
                                    language: selectsVal
                                },
                                success: function () {
                                    $('.discount__layout').addClass('success');
                                    $('.discount__thanks').addClass('success');
                                },
                                error: function (XMLHttpRequest) {
                                    if (XMLHttpRequest.statusText != "abort") {
                                        alert(XMLHttpRequest.statusText);
                                    }
                                }
                            });
                            return false;
                        }

                        if (_obj.hasClass('popup_form')) {

                            var selectsVal = [];

                            $.each( $('.discount__selects-language select'), function(i){
                                selectsVal[i] = this.value;
                            } );

                            $.ajax({
                                url: 'php/form.php',
                                dataType: 'html',
                                timeout: 20000,
                                type: "GET",
                                data: {
                                    discount: 'true',
                                    name: $('#popup__name').val(),
                                    email: $('#popup__email').val(),
                                    phone: $('#popup__phone').val(),
                                    address: $('#popup__address').val(),
                                    language: selectsVal
                                },
                                success: function (data) {
                                    popup.core.show('thanks');
                                    setTimeout(function () {
                                        popup.core.hide('thanks')
                                    }, 3000);
                                },
                                error: function (XMLHttpRequest) {
                                    if (XMLHttpRequest.statusText != "abort") {
                                        alert(XMLHttpRequest.statusText);
                                    }
                                }
                            });
                            return false;
                        }
                    }
                    return false;
                }
            });
            _inputs.on({

                'focus': function(){

                    var curItem = $(this),
                        closest = curItem.closest("fieldset"),
                        innerInputs = closest.find("input");

                    if(closest.hasClass('error')){
                        curItem.removeClass("site__required-error");
                        if ( innerInputs.length > 1 ){
                            if ( !closest.find(".site__required-error").length ){
                                closest.removeClass('error');
                            }
                        } else {
                            closest.removeClass('error');
                        }
                    }

                }

            });

            _select.on({
                change: function(){
                    var curItem = $(this);
                    curItem.closest("fieldset").removeClass('error');
                }
            });

        },
        _init = function () {
            _addEvents();
        };

    _init();
};

var Popup = function( obj ){
    this.popup = obj;
    this.btnShow = $('.popup__open');
    this.btnClose = obj.find( '.popup__close, .popup__cancel' );
    this.wrap = obj.find($('.popup__wrap'));
    this.contents = obj.find($('.popup__content'));
    this.window = $( window );
    this.scrollConteiner = $( 'html' );
    this.timer = setTimeout( function(){},1 );

    this.init();
};
Popup.prototype = {
    init: function(){
        var self = this;
        self.core = self.core();
        self.core.build();
        console.log('22')
    },
    core: function (){
        var self = this;
        return {
            build: function (){
                self.core.controls();
            },
            controls: function(){
                $('body').on( 'click','.popup__open', function(){
                    var curItem = $(this),
                        parentDropdown = curItem.parents(".dropdown"),
                        linkDropdown = parentDropdown.find("a[data-toggle=dropdown]");
                    parentDropdown.removeClass("open");
                    linkDropdown.attr("aria-expanded", "false");
                    self.core.show( curItem.attr( 'data-popup' ) );
                    popup.btnClose = self.popup.find(".popup__close");
                    $('.popup_opened').find('#order-popup__type').val( curItem.attr( 'data-type' ) );
                    return false;
                } );

                self.wrap.on( {
                    click: function( event ){
                        event = event || window.event;

                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                } );
                self.popup.on( {
                    click: function(){
                        self.core.hide();
                        return false;
                    }
                } );
                self.btnClose.on( {
                    click: function(){
                        self.core.hide();
                        return false;
                    }
                } );
            },
            hide: function(){
                self.popup.css ({
                    'overflow-y': "hidden"
                });
                self.scrollConteiner.css({
                    paddingRight: 0,
                    'overflow-y': "scroll"
                });
                self.popup.removeClass('popup_opened');
                self.popup.addClass('popup_hide');
                location.hash = '';
                setTimeout( function(){
                    self.popup.removeClass('popup_hide');
                }, 300 );
            },
            getScrollWidth: function (){
                var scrollDiv = document.createElement("div");
                scrollDiv.className = "popup__scrollbar-measure";
                document.body.appendChild(scrollDiv);
                var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
                return scrollbarWidth;
            },
            show: function( className ){
                if (self.contents.height()+120 > self.window.height()){
                    self.popup.css ({
                        'overflow-y': "scroll"
                    });
                    self.scrollConteiner.css( {
                        'overflow-y': "hidden",
                        paddingRight: 17
                    });
                }
                self.core.setPopupContent( className );
                self.popup.addClass('popup_opened');
                $('.popup_opened').find('#order-popup__name').focus();
            },
            setPopupContent: function( className ){
                self.contents = self.popup.find('.popup__content');
                var curContent = self.contents.filter( '.popup__' + className );
                self.contents.css( { display: 'none' } );
                curContent.css( { display: 'block' } );
            }

        };
    }
};