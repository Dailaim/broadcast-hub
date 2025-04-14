from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from sqlalchemy.orm import Session
from datetime import datetime
from database.models.user import User
from database.models.group_user import GroupUser
from database.models.message import Message
from database.database import get_db
from modules.whatsapp.services import send_whatsapp_message

scheduler = BackgroundScheduler(jobstores={
    'default': SQLAlchemyJobStore(url='sqlite:///jobs.db')
})

def schedule_message(message_id: int):
    db = next(get_db())
    msg = db.query(Message).filter(Message.id == message_id).first()

    if not msg or msg.status != "pending":
        return

    scheduler.add_job(
        func=send_scheduled_message,
        trigger='date',
        run_date=msg.scheduled_time,
        args=[message_id],
        id=f"message_{message_id}",
        replace_existing=True
    )

def send_scheduled_message(message_id: int):
    db = next(get_db())
    msg = db.query(Message).filter(Message.id == message_id).first()
    if not msg or msg.status != "pending":
        return

    group_users = db.query(GroupUser).filter(GroupUser.group_id == msg.group_id).all()
    for gu in group_users:
        user = db.query(User).filter(User.id == gu.user_id).first()
        if user:
            send_whatsapp_message(user.phone, msg.content)

    msg.status = "sent"
    db.commit()

def start_scheduler():
    scheduler.start()
