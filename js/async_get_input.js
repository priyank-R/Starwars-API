//var input = document.getElementById('search_box');
$(document).ready(function() {
    var timeout = null;
    $('#search_box').keyup(
        function() {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                on_search('default');
            }, 10);
        });
});





async function on_search(url, start_val = 0) {
    //Identifies the URL and creates a specific search-url 
    if (url == "default") {
        document.getElementById("next_btn").style.display = "none";
        var input_string = document.getElementById("search_box").value;
        var rootURL = 'https://swapi.dev/api/people/?search=';
        var customURL = rootURL + input_string;
        //start_val = 0;
    } else {
        customURL = url;
    }




    //Clears the Values of Table for loading Fresh Set of Records everytime 
    await clear_table();

    //Using the synchronus ajax method to fetch the records and store it in the data variable 
    var data = await fetch_values(customURL);



    //Displaying the values, record by record, on the table 
    var status = await display_records(data, start_val);
    if (status = "More records") {
        var btn = document.getElementById("next_btn");
        btn.style.display = "block";
        btn.addEventListener("click", function() {
            start_val += 10;
            return on_search(data.next, start_val); //Not sure if the exisiting 'on_search()' function is terminated
            // when the new one begins
        });
    }

}



async function clear_table() {
    var Parent = document.getElementById('myTable');
    while (document.getElementById('myTable').hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    }
}

async function fetch_values(customURL) {
    var result = null;
    $.ajax({
        url: customURL,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data) {
            result = data;
        }
    });
    console.log(result)
    return result;
}

async function display_records(data, start_val) {
    var myTable = document.getElementById('myTable');
    //   var start_val = 0;


    if (data.count == 0 || data.count == undefined) {
        var row = myTable.insertRow();
        row.insertCell(0).innerHTML = "No Results Found";
        return "no_results";
    } else {
        for (i = start_val; i < data.count; i++) {


            if (i > start_val + 9) {
                return "More records";
                //break;
            }
            var row = myTable.insertRow();

            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            // var cell3 = row.insertCell(2);

            // Add some text to the new cells:
            cell1.innerHTML = i + 1;
            cell2.innerHTML = data.results[i - start_val].name;
        }
    }
}

async function more_records(next_url) {
    var btn = document.getElementById("next_btn");
    btn.style.display = "block";
    btn.addEventListener("click", function() {
        on_search(next_url);
        start_val = start_val + 10;
        console.log("start_val: " + start_val);
    });
}