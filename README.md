# G8-Event-Registration-System
Before getting start with our project, please follow instructions below:

## Installation
First, clone the repo:
```shell
git clone https://github.com/ChelsyA/G8-Event-Registration-System.git
```

Please do remember to switch to your branch. Create and push your new branch
```shell
git pull
git checkout -b [name_of_your_new_branch]
git push --set-upstream origin [name_of_your_new_branch] # Push the branch on github
```

# Event Registration System Backend
```shell
cd path/to/backend/src
python manage.py migrate
python manage.py test
python manage.py runserver
```

# Install Reactjs globally
```shell
sudo npm install -g create-react-app (Mac/Linux users) or npm install -g create-react-app (for Windows users)
```

# For Event Registration System UI
```shell
cd path/to/eventui
npm install
```

# Run tests
```shell
npm test
```

# React server for local development
```shell
npm start
```

# Build for production
```shell
npm run-script build
```


# Backend App 

Django Rest API with JSON web token(JWT) authentication (Knox, djoser and django rest jwt).

## Usage

```shell
cd backend
```

```shell
pip3 install virtualenv or pip install virtualenv (for Windows users)
virtualenv env
source env/bin/activate 
```

Install all the packages from requirements.txt

```shell
pip3 or python install requirements.txt
```

Migrate

```shell
python3 or python manage.py migrate
```

Start the app
```shell
python3 or python manage.py runserver
```

Created by G8 Teams We love :coffee: :pizza:, and :dancer:
