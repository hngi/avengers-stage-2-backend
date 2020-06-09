# avengers-stage-2-backend
This project is a dockerized micro-service for authentication written in Django as a project by a group from #team-avengers in stage 2 of HNGi7

## Update: Pull requests will be accepted now.

## Not familiar git? Do this

1. Fork the repo by clicking on the **Fork** button at the top right corner
1. Go to your Terminal(Linux and Mac users), Git Bash(Windows), Termux(Android) and `cd` to the directory you'd like to work from. If you're using Termux, do `termux-setup-storage` and then `cd storage/downloads` and work from there.
1. Run `git clone git@github.com:Lord-sarcastic/avengers-stage-2-backend.git` to clone the repo on your machine.
1. Run `cd avengers-stage-2-backend` to enter into the cloned repo.
1. Run `git remote add upstream git@github.com:Lord-sarcastic/avengers-stage-2-backend.git` to create an alias for the repository
1. Go to your forked repository, there is a **clone or download** button, click on it and copy the url displayed.
1. Go back to your terminal and add an alias for your repo by running `git remote add task3 <paste the url here>`, without the angled brackets. You can replace **task3** with an alias of your choice, just make sure you remember it.
1. Run `git checkout python-branch` to ensure you're in the correct branch.
1. Make your changes to the file, make your contributions and smile a lot while doing that. We don't want angry code in the repo.
1. Run `git add .` to stage all your changes to be committed. Do not spill anything on your PC at this point.
1. Run `git commit -m "<your hng username>:<Bug||Chore||Feature>: <Your commit message>"`
1. Run `git pull --rebase upstream python-branch` to apply possible changes that might have happened on the online repo while you were making your own changes.
1. Run `git push task3 python-branch`. Remember to replace the alias if you changed it.
1. Visit the URL of your forked repo. You'll see a button **Compare and pull request**. Click on it, type the appropriate messages and then make the pull request.
1. Take a nap, you earned it no matter how little your change.

## To contribute:

* Ensure you do not edit the .gitignore file for any reason. 
* The **authentify** app is the app that does all the job of extending the User model. No other app is to be created. Raise an issue if you thnk otherwise
* Whatever extension to the User model is done through a database relationship and not by OOP inheritance.
* Ensure code works before pushing. Don't push breaking code.
* Create branch for your own change with format: python/<your hng username>. Do not make pushes to the **python-branch** branch

#### Note: This README will be updated as often as possible to ensure we know how to set things up

## To set it all up for the first time.
* Fork the repo and then clone to your machine.
* cd into the project directory with `cd Authenticated`
* Install **pipenv** (We're using `pipenv` as our virtual environment)using `pip install pipenv`.
* Enable the virtual environment by typing `pipenv shell`.
* Install dependencies with `pipenv sync`

## To get Django part up and running if you just completed the above section
I am assuming you're in the outer **Authenticated** directory and you've enabled the virtual environment.
1. Proceed to the Django project directory by: `cd Authenticated`
1. Run `python manage.py migrate` to apply database changes
1. Run `python manage.py createsuperuser` to be able to access Django admin.(This command should be run only once throughout the lifetime of this project)
1. Run `gunicorn Authenticated.wsgi:application --bind 0.0.0.0:8000` to start the server. We're actually using Gunicorn instead of the default Python server(the `python manage.py runserver` version). If you use Gunicorn, static files won't load. When you visit the admin, you'll see pure HTML and no CSS. Use the default Django server to fix this.
1. Visit **localhost:8000/admin** or **127.0.0.1:8000/admin** to visit the admin panel.

## If you're resuming work on the project.
1. Ensure you're in the outer **Authenticated** directory by typing `pwd`. It should display `Authenticated, Pipfile Pipfile.lock` skip step 2. If you're seeing `Authenticated, README.md`, you're not yet there go to step 2.
1. Enter into the directory by `cd Authenticated`
1. Enable the virtual environment by typing `pipenv shell`.
1. Enter into the Django project directory with `cd Authenticated`
1. Go to step 2 of the previous heading (To get Django part up and running if you just completed the above section)
