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

$("#content_right").on("mouseenter", "a.add", function()
{
	$('div.completion').each(function(){$(this).remove()})

	var self = $(this)
	var data = yang_root.find_from_dom(self)
	var type = data.type

	var w = self.width();
	var h = self.height();
	var pos = self.offset();

	var html = create_completion_window(type)
	html.css({"position" : "absolute", left:pos.left-html.width(), top:(pos.top), padding: "1em"})

	self.append(html)

	return false;
})

$("#content_right").on("mouseleave", "div.completion", function()
{
	$(this).remove()
})

$("#content_right").on("click", "div.completion a", function()
{
	var self = $(this)

	// elem name we want to create i.e "import"
	var target_elem = self.text()

	if (target_elem in elements)
	{
		var e = elements[target_elem]

		var p = yang_root.find_from_dom(self)

		// parent element in which we want to add newly created element
		console.log("parent:" + p.nameval)

		p.add(target_elem, target_elem)

		$("#d_index").html(create_dom(yang_root, 0))
	}

	return false

})

