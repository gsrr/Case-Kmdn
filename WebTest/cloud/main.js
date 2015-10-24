
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

Parse.initialize("mpuTWZgtQanqfCdO8IWJEJbHTZoQq97h6pG2qhGT", "2Xpjqqtz71ab31Hp9jHRARW7t7jaaBjjnZRJy77o");

Parse.Cloud.define("test_module", function(request, response) {
    var test = require('cloud/test.js');
    response.success(test.test());
});

Parse.Cloud.define("test_module_addPoints", function(request, response) {
    
    var test = require('cloud/test.js');
    test.addPoints(request,response)
});

Parse.Cloud.define("queryBusinessPoint", function(request, response) {
    Parse.initialize("mpuTWZgtQanqfCdO8IWJEJbHTZoQq97h6pG2qhGT", "2Xpjqqtz71ab31Hp9jHRARW7t7jaaBjjnZRJy77o");
    var GameScore = Parse.Object.extend("BusinessPoint");
    var query = new Parse.Query(GameScore);
    query.equalTo("name", request.params.name);
    query.find({
      success: function(results) {
        var GameScore = Parse.Object.extend("User");
        var query = new Parse.Query(GameScore);
        query.get(request.params.user, {
          success: function(gameScore) {
            gameScore.set("points", gameScore.get("points") + results[0].get("points"));
            gameScore.save();
            response.success({"total" : gameScore.get("points"), "result" : results});
          },
          error: function(object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
            response.error( "add points:" + error)
          }
        });
      },
      error: function(error) {
        response.error("Error: " + error.code + " " + error.message);
      }
    });
});

Parse.Cloud.define("createBusinessPoint", function(request, response) {
    Parse.initialize("mpuTWZgtQanqfCdO8IWJEJbHTZoQq97h6pG2qhGT", "2Xpjqqtz71ab31Hp9jHRARW7t7jaaBjjnZRJy77o");
    var GameScore = Parse.Object.extend("BusinessPoint");
    var gameScore = new GameScore();
    gameScore.set("name", request.params.name);
    gameScore.set("points", request.params.points);
    gameScore.save(null, {
      success: function(gameScore) { 
        response.success(gameScore);
      },
      error: function(gameScore, error) {
        response.error('Failed to create new object, with error code: ' + error.message);
      } 
    });
});

Parse.Cloud.define("initUserPoint", function(request, response) {
    Parse.initialize("mpuTWZgtQanqfCdO8IWJEJbHTZoQq97h6pG2qhGT", "2Xpjqqtz71ab31Hp9jHRARW7t7jaaBjjnZRJy77o");
    var GameScore = Parse.Object.extend("User");
    var query = new Parse.Query(GameScore);
    query.get(request.params.user, {
      success: function(gameScore) {
        gameScore.set("points", 15);
        gameScore.save();
        response.success(gameScore);
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
      }
    });
    
});

Parse.Cloud.define("createUser", function(request, response) {
    Parse.initialize("mpuTWZgtQanqfCdO8IWJEJbHTZoQq97h6pG2qhGT", "2Xpjqqtz71ab31Hp9jHRARW7t7jaaBjjnZRJy77o");
    var GameScore = Parse.Object.extend("UserInfo");
    var gameScore = new GameScore();
    
    gameScore.set("user", request['user']);
    gameScore.set("points", 0);
    gameScore.save(null, {
      success: function(gameScore) { 
        response.success('New object created with objectId: ' + gameScore.id + ' ' + gameScore.points);
      },
      error: function(gameScore, error) {
        response.error('Failed to create new object, with error code: ' + error.message);
      } 
    });
    
});

Parse.Cloud.define("queryUser", function(request, response) {
  Parse.initialize("mpuTWZgtQanqfCdO8IWJEJbHTZoQq97h6pG2qhGT", "2Xpjqqtz71ab31Hp9jHRARW7t7jaaBjjnZRJy77o");
    var GameScore = Parse.Object.extend("UserInfo");
    var query = new Parse.Query(GameScore);
    query.equalTo(request.params.key, request.params.value);
    query.find({
      success: function(results) {
        response.success(results);
      },
      error: function(error) {
        response.error("Error: " + error.code + " " + error.message);
      }
    });
});

Parse.Cloud.define("test", function(request, response) {
    var key = request["key"];
  response.success({"status" : 0, "user" : key});
});