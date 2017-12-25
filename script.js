// Code goes here

var app=angular.module("PriceComparisonSearch",['angular.filter','rzModule']);
var sortType;


// window.onload=function()
// {
// console.log("Window loaded");
// };





var MainController=function($scope,$http)
{
  



function sha256(stringToSign, secretKey) {
  var hex = CryptoJS.HmacSHA256(stringToSign, secretKey);
  return hex.toString(CryptoJS.enc.Base64);
} 

function timestamp() {
    var date = new Date();
    var y = date.getUTCFullYear().toString();
    var m = (date.getUTCMonth() + 1).toString();
    var d = date.getUTCDate().toString();
    var h = date.getUTCHours().toString();
    var min = date.getUTCMinutes().toString();
    var s = date.getUTCSeconds().toString();

    if(m.length < 2) { m = "0" + m; }
    if(d.length < 2) { d = "0" + d; }
    if(h.length < 2) { h = "0" + h; }
    if(min.length < 2) { min = "0" + min; }
    if(s.length < 2) { s = "0" + s}

    var date1 = y + "-" + m + "-" + d;
    var time = h + ":" + min + ":" + s;
    return date1 + "T" + time + "Z";
}

function getAmazonItemInfo(keyword,ItemPage) {
    var PrivateKey = "0ZBy/gl6fuYzOir9wgD+Z/wAMBUXHf2Piz4Y9lTD";
    var PublicKey = "AKIAJYZXU7INGAR7BJDA";
    var AssociateTag = "ssudan-21";

keyword=keyword.replace(/ /g,"%20");

    var parameters = [];
    parameters.push("AWSAccessKeyId=" + PublicKey);
    parameters.push("ItemPage=" + ItemPage);
    parameters.push("Keywords=" + keyword);
    parameters.push("ResponseGroup=" +"Images%2CItemAttributes%2COffers");
    parameters.push("SearchIndex=" +"All");
    parameters.push("Operation=ItemSearch");
    parameters.push("Service=AWSECommerceService");
    parameters.push("Timestamp=" + encodeURIComponent(timestamp()));
   // parameters.push("Version=2011-08-01");
parameters.push("AssociateTag=" + AssociateTag);

    parameters.sort();
    var paramString = parameters.join('&');

    var signingKey = "GET\n" + "webservices.amazon.in\n" + "/onca/xml\n" + paramString

    var signature = sha256(signingKey,PrivateKey);
        signature = encodeURIComponent(signature);

    var amazonUrl =  "https://webservices.amazon.in/onca/xml?" + paramString + "&Signature=" + signature;
   console.log(amazonUrl);
   return amazonUrl;
}


function maxmin(temp)
{
var maxprice=-1;
var minprice=10000000;
var pricearr=[];
for(var x=0;x<temp.length;x++)
{

  try
  {
pricearr[x]=parseInt(temp[x].ItemAttributes.ListPrice.Amount);
}

  catch(ex)
  {
console.log(" Price Exception");
  }

  
}
maxprice=Math.max.apply(null,pricearr);
minprice=Math.min.apply(null,pricearr);


maxprice=(maxprice/100)+1;
minprice=(minprice/100)-1;
console.log("Max Price"+maxprice);
console.log("Min Price"+minprice);

$scope.slider = {
  min: minprice,
  max: maxprice,
  options: {
    floor: minprice,
    ceil: maxprice,
    
  }
};


};


// function sortUsingNestedText(parent, childSelector, keySelector) {
//     var items = $(parent).children(childSelector).sort(function(a, b) {
//         var vA = $(keySelector, a).text();
//         console.log(vA);
//         var vB = $(keySelector, b).text();
//         return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
//     });
//     $(parent).append(items);
// }




$scope.brand=[];



var i=1,y=0,k=0;
var ItemArray=[];


$scope.search=function()
{
  
  //var hash = CryptoJS.HmacSHA256("GET webservices.amazon.in /onca/xml AWSAccessKeyId=AKIAJYZXU7INGAR7BJDA&AssociateTag=ssudan-21&Keywords=iPhone&Operation=ItemSearch&ResponseGroup=Images%2CItemAttributes%2COffers&SearchIndex=All&Service=AWSECommerceService&Timestamp=2016-11-30T09%3A55%3A42Z", "0ZBy/gl6fuYzOir9wgD+Z/wAMBUXHf2Piz4Y9lTD"); 
 //var base64 = hash.toString(CryptoJS.enc.Base64);
i=1,y=0,k=0;
ItemArray=[];
 // for(i=0;i<5;i++)
 // {
 //    ItemArray[i]=[];
 // }

//  var UserSearchKeyword=$scope.searchquery;

//  if(UserSearchKeyword!=$scope.searchquery)
//  {
//   var i=1,y=0,k=0;
// var ItemArray=[];
//  }
 // for(i=1;i<=5;i++)
 // {
 var url=getAmazonItemInfo($scope.searchquery,i);
  $http.get("https://cors-anywhere.herokuapp.com/"+url).then(jsondata,errormsg);


  
$scope.sortOrder='+MRP';
//}
// var invocation=new XMLHttpRequest();

// invocation.open('GET',url,true);
// invocation.onreadystatechange=handler;
// invocation.send();

//  $http({
//     method: 'JSONP',
//     url: url
// }).success(jsondata).error(errormsg);

   

};
var temp,newtemp;
var jsondata=function(response)
{
//console.log(response.data);

    //ItemArray[k]=[];

 // console.log(response);
var x2js = new X2JS();
//var xmlText = "<MyRoot><test>Success</test><test2><item>val1</item><item>val2</item></test2></MyRoot>";
var jsonObj = x2js.xml_str2json(response.data);



// for(var y=0;y<10;y++)
// {

// try
// {
//   jsonObj.ItemSearchResponse.Items.Item[y]["MRP"]=jsonObj.ItemSearchResponse.Items.Item[y].ItemAttributes.ListPrice.Amount;
// }

// catch(ex)
// {
//   console("caught exception");
// }
// }

//jsonObj.ItemSearchResponse.Items.Item[0]["MRP"]="999"
//var obj = JSON.parse(jsonObj.ItemSearchResponse.Items);
 temp= jsonObj.ItemSearchResponse.Items.Item;
//obj['Items'].Item[0].push({"MRP":"999"});
//jsonStr = JSON.stringify(obj);
//temp=jsonStr;
maxmin(temp);

console.log(temp);








// if(k==4)
// {
//     console.log("inside");
//    // console.log(ItemArray);
//     console.log("inside");
// }

//  var x=temp[i].MediumImage.URL;
// }
// catch(err)
// {
//   //  temp[i].push({MediumImage.URL:"Working"});
// }
 //console.log(temp);
 $scope.items= temp;

newtemp=temp;

//      if(k<4)
// {
//     k++;
// }
 //console.log(x);
//temp[i].MediumImage.URL=x.replace("_SL160_","_AC_US160_");

}



$scope.runfilter=function()
{





$scope.customfilter=function()
{
        return function (p) {
         // console.log(p.ASIN);
         for(var x1 in $scope.brand)
         {
         if(p.ItemAttributes.Brand===$scope.brand[x1])
         {
          return true;
         }

             // if($scope.brand[x1]!=undefined)
             // {
             //  var res=
             // }
            // for (var i in $scope.useMakes) {
            //     if (p.make == $scope.group[i] && $scope.useMakes[i]) {
                     
                   }

                   var count=0;
                   for(var e=0;e<$scope.brand.length;e++)
                   {
                    if($scope.brand[e]===undefined)
                    {
                    count++;
                  }
                    if(count===$scope.brand.length)
                    {
                      return true;
                    }
                   // console.log($scope.brand[e]);
                   }

// console.log($scope.brand);
// console.log($scope.brand[1]);



         //             if($scope.brand===undefined)
         // {
         //  return true;
         // }


                 
               // }
            }
        };

};
    

$scope.sortAscending=function()
{
sortType="Ascending";
 $('li.prod').sort(function(a, b) 
  { var contentA = parseInt($(a).attr('data-price')); var contentB = parseInt($(b).attr('data-price')); 
  return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0; }).appendTo($(".products"));
};

$scope.sortDecending=function()
{
sortType="Decending";
   $('li.prod').sort(function(a, b) 
  { var contentA = parseInt($(a).attr('data-price')); var contentB = parseInt($(b).attr('data-price')); 
  return (contentA > contentB) ? -1 : (contentA < contentB) ? 1 : 0; }).appendTo($(".products"));
};


// $scope.FilterByPrice=function()
// {


$scope.priceFilter=function()

   {

return function(p)
{
var price=0;
      price=parseInt(p.ItemAttributes.ListPrice.Amount)/100;
 if(parseInt($scope.slider.min)<=price && price<=parseInt($scope.slider.max))
  {
   // return 1;
  return true;
  }



}

   };

//};



//  $('li.prod').each(function(a, b) 
//   { var contentA = parseInt($(b).attr('data-price')); 
//   //var contentB = parseInt($(b).attr('data-price')); 
//   //console.log(contentA/100);
//   contentA=contentA/100;
//   if(parseInt($scope.slider.min)<contentA && contentA<parseInt($scope.slider.max))
//   {
//    // return 1;
//    $(b).appendTo($(".products"));
//   }
// //if()

//    });



$scope.LoadMore=function()
{
 console.log($scope.brand[0]);
 console.log($scope.brand[1]);
//$scope.expression="Dell";

i++;
if(i<=5)
{
 var url=getAmazonItemInfo($scope.searchquery,i);
  $http.get("https://cors-anywhere.herokuapp.com/"+url).then(morejsondata,errormsg);
}
else
{
    $scope.NoMoreItems="No more items to display";
}


};


var morejsondata=function(response)
{
var x2js = new X2JS();
//var xmlText = "<MyRoot><test>Success</test><test2><item>val1</item><item>val2</item></test2></MyRoot>";
var jsonObj = x2js.xml_str2json(response.data);
//console.log(jsonObj);
console.log(jsonObj);
  newtemp=newtemp.concat(jsonObj.ItemSearchResponse.Items.Item);

  maxmin(newtemp);
//console.log(newtemp);
 $scope.items=newtemp;
 console.log("Hello");

 //$scope.$broadcast('dataloaded');



};


//$scope.items=jsonObj.ItemSearchResponse.Items.Item;


//console.log($scope.items);
var errormsg=function()
{
  console.log("Error");
};


};



// app.directive('last', function() {
//     return {
//         link: function(scope) {
//             if(scope.$last) {
               
// if(sortType==="Ascending")
// {

//  $('li.prod').sort(function(a, b) 
//   { var contentA = parseInt($(a).attr('data-price')); var contentB = parseInt($(b).attr('data-price')); 
//   return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0; }).appendTo($(".products"));

// }
// if(sortType==="Decending")
// {

//  $('li.prod').sort(function(a, b) 
//   { var contentA = parseInt($(a).attr('data-price')); var contentB = parseInt($(b).attr('data-price')); 
//   return (contentA > contentB) ? -1 : (contentA < contentB) ? 1 : 0; }).appendTo($(".products"));

// }

//             }
//         }
//      }
// });

// app.directive('onFinishRender', function ($timeout) {
//     return {
//         restrict: 'A',
//         link: function (scope, element, attr) {
//             if (scope.$last === true) {
//                 // $timeout(function () {
//                 //     scope.$emit(attr.onFinishRender);
//                 //     console.log("Load Complete");
//                 // });
//                 console.log("Load Complete");
//             }
//         }
//     }
// });

// app.directive('collapseElem', ['$timeout', function ($timeout) {
//   return {
//     link: function ($scope, element, attrs) {
//       $scope.$on('dataloaded', function () {
//         $timeout(function () { 
         
//          console.log("Load complete");
//         }, 0, false);
//       })
//     }
//   };
// }]);


app.controller("MainController",MainController);