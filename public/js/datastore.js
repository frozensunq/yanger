var yang = new function()
{
	// global id counter for modules
	this._ID = 1

	// main statement object
	var statement = this.statement = function (type, nameval)
	{
		this.type = type
		this.nameval = nameval
		this.id = yang._ID++

		this.subs = []
	}

	// add new substatement
	statement.prototype.add = function(type, nameval)
	{
		if (typeof type == "undefined" || typeof nameval == "undefined")
		{
			return console.error(util.format("[statement:add] error: nameval=%s type=%s", nameval, type))
		}

		var elem = new yang.statement(type, nameval)
		this.subs.push(elem)

		return elem
	}

	// remove substatement from this statement by id
	statement.prototype.remove = function(id)
	{
		if (!id || this.id == id)
		{
			return
		}

		for (var i = 0, len = this.subs.length; i < len; i++)
		{
			if (this.subs[i].id == id)
				return this.subs.splice(i,1)

			this.subs[i].remove(id)
		}
	}

	// (recursive) find and return (sub)statement by id
	statement.prototype.find = function(id)
	{
		if (!id)
		{
			return console.error(util.format("[statement:find] error: id=%s", id))
		}

		if (this.id == id)
			return this

		for (var i = 0, len = this.subs.length; i < len; i++)
		{
			var found = this.subs[i].find(id)
			if (found)
				return found
		}

		return 0
	}

	var statements = this.statements =
	{

		"type":
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
		},

		"config":
		{
			default: false,
			desc: "configuration or state data",
			ref: "http://tools.ietf.org/html/rfc6020#page-105",
			uniq:1
		},

		"status":
		{
			default: "current",
			desc: "definition status",
			ref: "http://tools.ietf.org/html/rfc6020#page-105",
			uniq:1
		},

		"description":
		{
			desc: "description of this definition",
			ref: "http://tools.ietf.org/html/rfc6020#page-105",
			uniq:1
		},

		"reference":
		{
			desc: "reference to this definition",
			ref: "http://tools.ietf.org/html/rfc6020#page-105",
			uniq:1
		},

		"when":
		{
			desc: "make data definition conditional",
			ref: "http://tools.ietf.org/html/rfc6020#page-106",
			uniq:1
		},


		"module":
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
		},

		"yang-version":
		{
			desc: "specifies which version of the YANG language was used in developing the module",
			ref: "http://tools.ietf.org/html/rfc6020#page-40",
			uniq:1
		},

		"namespace":
		{
			desc: "defines the XML namespace that all identifiers defined by the module are qualified by",
			ref: "http://tools.ietf.org/html/rfc6020#page-41",
			uniq:1
		},

		"prefix":
		{
			desc: "define the prefix associated with the module and its namespace",
			ref: "http://tools.ietf.org/html/rfc6020#page-41",
			uniq:1
		},

		"import":
		{
			desc: "makes definitions from one module available inside another module or submodule",
			ref: "http://tools.ietf.org/html/rfc6020#page-42",
			uniq:0,
			subs:
			[
				"prefix",
				"revision-date"
			]
		},

		"revision-date":
		{
			desc: "specify the exact version of the module to import",
			ref: "http://tools.ietf.org/html/rfc6020#page-41",
			uniq:1
		},

		"include":
		{

			desc: "make content from a submodule available to that submodule's parent module, or to another submodule of that parent module",
			ref: "http://tools.ietf.org/html/rfc6020#page-42",
			uniq:0,
			subs:
			[
				"revision-date"
			]
		},

		"organization":
		{

			desc: "defines the party responsible for this module",
			ref: "http://tools.ietf.org/html/rfc6020#page-42",
			uniq:1
		},

		"contact":
		{

			desc: "provides contact information for this module",
			ref: "http://tools.ietf.org/html/rfc6020#page-42",
			uniq:1
		},

		"revision":
		{

			desc: "specifies the editorial revision history of the module, including the initial revision",
			ref: "http://tools.ietf.org/html/rfc6020#page-43",
			uniq:1,
			subs:
			[
				"description",
				"reference"
			]
		},

		"submodule":
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
		},

		"belongs-to":
		{

			desc: "specifies the module to which the submodule belongs",
			ref: "http://tools.ietf.org/html/rfc6020#page-47",
			uniq:1,
			subs:
			[
				"prefix"
			]
		},

		"typedef":
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
		},

		"units":
		{
			desc: "textual definition of the units associated with the type",
			ref: "http://tools.ietf.org/html/rfc6020#page-49",
			uniq:1
		},

		"container":
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
		},

		"must":
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
		},

		"error-message":
		{
			desc:"passed as an error-message tag in the rpc-error",
			ref: "http://tools.ietf.org/html/rfc6020#page-54",
			uniq:1
		},

		"error-app-tag":
		{
			desc:"passed as an error-app-tag in the rpc-error",
			ref: "http://tools.ietf.org/html/rfc6020#page-54",
			uniq:1
		},

		"presence":
		{
			desc:"assigns a meaning to the presence of a container in the data tree",
			ref: "http://tools.ietf.org/html/rfc6020#page-55",
			uniq:1
		},

		"leaf":
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
		},

		"default":
		{
			desc: "defines default leaf node value",
			ref: "http://tools.ietf.org/html/rfc6020#page-58",
			uniq:1
		},

		"mandatory":
		{
			default: false,
			desc: "defines default leaf node value",
			ref: "http://tools.ietf.org/html/rfc6020#page-58",
			uniq:1
		},

		"leaf-lists":
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
		},

		"min-elements":
		{
			desc: "constraint on valid list entries",
			ref: "http://tools.ietf.org/html/rfc6020#page-62",
			uniq:1
		},

		"max-elements":
		{
			desc: "constraint on valid list entries",
			ref: "http://tools.ietf.org/html/rfc6020#page-62",
			uniq:1
		},

		"ordered-by":
		{
			default: "system",
			desc: "defines whether the order of entries within a list are determined by the user or the system",
			ref: "http://tools.ietf.org/html/rfc6020#page-63",
			uniq:1
		},

		"list":
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
		},

		"key":
		{
			desc:"MUST be present if the list represents configuration. Space-separated list of leaf identifiers of this list.",
			ref: "http://tools.ietf.org/html/rfc6020#page-67",
			uniq:1
		},

		"unique":
		{
			desc:"Put constraints on valid list entries. It takes as an argument a string that contains a space-separated list of schema node identifiers.",
			ref: "http://tools.ietf.org/html/rfc6020#page-69",
			uniq:1
		},

		"choice":
		{
			desc:"Put constraints on valid list entries. It takes as an argument a string that contains a space-separated list of schema node identifiers.",
			ref: "http://tools.ietf.org/html/rfc6020#page-69",
			subs:
			[
				"anyxml",
				"case",
				"config",
				"container",
				"default",
				"description",
				"if-feature",
				"leaf",
				"leaf-list",
				"list",
				"mandatory",
				"reference",
				"status",
				"when"
			]
		},

		"case":
		{
			desc:"Define branches of the choice. It takes as an argument an identifier, followed by a block of substatements that holds detailed case information.",
			ref: "http://tools.ietf.org/html/rfc6020#page-76",
			subs:
			[
				"anyxml",
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
				"when"
			]
		},

		"mandatory":
		{
			default: "true",
			desc: "Takes as an argument the string 'true' or 'false', and puts a constraint on valid data.",
			ref: "http://tools.ietf.org/html/rfc6020#page-79"
		},

		"anyxml":
		{
			desc: "Defines an interior node in the schema tree. It takes one argument, which is an identifier, followed by a block of substatements that holds detailed anyxml information.",
			ref: "http://tools.ietf.org/html/rfc6020#page-80",
			subs:
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
		},

		"grouping":
		{
			desc: "Define a reusable block of nodes, which may be used locally in the module, in modules that include it, and by other modules that import from it",
			ref: "http://tools.ietf.org/html/rfc6020#page-82",
			subs:
			[
				"anyxml",
				"choice",
				"container",
				"description",
				"grouping",
				"leaf",
				"leaf-list",
				"list",
				"reference",
				"status",
				"typedef",
				"uses"
			]
		},

		"uses":
		{
			desc: "Reference a 'grouping' definition. It takes one argument, which is the name of the grouping.",
			ref: "http://tools.ietf.org/html/rfc6020#page-84",
			subs:
			[
				"augment",
				"description",
				"if-feature",
				"refine",
				"reference",
				"status",
				"when"
			]
		},
		"refine":
		{
			desc: "Some of the properties of each node in the grouping can be refined with the 'refine' statement. The argument is a string that identifies a node in the grouping.",
			ref: "http://tools.ietf.org/html/rfc6020#page-84",
		},
		"rpc":
		{
			desc: "Define a NETCONF RPC operation.  It takes one argument, which is an identifier, followed by a block of substatements that holds detailed rpc information.",
			ref: "http://tools.ietf.org/html/rfc6020#page-86",
			subs:
			[
				"description",
				"grouping",
				"if-feature",
				"input",
				"output",
				"reference",
				"status",
				"typedef"
			]
		},

		"augment":
		{
			desc: "",
			ref: "",
			subs:
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
		}
	}

}

function create_completion_window(statement, type)
{
	console.debug("completion for type:" + type)

	try
	{
		yang.statements[type].subs[0]
	}
	catch(e)
	{
		return console.error("no completions for type")
	}

	var h = "<div class='completion'><ul>"

	// ["import", "include", "list"]
	var type_substatements = yang.statements[type].subs

	// return empty if no elements
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
 *
 * @module: yang statement module
 * @tab: level of indentation
 */

function create_dom(m)
{
	var h = ""

	// 'keyword' 'identifier'
	h += "<div class='yang' data-id='"+m.id+"' data-name='"+m.nameval+"' data-type='"+m.type+"' >"
	h += "<a class='delete invisible' href='#' title='remove'>-</a> "
	h += "<span class='identifier'>" + m.type + "</span>"
	h += ' "<span contenteditable="true" class="name editable">' + m.nameval + '</span>"'

	// there are no possible substatements close tag
	if (typeof yang.statements[m.type].subs == "undefined" || !yang.statements[m.type].subs.length)
	{
		return h += "</div>"
	}

	//if there are no existing substatements only show add option
	/* TODO: when removing elements we need to replace parent structure too if no substatements left
	if (!m.subs.length)
	return h+= " { <a href='#' class='add invisible'>[+]</a> } </div> "
	*/

	// process substatements

	h += " {"
	h += "<div style='margin-left:1em'>"
	h += "<ul data-statements>"

	for (var sub in m.subs)
	{
		var prop=m.subs[sub]

		h += "<li class='property'>"
		h += create_dom(prop)
		h += "</li>"
	}

	h += "<li>"
	h += "<a href='#' class='add invisible'>[+]</a>"
	h += "</li>"
	h += "</ul>"
	h += "}"
	h += "</div>"

	return h
}

