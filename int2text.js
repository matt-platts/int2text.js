/* 
 * int2text.js
 * Turn a numeric input into it's textual equivilent
*/

window.intToText = function () {

	var units = Array ("","one","two","three","four","five","six","seven","eight","nine");
	var teens = Array("ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen");
	var tens = Array("","ten","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety");
	
	var bigUnits = Array("thousand","","","million","","","billion","","","trillion","","","quadrillion","","","quintillion","","","sextillion","","","septillion","","","octillion","","","nonillion","","","decillion","","","undecillion","","","duodecillion","","","tredecillion","","","quattuordecillion","","","quindecillion","","","sexdecillion","","","septendecillion","","","octodecillion","","","novemdecillion","","","vigintillion","","","unvigintillion","","","dovigintillion","","","trevigintillion","","","quattuorvigintillion","","","quinvigintillion","","","sexvigintillion","","","septenvigintillion","","","octovigintillion","","","novemvigintillion","","","trigintillion","","","untrigintillion","","","dotrigintillion"); 
	// below array to replace bigUnits below - need to fix the code to stop skipping blank entries and index properly
	var bigUnits2 = Array("thousand","million","billion","trillion","quadrillion","quintillion","sextillion","septillion","octillion","nonillion","decillion","undecillion","duodecillion","tredecillion","quattuordecillion","quindecillion","sexdecillion","septendecillion","octodecillion","novemdecillion","vigintillion","unvigintillion","dovigintillion","trevigintillion","quattuorvigintillion","quinvigintillion","sexvigintillion","septenvigintillion","octovigintillion","novemvigintillion","trigintillion","untrigintillion","dotrigintillion"); 

	var outputText = '';
	var numberInput = document.getElementById("numberInput").value.replace(/,/g,""); 
	var minus; 
	var re =/^\d+$/;
	if (!numberInput.match(re)){
		    document.getElementById("result").innerHTML = "Input is not a valid integer"; 
		return;
	}

	if (numberInput=="0"){ outputText += "Zero"; } 

	var digits = numberInput.toString().split('');
	if (digits[0]=="-"){ digits.shift(); outputText = "minus "; } 
	var len = digits.length; 
	if (len > 102){
		document.getElementById("result").innerHTML = "Number is too large"; 
		return;
	}

	for (i=0;i<digits.length;i++){
		if ((len-i)%3==0){ 
			if (units[digits[i]]){ 
				outputText += units[digits[i]] + " ";
				outputText += " hundred "; 
			}
			printAnd=0;
			if (
				((digits[i+1]>0 || digits[i+2]>0) && digits[i] != 0)
				|| 
				(digits[i] == 0 && i < len-4 && i > len-6)

			)

			{ printAnd=1;}

			//outputText += "[" + i + "," + parseInt(len) + "," + parseInt(parseInt(len)-4) + " - " + digits[i] + "]";
			//outputText += "(" + digits[i+1] + "," + digits[i+2] + " or " + digits[i] + "," + digits[i-1] + ")";

			if (printAnd){
				outputText += " and ";
			}

		} else if ((len-i)%3==1){

			if (i == len-1 && digits[i] != 0 && digits[i-1] == 0){ 
				var re = /(, |and ) +?$/;
				outputText = outputText.replace(re,"");
				var re = /,  $/;
				outputText = outputText.replace(re,"");
				outputText += " and ";
			}
			outputText += units[digits[i]];
			printUnits=0;
			if (digits[i]>0 || digits[i-1]>0 || digits[i-2]>0){printUnits=1;}
			if (((len-i)-4>=0) && printUnits){

				 outputText += " " + bigUnits[(len-i)-4];
				 outputText += ", ";
			}

		} else if ((len-i)%3==2){

			if (i == len-2 && digits[i] != 0 && digits[i-1] == 0){
				var re = /(, |and ) +?$/;
				outputText = outputText.replace(re,"");
				outputText += " and ";
			}
			if (digits[i]==1){
				outputText += teens[digits[i+1]]; 
				if (((len-i)-5>=0)){
					outputText += " " + bigUnits[(len-i)-5] + ", ";
				}
				i++;
			} else {
				outputText += tens[digits[i]] + " ";
			}
		}
	}


	var re = /, +?$/;
	outputText = outputText.replace(re,"");
	
    if (outputText.trim()=="ten dotrigintillion"){ outputText = "One googol";}
    document.getElementById("result").innerHTML = outputText.charAt(0).toUpperCase() + outputText.slice(1);
}
