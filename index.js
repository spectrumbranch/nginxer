 var Handlebars = require('handlebars');
 var fs = require('fs');
 
 var source = "server { \n \
        listen   80;\n \
		\n \
        root /srv/www/{{hostname}}/public_html/; \n \
        index index.php index.html index.htm;\n \
\n \
        server_name {{hostname}}; \n \
\n \
        location / { \n \
        try_files $uri $uri/ /index.php;\n \
        }\n \
\n \
        location ~ \.php$ {\n \
        \n \
        proxy_set_header X-Real-IP  $remote_addr;\n \
        proxy_set_header X-Forwarded-For $remote_addr;\n \
        proxy_set_header Host $host;\n \
        proxy_pass http://127.0.0.1:8080;\n \
\n \
        }\n \
\n \
        location ~ /\.ht {\n \
                deny all;\n \
        }\n \
}\n \
";

var template = Handlebars.compile(source);

var hostnames = [
	'cdn.spectrumbranch.com',
	'devcloud.spectrumbranch.com',
	'dev.midnightlaboratory.com',
	'dev.spectrumbranch.com',
	'midnightlaboratory.com',
	'music.spectrumbranch.com',
	'spectrumbranch.com',
];//TODO get from file

hostnames.forEach(function(hostname) {
	var data = { "hostname": hostname };

	var result = template(data);
	fs.writeFile('output/' + hostname, result, function(err) {
		if (err) throw err;
		console.log(hostname + ' is done.');
	})
});


