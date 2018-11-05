var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');

process.env.PORT = process.env.PORT || 3000;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})

var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function(req,res){
	res.render('index', { title: 'Platzigram' });
})

app.get('/signup', function(req,res){
	res.render('index', { title: 'Platzigram - Signup' });
})

app.get('/signin', function(req,res){
	res.render('index', { title: 'Platzigram - Signin' });
})

app.get('/api/pictures', function (req, res) {
	var pictures = [
		{
			user: {
				username: 'slifszic',
				avatar: '/profilePic.jpg'
			},
			url: 'office.jpg',
			likes: 10,
			liked: false,
			createdAt: new Date().getTime()
		},
		{
			user: {
				username: 'sergui20',
				avatar: '/profilePic.jpg'
			},
			url: 'office.jpg',
			likes: 11,
			liked: true,
			createdAt: new Date().setDate( new Date().getDate() - 10 )
		},
	];

	setTimeout( () => res.send(pictures), 2000)
})

app.post('/api/pictures', function (req, res) {
	upload(req, res, function (err) {
		if (err) {
			return res.send(500, "Error uploading file");
		}
		res.send('File uploaded');
	})
})

app.get('/api/user/:username', function (req, res) {
	const user = {
		username: 'sergui20',
		avatar: '/profilePic.jpg',
		pictures: [
			{
				id:1,
				src: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&h=350',
				likes: 3,
			},
			{
				id:2,
				src: 'https://cdn.theatlantic.com/assets/media/img/photo/2017/09/landscapes-of-norway/n03_844052000/main_900.jpg?1507146797',
				likes: 10,
			},
			{
				id:3,
				src: 'https://www.trafalgar.com/~/media/images/website-refresh/hero/southamericalandscapes-hero-546842248.jpg?mw=1200&',
				likes: 23,
			},
			{
				id:4,
				src: 'http://www.spanishandsurf.net/wordpress/wp-content/uploads/Paisaje_25-520x265.jpg',
				likes: 0,
			},
			{
				id:5,
				src: 'https://www.queenstownnz.co.nz/assets/Uploads/_resampled/CroppedFocusedImageWyIxMDI0IiwiNDg1IiwieSIsMzVd/Wakatipu-Basin-Aerial-View-2006-03-Cropped.jpg',
				likes: 1,
			},
			{
				id:6,
				src: 'http://www.ejphoto.com/images_of_the_month/SCO_Glencoe10a.jpg',
				likes: 100,
			},
		]
	}
	res.send(user)
})

app.get('/:username', function (req, res) {
	res.render('index', { title: `Platzigram - ${req.params.username}` })
})

app.get('/:username/:id', function (req, res) {
	res.render('index', { title: `Platzigram - ${req.params.username}` })
})

app.listen(process.env.PORT, function (err){
	if (err) return console.log('Hubo un error'), process.exit(1);

	console.log('Platzigram escuchando en el puerto 3000');
})