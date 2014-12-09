var spinner = "<img src='img/spinner.gif' alt='loading' />"

function loading(show)
{
	$("#i_spinner").css('visibility', (show == 1) ? 'visible' : 'hidden' )
}

$(function()
{
	// open last opened link or open channels if nothing requested
	if(location.hash)
		process_action(location.hash)
	else
		location.hash="#editor"

	// open when hash changes - click mostly
	$(window).on("hashchange",function()
	{
		var action = location.hash
		process_action(action)
	})

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

		return false
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
	if(!action)
		return

	action = $.trim(action.replace('#',''))
}

function show_success(msg)
{
	$("<span>" + msg +" </span>").csInfo()
	loading(0)
}

function show_alert(msg)
{
	$("<span>" + msg +" </span>").csInfo('alert alert-danger')
	loading(0)
}

function show_modal(title, html, footer)
{
	title = title || ''
	html = html || ''
	footer = footer || ''

	var ref = $("#d_modal")
	ref.find('.modal-title').html(title)
	ref.find(".modal-body").html(html)

	var $footer = ref.find(".modal-footer")
	footer && $footer.html(footer).show() || $footer.hide()

	ref.modal()
}

function hide_modal()
{
	$("#d_modal").modal('hide')
}

function get_userdata()
{
	var yang_username = $.jStorage.get("yanger_user")
	var yang_userpass_hash = $.jStorage.get("yanger_pass_hash")

	console.debug("user:"+ yang_username)

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
	var csInfoID=0
	$.fn.csInfo = function(arg1,arg2)
	{
		++csInfoID
		var bkgclass="alert alert-info"
		var duration=2500

		if(arg1&&arg2) (bkgclass=arg1) && (duration=arg2)
		else arg1 && (isNaN(arg1) && (bkgclass=arg1) || (duration=arg1))

		var msg = $(this).outerHTML()

		var html = $('<div id="csInfoDiv'+csInfoID+'"><div id="csInfoInner" class="'+bkgclass+' small">'+msg+'</div></div>')

		$div=$("body").append(html).find('div[id^="csInfoDiv"]')
		$div.addClass("csInfoDiv")
		$div.slideDown("fast").delay(duration).slideUp("fast",function(){$(this).remove()})
		$div.hover(function() { $(this).css("opacity","0.5")}, function() { $(this).css("opacity","1") })
	}
})(jQuery)

