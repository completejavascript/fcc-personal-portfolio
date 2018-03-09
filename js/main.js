/** 
 * Scrolling to top before unloading page
*/
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

$(document).ready(function(){
  let initTable = {}, menuClicked = false;
  let targetScroll, timer;
  let menuItems = $(".menu a:not(#navicon)");
  let hashItems = menuItems.map(function(){
    return $(this).attr("href");
  });

  const skillset = {
    "html-css": "70%",
    "javascript": "75%",
    "bootstrap-jquery": "55%",
    "angularjs": "65%",
    "nodejs-expressjs": "60%",
    "c-cpp": "80%",
    "java-android": "75%",
    "algorithm": "80%",
    "git-github": "70%"
  };

  let portfolioTable = {
    curRow : 2,
    curCol : 3
  }
  let portfolioTemplate = $('#portfolio-item-template').html();
  const portfolioItems = [
    {
      "link-view": "javascript:void(0)",
      "alt-image": "portfolio image",
      "path-image": "./res/comming-soon-completejavascript.com.png",
      "title": "A JavaScript Calculator",
      "tags" : ["HTML5", "CSS3"]
    },
    {
      "link-view": "javascript:void(0)",
      "alt-image": "portfolio image",
      "path-image": "./res/comming-soon-completejavascript.com.png",
      "title": "A Pomodoro Clock",
      "tags" : ["HTML5", "CSS3"]
    },
    {
      "link-view": "javascript:void(0)",
      "alt-image": "portfolio image",
      "path-image": "./res/comming-soon-completejavascript.com.png",
      "title": "A Tic Tac Toe Game",
      "tags" : ["HTML5", "CSS3"]
    },
    {
      "link-view": "javascript:void(0)",
      "alt-image": "portfolio image",
      "path-image": "./res/comming-soon-completejavascript.com.png",
      "title": "A Simon Game",
      "tags" : ["HTML5", "CSS3"]
    },
    {
      "link-view": "javascript:void(0)",
      "alt-image": "portfolio image",
      "path-image": "./res/comming-soon-completejavascript.com.png",
      "title": "A Markdown Previewer",
      "tags" : ["HTML5", "CSS3"]
    },
    {
      "link-view": "javascript:void(0)",
      "alt-image": "portfolio image",
      "path-image": "./res/comming-soon-completejavascript.com.png",
      "title": "A Camper Leaderboard",
      "tags" : ["HTML5", "CSS3"]
    },
    {
      "link-view": "javascript:void(0)",
      "alt-image": "portfolio image",
      "path-image": "./res/comming-soon-completejavascript.com.png",
      "title": "A Recipe Box",
      "tags" : ["HTML5", "CSS3"]
    },
    {
      "link-view": "javascript:void(0)",
      "alt-image": "portfolio image",
      "path-image": "./res/comming-soon-completejavascript.com.png",
      "title": "The Game of Life",
      "tags" : ["HTML5", "CSS3"]
    },
    {
      "link-view": "javascript:void(0)",
      "alt-image": "portfolio image",
      "path-image": "./res/comming-soon-completejavascript.com.png",
      "title": "A Roguelike Dungeon Crawler Game",
      "tags" : ["HTML5", "CSS3"]
    }
  ];

  // Handle clicking toggle menu icon
  $("#navicon").click(function(){
    $("#mynav").toggleClass("responsive");
  });

  // Open link all links in a new tab, except links with '#' in the beginning
  $("a:not([href^='#'])").attr("target", "_blank");

  // Handle clicking navigation menu item except toggle menu icon
  $(".menu a:not(#navicon)").click(function(){
    menuClicked = true;
    activateMenu(this);
    $("#mynav").removeClass("responsive");
  });

  // Activate clicked menu item
  function activateMenu(menuItem) {
    $(menuItem).parent().children().removeClass("active");
    $(menuItem).addClass("active");
  }

  // Smooth scrolling
  $("a[href*='#']:not([href='#'])").click(function () {
    targetScroll = $(this).attr("href");
    $('html,body').stop().animate({
      scrollTop: $(targetScroll).offset().top - 32 // First element's marginTop = 32px
    }, 1000);
    event.preventDefault();
  });

  // Handle Scroll Windows
  // Update menu while scrolling
  $(window).scroll(function() {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(handleScrollEvent, 100);
  });

  // Function handles Scrolling Event
  function handleScrollEvent() {
    if (!menuClicked) {
      for(let i = 0; i < hashItems.length; i++) {
        let item = $(hashItems[i]);
        if (isInViewPort(item)) {
          if (!item.hasClass("active")) {
            // Scale at first time
            initSection(hashItems[i], 0);
            activateMenu($('.menu a[href="' + hashItems[i] + '"]'));
          }
          break;
        } 
      }
    } else {
      initSection(targetScroll, 0);
      menuClicked = false;
    }
  }

  // Check whether element is in viewport
  function isInViewPort(element){
    let elementTop = $(element).offset().top;
    let elementBottom = elementTop + $(element).outerHeight();
    let viewPortTop = $(window).scrollTop();
    let viewPortBottom = viewPortTop + $(window).height();
    return elementBottom > viewPortTop + $("#mynav").height() + 10 && elementTop < viewPortBottom;
  }

  // Init section 
  function initSection(section, time) {
    if(initTable[section] == undefined) {
      if(section == '#about') {
        setTimeout(function(){ 
          $("#about-me").addClass("to-primary-color");
        }, time);
      } 
      else if(section == '#skills') {
        let timeout = time;
        for(let key in skillset) {
          setTimeout(function(){
            $(".progress-bar." + key).css("width", skillset[key]);
          }, timeout);
          timeout += 50;  
        }
      } 
      initTable[section] = 1;
    }
  }

  function nextPortfolioItem() {
    if(portfolioTable.curCol == 3) {
      portfolioTable.curCol = 1;
      portfolioTable.curRow++;
    } else {
      portfolioTable.curCol++;
    }
  }

  // Handle "See more" click
  $("#see-more").click(function(){
    if (portfolioItems.length > 0) {
      while(true) {
        nextPortfolioItem();

        // Render item
        let curItemId = "col-" + portfolioTable.curRow + portfolioTable.curCol;
        portfolioItems[0]["col-id"] = curItemId;
        Mustache.parse(portfolioTemplate);
        let rendered = Mustache.render(portfolioTemplate, portfolioItems[0]);

        if(portfolioTable.curCol == 1) {
          $('<div class="gr-row" id="row-' + portfolioTable.curRow +'"></div>').insertAfter('#row-' + (portfolioTable.curRow - 1));
        }
        $('#row-' + portfolioTable.curRow).append(rendered);

        // Render tags
        let tags = portfolioItems[0].tags;
        for(let i = 0; i < tags.length; i++) {
          $('#' + curItemId).append('<span class="portfolio-tag">' + tags[i] + '</span>');
        }

        portfolioItems.shift();
        if(portfolioItems.length == 0) {
          $("#see-more-wrapper").css("display", "none");
          break;
        } 
        else if (portfolioTable.curCol == 3) break;
      }
    }
  });
});
