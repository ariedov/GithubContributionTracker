var githubProgressGenerator = { 

	colors: [
		"#eeeeee", // less than 1 commits
		"#d6e685", // less than 3 commits 
		"#8cc665", // less than 5 commits
		"#44a340", // less than 7 commits
		"#1e6823", // less than 9 commits
	],

	getGithubProgress_: 'https://github.com/users/ariedov/' +
      'contributions_calendar_data?_=' + 0,
		
    requestProgress: function() {
		var req = new XMLHttpRequest();
		req.open("GET", this.getGithubProgress_, true);		
		req.onload = this.showProgress_.bind(this);
		req.send(null);
	},

	showProgress_: function (e) {		
		var p = document.getElementById('activity_streak');			
		var icon = document.getElementById('activity_icon');
		
		var yearProgress = JSON.parse(e.target.responseText);
		console.log(yearProgress);
		
		var currentProgress = yearProgress.pop();
		var data = currentProgress[0];
		var commits = currentProgress[1];
		
		p.innerText = data;
		p.style.visibility = 'visible';
		icon.style.visibility = 'visible';
		icon.style.background = this.chooseColor_(commits);
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
	}
}

document.addEventListener('DOMContentLoaded', function () {
  githubProgressGenerator.requestProgress();
});
