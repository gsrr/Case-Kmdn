


function Kmdn() {}


Kmdn.prototype.verifyObjectId = function(objectId)
{
    function cbk_verifyObjectId(ret)
    {
       console.log(ret);
        if(ret['status'] == 0)
        {
            console.log(ret ['data'].id);
        }
        soldTrans(); 
    }
    callCloud("verifyObjectId", {"objectId":objectId}, cbk_verifyObjectId);
}

Kmdn.prototype.soldTrans = function()
{
    function cbk_soldTrans(data)
    {
       var tb = $("#tb_soldRecord").find("tbody");
       tb.empty();
       for(var i = 0 ; i < data.length ; i++)
       {
               var state = data[i].get("state");
               var aTag = $('<a>', {href: '#' });
               if(state == "processing")
               {
                        aTag.addClass("goodState")
               }
               var good_id = data[i].id;
               var good = data[i].get("good");
               var userName = data[i].get("userName");
               var point = data[i].get("point");
               var time = data[i].get("createdAt");
               tb.append($("<tr>").addClass("info")
                               .append($("<td>").append(aTag.text(state).attr("id", good_id)))
                               .append($("<td>").html(userName))
                               .append($("<td>").html(good))
                               .append($("<td>").html(point))
                               .append($("<td>").html(time))

                        );
        }
        $(".goodState").click(verify_objectId);
    }
    callCloud("soldTrans", {}, cbk_soldTrans);
}

Kmdn.prototype.openTrans = function()
{
    function cbk_openTrans(data)
    {
       var tb = $("#tb_buyRecord").find("tbody");
       tb.empty();
       for(var i = 0 ; i < data.length ; i++)
       {
               var state = data[i].get("state");
               var good = data[i].get("good");
               var storeName = data[i].get("storeName");
               var point = data[i].get("point");
               var time = data[i].get("createdAt");
               tb.append($("<tr>").addClass("info")
                               .append($("<td>").html(state))
                               .append($("<td>").html(good))
                               .append($("<td>").html(storeName))
                               .append($("<td>").html(point))
                               .append($("<td>").html(time))

                        );
        }
    }
    callCloud("openTrans", {}, cbk_openTrans);
}

Kmdn.prototype.buyGoods = function(objectId, user)
{
    function cbk_buyGoods(ret)
    {
        console.log(ret);
        if(ret['status'] == 0)
        {
            console.log(ret ['data'].id);
        }
    }
    callCloud("buyGoods", {"objectId":objectId}, cbk_buyGoods);
}

Kmdn.prototype.openMovie = function()
{
    function cbk_movie(data)
    {
            var tb = $("#tb_movieTable").find("tbody");
            tb.empty();
            for(var i = 0 ; i < data.length ; i++)
            {
                    console.log(data[i]);
                    console.log(data[i].id );
                    console.log(data[i].get("good"));
                    console.log(data[i].get("point"));
                    var id = data[i].id;
                    var good = data[i].get("good");
                    var point = data[i].get("point");
                    tb.append($("<tr>").addClass("success movies").attr("id", id)
                                    .append($("<td>").html(good))
                                    .append($("<td>").html(point))

                             );
            }
            $(".movies").click(buyGood);
    }
    callCloud("getGoods", {"store":"kmdn_movie"}, cbk_movie);
}

Kmdn.prototype.openStore = function()
{
    function cbk_store(data)
    {
        console.log(data);
        for(var i = 0 ; i < data.length ; i++)
        {
            console.log(data[i].get("name"));
            console.log(data[i].get("realName"));
        }
    }
    callCloud("getAllStore", {}, cbk_store);
}

Kmdn.prototype.openWeather = function()
{
    function cbk_weather(data)
    {
            console.log(data.get("title"));
            console.log(data.get("table"));
            $("#tb_weather").html(data.get("table"));
    }
    callCloud("getWeather", {}, cbk_weather);
}

Kmdn.prototype.openNews = function()
{
    function cbk_news(data)
    {
        function show_news(data)
        {

            for(var i = 0 ; i < data.length ; i++)
            {
                console.log(data[i].get("author"));
                console.log(data[i].get("title"));
                console.log(data[i].get("date"));
                console.log(data[i].get("content"));
                var title = data[i].get("title");
                var content = data[i].get("content");

                var panel = $("<div>", {"class":"panel panel-default"});
                var panel_heading = $("<div>", {"class" : "panel-heading"});
                var panel_title = $("<h4>", {"class" : "panel-title"});
                var a_tag = $("<a>", {"data-toggle" : "collapse", "data-parent" : "#accordion", "href" : "#collapse" + i}).html(title);
                panel_heading.append(panel_title.append(a_tag));

                var panel_collapse = $("<div>", {"class" : "panel-collapse collapse"}).attr("id", "collapse" + i);
                var panel_body = $("<div>", {"class" : "panel-body"}).html(content);
                panel_collapse.append(panel_body);
                panel.append(panel_heading).append(panel_collapse);
                $("#accordion_news").append(panel);
            }
        }
        var d = new Date();
        var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + "05";
        console.log(date);
        callCloud("getAllNews", {'date' : date}, show_news);
    }
    alert ('get point of news');
    var paraList = {
        'feature' : "news",
    }
    callCloud("getPoint", paraList, cbk_news);
};

function open_news_old()
{
    function test_module_ret(data)
    {
        alert(data);
    }
    function test_module()
    {
        callCloud("test_module", {}, test_module_ret);
    }
    function test_module_addPoints_ret(data)
    {
        console.log(data);
    }
     function test_module_addPoints(paraList)
    {
        alert("test_module_addPoints");
        console.log(paraList);
        callCloud("test_module_addPoints", paraList, test_module_addPoints_ret);
    }
    function createBusinessPoint_ret(data)
    {
        console.log(data);
    }
    function createBusinessPoint()
    {
        var paraList = {
            'name' : "kmdn",
            'points' : 15,
        }
        callCloud("createBusinessPoint", paraList, createBusinessPoint_ret);
    }
    function queryBusinessPoint_ret(data)
    {
        var total = data['total']
        var result = data["result"];
        
        alert("You have get " + result[0].get("points"));
        $("#user_points").html("點數:" + total)
    }
    function queryBusinessPoint(paraList)
    {
        console.log(paraList);
        callCloud("queryBusinessPoint", paraList, queryBusinessPoint_ret);
    }
    alert("kmdn_news");
    //createBusinessPoint();
    var paraList = {
        'user' : $("#user").html(),
        'name' : "kmdn",
    }
    queryBusinessPoint(paraList)
    //test_module_addPoints(paraList)
}
