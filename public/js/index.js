var spinner = "<div style='text-align:center'><div class='spinner_img'></div></div>";
var spinner_left = "<div class='spinner_img'></div>";

var validIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

function loading(show)
{
	$("#i_spinner").css('visibility', (show == 1) ? 'visible' : 'hidden' );
}

function loaded()
{
	$("#d_" + $("#ul_links>a.active").attr('href').replace('#','')).removeClass('invisible')
}

$(function()
{
	// open last opened link or open channels if nothing requested
	if(location.hash)
		process_action(location.hash);
	else
		location.hash="#index";

	// open on click changes hash link or forces open of same tab
	$("#ul_links").on("click","a",function()
	{
		var action = $(this).attr('href');

		if(action == location.hash)
			process_action(action);
		else
			location.hash = action;
	});

	// open when hash changes - click mostly
	$(window).on("hashchange",function()
	{
		var action = location.hash;
		process_action(action);
	});

})

function process_action(action)
{
	if(!action) return;

	action = $.trim(action.replace('#',''));

	$("#content_right").load("./sections/"+action+".html");
}

function show_success(msg)
{
	$("<span>" + msg +"<hr style='margin:8px'/></span>").csInfo()
	loading(0)
}

function show_error(msg, details)
{
	if (details)
		msg += "<br/><hr/><strong>Error details:<br/></br></strong>" + details;

	var ref = $("#d_modal_info")
	ref.find("h4").html("<span class='glyphicon glyphicon-exclamation-sign'> Error</span>");
	ref.find(".modal-body").html(msg)
	ref.modal()
	loading(0)
}

function show_update(html, callback)
{
	var ref = $("#d_modal_update")
	ref.find(".modal-body").html(html)
	ref.modal()
	loading(0)

	ref.on('click', '#bt_modal_save', function()
	{
		loading(1)
		callback()
		loading(0)
	});
}

(function($)
{
	$.fn.outerHTML = function()
	{
		$t = $(this);
		if( "outerHTML" in $t[0] ) return $t[0].outerHTML;
		else return $t.clone().wrap('<p>').parent().html();
	}

	/* csDefault */
	var csInfoID=0;
	$.fn.csInfo = function(arg1,arg2)
	{
		++csInfoID;
		var bkgclass="cs-gradient-blue";
		var duration=2500;

		if(arg1&&arg2) (bkgclass=arg1) && (duration=arg2);
		else arg1 && (isNaN(arg1) && (bkgclass=arg1) || (duration=arg1));

		var msg = $(this).outerHTML();

		var html = $('<div id="csInfoDiv'+csInfoID+'"><div id="csInfoInner" class="'+bkgclass+'">'+msg+'</div></div>');

		$div=$("body").append(html).find('div[id^="csInfoDiv"]');
		$div.addClass("csInfoDiv");
		$div.slideDown("fast").delay(duration).slideUp("fast",function(){$(this).remove()});
		$div.hover(function() { $(this).css("opacity","0.5");}, function() { $(this).css("opacity","1"); });
	}
})(jQuery);

function get(list)
{
	var promises = []
	for (var i in list)
		promises.push($.getJSON(list[i]))

	return Promise.all(promises)
}
