
//RID ALL NUMBERS AFTER DECIMAL POINT
//.........................................
    function ridNumbersAfterDecimal (numbers){
        var ogNumber = numbers;
        ogNumber = ogNumber.toString();
        var newNumber ="";

        //for loop through original number
        //once it hits a decimal point, break

        for(var i = 0; i < ogNumber.length; i++){ 
            if(ogNumber[i] === "."){
                break;
            }
            else{
            newNumber = newNumber + ogNumber[i];// so 1 + 6 would be 16
            }
        }

        return newNumber
    }

//RID FIRST 0 OF A STRING
//.........................................
    function ridFirstZero(firstChar){
        if (typeof firstChar == "number"){
            firstChar = firstChar.toString();
        }
        if (firstChar[0] === "0"){
            var returnMe = "";
            for (var i = 0; i < firstChar.length; i++){
                if (i >= 1) {
                    returnMe = returnMe + firstChar[i]
                }
            }
            return returnMe; 
        }
    }

//ADD ARRAY OF NUMEBRS TOGETHER AND RETURN THE TOTAL (if array is string return 0)
//.........................................
    function sum (numbers) {

        var isNumber = "";

        for (var i = 0; i < numbers.length; i++){
            if (typeof numbers[i] === "string"){
                isNumber = 0;
            }
            else{
                isNumber = "yes";
            }
        }

        switch (isNumber){
            case 0: 
                return isNumber;
                break;
        
            case "yes": 
                function addNumbers (total, add){
                    return total + add;
                }
                return numbers.reduce(addNumbers);   
                break; 
        }

        if (numbers.length < 1){
            return 0;
        }
    }


