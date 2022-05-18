import sqlite3
from flask_restful import Resource, reqparse
from models.user import UserModel

class UserRegister(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument(
        "username",
        type=str,
        required=True,
        help="This field cannot be blanked"
    )
    parser.add_argument(
        "password",
        type=str,
        required=True,
        help="This field cannot be blanked"
    )

    def post(self):
        data = UserRegister.parser.parse_args()

        if UserModel.findByUsername(data['username']):
            return {'massage': "A username already exists!"}, 400

        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = "INSERT INTO users VALUES (NULL, ?, ?)"
        cursor.execute(query, (data['username'], data['password']))

        connection.commit()
        connection.close()

        return {"messgae": "User created successfully!"}, 201