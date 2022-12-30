function orderNumber() {

    const confirm = document.getElementById("orderId");
    confirm.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}

orderNumber();