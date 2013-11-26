window.onload = function() {
	var form = document.getElementById('setup_form');
	form.onsubmit = formSubmit;
}

function formSubmit() {
	var account = document.getElementById("account");	
	localStorage["github_account"] = account.value;
	
	var status = document.getElementById("status");
	status.style.visibility = 'visible';
	status.innerHTML = "Options Saved.";
	
	return false;
}