var spinner = "<div style='text-align:center'><div class='spinner_img'></div></div>";
var spinner_left = "<div class='spinner_img'></div>";

var validIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

function loading(show)
{
	$("#i_spinner").css('visibility', (show == 1) ? 'visible' : 'hidden' );
}

$(function()
{
	$("[data-toogle='tooltip']").tooltip()

	// open last opened link or open channels if nothing requested
	if(location.hash)
		process_action(location.hash);
	else
		location.hash="#editor";

	// open when hash changes - click mostly
	$(window).on("hashchange",function()
	{
		var action = location.hash;
		process_action(action);
	});

	function set_login_welcome()
	{
		var user_data = get_userdata()
		if (user_data)
		{
			$("#f_login").hide()
			$("#d_welcome").find("#s_msg").text(user_data.user).end().show()
		}
		else
		{
			$("#d_welcome").hide()
			$("#f_login").show()
		}
	}
	set_login_welcome()

	$("#f_login").submit(function()
	{
		var self = $(this)
		var user_name = self.find("#i_username").val().trim()
		var user_pass = self.find("#i_userpass").val().trim()

		if (user_name.length < 3 || user_pass.length < 6)
			return $("<span>invalid login data</span>").csInfo("cs-gradient-red")

		$.jStorage.set('yanger_user', user_name)
		$.jStorage.set('yanger_pass_hash', Sha256.hash(user_pass))

		set_login_welcome()

	})

	$("#d_welcome").on("click", "#a_logout", function()
	{
		console.debug("logout")
		$.jStorage.deleteKey('yanger_user')
		$.jStorage.deleteKey('yanger_pass_hash')

		set_login_welcome()
	})
})

function process_action(action)
{
	if(!action) return;

	action = $.trim(action.replace('#',''));
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
	ref.find("h4").html("<span class='glyphicon glyphicon-exclamation-sign'>Error</span>");
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

function get(list)
{
	var promises = []
	for (var i in list)
		promises.push($.getJSON(list[i]))

	return Promise.all(promises)
}

function get_userdata()
{
	var yang_username = $.jStorage.get("yanger_user")
	var yang_userpass_hash = $.jStorage.get("yanger_pass_hash")

	console.debug("user:"+ yang_username)
	console.debug("pass:"+ yang_userpass_hash)

	if (!yang_username || !yang_userpass_hash)
		return 0
	else
		return {"user" : yang_username, "pass" : yang_userpass_hash}
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

		var html = $('<div id="csInfoDiv'+csInfoID+'"><div id="csInfoInner" class="'+bkgclass+' small">'+msg+'</div></div>');

		$div=$("body").append(html).find('div[id^="csInfoDiv"]');
		$div.addClass("csInfoDiv");
		$div.slideDown("fast").delay(duration).slideUp("fast",function(){$(this).remove()});
		$div.hover(function() { $(this).css("opacity","0.5");}, function() { $(this).css("opacity","1"); });
	}
})(jQuery);

