from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_login import UserMixin
from datetime import datetime
from flask_login import login_user, logout_user, login_required
from flask import request

# =============
# > APPLICATION
# =============

app = Flask(__name__)
app.config['SECRET_KEY'] = 'c3a08d7bb2f3742c45a03ae26f26f870'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
db = SQLAlchemy(app)

bcrypt = Bcrypt(app)

login_manager = LoginManager(app)
login_manager.init_app(app)

app.app_context().push()

# ==========
# > DATABASE
# ==========

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    userID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(15))
    pw = db.Column(db.String(60), nullable=False)
    dateCreated = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    highScore = db.Column(db.Integer)
    highScoreDate = db.Column(db.DateTime)

    def HS_min(self):
        return str(int(self.highScore/60))

    def HS_sec(self):
        return str(self.highScore%60)

    def __repr__(self):
        return f"{self.username} {HS_min(self)}:{HS_sec(self)} at {self.highScoreDate}"

    def get_id(self):
        return str(self.userID)


# ========
# > ROUTES
# ========

@login_manager.user_loader
def load_user(user_id):
    # Convert string id to int since Flask-Login passes user_id as string
    return User.query.get(int(user_id))

@login_manager.unauthorized_handler
def unauthorized():
    return jsonify({"message": "Authentication required"}), 403

# POST /api/login
# {
# 	"username": "foo",
# 	"pw": "bar",
# 	"score": 100
# }

@app.route("/api/leaderboard", methods=['GET'])
@login_required
def leaderboard():
  users = User.query.order_by(User.highScore.asc()).all()
  return jsonify([{
    'username': user.username,
    'highScoreMin': HS_min(user)
    'highScoreSec': HS_sec(user)
    'highScoreDate': user.highScoreDate
  } for user in users])

@app.route("/api/login", methods=['POST'])
def login():
	data = request.get_json()
	username = data['username']
	pw = data['pw']
	score = data['score']
	user = User.query.filter_by(username=username).first()

	if user:
		if bcrypt.check_password_hash(user.pw, pw):
			login_user(user)
			if score < user.highScore: # low score is better
				user.highScore = score
				user.highScoreDate = datetime.utcnow()
				db.session.commit()
			return "true"
		else:
			return "false"
	else:
		# create a new user
		new_user = User(username=username,
        pw=bcrypt.generate_password_hash(pw).decode('utf-8'),
        highScore=score,
        highScoreDate=datetime.utcnow())
		db.session.add(new_user)
		db.session.commit()
		login_user(new_user, remember=True)
		return "true"

@app.route("/api/logout")
def logout():
  logout_user()
  return "true"
