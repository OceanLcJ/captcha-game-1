run flask:
- activate enviroment
- mac/linux:
	> export FLASK_APP=run.py
- window:
	> set FLASK_APP=run.py
> flask run --debug
--------------------------------

create db.sql
> python3
> from blog.db import *
> with app.app_context():
	db.create_all()

- db.sql will be located in var/blog-instance
--------------------------------

install requirements:
> pip install -r requirements.txt
save requirements:
pip freeze > requirements.txt
