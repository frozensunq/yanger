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
	default:0,
	desc: "YANG type",
	ref: "http://tools.ietf.org/html/rfc6020#page-58",
	num: 0,
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
	num: 1,
	subs: 0
}

elements["status"] =
{
	default: "current",
	desc: "definition status",
	ref: "http://tools.ietf.org/html/rfc6020#page-105",
	num: 1,
	subs: 0
}

elements["description"] =
{
	default:0,
	desc: "description of this definition",
	ref: "http://tools.ietf.org/html/rfc6020#page-105",
	num:1,
	subs:0
}

elements["reference"] =
{
	default:0,
	desc: "reference to this definition",
	ref: "http://tools.ietf.org/html/rfc6020#page-105",
	num:1,
	subs:0
}

elements["when"] =
{
	default:0,
	desc: "make data definition conditional",
	ref: "http://tools.ietf.org/html/rfc6020#page-106",
	num:1,
	subs:0
}


elements["module"] =
{
	default:0,
	desc:"defines module",
	ref: "tools.ietf.org/html/rfc6020#page-38",
	num:1,
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
	default: 0,
	desc: "specifies which version of the YANG language was used in developing the module",
	ref: "http://tools.ietf.org/html/rfc6020#page-40",
	num: 1,
	subs: 0
}

elements["namespace"] =
{
	default: 0,
	desc: "defines the XML namespace that all identifiers defined by the module are qualified by",
	ref: "http://tools.ietf.org/html/rfc6020#page-41",
	num: 1,
	subs: 0
}

elements["prefix"] =
{
	default: 0,
	desc: "define the prefix associated with the module and its namespace",
	ref: "http://tools.ietf.org/html/rfc6020#page-41",
	num: 1,
	subs: 0
}

elements["import"] =
{
	default: 0,
	desc: "makes definitions from one module available inside another module or submodule",
	ref: "http://tools.ietf.org/html/rfc6020#page-42",
	num: 0,
	subs:
	[
		"prefix",
		"revision-date"
	]
}

elements["revision-date"] =
{
	default: 0,
	desc: "specify the exact version of the module to import",
	ref: "http://tools.ietf.org/html/rfc6020#page-41",
	num: 1,
	subs: 0
}

elements["include"] =
{
	default: 0,
	desc: "make content from a submodule available to that submodule's parent module, or to another submodule of that parent module",
	ref: "http://tools.ietf.org/html/rfc6020#page-42",
	num: 0,
	subs:
	[
		"revision-date"
	]
}

elements["organization"] =
{
	default: 0,
	desc: "defines the party responsible for this module",
	ref: "http://tools.ietf.org/html/rfc6020#page-42",
	num: 1,
	subs:0
}

elements["contact"] =
{
	default: 0,
	desc: "provides contact information for this module",
	ref: "http://tools.ietf.org/html/rfc6020#page-42",
	num: 1,
	subs:0
}

elements["revision"] =
{
	default: 0,
	desc: "specifies the editorial revision history of the module, including the initial revision",
	ref: "http://tools.ietf.org/html/rfc6020#page-43",
	num: 1,
	subs:
	[
		"description",
		"reference"
	]
}

elements["submodule"] =
{
	default: 0,
	desc: "split modules in submodules",
	ref: "http://tools.ietf.org/html/rfc6020#page-45",
	num: 0,
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
	default: 0,
	desc: "specifies the module to which the submodule belongs",
	ref: "http://tools.ietf.org/html/rfc6020#page-47",
	num: 1,
	subs:
	[
		"prefix"
	]
}

elements["typedef"] =
{
	default: 0,
	desc: "defines a new type that may be used locally in the module, in modules or submodules which include it, and by other modules that import from it",
	ref: "http://tools.ietf.org/html/rfc6020#page-48",
	num: 1,
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
	default:0,
	desc: "textual definition of the units associated with the type",
	ref: "http://tools.ietf.org/html/rfc6020#page-49",
	num:1,
	subs:0
}

elements["container"] =
{
	default:0,
	desc: "defines an interior data node in the schema tree",
	ref: "http://tools.ietf.org/html/rfc6020#page-50",
	num:0,
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
	default:0,
	desc:"declare a constraint on valid data",
	ref: "http://tools.ietf.org/html/rfc6020#page-53",
	num:1,
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
	default:0,
	desc:"passed as an error-message tag in the rpc-error",
	ref: "http://tools.ietf.org/html/rfc6020#page-54",
	num:1,
	subs:0
}

elements["error-app-tag"] =
{
	default:0,
	desc:"passed as an error-app-tag in the rpc-error",
	ref: "http://tools.ietf.org/html/rfc6020#page-54",
	num:1,
	subs:0
}

elements["presence"] =
{
	default:0,
	desc:"assigns a meaning to the presence of a container in the data tree",
	ref: "http://tools.ietf.org/html/rfc6020#page-55",
	num:1,
	subs:0
}

elements["leaf"] =
{
	default: 0,
	desc: "defines leaf node",
	ref: "http://tools.ietf.org/html/rfc6020#page-58",
	num: 0,
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
	default: 0,
	desc: "defines default leaf node value",
	ref: "http://tools.ietf.org/html/rfc6020#page-58",
	num: 1,
	subs:0
}

elements["mandatory"] =
{
	default: false,
	desc: "defines default leaf node value",
	ref: "http://tools.ietf.org/html/rfc6020#page-58",
	num: 1,
	subs:0
}

elements["leaf-lists"] =
{
	default:0,
	desc: "define a simple scalar variable of a particular type",
	ref: "http://tools.ietf.org/html/rfc6020#page-61",
	num:0,
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
	default: 0,
	desc: "constraint on valid list entries",
	ref: "http://tools.ietf.org/html/rfc6020#page-62",
	num: 1,
	subs:0
}

elements["max-elements"] =
{
	default: 0,
	desc: "constraint on valid list entries",
	ref: "http://tools.ietf.org/html/rfc6020#page-62",
	num: 1,
	subs:0
}

elements["ordered-by"] =
{
	default: "system",
	desc: "defines whether the order of entries within a list are determined by the user or the system",
	ref: "http://tools.ietf.org/html/rfc6020#page-63",
	num: 1,
	subs:0
}

elements["list"] =
{
	default:0,
	desc: "define an interior data node in the schema tree",
	ref: "http://tools.ietf.org/html/rfc6020#page-66",
	num:0,
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

elements["key"] =
{
	default:0,
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

	this.find = function(id)
	{
		if (!id)
			return 0

		if (self.id == id)
			return self

		for (var i=0, len = self.subs.length; i < len; i++)
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

function create_completion_window(type)
{
	console.debug("completion for type:" + type)

	var types = get_completions(type)

	var h = "<div class='completion'><ul>"
	for (elem in types)
	{
		var e = types[elem]

		h += "<li>"
		h += "<a href='#'><span class='small'>" + e + "</span></a>"
		try
		{
			h += " : <span class='small property'>" + elements[e].desc + "</span>"
		}
		catch(e)
		{

		}
		h += "</li>"
	}

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
	h += "<div class='yang' style='margin-left:"+margin+"em' data-id='"+m.id+"' data-name='"+m.name+"' data-type='"+m.type+"' >"
	h += "<a class='delete' href='#' title='remove'>-</a> "
	h += "<span class='identifier'>" + m.type + "</span>"
	h += ' "<span contenteditable="true" class="name editable">' + m.nameval + '</span>"'

	if (!m.subs.length)
	{
		h += "</div>"

		return h
	}

	// process substatements

	h += " { <ul>"

	for (var sub in m.subs)
	{
		var prop=m.subs[sub]

		h += "<li class='property'>"
		h += create_dom(prop, tab + 1)
		h += "</li>"
	}

	h += "<li>"
	h += "<a style='margin-left:"+margin+"em' class='add' href='' title='add'>[+]</a> "
	h += "</li>"
	h+= "</ul> } <br/><br/>"

	return h
}

