function on_search(url) {
    if (url == "default") {
        document.getElementById("next_btn").style.display = "none";
        var input_string = document.getElementById("search_box").value;
        var rootURL = 'https://swapi.dev/api/people/?search=';
        var customURL = rootURL + input_string;
    } else {
        customURL = url;
    }

    console.log("customURL: " + customURL);
    var myTable = document.getElementById('myTable');
    myTable.innerHTML = "";
    var record_count = 0;

    //Sending a request to the API server to get the data 
    $.getJSON(customURL, function(data) {

        record_count = data.count;

        if (record_count == 0 || record_count == null) {


            var row = myTable.insertRow();
            row.insertCell(0).innerHTML = "No Results Found";

        } else {


            console.log(data);
            /* var row = myTable.insertRow(-1);
             var headerCell = document.createElement("TH");
             headerCell.innerHTML = "SR NO.";
             row.appendChild(headerCell);
             var headerCell = document.createElement("TH");
             headerCell.innerHTML = "Name";
             row.appendChild(headerCell);
             var headerCell = document.createElement("TH");
             headerCell.innerHTML = "HomeWorld";
             row.appendChild(headerCell);*/


            for (i = 0; i < record_count; i++) {


                if (i > 9) {
                    break;
                }
                var row = myTable.insertRow();

                // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                // var cell3 = row.insertCell(2);

                // Add some text to the new cells:
                cell1.innerHTML = i + 1;
                cell2.innerHTML = data.results[i].name;


                /*   //For homeworld, creating another request
                   $.getJSON(data.results[i].homeworld, function(sub_data) {
                       cell3.innerHTML = sub_data.name;
                   });*/

                if (record_count > 10) {
                    var btn = document.getElementById("next_btn");
                    btn.style.display = "block";
                    btn.addEventListener("click", function func1() {
                        on_search(data.next);
                    });
                }

            }
        }


    });

}