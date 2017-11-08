var express = require('express');
var app = express();
var config=require('./config/config');
var exec = require('child_process').exec;
var child;
app.use('/public', express.static('public'))
//var devices=[{id:18,name:'First Port'},{id:4,name:'Second Port'}];
var devices=config.devices;
var devices_ids='';
devices.forEach(function(row){
	devices_ids+=row.id+' ';
});
app.set('view engine', 'ejs');

app.get('/', function (req, res) {

		exec("py/gpio_status.py "+devices_ids, function (error, stdout, stderr) {
			var json_str=stdout.replace(/'/g,'"');
			var status=JSON.parse(json_str);
			devices=devices.map(function(row){
				row.status=status['pin_'+row.id];
				return row;
			});
	var jq_lib="public/jquery.min.js";
	if(req.host=='pi.usforweb.com'){
		jq_lib='//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js';
	}
			res.render('tpl/index',{devices:devices,status:stdout,jq_lib:jq_lib});
		});
});

app.get('/status',function(req,res){
 res.setHeader('Content-Type', 'application/json');

});
app.get('/:pin',function(req,res){
	exec("py/gpio_toggle.py "+req.params.pin, function (error, stdout, stderr) {
		res.send(stdout);
	});

});


app.listen(3000, function () {
  console.log('GPIO Command listing on 3000!');
});
