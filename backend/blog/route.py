# import datetime
# from blog import app, db, bcrypt
# from .db import *
# from flask_login import login_user, current_user, logout_user, login_required
# from flask import request

# @app.route("/checkUsername", methods=['POST'])
# def checkUsername():
# 	user = User.query.filter_by(username=request.json.username).first()
# 	if user is None:
# 		return False
# 	else:
# 		return True

# # POST /api/login
# # {
# # 	"username": "foo",
# # 	"pw": "bar",
# # 	"score": 100
# # }

# @app.route("/api/login", methods=['POST'])
# def login():
# 	data = request.get_json()
# 	user = User.query.filter_by(username=data.username).first()

# 	if user:
# 		if bcrypt.check_password_hash(user.pw, data.pw):
# 			login_user(user, remember=True)
# 			if data.score < user.highScore: # low score is better
# 				user.highScore = data.score
# 				user.highScoreDate = datetime.utcnow()
# 				db.session.commit()
# 			return True
# 		else:
# 			return False
# 	else:
# 		# create a new user
# 		user = db.User(username=data.username,
# 			pw=bcrypt.generate_password_hash(data.pw).decode('utf-8'),
# 			highScore=data.score,
# 			highScoreDate=datetime.utcnow)
# 		db.session.add(user)
# 		db.session.commit()
# 		login_user(user, remember=True)
# 		return True

# @app.route("/logout")
# def logout():
# 	logout_user()