var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var header = require('../header');
var request = require('superagent');

page('/:username', header, loading, loadUser, function (ctx, next) {
	document.title = `Platzigram - ${ctx.params.username}`;
	var main = document.getElementById('main-container');
	empty(main).appendChild(template(ctx.user));
})

page('/:username/:id', header, loadUser, function (ctx, next) {
	document.title = `Platzigram - ${ctx.params.username}`;
	var main = document.getElementById('main-container');
	empty(main).appendChild(template(ctx.user));

	var modal = document.getElementById(`#modal${ctx.params.id}`);
    var instanceM = M.Modal.init(modal, {
    	onCloseEnd: function () {
    		page(`/${ctx.params.username}`)
    	}
    });
    var modalOpen = M.Modal.getInstance(modal);
    modalOpen.open()
})

function loading(ctx, next) {
	var el = document.createElement('div');
	el.classList.add('loader');
	document.getElementById('main-container').appendChild(el);
	next()
}

/*function loadUser(ctx, next) {
	fetch(`/api/user/${ctx.params.username}`)
		.then(function (res) {
			return res.json()
		})
		.then(function (user) {
			ctx.user = user
			next()
		})
		.catch(function (err) {
			console.log(err)
		})
}*/

function loadUser(ctx, next) {
	request
		.get(`/api/user/${ctx.params.username}`)
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.user = res.body;
			next();
		})
}