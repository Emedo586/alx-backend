#!/usr/bin/env python3
"""
Setting up Flask app
Instantiating the Babel object into app
"""
from flask import Flask, render_template, request
from flask_babel import Babel
from flask_babel import lazy_gettext as _l

app = Flask(__name__)
babel = Babel(app)

class Config(object):
    """ Setup - Babel configuration """
    LANGUAGES = ['en', 'fr']
    #Setting Default for local and Timezone
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'

#Setting up app configuration
app.config.from_object(Config)


@app.route('/', methods=['GET'], strict_slashes=False)
def index()-> str:
    """ GET /
    Return: 4-index.html
    """
    return  render_template('4-index.html')

@babel.localeselector
def get_locale() -> str:
    """ Determine best match for supported languages
     """
     # check if there is a locale parameter/query string
    if request.args.get('locale'):
        locale = request.args.get('locale')
        if locale in app.config['LANGUAGES']:
            return locale
    else:
        return request.accept_languages.best_match(app.config['LANGUAGES'])


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug = True)
