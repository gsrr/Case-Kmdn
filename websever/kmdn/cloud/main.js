
function initParse()
{
    Parse.initialize("mpuTWZgtQanqfCdO8IWJEJbHTZoQq97h6pG2qhGT", "2Xpjqqtz71ab31Hp9jHRARW7t7jaaBjjnZRJy77o");
}

function query_find(InfoName, key_comp, value)
{
    initParse();
    var info = Parse.Object.extend(InfoName);
    var query = new Parse.Query(info);
    query.equalTo(key_comp, value);
    return query;
}

function query_all(InfoName)
{
    initParse();
    var info = Parse.Object.extend(InfoName);
    var query = new Parse.Query(info);
    return query;
}

Parse.Cloud.define("verifyObjectId", function(request, response) {
    
    var info = require('cloud/info.js');
    query = query_all("TransactionInfo");
    query.get(request.params.objectId,{
      success: function(data) {
        data.set("state", "complete");
        data.save();
        var user_id = data.get("user");
        query_user = query_all("User");
        query_user.get(user_id, {
                success: function(user){
                        var points = user.get("points");
                        user.set("points", points + data.get("point"));
                        user.save();
                        ret = {
                                "status" : 0,
                                "data" : data
                        }
                        response.success(ret);
                },
                error: function(error){
                        ret = { 
                                "status" : -1,
                                "msg" : "Error: " + error.code + " " + error.message
                        };
                        response.error(ret);
                }
        });
      },
      error: function(error) {
        ret = { 
            "status" : -1,
            "msg" : "Error: " + error.code + " " + error.message
        };
        response.error(ret);
      }
    });
});

Parse.Cloud.define("soldTrans", function(request, response) {
    
    var info = require('cloud/info.js');
    query = query_find("TransactionInfo", "store", Parse.User.current().get("store"));
    info.getInfo(request,response, query)
});

Parse.Cloud.define("openTrans", function(request, response) {
    
    var info = require('cloud/info.js');
    query = query_find("TransactionInfo", "user", Parse.User.current().id);
    info.getInfo(request,response, query)
});

Parse.Cloud.define("buyGoods", function(request, response) {
    
    var info = require('cloud/info.js');
    query = query_all("GoodInfo");
    var query = new Parse.Query("GoodInfo");
    query.get(request.params.objectId,{
      success: function(data) {
        var TransInfo = Parse.Object.extend("TransactionInfo");
        var trans = new TransInfo();
        var session = Parse.Session.current();
        trans.set("user", Parse.User.current().id);
        trans.set("userName", Parse.User.current().get("displayName"));
        trans.set("point", data.get("point"));
        trans.set("good", data.get("good"));
        trans.set("store", data.get("store"));
        trans.set("storeName", data.get("storeName"));
        trans.set("state", "processing");
        trans.save(null, {
          success: function(data) { 
                ret = {
                "status" : 0,
                "data" : data
            }
            response.success(ret);
          },
          error: function(trans, error) {
                ret = { 
                "status" : -1,
                "msg" : "Error: " + error.code + " " + error.message
            };
            response.error(ret);
          } 
        });
        
      },
    });
});

Parse.Cloud.define("getGoods", function(request, response) {
    
    var info = require('cloud/info.js');
    query = query_find("GoodInfo", "store", request.params.store);
    info.getInfo(request,response, query)
});

Parse.Cloud.define("getAllStore", function(request, response) {
    
    query = query_all("StoreInfo");
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
});

Parse.Cloud.define("getWeather", function(request, response) {
    
    query = query_all("WeatherInfo");
    query.first({
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
});

Parse.Cloud.define("getAllNews", function(request, response) {
    
    query = query_find("NewsInfo", "date", request.params.date);
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
});

Parse.Cloud.define("getPoint", function(request, response) {
    
    query = query_find("KmdnInfo", "feature", request.params.feature);
    query.find({
      success: function(data) {
        ret = { 
            "status" : 0,
            "data" : data[0].get("point")
        };
        response.success(ret);
      },
      error: function(error) {
        ret = { 
            "status" : -1,
            "msg" : "Error: " + error.code + " " + error.message
        };
        response.error(ret);
      }
    });
});



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
