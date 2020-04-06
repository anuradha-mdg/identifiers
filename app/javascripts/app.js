var accounts;
var account;
var strData;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};
function setStatus1(message) {
  var status = document.getElementById("status1");
  status.innerHTML = message;
};
function setStatus3(message) {
  var status = document.getElementById("account");
  status.innerHTML = message;
};

function refreshBalance() {
  var meta = MetaCoin.deployed();

  meta.getBalance.call(account, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function check() {
	var strData1 = StoreData.deployed();
	
	//var response = true;
	
	setStatus("Entered the check block");
	
	var tempAccount = document.getElementById("account1").value;
	
	//var tempAccount = '0xa23a2c069fef74ef212e2f8f300aedae4c8f8abb';
	
	var tempString = document.getElementById("identifier1").value;
	
	setStatus("Verifying. Please wait.."+tempAccount);
	
  strData1.checkIdentifier(tempString,tempAccount).then(function(response) {
	  console.log("success!",response);
	  
	  var temp = response;
	  
	  //setStatus3("Account is "+account);
	  
	   //setStatus1("outside if and response is "+tempString+" and account is "+tempAccount);
	  
	  if(temp == true)
	  {
	  	setStatus("Identifier verified successfully.");
	  }
	  else
	  {
	  	setStatus("Identifier not found.");
	  }
	 
	  
  },function(error){
	  console.log("Error!",error);
	   setStatus("error"+response);
  }
);
  
	
};



// function check3() {
// 	var strData2 = StoreData.deployed();
//
// 	//var response = true;
//
// 	var account2 = '0xa23a2c069fef74ef212e2f8f300aedae4c8f8abb';
//
//   strData2.checkIdentifier('hello12345',account2).then(function(response) {
// 	  console.log("success!",response);
//
// 	  var temp = response;
//
// 	  setStatus3("Account is "+account);
//
// 	   setStatus1("outside if and response is "+response+" and temp is "+temp);
//
// 	  if(temp == true)
// 	  {
// 	  	setStatus("Good! You have license.");
// 	  }
// 	  else
// 	  {
// 	  	setStatus("You need to buy license.");
// 	  }
//
//
//   },function(error){
// 	  console.log("Error!",error);
// 	   setStatus("error"+response);
//   }
// );
//
//
// };

// function buy() {
// 	setStatus("Buying please wait.");
// 	//var strData = StoreData.deployed();
//
// 	setStatus3("Account is "+account);
//
// 	//strData.store('hello123',0x8e3772675ae80ebb2719b64502a2db74e508fea5);
//
//     strData.store('hello12345',account,{from: account}).then(function(response) {
//   	  console.log("success!",response);
//   	   setStatus("Successfully bought "+response);
//
//     },function(error){
//   	  console.log("Error!",error);
//   	   setStatus("error"+response);
//     }
//   );
// };



// function check1() {
// 	//var strData = StoreData.deployed();
//
// 	//var response = true;
//
// 	setStatus("Entered the check block");
//
// 	var tempAccount = document.getElementById("account2").value.toString();
//
// 	//var tempAccount = '0xa23a2c069fef74ef212e2f8f300aedae4c8f8abb';
//
// 	var tempString = document.getElementById("identifier2").value;
//
// 	setStatus("Verifying. Please wait.."+tempAccount);
//
//   strData.checkIdentifier(tempString,tempAccount).then(function(response) {
// 	  console.log("success!",response);
//
// 	  var temp = response;
//
// 	  //setStatus3("Account is "+account);
//
// 	   setStatus1("outside if and response is "+tempString+" and account is "+tempAccount);
//
// 	  if(temp == true)
// 	  {
// 	  	setStatus("Identifier verified successfully.");
// 	  }
// 	  else
// 	  {
// 	  	setStatus("Identifier not found.");
// 	  }
//
//
//   },function(error){
// 	  console.log("Error!",error);
// 	   setStatus("error"+response);
//   }
// );
//
//
// };



function store() {
	setStatus("Buying please wait.");
	//var strData = StoreData.deployed();
	
	setStatus("Entered the check block");
	
	var tempAccount = document.getElementById("account2").value;
	
	var tempString = document.getElementById("identifier2").value;
	
	setStatus("Storing. Please wait.."+tempAccount);
	
	//strData.store(tempString,0x8e3772675ae80ebb2719b64502a2db74e508fea5);
	
    strData.store(tempString,tempAccount,{from: account}).then(function(response) {
  	  console.log("success!",response);
  	   setStatus("Successfully stored "+tempString);
	   //check1();

    },function(error){
  	  console.log("Error!",error);
  	   setStatus("error"+response);
    }
  );
};

function sendCoin() {
  var meta = MetaCoin.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {from: account}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];
	strData = StoreData.deployed();

   // refreshBalance();
  });
}
