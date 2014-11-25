var yang_root = new yang.statement("module", "example")

$(function()
{
	yang_root.add("description", "example yang module")
	yang_root.add("contact", "petar koretic @ sartura.hr")
	yang_root.add("revision", "2014-20-11 v1")

	var i = yang_root.add("include", "ietf-types")

	var i = yang_root.add("import", "ietf-inet-types")
	i.add("revision-date", "2014-02-02")

	$("#d_index").html(create_dom(yang_root, 0))
})

// add new element
$("#content_right").on("click", "div.completion li", function()
{
	var self = $(this).find('a span._name')

	// elem name we want to create i.e "import"
	var yang_statement_name = self.text()
	var yang_statement_id = self.closest('div.yang').data('id')

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

		$("#d_index").find("div[data-id='"+yang_module.id+"'] ul[data-statements] > li:last").before(create_dom(yang_module_new, 0))
	}
})

// completion for adding
$("#content_right").on("mouseenter", "a.add", function()
{
	remove_completion_window()

	var self = $(this)
	var yang_statement_id = self.closest('div.yang').data('id')
	var yang_statement = yang_root.find(yang_statement_id)
	var type = yang_statement.type

	var w = self.width();
	var h = self.height();
	var pos = self.offset();

	var html = create_completion_window(yang_statement, type)
	if (!html)
		return false

	html.css({"position" : "absolute", left: pos.left - html.width(), top:(pos.top), padding: "1em"})

	self.append(html)

	return false;
})

$("#content_right").on("mouseleave", "div.completion", function()
{
	$(this).remove()
})

// remove element
$("#content_right").on("click", "a.delete", function()
{
	var self = $(this)
	var id = self.closest('div.yang').data('id')

	self.parent().remove()
	var self_root = yang_root.find(id)
	yang_root.remove(id)

	return false;
})

$("#content_right").on("mouseenter", "div.yang", function()
{
	$(this).find("a.delete:first").css("visibility", "visible")
	$(this).find("a.add:last").css("visibility", "visible")
})
$("#content_right").on("mouseleave", "div.yang", function()
{
	$(this).find("a.delete:first").css("visibility", "hidden")
	$(this).find("a.add:last").css("visibility", "hidden")
})

function remove_completion_window()
{
	// remove existing completion window if exists
	$('div.completion').each(function(){$(this).remove()})
}
