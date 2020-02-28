jQuery(document).ready(function($){

	var     $hamburger      = $(".hamburger"),
            $page           = $("#page"),
            $sitewrapper    = $('.site'),
            $menuwrapper    = $('.menu-wrapper'),
            $menuli         = $('.nav-menu > li'),
            $navlist        = $('.main-navigation'), 
            $site           = $("html,body");
	
		$hamburger.on('click', function(e) {
			
			e.stopPropagation();
			$page.toggleClass("push");
            $site.toggleClass("menu-open");
            $hamburger.toggleClass("is-active");
			
            //fade in each li
//            $menuli.each(function(i){
//                var t = $(this);
//                setTimeout(function(){ 
//                    t.toggleClass('fadein'); }, (i+1) * 70
//                );
//            });
            
            //slide up each li
            $menuli.each(function(i){
                var t = $(this);
                setTimeout(function(){ 
                    t.toggleClass('slideup'); }, (i+1) * 30
                );
            });
            
			//check if menu is open
			if($page.hasClass('push')){
				
				//closes menu when a click is detected outside the menu container
				$sitewrapper.on('click', function() {
					$hamburger.removeClass("is-active"); 
					$page.removeClass("push"); 
                    $navlist.removeClass("toggled");
                    $menuli.removeClass("slideup");
                    $site.removeClass("menu-open");
			    });
			    
			    //allows clicks on actual menu without closing it altogether
			    $menuwrapper.on('touchstart click', function(e) {
				    e.stopPropagation();
				});
			}	
	});
	
  
//  	var $submenu	= $('ul.sub-menu'),
//  		$menu		= $('ul#primary-menu > li');
//  		
//  		$menu.click(function(e){
//		
//		if($(this).find($submenu).is(':hidden')) { 
//			//prevent the parent link from activating while opening the sub menu
//	    	e.preventDefault();
//	    $('ul',this).toggle('slow');
//    	}
//		
//	});
	
});

