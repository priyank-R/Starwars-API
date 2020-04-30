# Starwars-api

Homepage -> index.html 

Previously, I executed the entire task without making use of async / await functionality (named as get_inpuit.js_
This created a lot of errors such as uneven ordering of records, record overlapping, etc.

To solve this, I created another solution for the task that was executed in sync (async_get_input) 
using async / await

I tried improvising the code however, I am not able to do it after a certain extent. 
sometimes, the results show late because display_results() is not executed until all the results are fetched using
fetch_values().

This I believe is due to ajax async = false and the await calls that I have made. 
