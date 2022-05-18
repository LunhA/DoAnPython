ĐỒ ÁN WEB BÁN HÀNG: NHÓM 6


This project based in Python 3.10.4 with following libs:
backend python: 
pip install Flask
pip install Flask_Cors
pip install Werkzeug
pip install Flask-JWT
pip install Flask_RESTful

frontend Vue_CLI with Nodejs and npm:
npm install axios

err: from python 3.6 or newer, jwt has a bug: "from collections import Mapping"

solution: open init file on terminal and change "from collections import Mapping" line into "from collections.abc import Mapping".

