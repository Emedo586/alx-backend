# `Internationalization(I18n)`

![](https://flask-babelplus.readthedocs.io/en/latest/_static/flask-babel.png)
## A BRIEF INTRODUCTION TO FLASK BABEL
Flask-Babel is an extension to Flask that adds i18n and l10n support to any Flask application with the help of babel, pytz and speaklater. It has builtin support for date formatting with timezone support as well as a very simple and friendly interface to gettext translations.

## INSTALLATION
Install the extension from PyPi:

```
$ pip install Flask-Babel
```

Please note that Flask-Babel requires Jinja >=2.5. If you are using an older version you will have to upgrade or disable the Jinja support (see configuration).
![](https://i.pinimg.com/474x/f2/c1/36/f2c1361263f42692913afcda1a4b0636.jpg)
## CONFIGURATION
To get started all you need to do is to instantiate a Babel object after configuring the application:
```
from flask import Flask
from flask_babel import Babel

app = Flask(__name__)
app.config.from_pyfile('mysettings.cfg')
babel = Babel(app)
```
