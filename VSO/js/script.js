 function CreateTableFromJSON() {
    	var	data = [
			{
				"Volunteer_ID" : 180953164, 
				"Volunteer_Name" : "SHAHIL", 
				"Date_of_Registration" : "2020-11-15", 
				"College" : "MIT"
			},
			{
				"Volunteer_ID" : 180902435, 
				"Volunteer_Name" : "AMAN", 
				"Date_of_Registration" : "2020-11-16", 
				"College" : "MAHE"
			},
			{
				"Volunteer_ID" : 180924536, 
				"Volunteer_Name" : "RAJESH", 
				"Date_of_Registration" : "2020-11-16", 
				"College" : "MIT"
			},
			{
				"Volunteer_ID" : 180923457, 
				"Volunteer_Name" : "KIRAN", 
				"Date_of_Registration" : "2020-11-15", 
				"College" : "MAHE"
			},
			{
				"Volunteer_ID" : 180951862, 
				"Volunteer_Name" : "ROHIT", 
				"Date_of_Registration" : "2020-11-17", 
				"College" : "MAHE"
			},
			{
				"Volunteer_ID" : 180953829, 
				"Volunteer_Name" : "BHASKAR", 
				"Date_of_Registration" : "2020-11-17", 
				"College" : "MIT"
			},
			{
				"Volunteer_ID" :180957281, 
				"Volunteer_Name" : "PANDEY", 
				"Date_of_Registration" : "2020-11-15", 
				"College" : "MIT"
			},
			{
				"Volunteer_ID" : 180962719, 
				"Volunteer_Name" : "KOHLI", 
				"Date_of_Registration" : "2020-11-16", 
				"College" : "MAHE"
			},
			{
				"Volunteer_ID" : 180964271, 
				"Volunteer_Name" : "BUMRAH", 
				"Date_of_Registration" : "2020-11-18", 
				"College" : "MIT"
			},
			{
				"Volunteer_ID" : 180925271, 
				"Volunteer_Name" : "PANDYA", 
				"Date_of_Registration" : "2020-11-18", 
				"College" : "MAHE"
			},
			{
				"Volunteer_ID" : 190927181, 
				"Volunteer_Name" : "SURYA", 
				"Date_of_Registration" : "2020-11-18", 
				"College" : "MIT"
			},
			{
				"Volunteer_ID" : 190362819, 
				"Volunteer_Name" : "ARJUN", 
				"Date_of_Registration" : "2020-11-15", 
				"College" : "MAHE"
			},
			{
				"Volunteer_ID" : 170972516, 
				"Volunteer_Name" : "ISHAN", 
				"Date_of_Registration" : "2020-11-16", 
				"College" : "MIT"
			},
			{
				"Volunteer_ID" : 170953216, 
				"Volunteer_Name" : "CHAHAL", 
				"Date_of_Registration" : "2020-11-18", 
				"College" : "MIT"
			},
			{
				"Volunteer_ID" : 170942618, 
				"Volunteer_Name" : "RAHUL", 
				"Date_of_Registration" : "2020-11-16", 
				"College" : "MIT"
			},
			{
				"Volunteer_ID" : 180952617, 
				"Volunteer_Name" : "RAYUDU", 
				"Date_of_Registration" : "2020-11-17", 
				"College" : "MAHE"
			},
			{
				"Volunteer_ID" : 190962517, 
				"Volunteer_Name" : "ISHANT", 
				"Date_of_Registration" : "2020-11-15", 
				"College" : "MIT"
			},
			{
				"Volunteer_ID" : 180953173, 
				"Volunteer_Name" : "SUDHANSHU", 
				"Date_of_Registration" : "2020-11-16", 
				"College" : "MIT"
			},
			{
				"Volunteer_ID" : 170618134, 
				"Volunteer_Name" : "SACHIN", 
				"Date_of_Registration" : "2020-11-15", 
				"College" : "MAHE"
			},
			{
				"Volunteer_ID" : 180926181, 
				"Volunteer_Name" : "PRASAD", 
				"Date_of_Registration" : "2020-11-17", 
				"College" : "MIT"
			}
		]

        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
      
        var fd = document.getElementById("from_date").value;
        var td = document.getElementById("to_date").value;
        fd = fd.split("-");
        td = td.split("-");
        
        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        var button = document.createElement("button");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i].split("_").join(" ");
            tr.appendChild(th);
        }


        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < data.length; i++) {
        	if(data[i][col[2]].split("-")[2]>=fd[2] && data[i][col[2]].split("-")[2]<=td[2] && data[i][col[2]].split("-")[1]== fd[1] && data[i][col[2]].split("-")[1]== td[1] && data[i][col[2]].split("-")[0]== fd[0] && data[i][col[2]].split("-")[0]== td[0])
        		{
            		tr = table.insertRow(-1);
        		}
        	else{continue;}
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
           		tabCell.innerHTML = data[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(button);
        divContainer.appendChild(table);
        
        button.innerHTML = "Sort By Date";
        button.addEventListener("click",sortByDate);
    }
    function convertDate(d) {
  var p = d.split("-");
  return +(p[2]+p[1]+p[0]);
}

function sortByDate() {
  var tbody = document.querySelector("table tbody");
  // get trs as array for ease of use
  var rows = [].slice.call(tbody.querySelectorAll("tr"));
  console.log(rows);
  
  rows.sort(function(a,b) {
    return convertDate(a.cells[2].innerHTML) - convertDate(b.cells[2].innerHTML);
  });
  
  rows.forEach(function(v) {
    tbody.appendChild(v); // note that .appendChild() *moves* elements
  });
}

