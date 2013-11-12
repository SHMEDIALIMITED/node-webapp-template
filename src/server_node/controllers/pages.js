module.exports = function(config) {

	return  {
        index : function(req, res) {
            res.render('index', {layout:false,locals:{
                version: config.version}});

        }
	}
}