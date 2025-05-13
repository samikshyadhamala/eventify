from api import db

branch_admins = db.Table('branch_admins',
    db.Column('user_id', db.String, db.ForeignKey('users.fid', ondelete='CASCADE'), primary_key=True),
    db.Column('branch_id', db.Integer, db.ForeignKey('branches.branch_id', ondelete='CASCADE'), primary_key=True)
)