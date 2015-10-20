function createDialog(paras)
{     
    var dia = $( "<div id=\"dia\"></div>" ).dialog({ 
        autoOpen: false,
        height: 'auto',
        width: 'auto',
        buttons: paras["button"],
        close: function(event, ui) 
        { 
            $(this).dialog('close');
            $(this).dialog('destroy').remove();
            alert("remove");
        },
        position: "center",
    });
    dia.load(paras['url']);
    return dia;
}