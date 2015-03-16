define(function (require) {
	var sprintf = require('sprintf').sprintf

	function appendToStringBuilder(fromSb, toSb) {
		fromSb._buffers.forEach(function (str) {
			toSb.append(str)
		})
	}


	// StringBuilder is used to build string
	function StringBuilder() {
		this._buffers = []
	}


	// returns the concated string.
	StringBuilder.prototype.toString = function () {
		return this._buffers.join('')
	}


	// append string
	//  - args: `String` or `StringBuilder` a list of string thing to append
	StringBuilder.prototype.append = function () {
		for (var i in arguments) {
			var str = arguments[i]
			if (str instanceof StringBuilder) {
				appendToStringBuilder(str, this)
			} else {
				this._buffers.push(str)
			}
		}
	}


	// append string and a `\n`
	StringBuilder.prototype.appendLine = function () {
		this.append.apply(this, arguments)
		this.append('\n')
	}


	// append with foramt info, uses `sprintf`
	StringBuilder.prototype.appendFormat = function (format, args) {
		this.append(sprintf.apply(this, arguments))
	}


	// append with foramt info and a `\n`, uses `sprintf`
	StringBuilder.prototype.appendLineFormat = function (format, args) {
		this.appendFormat.apply(this, arguments)
		this.append('\n')
	}

	return StringBuilder
})