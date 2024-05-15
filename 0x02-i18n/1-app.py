#!/usr/bin/env python3
"""
Setting up Flask app
Instantiating the Babel object into app
"""
from flask import Flask, render_template
from flask_babel import Babel

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


@app.route('/')
def index():
    return  render_template('1-index.html')


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug = True)
