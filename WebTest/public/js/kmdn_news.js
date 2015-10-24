function kmdn_news()
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