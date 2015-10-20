

function callPython(paras,func)
{
    alert("call Python");
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "channel.php",
        data: paras,
        success: function(ret) {;
            func(ret);
        },
        error: function(xhr) {
            alert('Ajax request error');
        },
    });
}