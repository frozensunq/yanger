var elements = {}
var _ID=1

var type = {
	"binary" : "Any binary data",
	"bits" : "A set of bits or flags",
	"boolean" : "'true' or 'false'",
	"decimal64" : "64-bit signed decimal number",
	"empty" : "A leaf that does not have any value",
	"enumeration" : "Enumerated strings",
	"identityref" : "A reference to an abstract identity",
	"instance-identifier" : "References a data tree node",
	"int8" : "8-bit signed integer",
	"int16" : "16-bit signed integer",
	"int32" : "32-bit signed integer",
	"int64" : "64-bit signed integer",
	"leafref" : "A reference to a leaf instance",
	"string" : "Human-readable string",
	"uint8" : "8-bit unsigned integer",
	"uint16" : "16-bit unsigned integer",
	"uint32" : "32-bit unsigned integer",
	"uint64" : "64-bit unsigned integer",
	"union" : "Choice of member types"
}


elements["type"] =
{
	desc: "YANG type",
	ref: "http://tools.ietf.org/html/rfc6020#page-58",
	uniq:0,
	subs:
	[
		"bit",
		"enum",
		"length",
		"path",
		"pattern",
		"range",
		"require-instance",
		"type"
	]
}

elements["config"] =
{
	default: false,
	desc: "configuration or state data",
	ref: "http://tools.ietf.org/html/rfc6020#page-105",
	uniq:1
}

elements["status"] =
{
	default: "current",
	desc: "definition status",
	ref: "http://tools.ietf.org/html/rfc6020#page-105",
	uniq:1
}

elements["description"] =
{
	desc: "description of this definition",
	ref: "http://tools.ietf.org/html/rfc6020#page-105",
	uniq:1
}

elements["reference"] =
{
	desc: "reference to this definition",
	ref: "http://tools.ietf.org/html/rfc6020#page-105",
	uniq:1
}

elements["when"] =
{
	desc: "make data definition conditional",
	ref: "http://tools.ietf.org/html/rfc6020#page-106",
	uniq:1
}


elements["module"] =
{
	desc:"defines module",
	ref: "tools.ietf.org/html/rfc6020#page-38",
	uniq:1,
	subs:
	[
		"anyxml",
		"augment",
		"choice",
		"contact",
		"container",
		"description",
		"deviation",
		"extension",
		"feature",
		"grouping",
		"identity",
		"import",
		"include",
		"leaf",
		"leaf-list",
		"list",
		"namespace",
		"notification",
		"organization",
		"prefix",
		"reference",
		"revision",
		"rpc",
		"typedef",
		"uses",
		"yang-version"
	]
}

elements["yang-version"] =
{
	desc: "specifies which version of the YANG language was used in developing the module",
	ref: "http://tools.ietf.org/html/rfc6020#page-40",
	uniq:1
}

elements["namespace"] =
{
	desc: "defines the XML namespace that all identifiers defined by the module are qualified by",
	ref: "http://tools.ietf.org/html/rfc6020#page-41",
	uniq:1
}

elements["prefix"] =
{
	desc: "define the prefix associated with the module and its namespace",
	ref: "http://tools.ietf.org/html/rfc6020#page-41",
	uniq:1
}

elements["import"] =
{
	desc: "makes definitions from one module available inside another module or submodule",
	ref: "http://tools.ietf.org/html/rfc6020#page-42",
	uniq:0,
	subs:
	[
		"prefix",
		"revision-date"
	]
}

elements["revision-date"] =
{
	desc: "specify the exact version of the module to import",
	ref: "http://tools.ietf.org/html/rfc6020#page-41",
	uniq:1
}

elements["include"] =
{

	desc: "make content from a submodule available to that submodule's parent module, or to another submodule of that parent module",
	ref: "http://tools.ietf.org/html/rfc6020#page-42",
	uniq:0,
	subs:
	[
		"revision-date"
	]
}

elements["organization"] =
{

	desc: "defines the party responsible for this module",
	ref: "http://tools.ietf.org/html/rfc6020#page-42",
	uniq:1
}

elements["contact"] =
{

	desc: "provides contact information for this module",
	ref: "http://tools.ietf.org/html/rfc6020#page-42",
	uniq:1
}

elements["revision"] =
{

	desc: "specifies the editorial revision history of the module, including the initial revision",
	ref: "http://tools.ietf.org/html/rfc6020#page-43",
	uniq:1,
	subs:
	[
		"description",
		"reference"
	]
}

elements["submodule"] =
{

	desc: "split modules in submodules",
	ref: "http://tools.ietf.org/html/rfc6020#page-45",
	uniq:0,
	subs:
	[
		"anyxml",
		"augment",
		"belongs-to",
		"choice",
		"contact",
		"container",
		"description",
		"deviation",
		"extension",
		"feature",
		"grouping",
		"identity",
		"import",
		"include",
		"leaf",
		"leaf-list",
		"list",
		"notification",
		"organization",
		"reference",
		"revision",
		"rpc",
		"typedef",
		"uses",
		"yang-version"
	]
}

elements["belongs-to"] =
{

	desc: "specifies the module to which the submodule belongs",
	ref: "http://tools.ietf.org/html/rfc6020#page-47",
	uniq:1,
	subs:
	[
		"prefix"
	]
}

elements["typedef"] =
{

	desc: "defines a new type that may be used locally in the module, in modules or submodules which include it, and by other modules that import from it",
	ref: "http://tools.ietf.org/html/rfc6020#page-48",
	uniq:1,
	subs:
	[
		"default",
		"description",
		"reference",
		"status",
		"type",
		"units"
	]
}

elements["units"] =
{
	desc: "textual definition of the units associated with the type",
	ref: "http://tools.ietf.org/html/rfc6020#page-49",
	uniq:1
}

elements["container"] =
{

	desc: "defines an interior data node in the schema tree",
	ref: "http://tools.ietf.org/html/rfc6020#page-50",
	uniq:0,
	subs:
	[
		"anyxml",
		"choice",
		"config",
		"container",
		"description",
		"grouping",
		"if-feature",
		"leaf",
		"leaf-list",
		"list",
		"must",
		"presence",
		"reference",
		"status",
		"typedef",
		"uses",
		"when"
	]
}

elements["must"] =
{

	desc:"declare a constraint on valid data",
	ref: "http://tools.ietf.org/html/rfc6020#page-53",
	uniq:1,
	subs:
	[
		"description",
		"error-app-tag",
		"error-message",
		"reference",
	]
}

elements["error-message"] =
{
	desc:"passed as an error-message tag in the rpc-error",
	ref: "http://tools.ietf.org/html/rfc6020#page-54",
	uniq:1
}

elements["error-app-tag"] =
{
	desc:"passed as an error-app-tag in the rpc-error",
	ref: "http://tools.ietf.org/html/rfc6020#page-54",
	uniq:1
}

elements["presence"] =
{
	desc:"assigns a meaning to the presence of a container in the data tree",
	ref: "http://tools.ietf.org/html/rfc6020#page-55",
	uniq:1
}

elements["leaf"] =
{
	desc: "defines leaf node",
	ref: "http://tools.ietf.org/html/rfc6020#page-58",
	subs:
	[
		"config",
		"default",
		"description",
		"if-feature",
		"mandatory",
		"must",
		"reference",
		"status",
		"type",
		"units",
		"when"
	]
}

elements["default"] =
{
	desc: "defines default leaf node value",
	ref: "http://tools.ietf.org/html/rfc6020#page-58",
	uniq:1
}

elements["mandatory"] =
{
	default: false,
	desc: "defines default leaf node value",
	ref: "http://tools.ietf.org/html/rfc6020#page-58",
	uniq:1
}

elements["leaf-lists"] =
{
	desc: "define a simple scalar variable of a particular type",
	ref: "http://tools.ietf.org/html/rfc6020#page-61",
	uniq:0,
	subs:
	[
		"config",
		"description",
		"if-feature",
		"max-elements",
		"min-elements",
		"must",
		"ordered-by",
		"reference",
		"status",
		"type",
		"units",
		"when"
	]
}

elements["min-elements"] =
{
	desc: "constraint on valid list entries",
	ref: "http://tools.ietf.org/html/rfc6020#page-62",
	uniq:1
}

elements["max-elements"] =
{
	desc: "constraint on valid list entries",
	ref: "http://tools.ietf.org/html/rfc6020#page-62",
	uniq:1
}

elements["ordered-by"] =
{
	default: "system",
	desc: "defines whether the order of entries within a list are determined by the user or the system",
	ref: "http://tools.ietf.org/html/rfc6020#page-63",
	uniq:1
}

elements["list"] =
{
	desc: "define an interior data node in the schema tree",
	ref: "http://tools.ietf.org/html/rfc6020#page-66",
	uniq:0,
	subs:
	[
		"anyxml",
		"choice",
		"config",
		"container",
		"description",
		"grouping",
		"if-feature",
		"key",
		"leaf",
		"leaf-list",
		"list",
		"max-elements",
		"min-elements",
		"must",
		"ordered-by",
		"reference",
		"status",
		"typedef",
		"unique",
		"uses",
		"when"
	]
}

elements["key"] =
{
	desc:"MUST be present if the list represents configuration. Space-separated list of leaf identifiers of this list.",
	ref: "http://tools.ietf.org/html/rfc6020#page-67",
	uniq:1
}

elements["anyxml"] =
[
	"config",
	"description",
	"if-feature",
	"mandatory",
	"must",
	"reference",
	"status",
	"when"
]

elements["augment"] =
[
	"anyxml",
	"case",
	"choice",
	"container",
	"description",
	"if-feature",
	"leaf",
	"leaf-list",
	"list",
	"reference",
	"status",
	"uses",
	"when",
]

var module = function (type, nameval)
{
	if (typeof type == "undefined" || typeof nameval == "undefined")
 	   return

	this.type = type
	this.nameval = nameval
	this.id = _ID++

	this.subs = []

	var self = this
	this.add = function(type, nameval)
	{
		var elem = new module(type, nameval)
		self.subs.push(elem)

		return elem
	}

	this.remove = function(id)
	{
		if (!id || self.id == id)
			return

		for (var i = 0, len = self.subs.length; i < len; i++)
		{
			if (self.subs[i].id == id)
				return self.subs.splice(i,1)

			self.subs[i].remove(id)
		}

	}

	this.find = function(id)
	{
		if (!id)
			return 0

		if (self.id == id)
			return self

		for (var i=0, len=self.subs.length; i < len; i++)
		{
			var found = self.subs[i].find(id)
			if (found)
				return found
		}

		return 0
	}

	this.find_from_dom = function(elem)
	{
		var id = elem.closest('div.yang').data('id')

		return self.find(id)
	}
}

function get_completions(type)
{
	try
	{
		elements[type].subs[0]
	}
	catch(e)
	{
		return []
	}
	return elements[type].subs
}

function create_completion_window(module, type)
{
	console.debug("completion for type:" + type)

	try
	{
		elements[type].subs[0]
	}
	catch(e)
	{
		return console.error("no completions for type")
	}

	var h = "<div class='completion'><ul>"

	// ["import", "include", "list"]
	var type_substatements = elements[type].subs

	// return empty if no elements
	var completion_elements_count = 0
	for (var i in type_substatements)
	{
		// "prefix"
		var type_substatement_name = type_substatements[i]

		// don't show types which are already added and can't be added twice
		var skip_if_exists = 0
		if (typeof module !== "undefined" &&
			typeof elements[type_substatement_name] !== "undefined" &&
			typeof elements[type_substatement_name].uniq !== "undefined" &&
			elements[type_substatement_name].uniq)
		{
			for (var i = 0, len = module.subs.length; i < len; i++)
			{
				if (module.subs[i].type == type_substatement_name)
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
		h += "<a href='#'><span class='small'>" + type_substatement_name + "</span></a>"
		try
		{
			h += " : <span class='small property'>" + elements[type_substatement_name].desc + "</span>"
		}
		catch(e)
		{

		}

		h += "</li>"
	}

	if (!completion_elements_count)
		return 0

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
 */

function create_dom(m, tab)
{
	var h = ""
	tab = tab || 1
	var margin = 1

	// add some margin/padding
	for (var i = 0; i<tab; i++)
		margin += 0.2

	// 'keyword' 'identifier'
	h += "<div class='yang' style='margin-left:"+margin+"em' data-id='"+m.id+"' data-name='"+m.nameval+"' data-type='"+m.type+"' >"
	h += "<a class='delete invisible' href='#' title='remove'>-</a> "
	h += "<span class='identifier'>" + m.type + "</span>"
	h += ' "<span contenteditable="true" class="name editable">' + m.nameval + '</span>"'

	if (typeof elements[m.type].subs == "undefined" || !elements[m.type].subs.length)
	{
		h += "</div>"

		return h
	}

	// process substatements

	h += " {"
	h += "<div style='margin-left:"+margin+"em'>"
	h += "<ul>"

	for (var sub in m.subs)
	{
		var prop=m.subs[sub]

		h += "<li class='property'>"
		h += create_dom(prop, tab + 1)
		h += "</li>"
	}

	h += "<li>"
	h += "<a href='#' class='add invisible'>[+]</a> "
	h += "</li>"
	h += "</ul>"
	h += "}"
	h += "</div> <br/><br/>"

	return h
}

