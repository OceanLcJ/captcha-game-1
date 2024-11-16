from blog import app, db, bcrypt
from blog.models import *
from flask_login import login_user, current_user, logout_user, login_required

@app.route("/checkUsername", methods=['POST'])
def checkUsername():
	user = User.query.filter_by(username=request.json.username).first()
	if user is None:
		return False
	else
		return True 

@app.route("/sigup", methods=['POST'])
def sigup():
	data = request.json
	user = User(username=data.username,
		pw=bcrypt.generate_password_hash(data.pw).decode('utf-8'),
		highScore=data.highScore,
		highScoreDate=datetime.utcnow)

	db.session.add()
	db.session.commit()

	login_user(user, remember=True)

	return

@app.route("/login", methods=['POST'])
def login():
	data = request.json
	user = User.query.filter_by(username=data.username).first()

	if user and bcrypt.check_password_hash(user.pw, data.pw):
		login_user(user, remember=form.remember.data)
		if data.score < user.highScore:
			user.highScore = score
			user.highScoreDate =datetime.utcnow
			db.session.commit()
		return True
	else
		return False

@app.route("/logout")
def logout():
	logout_user()