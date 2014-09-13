seajs.config({
	base: '../'
});

seajs.use([
	'src/string-builder'
], function (StringBuilder) {

	var sb;

	QUnit.module('module', {
		setup: function () {
			sb = new StringBuilder();
		},
		teardown: function () {

		}
	});

	QUnit.test('append', function (assert) {
		sb.append();
		assert.equal(sb.toString(), '');

		sb.append('');
		assert.equal(sb.toString(), '');

		sb.append('abc');
		assert.equal(sb.toString(), 'abc');

		sb.append(' ', '123', ' ');
		assert.equal(sb.toString(), 'abc 123 ');
	});


	QUnit.test('append(StringBuilder)', function (assert) {
		var sb1 = new StringBuilder();
		sb1.append('abc', '123');
		sb.append('%', sb1, '$');
		assert.equal(sb.toString(), '%abc123$');
	});


	QUnit.test('appendLine', function (assert) {
		sb.appendLine('123');
		sb.append('abc');
		sb.appendLine('');
		assert.equal(sb.toString(), '123\nabc\n');

		sb.appendLine('123', '456');
		assert.equal(sb.toString(), '123\nabc\n123456\n');
	});

	QUnit.test('appendFormat', function (assert) {
		sb.append('a ');
		sb.appendFormat('aa %s aaa', '123');
		assert.equal(sb.toString(), 'a aa 123 aaa');
	});

	QUnit.test('appendLineFormat', function (assert) {
		sb.appendLine('a');
		sb.appendLineFormat('%s\n', '123');
		assert.equal(sb.toString(), 'a\n123\n\n');
	});

});