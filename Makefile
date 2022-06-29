heroku-push:
	heroku container:push web

heroku-release:
	heroku container:release web

heroku-update: heroku-push heroku-release
