let elements = document.getElementsByClassName("numberValue");

let displayValue = function() {
    let attribute = this.getAttribute("value");
    document.getElementById("result").innerHTML = attribute;
};

for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', displayValue, false);
}