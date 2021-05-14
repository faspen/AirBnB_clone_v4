#!/usr/bin/python3
""" Flask """
from flask import Flask, Blueprint, jsonify, make_response
from models import storage
from api.v1.views import app_views
import os
from flask_cors import CORS
from flasgger import Swagger
from flasgger.utils import swag_from


app = Flask(__name__)
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})
app.register_blueprint(app_views, url_prefix='/api/v1')
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True


@app.teardown_appcontext
def teardown(exception):
    """Close"""
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """
    return JSON 404
    """
    return make_response(jsonify({'error': 'Not found'}), 404)

app.config['SWAGGER'] = {
    'title': 'AirBnB clone Restful API',
    'uiversion': 3
}

Swagger(app)


if __name__ == '__main__':
    my_host = os.getenv('HBNB_API_HOST')
    my_port = os.getenv('HBNB_API_PORT')
    if not my_host:
        host = '0.0.0.0'
    if not my_port:
        port = '5000'
    app.run(host=my_host, port=my_port, threaded=True)
