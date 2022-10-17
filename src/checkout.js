// alert('Thank you,your order placed successfully')
var cartData =  JSON.parse(localStorage.getItem ("data"))
var total = document.getElementById('total-amnt');
var address = document.getElementById('address')

address.innerHTML = `Name :`+ sessionStorage.getItem('name')+"</br>" +`Email :`+ sessionStorage.getItem('email')+"</br>" + `phone :` +  sessionStorage.getItem('phone')+"</br>"



let cartArr = [];
for(var i=0; i<cartData.length; i++) {
    let itemDetails = shopItemsData.find((x) => x.id === cartData[i]?.id);
    if(itemDetails === undefined) {
        continue;
    }

    cartArr.push({
        id: cartData[i]?.id,
        name: itemDetails?.name,
        image: itemDetails?.img,
        description: itemDetails?.desc,
        unitPrice: itemDetails?.price,
        quantity: cartData[i]?.item,
        totalPrice: parseInt(cartData[i]?.item)*parseInt(itemDetails?.price)
    });

}


console.log(cartArr);

function print_today() {
    
    var now = new Date();
    var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
    var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
    function fourdigits(number) {
      return (number < 1000) ? number + 1900 : number;
    }
    var today =  months[now.getMonth()] + " " + date + ", " + (fourdigits(now.getYear()));
    return today;
  }

  function roundNumber(number,decimals) {
    var newString;// The new rounded number
    decimals = Number(decimals);
    if (decimals < 1) {
      newString = (Math.round(number)).toString();
    } else {
      var numString = number.toString();
      if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
        numString += ".";// give it one at the end
      }
      var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
      var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
      var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
      if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
        if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
          while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
            if (d1 != ".") {
              cutoff -= 1;
              d1 = Number(numString.substring(cutoff,cutoff+1));
            } else {
              cutoff -= 1;
            }
          }
        }
        d1 += 1;
      } 
      if (d1 == 10) {
        numString = numString.substring(0, numString.lastIndexOf("."));
        var roundedNum = Number(numString) + 1;
        newString = roundedNum.toString() + '.';
      } else {
        newString = numString.substring(0,cutoff) + d1.toString();
      }
    }
    if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
      newString += ".";
    }
    var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;
    for(var i=0;i<decimals-decs;i++) newString += "0";
    //var newNumber = Number(newString);// make it a number if you like
    return newString; // Output the result to the form field (change for your purposes)
  }
  
  

$(document).ready(function() {

    $("#invoice_no").html(Math.ceil(Math.random(100000, 1000000)*1000000));
    let invoiceDate = new Date();
    $("#invoice_date").html(invoiceDate.toString().substring(0,15));

    let html = "";
    let subTotal=0, grandTotal = 0;

    cartArr.map((data, index)=>{
        subTotal += parseInt(data?.totalPrice);
        grandTotal += parseInt(data?.totalPrice);

        html += '<tr class="item-row"';
        if(index < cartArr.length-1 ) { html += 'style="border-bottom:1px solid #000"'; }
        html += '>';
        html += '<td class="text-center">'+parseInt(index+1)+'</td>';
        html += '<td class="item-name">'+data?.name+'</td>';
        html += '<td class="description">'+data?.description+'</td>';
        html += '<td class="text-center"><span class="cost">$ '+data?.unitPrice+'</span></td>';
        html += '<td class="text-center"><span class="qty">'+Number(data?.quantity)+'</span></td>';
        html += '<td class="text-center"><span class="price">'+Number(data?.totalPrice,2)+'</span></td>';
        html += '</tr>';
    });

    $("#tableData").html(html);
    $("#subtotal").html("<strong>"+subTotal+"</strong>");
    $("#total").html("<strong>$ "+parseInt(grandTotal+(grandTotal*(2.5/100)))+"</strong>");
});


localStorage.clear();


