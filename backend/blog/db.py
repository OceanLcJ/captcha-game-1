from datetime import datetime
from blog import app, db, lm
from flask_login import UserMixin

# Table #####################################################################################################
class User(db.Model, UserMixin):
    __tablename__ = 'user'
    userID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(15))
    pw = db.Column(db.String(60), nullable=False)
    dateCreated = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    highScore = db.Column(db.Integer)
    highScoreDate = db.Column(db.DateTime)

    def __repr__(self):
        def HS_min(self):
            return str(int(self.highScore/60))

        def HS_sec(self):
            return str(self.highScore%60)

        return f"{self.username} {HS_min(self)}:{HS_sec(self)} at {self.highScoreDate}"

    def get_id(self):
        return str(self.userID)
