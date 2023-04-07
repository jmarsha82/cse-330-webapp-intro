
function calculate(){
    
    var first = document.getElementById("firstNumber").value;
    var second = document.getElementById("secondNumber").value;

    var operation = null;
    for(var i=0; i<operations.length; i++){
        if(operations[i].checked){
            operation = operations[i].value;         
        }
    }
    
    var output = document.getElementById("answer");
    
    if(first==="" || second==="" || operation==="") {
        output.textContent = ("All fields required!");
    }else{ 
        var answer = 0;
        var connector = "";
        var ifValid = true;
        
        switch (operation) {
            case "add":
                answer = +first + +second;
                connector = "+";
                break;
            case "subtract":
                answer = first - second;
                connector = "-";
                break;
            case "multiply":
                answer = first * second;
                connector = "*";
                break;
            case "divide":
                if (second === '0') {
                    output.textContent = "The second number cannot be zero!";
                    ifValid = false;
                } else {
                    answer = first / second;
                    connector = "/";
                    break;
                }
        }
        if(ifValid){
            output.textContent = first + connector + second + "=" + answer;
        }
    }
}

document.getElementById("firstNumber").addEventListener("change", calculate, false);
document.getElementById("secondNumber").addEventListener("change", calculate, false);

var operations = document.getElementsByName("operation");
for(var i=0; i<operations.length; i++) {
    operations[i].addEventListener("change", calculate, false);
}
