var date;

var obj = document.getElementById('show');

obj.innerHTML = "";

var table_start = "<table>"
var table_end = "</table>"

obj.innerHTML = table_start;

for(date = 10; date< 100; date ++){
    console.log("Date" + date);
    obj.innerHTML += "date " + date + "</br>"; 
    
}
obj.innerHTML = table_end;


