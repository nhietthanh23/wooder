
let btnMenu= document.querySelector(".btnMenu");
btnMenu.addEventListener("click",function(){
    btnMenu.classList.toggle("clicked"); 
     $('.nav').toggleClass('active');
})


// backtotop
let $BackToTop= document.querySelector(".back-to-top")
function BackToTop(){
    let scrollTop= document.querySelector('html').scrollTop;
    console.log("thanh")
    if (scrollTop > 600){
        $BackToTop.style.display="block"
    }else{
        $BackToTop.style.display="none"
    }
}

$BackToTop.addEventListener("click",function(e){
    e.preventDefault();
    window.scroll({
        top:-document.body.offsetHeight,
        behavior: 'smooth'
    })
})
BackToTop();
window.addEventListener('scroll',BackToTop)

// SCROOL MENU ĐỔI MÀU
let $slider= document.querySelector(".slider")
let $header= document.querySelector("header")

window.addEventListener("scroll",function(){
    
    let scrollTop = document.querySelector('html').scrollTop;
    if(scrollTop > $slider.offsetHeight - $header.offsetHeight){
        $header.style.background="black"
           
    }else{
         $header.style.background="transparent"
    }

})

//JQUERY START
// 1: Scroll

let menus= document.querySelectorAll('.menu_scroll li a');

let sections= []; // khởi tạo 1 giá trị , 

menus.forEach(function(e,index){
    let nameSection = e.getAttribute('href').replace('#','');
    let section = document.querySelector('.homepage > .'+ nameSection); 
    sections.push(section)

    e.addEventListener('click',function(even){
        even.preventDefault();
        window.scrollTo({
            top: section.offsetTop - document.querySelector('header').offsetHeight+80,
            'behavior':'smooth'
        })
    })
});

window.addEventListener('scroll',function(){
    let posScroll = window.pageYOffset;

    sections.forEach(function(section, index){
        if(posScroll > section.offsetTop - document.querySelector('header').offsetHeight){
            menus.forEach(function(item){
                    item.classList.remove('active');
            })
            menus[index].classList.add('active');
        }
      
    });
})



//Accordion

$(".accordition__item a").click(function(e){
    e.preventDefault();
    $('.accordition__item a img').css('transform', 'rotate(90deg)')
    $('.accordition__item .panel').not($(this).next()).slideUp();
    $(this).next().slideToggle();
});

//LANG
$('.lang').click(function(e){
    e.stopPropagation();
    $('.lang_option').show();
})

$('.lang_option a').click(function(e){
        let nameCountry = $(this).text();
        $('.lang__text span').text(nameCountry)
        $('.lang_option').hide(e);
    })

$('body').click(function(e){
   $('.lang_option').hide();
})

// VIDEO MODAL
let iframe=  $('#video-iframe');
let popupVideo= $('.videos .video__item-img');
    popupVideo.click(function(){
        let src= $(this).find('.play__button').attr('data-video-src');
        iframe.attr('src','https://www.youtube.com/embed/' + src)
        console.log(src)
        $('.pop-video').css('display','flex')
});
$('.close').click(function(){
     $('.pop-video').hide()
      iframe.attr('src','https://www.youtube.com/embed/' + '')
})


// MENU SCROLL
let prevScroll = $('html').scrollTop();

$(document).scroll(function(){
   if(prevScroll < window.pageYOffset){
        $('header').css({top: - $('header').height(),
        transition: 'all 0.4s'
    });
   }else{
        $('header').css({top: 0,
            transition: 'all 0.4s'
        })
   }
   prevScroll=window.pageYOffset;
});

// Next Page
 let tabNew= $('.tab-new li');

 tabNew.click(function(e){
     tabNew.removeClass('active')
     $(this).addClass('active')  
     let index = $(this).index() 
     $('.news__dec').removeClass('active_news')
     $($('.news__dec')[index]).addClass('active_news')
    
 });


 // Thư Viện Jquery
 let $carousel= $('.slider__item-wrap')
 $carousel.flickity({
    //  option
    cellAlign:'left',
    prevNextButtons: false,
    contain:true,
    wrapAround:true,
    autoPlay: true,
    on:{
        ready: function(){

            let dotted = $('.flickity-page-dots');
            paging= $('.slider__bottom-paging .dotted')
            dotted.appendTo(paging);
        },
        change: function(index){
            let number = $('.slider__bottom-paging .number');
            let indexPage = index + 1;
            number.text(indexPage.toString().padStart(2,0))
        }
    }
 })
 //SVG

$('.svg').svgToInline();

 
//  previous
$('.slider__bottom-control .--prev').on( 'click', function() {
  $carousel.flickity('previous');
});
// previous wrapped
$('.slider__bottom-control .--next').on( 'click', function() {
  $carousel.flickity( 'next', true );
});
//
$('.list__img').flickity({
     wrapAround:true,
     freeScroll: true,
     prevNextButtons: false,
    pageDots: false,
    imagesLoaded: true
})

//photo
var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML; 
            }
            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            showAnimationDuration : 0,
            hideAnimationDuration : 0
        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

$(window).load(function () {
    initPhotoSwipeFromDOM('.carousel-img');
});
