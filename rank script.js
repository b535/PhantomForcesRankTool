function rankXPRequirement(initial, target, leftovers){
	var requirement = 0;
	if(target == 0){
		return "Give a target";
	}else{
		for(var i = 0; i <= target; i++){
			requirement += i*1000; //calculates and accumulates target rank's xp and adds it
		}
		for(var j = 0; j <= initial; j++){
			requirement -= j*1000; //subtracts already existing rank
		}
		requirement -= leftovers; //subtracts the rank xp earned
		return requirement;	
	}
}

function XPRankRequirement(required, rankreturn){
	var testAccumulation = 0; //used to count up until the rank
	var testGrabber = 0; //used to "grab" the correct value
	var testLeftovers = 0; //leftovers from testGrabber
	if(required == 0){
		return "Give a target";
	}else{
		for(var i = 0; i < 10000000; i++){
			testAccumulation += i*1000;
			if(testAccumulation <= required && testAccumulation+i*1000 > required){
				testGrabber = testAccumulation;
				testLeftovers = required - testAccumulation;
				console.log(rankreturn);
				if(rankreturn == "true"){
					return i;
				}else{
					return[i, testGrabber, testLeftovers];
				}
			}
		}
	}
}

function gui(){
	var start;
	start = prompt("For a rank's required amount of xp, type in 1. For an xp's amount of ranks needed, type in 2.", "1,2");
	if(start == "1"){//rankXPRequirement 
		var initial = Number(prompt("Enter in your current rank (optional)"));
		var target = Number(prompt("Enter in your target rank"));
		var leftovers = Number(prompt("Enter in your current rank's xp earnings (optional)"));
		if(initial > target){
			alert("You can't unearn xp, silly!");
		}else if(leftovers > (initial+1)*1000){
			alert("You already ranked up; stop having a mid-rank crisis.");
		}else{
			var required = rankXPRequirement(initial, target, leftovers);
			alert("Your required amount of xp for your desired rank is " + required + ".");
			var store1 = window.confirm("Do you want to store this value?");
			if(store1 == true){
				storageValue(required);
			}
		}
	}else if(start == "2"){//XPRankRequirement
		var required1 = prompt("Enter in the amount of xp you want to check the rank of:", "2415000");
		var amount = XPRankRequirement(Number(required1));
		alert("The rank, rank xp, and leftovers are shown respectively: " + amount + ".");
		var store2 = window.confirm("Do you want to store this value?");
		if(store2 == true){
			storageValue(XPRankRequirement(required1, "true"));
		}
	}else{
		alert("congratulations you played yourself");
	}
}

function storageValue(value){
	if (typeof(Storage) !== "undefined") {
		var toggle = prompt("What do you want to do with this value?", "set, retrieve, remove");
		if(toggle == "set"){
			for(var i = 1; i < 100; i++){
				if(localStorage.getItem(i) == null){//indicates if localStorage(i) is empty
					localStorage.setItem(i, value);
					break;
				}
			}
		}else if(toggle == "retrieve"){
			for(var j = 0; j < 100; j++){
				if(localStorage.getItem(j) == value){
					alert("Key: "+j+", Value: "+value);
					break;
				}
			}
		}else if(toggle == "remove"){
			for(var k = 0; k < 50; k++){
				if(typeof value == "undefined"){
					value = prompt("Enter in a value.")
				}
				if(localStorage.getItem(k) == value){
					var confirm = window.confirm("Do you want to delete this value?");
					if(confirm == true){
						localStorage.removeItem(k);
						break;
					}
					break;
				}
			}
		}
	} else {
		return "Unsupported feature."
	}
}