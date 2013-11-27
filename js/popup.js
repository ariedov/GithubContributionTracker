

var githubProgressGenerator = { 
	
	colors: [
		"#eeeeee", // less than 1 commits
		"#d6e685",
		"#8cc665", 
		"#44a340",
		"#1e6823",
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
		
		var maxCommits = this.getMaxCommitCount_(yearProgress);
		icon.style.visibility = 'visible';		
		icon.style.background = this.chooseColor_(maxCommits, commitsCount);
		commits.innerText = commitsCount;
	},	
	
	chooseColor_: function(maxCommits, commits) {
		var colors = this.colors;
		var delta = Math.ceil(maxCommits / 4);
		console.log("Max: " + maxCommits + " delta: " + delta);		
		
		if (commits < 1) {
			return colors[0];
		} else if (commits <= maxCommits - 3 * delta) {
			return colors[1];
		} else if (commits <= maxCommits - 2 * delta) {
			return colors[2];
		} else if (commits <= maxCommits - delta) {
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
	
	getMaxCommitCount_: function(commitHistory) {
		var maxCommitCount = commitHistory[0][1];
		var observerableCommits = commitHistory.length - 1;
		for (var i = observerableCommits; i > observerableCommits - 14; i--) {
			if (maxCommitCount < commitHistory[i][1]) {
				maxCommitCount = commitHistory[i][1];
			}
		}
		
		return maxCommitCount;
	}
}

document.addEventListener('DOMContentLoaded', function () {
  githubProgressGenerator.requestProgress();
});
