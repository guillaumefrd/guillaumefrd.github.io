
//document.getElementById("result").style.visibility = "hidden"; 

//--- adress query ---//
function AdressQuery()
{  
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = this.responseText;
            var jsonPretty = JSON.stringify(JSON.parse(myObj),null,2);
            jsonPretty = syntaxHighlight(jsonPretty);
            document.getElementById("result").innerHTML = jsonPretty;

        }
    };
    var adress = document.getElementById("adressInput").value; 
    var strAdress = "http://bitcoin.mubiz.com/address/" + adress + "/";
    //console.log(strAdress);
    xmlhttp.open("GET", strAdress, true);
    xmlhttp.send();
    document.getElementById("resultDiv").style.visibility = "visible"; 
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
