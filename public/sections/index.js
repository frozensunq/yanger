var yang_root = new module("module", "example")

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
	var self = $(this).find('a')

	// elem name we want to create i.e "import"
	var target_elem = self.text()

	if (target_elem in elements)
	{
		var e = elements[target_elem]

		var p = yang_root.find_from_dom(self)

		// parent element in which we want to add newly created element
		console.log("parent:" + p.nameval)

		if (typeof e.default == "undefined")
			p.add(target_elem, target_elem)
		else
			p.add(target_elem, e.default)

		$("#d_index").html(create_dom(yang_root, 0))
	}

	return false

})

// completion for adding
$("#content_right").on("mouseenter", "a.add", function()
{
	// remove existing window if exists
	$('div.completion').each(function(){$(this).remove()})

	var self = $(this)
	var self_root = yang_root.find_from_dom(self)
	var type = self_root.type

	var w = self.width();
	var h = self.height();
	var pos = self.offset();

	var html = create_completion_window(self_root, type)
	if (!html)
		return false

	html.css({"position" : "absolute", left:pos.left-html.width(), top:(pos.top), padding: "1em"})

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
