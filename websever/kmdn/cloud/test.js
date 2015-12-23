module.exports.test = function() {
  return "This is a test for module.";
}

module.exports.addPoints = function(request,response){
    var GameScore = Parse.Object.extend("User");
    var query = new Parse.Query(GameScore);
    query.get(request.params.user, {
      success: function(gameScore) {
        gameScore.set("points", 100);
        gameScore.save();
        response.success(gameScore);
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        response.error( "add points:" + error)
      }
    });
}