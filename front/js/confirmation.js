
//-----------function enables to display the order Number-----------
/**
* stock wanted element to display in a variable
* assign data gatherd for local Stoarge to he element inner HTML
* clear LocalStorage
*/
//------------------------------------------------------------------------------------
function orderNumber() {

    const confirm = document.getElementById("orderId");
    confirm.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}

orderNumber();