var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var request = require('superagent')
var header = require('../header');
var webcam = require('webcamjs');
var picture = require('../picture-card')

page('/', header, loading, loadPictures, function (ctx, next) {
	document.title = 'Platzigram';
	var main = document.getElementById('main-container');

	empty(main).appendChild(template(ctx.pictures));

	const picturePreview = document.getElementById('picture-preview');
	const camaraInput = document.getElementById('camara-input');
	const cancelPicture = document.getElementById('cancelButton');
	const shootButton = document.getElementById('shoot');
	const uploadButton = document.getElementById('uploadButton');

	function reset() {
		picturePreview.classList.add('hide');
		cancelPicture.classList.add('hide');
		uploadButton.classList.add('hide');
		shootButton.classList.remove('hide');
		camaraInput.classList.remove('hide');
	}

	cancelPicture.addEventListener('click', function () {
		reset();
	})

	var imgURL;
	var webcamM = document.getElementById('modalCamera');
    var instanceW = M.Modal.init(webcamM, {
    	onOpenEnd: function () {
    		webcam.attach('#camara-input');
    		shootButton.addEventListener('click', function (ev) {
    			uploadButton.addEventListener('click', uploadContent);
    			webcam.snap( (data_uri) => {
					picturePreview.innerHTML = '<img src="'+data_uri+'"/>';
					picturePreview.classList.remove('hide');
					cancelPicture.classList.remove('hide');
					uploadButton.classList.remove('hide');
					shootButton.classList.add('hide');
					camaraInput.classList.add('hide');

					imgURL = data_uri;
				});
    		})
    	},
    	onCloseEnd: function () {
    		webcam.reset();
    		reset();
    	}
    });

    function uploadContent() {
		var pic = {
			url: imgURL,
			likes:0,
			liked:false,
			createdAt: +new Date(),
			user: {
				username: 'sergui20',
				avatar: '/profilePic.jpg'
			}
		}
		$('#picture-cards').prepend(picture(pic));
		reset();
		var closeModal = M.Modal.getInstance(webcamM);
		closeModal.close();	
	}
}) 

function loading(ctx, next) {
	var el = document.createElement('div');
	el.classList.add('loader');
	document.getElementById('main-container').appendChild(el);
	next();
}

function loadPictures(ctx, next) {
	request
		.get('/api/pictures')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.pictures = res.body;
			next(); 
		})
}

/*
function picturesAxios(ctx, next) {
	axios 
		.get('/api/pictures')
		.then(function (res) {
			ctx.pictures = res.data
		})
		.catch(function (err) {
			console.log(err)
		})
}

function picturesFetch(ctx, next) {
	fetch('/api/pictures')
		.then(function (res) {
			return res.json()
		})
		.then(function (pictures) {
			ctx.pictures = pictures
			next()
		})
		.catch(function (err) {
			console.log(err)
		})
}

async function asyncLoad(ctx, next) {
	try{
		ctx.pictures = await fetch('/api/pictures').then(res => res.json())
		next()
	} catch (err){
		return console.log(err);
	}
}*/