from database.database import SessionLocal
from database.models.user import User
from database.models.group import Group
from database.models.group_user import GroupUser
from database.models.message import Message
from constants.database import PHONE_NUMBER_BASE
def seed():
    session = SessionLocal()

    # Evita duplicar datos si corres el seed varias veces
    if session.query(User).first():
        print("Seed ya ejecutado. Skipping...")
    else:    
      users = [
          User(name="Test", phone=PHONE_NUMBER_BASE),
      ]

      session.add_all(users)
      session.commit()
    
    if session.query(Group).first():
        print("Groups ya existes. Skipping...")
    
    else:
        groups = [
            Group(name="Group A",),
            Group(name="Group B"),
            Group(name="Group C"),
        ]
    
        session.add_all(groups)
        session.commit()
        
    
    if session.query(GroupUser).first():
        print("Group Users ya existes. Skipping...")
    else:
        group_users = [
            GroupUser(group_id=1, user_id=1),
        ]
        
        session.add_all(group_users)
        session.commit
    
    session.close()
    print("Seeding completado 🎉")

if __name__ == "__main__":
    seed()
