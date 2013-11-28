var proposedName = "";

window.onload = function() {
	var form = document.getElementById('setup_form');
	form.onsubmit = formSubmit;
	showSavedAccount();
}

function formSubmit() {
	var account = document.getElementById("account");		
	proposedName = account.value;
	
	var okStatus = document.getElementById("ok");
	var failStatus = document.getElementById("fail");			
	
	okStatus.style.visibility = 'hidden';
	failStatus.style.visibility = 'hidden';

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://github.com/" + proposedName, true);
	xhr.onreadystatechange = function() {
		if (xhr.status == 200) {
			localStorage["github_account"] = proposedName;						
			okStatus.style.visibility = 'visible';
			failStatus.style.visibility = 'hidden';
			showSavedAccount();
		} else {
			okStatus.style.visibility = 'hidden';
			failStatus.style.visibility = 'visible';
		}
		
	};
	xhr.send();
		
	return false;
}

function showSavedAccount() {
	var savedAccount = "https://github.com/" + localStorage['github_account'];
	if (localStorage['github_account']) {
		var currentAccount = document.getElementById("current");
		currentAccount.innerHTML = "Current saved account: <a href='" + savedAccount + "'>" + savedAccount + "</a>"
	}
}
