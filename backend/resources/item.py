from asyncio.windows_events import NULL
import sqlite3
from flask_restful import Resource, reqparse, request
from flask_jwt import jwt_required
from models.item import ItemModel


class Item(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        'price',
        type=float,
        required=True,
        help="This field cannot be blank!"
    )

    def get(self, _id):
        item = ItemModel.findById(_id)
        if item:
            return item.json()
        return {'message': 'Item not found!'}, 404


class itemList(Resource):
    def post(self):
        pageIndex = request.json['pageIndex']
        pageSize = request.json['pageSize']
        sortBy = request.json['sortBy']
        searchKey = request.json['searchKey']
        minPrice = request.json['minPrice']
        maxPrice = request.json['maxPrice']
        filterBy = request.json['filterBy']
        selectedType = filterBy.get('type')
        checkedBrands = filterBy.get('checkedBrands')
        
        
        startIndex = int(pageIndex) * int(pageSize)

        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = 'SELECT * FROM items WHERE'

        if checkedBrands is not None:
            checkedBrandStrings = ','.join(
            map((lambda brand: "'" + brand + "'"), checkedBrands))

            query += f' brand in ({checkedBrandStrings}) '

        if selectedType == "":
            pass
        else:
            typeString = "'" + selectedType + "'"
            query += f' AND type in ({typeString}) '

        if searchKey == "":
            pass
        else:
            searchKeyString = "'%" + searchKey + "%'"
            query += f' AND name LIKE {searchKeyString} '

        query += f' AND price BETWEEN {minPrice} AND {maxPrice} '
        query = ItemModel.sortQuery(sortBy, query)
        query += f' LIMIT {pageSize} OFFSET {startIndex}'

        result = cursor.execute(query)
        items = []
        for row in result:
            items.append({'id': row[0], 'name': row[1], 'price': row[2], 'type': row[3],
                         'brand': row[4], 'descriptions': row[5], 'img': row[6]})

        connection.commit()
        connection.close()

        return {'items': items}
