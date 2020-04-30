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
    console.log(result);
    return result;
}


$(document).ready(async function() {
    var url = sessionStorage.getItem("ClickURL");
    console.log("clickedURL" + url);
    var individuals = await fetch_values(url);
    document.getElementById('char_name').innerHTML = individuals.name;
    document.getElementById('birth_year').innerHTML = individuals.birth_year;
    document.getElementById('mass').innerHTML = individuals.mass;
    document.getElementById('skin_color').innerHTML = individuals.skin_color;

    var homeworld = await fetch_values(individuals.homeworld);
    document.getElementById('homeworld').innerHTML = homeworld.name;

});