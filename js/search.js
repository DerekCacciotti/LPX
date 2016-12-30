    Parse.initialize("bmobCoB17mgSf7S9J6ZntiQGq5NEm2eIyHroyP9t", "Wut80Nd7rKFVvHEvT7K9jQMCV2HIO67OEH0pWaBe");
      Parse.serverURL = 'https://rayfoodapp.herokuapp.com/parse'
      // Paginatation
      var page = 0
      var resultlimit = 50

// this array will hold the id og the items ordered
var itemsarray =[];
var Result = new Object();
var currentuser = Parse.User.current();
      window.onload = getalldata()
      // this function gets all data is called on load
      function getalldata()
      {
        CheckforFurfilledOrders();
        checkCookie()
        var GameScore = Parse.Object.extend("FoodSourceParse");
      var query = new Parse.Query(GameScore);
      query.descending("ITEM")
      query.limit(resultlimit)
      query.skip(page * resultlimit)
      query.find({
          success: function(results) {
            console.log(results.length)
             for (var i = 0; i < results.length; i++) {
                 var object = results[i];
                     (function($) {
                       $('#results-table').append('<tr><td>' +  object.get('ITEM')  + '</td><td>' + object.get('BRAND') + '</td><td>' + object.get("PACK") + '</td><td>'  + object.get("SIZE") + '</td><td>');
                     })(jQuery);
             }
             // click event
             $("tr").click(function(){
               //alert("click")
               var index = $(this).index();
               //alert(index)
               var dataarray = $(this).children("td").map(function(){
                 return $(this).text();
               }).get();
               console.log(dataarray[0])
               console.log(dataarray[1])
               console.log(dataarray)
               //alert($.trim(dataarray[0]));
               //itemsarray.push($.trim(dataarray[0]));

               Result.item = dataarray[0],
               Result.brand = dataarray[1],
               Result.pack = dataarray[2],
               Result.size = dataarray[3]
               itemsarray.push(Result)
               console.log(itemsarray);
              LoadProduct();
             })
          },
          error: function(error) {
              alert("Error: " + error.code + " " + error.message);
          }
      });
      }
      function NextPage()
      {
        page++
        getalldata()
        //cleartable();
        // make if the user is a page larger than 1
        if(page != 1)
        {
          var buttondiv = document.getElementById("bottomarea")
          var lastpageButton = document.createElement("input")
          lastpageButton.className = "btn btn-link"
          lastpageButton.type = "button"
          lastpageButton.id = "lastpage"
          lastpageButton.value = "Previous"
          buttondiv.appendChild(lastpageButton)
        }
       if(page == 1)
        {
            $("#lastapage").remove();
        }
        $("#lastpage").click(function() {
          console.log("previous was tapped" + page)
          page--
          getalldata();
        })
        console.log("you are now viewing page " + page)
      }
      function checkCookie() {
    console.log("the current cookie is " + document.cookie)
    if (currentuser == null)
    {
      currentuser = document.cookie
      console.log(currentuser)
    }
    else {
      console.log("user passed")
      console.log(currentuser)
    }
 }
 function CheckforFurfilledOrders()
 {
   var order = Parse.Object.extend("furfilledorders")
   var query = new Parse.Query(order)
   query.equalTo("orderfor", currentuser.get("username"))
   query.find({
  success: function(results) {
  toastr.success("Some sellers got back to you", results.length + " new orders ")
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
 }
function findFood()
{
cleartable()
  var client = algoliasearch("1ZC34ODN95", '5ff9467977022bc22144e1f98657ecf3');
    var index = client.initIndex('Foodsource');
    index.search(document.getElementById("searchbox").value, function searchDone(err, content) {
      console.log(content.hits)
      for(var i = 0; i < content.hits.length; i++)
      {
        console.log(content.hits[i].ITEM)
        var database = Parse.Object.extend("FoodSourceParse");
var query = new Parse.Query(database);
query.equalTo("ITEM", content.hits[i].ITEM);
query.descending("ITEM")
query.find({
  success: function(results) {
    console.log("Successfully retrieved " + results.length);
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) {
      var object = results[i];
      $('#results-table').append('<tr><td>' +  object.get('ITEM')  + '</td><td>' + object.get('BRAND') + '</td><td>' + object.get("PACK") + '</td><td>'  + object.get("SIZE") + '</td><td>');
    }
    $("tr").click(function(){
      //alert("click")
      var index = $(this).index();
      //alert(index)
      var dataarray = $(this).children("td").map(function(){
        return $(this).text();
      }).get();
      Result.item = dataarray[0]
      Result.brand = dataarray[1]
      Result.pack = dataarray[2]
      Result.size = dataarray[3]


      console.log(itemsarray);
      LoadProduct();
    });
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
      }
    });
/*  cleartable();
  var searchtextupper = document.getElementById("searchbox").value
  var GameScore = Parse.Object.extend("FoodSourceParse");
var query = new Parse.Query(GameScore);
query.equalTo("search", searchtextupper );
query.find({
    success: function(results) {
      console.log(results.length)
       for (var i = 0; i < results.length; i++) {
           var object = results[i];
               (function($) {
           $('#results-table').append('<tr><td>' +  object.get('ITEM')  + '</td><td>' + object.get('BRAND') + '</td><td>' + object.get("PACK") + '</td><td>'  + object.get("SIZE"));
               })(jQuery);
       }
       $("tr").click(function(){
         alert("click")
         var index = $(this).index();
         //alert(index)
         var dataarray = $(this).children("td").map(function(){
           return $(this).text();
         }).get();
         //alert($.trim(dataarray[0]));
         itemsarray.push($.trim(dataarray[0]));
         console.log(itemsarray);
         LoadProduct();
       })
    },
    error: function(error) {
        alert("Error: " + error.code + " " + error.message);
    }
});
*/
}
function cleartable()
{
  var table = document.getElementById("results-table");
  while (table.rows.length > 0) {
    table.deleteRow(0);
    //getalldata();
  }
  table.innerHTML = "<tr>" + " <th>Item</th>" + "<th>Brand</th>" + "<th>Pack</th>" + "<th>Size</th>" + "</tr>"
}
function LoadProduct()
{
  // saving current array
  window.localStorage.setItem("selectedItem", JSON.stringify(Result));
  console.log(Result);
  window.location.href = "productpage.html"
}
