//Write a model for students information given database.
var express=require('express')
var app=express()
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var MongoClient=require('mongodb').MongoClient
MongoClient.connect("mongodb://127.0.0.1/1db",

function(err,db)
{
	if(!err)
	{
		console.log("We are connected");
		app.get('/',function(req,res)
		{
			res.send("Welcome");
		})
		app.get('/index.html',function(req,res)
		{
			res.sendfile(__dirname+"/"+"index.html")
		})
		// app.get('/process_get',function(req,res)
		// {
		// 	var newRec=req.query;
		// 	db.collection('student').insert(newRec,function(err,doc)
		// 	{
		// 		if(err)
		// 		return console.log(err)
		// 	})
		// 	console.log("Record Inserted!");
		// 	res.send('<p>Name:'+req.query.name+'</p><p>Branch:'+req.query.branch+'</p><p>Semester:'+req.query.sem)
		// })
		app.post('/process_post', urlencodedParser, function(req,res){
			var Name=req.body.name
			var Branch=req.body.branch
			var Semester=req.body.sem
			db.collection('student').insert({"Name":Name,"Branch":Branch,"Semester":Semester}, function(err,doc){
				if(err)
				    return console.log(err)

				else
				{
				    res.status(201).json(doc.ops[1])
						console.log("New Record Inserted");
				}
			})
			//console.log("New Record Inserted");
			res.send("<p>Name:"+Name+"</p><p>Branch:"+Branch+"</p><p>Semester:"+Semester+"</p>");

	})
	app.get('/display', function(req, res){
		db.collection('student').find().toArray(function (err, i){
			if(err)
		     	return console.log(err)
			res.render('45.ejs', {student:i});
		});
	})

	// app.post('/process_post', urlencodedParser, function(req,res){
	// 	app.get('/sort', function(req, res){
	// 		db.collection('student').find().sort({name:1}).toArray(function (err, i){
	// 			if(err)
	// 			return console.log(err)
	// 			res.render('45.ejs', {students:i});
	// 		});
	// 	})


var server=app.listen(3000,function()
{
	var host=server.address().address
	var port=server.address().port
	console.log("Listening at http://%s%s",host,port);
})
}
else
db.close;
})
