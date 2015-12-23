module.exports.test = function() {
  return "This is a test for module.";
}

module.exports.getInfo = function(request,response,query){
    query.descending("createdAt");
    query.find({
      success: function(data) {
        ret = {
            "status" : 0,
            "data" : data
        }
        response.success(data);
      },
      error: function(error) {
        ret = { 
            "status" : -1,
            "msg" : "Error: " + error.code + " " + error.message
        };
        response.error(ret);
      }
    });
}
