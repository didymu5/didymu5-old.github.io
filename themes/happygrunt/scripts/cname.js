//Generates CNAME is CNAME is defined in _config.yml

var util = require('hexo-util');
const fs = require('hexo-fs');

if (hexo.config.CNAME) {
	fs.writeFile(hexo.config.public_dir+'/CNAME', hexo.config.CNAME, 'utf8', function(args){
		console.log(`Writing ${hexo.config.CNAME} to CNAME file in public direcotry`);
	});
};
