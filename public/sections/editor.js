/*
 * Yang Creator UI
 *
 * DOM elements are created from structure which correspond to yang elements
 * structure.
 *
 * For best performance elements are only added/removed/drawn when needed (no
 * redrawing of whole tree).
 *
 * YANG ABNF Grammar
 * http://tools.ietf.org/html/rfc6020#page-143
 */

var yang_root = new yang.statement("module", "example")

$(function()
{
	yang_root.add("namespace", "urn:ietf:params:xml:ns:yang:example")
	yang_root.add("prefix", "ie")

	var i = yang_root.add("import", "ietf-inet-types")
	i.add("prefix", "inet")

	yang_root.add("description", "example yang module")
	yang_root.add("contact", "petar.koretic@sartura.hr")
	yang_root.add("revision", "2014-12-15")


	$("#d_editor").html(create_dom_statement(yang_root))
	$("#d_options a").each(function()
	{
		$(this).tooltip()
	})
})

/*
 * add new element
 */

$("#d_editor").on("click", ".completion li", function()
{
	var self = $(this).find('a span._name')

	// elem name we want to create i.e "import"
	var yang_statement_name = self.text()
	var yang_statement_id = get_id_from_dom(self)

	if (yang_statement_name in yang.statements)
	{
		var yang_statement = yang.statements[yang_statement_name]

		var yang_module = yang_root.find(yang_statement_id)

		var yang_module_new = null
		if (typeof yang_statement.default === "undefined")
			yang_module_new = yang_module.add(yang_statement_name, yang_statement_name)
		else
			yang_module_new = yang_module.add(yang_statement_name, yang_statement.default)

		remove_completion_window()

		$("#d_editor").find("[data-id='"+yang_module.id+"'] ul[data-statements] > li:last").before(create_dom_statement(yang_module_new))
	}

	return false
})

/*
 * show completion window
 */

$("#d_editor").on("mouseenter", "a.add", function()
{
	remove_completion_window()

	var self = $(this)
	var yang_statement_id = get_id_from_dom(self)
	var yang_statement = yang_root.find(yang_statement_id)

	var w = self.width();
	var h = self.height();
	var pos = self.offset();

	var html = create_completion_window(yang_statement)
	if (!html)
		return false

	html.css({"position" : "absolute", left: pos.left - html.width(), top:(pos.top), padding: "1em"})

	// completion filter field
	var completion_field = self.append(html).find("#icompletion");
	completion_field.focus()

	completion_field.on('keyup', function()
	{
		var input_text = completion_field.val().trim()

		completion_field.closest("div.completion").find('li').each(function()
		{
			var self = $(this)
			var matched_text = self.text().trim()

			if (matched_text.indexOf(input_text) !== -1)
			{
				self.show()
			}
			else
			{
				self.hide()
			}
		})
	})

	return false;
})

/*
 * remove completion window
 */


$("#d_editor").on("mouseleave", "div.completion", function()
{
	remove_completion_window()
})

/*
 * remove substatement
 */

$("#d_editor").on("click", "a.delete", function()
{
	var self = $(this)
	var id = get_id_from_dom(self)

	self.parent().remove()
	var self_root = yang_root.find(id)
	yang_root.remove(id)

	return false;
})

/*
 * show/hide substatements [+] -
 */

$("#d_editor").on("mouseenter", "div.yang", function()
{
	$(this).find("a.delete:first").css("visibility", "visible")
	$(this).find("a.add:last").css("visibility", "visible")
})
$("#d_editor").on("mouseleave", "div.yang", function()
{
	$(this).find("a.delete:first").css("visibility", "hidden")
	$(this).find("a.add:last").css("visibility", "hidden")
})

/*
 * draging/reordering elements
 */

$("#d_editor").on("dragstart", "div.yang", function(e)
{
	e.stopPropagation()

	$(this).addClass('dragstarted')
	var id = $(this).data('id')

	e.originalEvent.dataTransfer.dropEffect = 'move'

	// not used, requiered for firefox
	e.originalEvent.dataTransfer.setData('id', id)

	console.debug("dragstart:" + id)
})

$("#d_editor").on("dragenter", "div.yang", function(e)
{
	e.stopPropagation()

	if (e.target !== this)
		return false

	var from_id = $("#d_editor").find(".dragstarted").data('id')
	var to_id = $(this).data('id')

	// ignore if same element
	if (from_id == to_id)
		return false

	console.debug("from_id:" + from_id)
	console.debug("to_id:" + to_id)

	var from_statement = yang_root.find(from_id)
	var to_statement = yang_root.find(to_id)

	// ignore if parent element is not the same
	// doesn't allow draging from child to parent and vice-versa
	if (from_statement.parent !== to_statement.parent)
		return false

	var $from = $("#d_editor").find("[data-id='"+ from_id + "']")
	var $to = $("#d_editor").find("[data-id='"+ to_id + "']")

	console.debug("from:" + $from)
	console.debug("to:" + $to)

	$from.insertAfter($to)

	// move elements in statement structure itself
	// parent is the same for both of them
	to_statement.parent.move(from_id, to_id)
})

$("#d_editor").on("dragover", "div.yang", function(e)
{
	e.stopPropagation()
	e.originalEvent.dataTransfer.dropEffect = 'move'
	e.preventDefault()
})

$("#d_editor").on("drop", "div.yang", function(e)
{
	e.stopPropagation()

	$(".yang").removeClass("dragstarted")

	return false
})

/*
 * [ACTIONS]
 */

$("#d_options").on("click", "#a_validate", function()
{
	generate_yang(function(data)
	{
		console.log(data.yang)
	})

	return false
})
$("#d_options").on("click", "#a_save", function()
{
	generate_yang(function(data)
	{
		$("#d_output").html("<div>" + data.error+ "<hr/></div>" + "<div>"+data.yang.replace(/\n/g, "<br/>") + "</div>")
		console.log(data.yang)
	})

	return false
})


/*
 *
 * Javascript functions
 *
 */


function generate_yang(callback)
{
	if (!callback)
		return

	var yang_module_name = yang_root.nameval
	if (!yang_module_name)
	{
		return console.error("no module")
	}

	var yang_module_content = get_yang_from_dom($("#d_editor"))

	$.post("./yang_process", {"yang_module_name" : yang_module_name, "yang_module_content" : yang_module_content }, function(response)
	{
		callback(response)

	},"JSON")

}
function remove_completion_window()
{
	// remove existing completion window if exists
	$('div.completion').each(function(){$(this).remove()})
}

function create_completion_window(statement)
{
	console.debug("completion for type:" + statement.type)

	try
	{
		yang.statements[statement.type].subs[0]
	}
	catch(e)
	{
		return console.error("no completions for type")
	}

	var h = "<div class='completion'>"
		h += "<input id='icompletion' type='text' placeholder='filter'/>"
		h += "<ul>"

	// ["import", "include", "list"]
	var type_substatements = yang.statements[statement.type].subs

	// return specific message if no elements
	var completion_elements_count = 0
	for (var i in type_substatements)
	{
		// "prefix"
		var type_substatement_name = type_substatements[i]

		// don't show types which are already added and can't be added twice
		var skip_if_exists = 0
		if (typeof statement !== "undefined" &&
			typeof yang.statements[type_substatement_name] !== "undefined" &&
			typeof yang.statements[type_substatement_name].uniq !== "undefined" &&
			yang.statements[type_substatement_name].uniq)
		{
			for (var i = 0, len = statement.subs.length; i < len; i++)
			{
				if (statement.subs[i].type == type_substatement_name)
				{
					skip_if_exists = 1
					break
				}
			}
		}

		if (skip_if_exists)
			continue

		completion_elements_count++

		h += "<li>"
		h += "<a href='#'><span class='small _name'>" + type_substatement_name + "</span></a>"
		try
		{
			h += " : <span class='small property'>" + yang.statements[type_substatement_name].desc + "</span>"
		}
		catch(e)
		{

		}

		h += "</li>"
	}

	if (!completion_elements_count)
		h += "<span class='small'>All possible elements added</span>"
	else
		h+= "</ul></div>"

	return $(h)
}

/*
 * http://tools.ietf.org/html/rfc6020#page-143
 *
 * general structure:
 *
 * 'keyword' 'identifier' {
		'keyword' 'identifier'
		'keyword' 'identifier'
		'keyword' 'identifier' {
			'keyword' identifier
			...
		}
 * }
 *
 * @module: yang statement module object
 */

function create_dom_statement(m)
{
	var h = ""

	// 'keyword' 'identifier'
	h += "<div draggable='true' class='yang' data-id='"+m.id+"' data-name='"+m.nameval+"' data-type='"+m.type+"' >"
	h += "<a class='delete invisible' href='#' title='remove'>-</a> "
	h += "<span class='identifier collectable'>" + m.type + "</span>"
	h += ' "<span contenteditable="true" class="nameval collectable editable">' + m.nameval + '</span>"'

	// there are no possible substatements close tag
	if (typeof yang.statements[m.type].subs == "undefined" || !yang.statements[m.type].subs.length)
	{
		return h += "<span class='collectable'>;</span></div>"
	}

	// process substatements

	h += " <span class='collectable'>{</span>"
	h += "<div style='margin-left:1em'>"
	h += "<ul data-statements class='sortable'>"

	for (var sub in m.subs)
	{
		var prop=m.subs[sub]

		h += "<li class='property'>"
		h += create_dom_statement(prop)
		h += "</li>"
	}

	h += "<li>"
	h += "<a href='#' class='add invisible'>[+]</a>"
	h += "</li>"
	h += "</ul>"
	h += "<span class='collectable'>}</span>"
	h += "</div>"

	return h
}

function get_id_from_dom(elem)
{
	return elem.closest('div.yang').data('id')
}

function get_yang_from_dom(elem)
{
	var yang_string = ''
	elem.find('.collectable').each(function()
	{
		var self = $(this)
		var raw_text = self.text().trim()

		yang_string += self.hasClass('nameval') ? '"' + raw_text + '"' : raw_text
		yang_string += " "
	})

	return yang_string
}
