<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>jQuery UI Button - Default functionality</title>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.8/css/dataTables.jqueryui.min.css">
    <link rel="stylesheet" href="/resources/demos/style.css">
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
    <script src="https://cdn.datatables.net/1.10.8/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.8/js/dataTables.jqueryui.min.js"></script>
    <script src="./js/callPython.js"></script>
    <script src="./js/dialog.js"></script>

    <script>
        
        $("document").ready(function(){
            function showContent()
            {
                paras = {
                    'url' : "./" + $("select option:selected").val() + ".html",
                    'button' : "",
                }
                var $dia = createDialog(paras);
                $dia.dialog("open");
            }
            $( "#menu" ).selectmenu();
            $( "button" ).button();
            $( "#show" ).click(showContent);
          });
    </script>
</head>

<body>
    <button id="show">Show Content</button>
    <br/>
    <br/>
    <select name="page_menu" id="menu" style="min-width:200px;">
      <option value="news">News</option>
      <option value="weather">Weather</option>
      <option value="radar">Radar</option>
      <option value="uv">Uv</option>
      <option value="fishery">Fishery</option>
      <option value="typhoon">Typhoon</option>
      <option value="forecast">Forecast</option>
      <option value="arrival">Arrival</option>
      <option value="depart">Depart</option>
      <option value="usersearch">UserSearch</option>
      <option value="port">Port</option>
      <option value="bus">Bus</option>
      <option value="gov">Gov</option>

    </select>
    
    
    
    
    
</body>

</html>
