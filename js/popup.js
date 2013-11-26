

var githubProgressGenerator = { 
	
	colors: [
		"#eeeeee", // less than 1 commits
		"#d6e685", // less than 3 commits 
		"#8cc665", // less than 5 commits
		"#44a340", // less than 7 commits
		"#1e6823", // less than 9 commits
	],
		
    requestProgress: function() {
		var req = new XMLHttpRequest();
		req.open("GET", this.getGithubLink_(), true);		
		req.onload = this.showProgress_.bind(this);
		req.send(null);
	},

	showProgress_: function (e) {		
		var icon = document.getElementById('activity_icon');
		var commits = document.getElementById('commits_count');
		
		var yearProgress = JSON.parse(e.target.responseText);
		console.log(yearProgress);
		
		var currentProgress = yearProgress.pop();
		var data = currentProgress[0];
		var commitsCount = currentProgress[1];
		
		icon.style.visibility = 'visible';
		icon.style.background = this.chooseColor_(commitsCount);
		commits.innerText = commitsCount;
	},	
	
	chooseColor_: function(commits) {
		var colors = this.colors;
		if (commits < 1) {
			return colors[0];
		} else if (commits <= 3) {
			return colors[1];
		} else if (commits <= 5) {
			return colors[2];
		} else if (commits <= 7) {
			return colors[3];
		} else {
			return colors[4];
		}
	},
	
	getGithubLink_: function() { 
		var link = 
			'https://github.com/users/' + 
			this.getSavedAccount_() + 
			'/' +
			'contributions_calendar_data?_=' + 
			new Date().getTime();
		return  link;

	},
	
	getSavedAccount_ : function() {
		var savedAccount = localStorage["github_account"];
		if (!savedAccount) {
			savedAccount = "ariedov";
		}
		return savedAccount;
	},
}

document.addEventListener('DOMContentLoaded', function () {
  githubProgressGenerator.requestProgress();
});
