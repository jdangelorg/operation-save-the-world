const fortune = require('./fortune')

exports.home = (req, res) => res.render('home')

exports.links = (req, res) => res.render('links', { fortune: fortune.getFortune() })

exports.notFound = (req, res) => res.render('404')

exports.serverError = (err, req, res, next) => res.render('500')