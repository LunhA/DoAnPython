import sqlite3

from utils.commons import SORT_BY

class ItemModel:
    def __init__(self, _id, name, price, type, brand, descriptions, img):
        self.id = _id
        self.name = name
        self.price = price
        self.type = type
        self.brand = brand
        self.descriptions = descriptions
        self.img = img

    def json(self):
        return {'id': self.id, 'name': self.name, 'price': self.price, 'type': self.type, 'brand': self.brand, 'descriptions': self.descriptions, 'img': self.img}

    @classmethod
    def findById(cls, _id):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()

        query = f'SELECT * FROM items WHERE id = {_id}'
        result = cursor.execute(query)
        row = result.fetchone()
        connection.close()

        if row: 
            return cls(*row)
        
    def sortQuery(sortBy, query):
            if sortBy == SORT_BY.NEWEST:
                query += f' ORDER BY id ASC '
                return query
            elif sortBy == SORT_BY.OLDEST:
                query += f' ORDER BY id DESC '
                return query
            elif sortBy == SORT_BY.PRICE_HIGH:
                query += f' ORDER BY price DESC '
                return query
            else:
                query += f' ORDER BY price ASC '
                return query




