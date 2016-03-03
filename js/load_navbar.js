/*
 *    This file is to load the Navbar / Footer for the Ski Maps project.
 *
 *       Created: 3/3/2016 2:30PM
 *  Last Updated: 3/3/2016 2:30PM
 *
 *  MIT Licensed - do whatever you want with this code. Just don't sue me plz.
 *
 */

/* From the following URLs:
    https://learn.jquery.com/using-jquery-core/document-ready/
    https://stackoverflow.com/questions/8988855/include-another-html-file-in-a-html-file
*/
function load_navbar() {
  $( document ).ready(function() {
        console.log( "navbar ready!" );
        $("#NavBarHeader").load("html/navbar.html");
        $("#TheFooter").load("html/footer.html");
  });
}
