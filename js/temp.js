function fetch_values_temp() {
    var customURL = 'https://swapi.dev/api/people/?search=a';
    var result = null;
    $.ajax({
        url: customURL,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data) {
            //  console.log(data);
            result = data;
        }
    });
    console.log(result);
    return result;
}