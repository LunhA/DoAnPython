from datetime import timedelta
from flask import Flask
from flask_restful import Api 
from flask_jwt import JWT
from flask_cors import CORS

from security import authenticate, identity
from resources.user import UserRegister
from resources.item import Item, itemList

app = Flask(__name__)
CORS(app)
app.secret_key = 'Lunh'  #important
api = Api(app)

app.config['JWT_EXPIRATION_DELTA'] = timedelta(minutes=60)
app.config['JWT_AUTH_URL_RULE'] = '/login'
jwt = JWT(app, authenticate, identity)  # create end point. exp: /auth


api.add_resource(Item, '/item/<int:_id>')
api.add_resource(itemList, '/items')
api.add_resource(UserRegister, '/register')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
