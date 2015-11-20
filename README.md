# bookcat

	cp -r app/ website
	cd website/
	git init
	git add *
	git commit -s -m "init commit"
	git remote add origin git@github.com:insekkei/bookcat.git 
	git push origin -f HEAD:gh-pages
