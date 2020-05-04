//Declaring 2 Global Variables data_next & data_prev
var data_next, data_prev, Start_val;





$(document).ready(function() {
    on_search('https://swapi.dev/api/people/');
    var timeout = null;

    //Triggering the on_search function when the user starts typing 
    $('#search-bar').keyup(
        function() {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                on_search('default');
            }, 10);
        });

    //Binding onclick event with next button
    $('#next_btn').click(
        function() {
            console.log(Start_val);
            Start_val += 10;
            on_search(data_next, Start_val);
        });

    //Binding onclick event with the previous button
    $('#prev_btn').click(
        function() {
            Start_val -= 10;
            on_search(data_prev, Start_val);
        });


});


async function on_search(url, start_val = 0) {
    //Identifies the URL and creates a specific search-url 
    //  console.log('start_val' + this.start_val);
    if (url == "default") {
        document.getElementById("next_btn").style.display = "none";
        document.getElementById("prev_btn").style.display = "none";
        var input_string = document.getElementById("search-bar").value;
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
    //  console.log(data);



    //Displaying the values, record by record, on the table 
    var status = await display_records(data, start_val);
    if (status == "no_results") {
        document.getElementById("next_btn").style.display = "none";
        return console.log("returned");
    }
    if (status == "More records") {

        //passing the url of next and previous records to the 2 global variables 
        data_next = data.next;
        data_prev = data.previous;
        Start_val = start_val;
        //   console.log(data_prev);



        var btn = document.getElementById("next_btn");
        btn.style.display = "block";
        if (data_prev != null) {
            var btn1 = document.getElementById("prev_btn");
            btn1.style.display = "block";
        }



        /*     btn.addEventListener("click", function() {
                 start_val += 10;
                 // return on_search(data.next, start_val); //Not sure if the exisiting 'on_search()' function is terminated
                 return on_next(data.next, start_val);

                 // when the new one begins
             });*/
    }
    return "null";

}



//------------------------Functions That Are Called Within on_search()------------------------------------------------------



//#1. For clearing the table

async function clear_table() {
    var Parent = document.getElementById('myTable');
    while (document.getElementById('myTable').hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    }

}


//#2. For fetching the values using the API


async function fetch_values(customURL) {
    var result = null;

    $.ajax({
        url: customURL,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data) {
            result = data;
            document.getElementById('loader').innerHTML = "";
        }
    });

    return result;
}


//#3. For displaying the records in the search results


async function display_records(data, start_val) {
    var myTable = document.getElementById('myTable');
    await add_table_headers();


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
            var cell3 = row.insertCell(2);

            // Add some text to the new cells:
            cell1.innerHTML = i + 1;
            cell2.innerHTML = data.results[i - start_val].name;
            var char_id = data.results[i - start_val].url;
            cell3.innerHTML = '<input type="button" value="More Details" onclick = "more_details(\'' + char_id + '\')"></input>';
        }
    }
}


//#4. For adding headers to the table ( couldn't find a function to just remove the body of the table, so had to add this function)
async function add_table_headers() {
    // Find a <table> element with id="myTable":
    var table = document.getElementById("myTable");

    // Create an empty <thead> element and add it to the table:
    var header = table.createTHead();

    // Create an empty <tr> element and add it to the first position of <thead>:
    var row = header.insertRow(0);

    row.insertCell(0).innerHTML = "<b>SR No.</b>";
    row.insertCell(1).innerHTML = "<b>Character-Name</b>";
    row.insertCell(2).innerHTML = "<b>HomeWorld</b>";
}


//#5. To create a next button 


async function more_records(next_url) {
    var btn = document.getElementById("next_btn");
    btn.style.display = "block";
    btn.addEventListener("click", function() {
        on_search(next_url);
        start_val = start_val + 10;
        //  console.log("start_val: " + start_val);
    });
}


//#6. To store the URL of the character in the Session and using it in the next page 


async function more_details(url) {
    // sessionStorage.setItem("ClickURL", url);
    // window.location.assign('../more-details.html');
    //   console.log("clickedURL" + url);

    var individuals = await fetch_values(url);
    document.getElementById('char_name').innerHTML = "Name: " + individuals.name;
    document.getElementById('birth_year').innerHTML = "Birth Year: " + individuals.birth_year;
    document.getElementById('mass').innerHTML = "Mass: " + individuals.mass;
    document.getElementById('skin_color').innerHTML = "Skin Color: " + individuals.skin_color;

    var homeworld = await fetch_values(individuals.homeworld);
    document.getElementById('homeworld').innerHTML = "Home World:" + homeworld.name;
}