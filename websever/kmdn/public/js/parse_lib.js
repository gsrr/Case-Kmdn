
Parse.initialize("mpuTWZgtQanqfCdO8IWJEJbHTZoQq97h6pG2qhGT", "2Xpjqqtz71ab31Hp9jHRARW7t7jaaBjjnZRJy77o");
function callCloud(func, paraList, callback)
{
    Parse.Cloud.run(func, paraList,{
        success: function(data) {
            callback(data);
        },
        error: function(error) {
            alert("call Cloud Error");
        }
    });
}

function test(class_name, key, value)
{
    var GameScore = Parse.Object.extend(class_name);
    var query = new Parse.Query(GameScore);
    query.equalTo( key, value);
    query.find({
      success: function(results) {
        console.log(results);
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
}
    
