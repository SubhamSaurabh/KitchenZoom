from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Sequence, ForeignKey, DateTime, Table, ForeignKeyConstraint, Boolean, Date
from sqlalchemy.orm import relationship
from .meta import Base

class FixedMenu(Base):
    """ Storing the fixed daily menu """
    __tablename__ = "fixed_menu"

    id = Column(Integer, primary_key=True, autoincrement=True)
    day = Column(String(10), nullable=False)
    breakfast = Column(String(512), nullable=False)
    lunch = Column(String(512), nullable=False)
    dinner = Column(String(512), nullable=False)
    veg = Column(Boolean, nullable=False, default=True)


class Meal(Base):
    ''' Table to store the daily menu '''
    __tablename__ = "meals"

    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(Date, nullable=False)
    type_of_meal = Column(String(512), nullable=False)  # breakfast, lunch, dinner or any kind of meal
    items = Column(String(512), nullable=False)
    time_limit = Column(String(50), nullable=False)
    veg = Column(Boolean, nullable=False, default=True)

    attendees = relationship("User", secondary="mealAndUserProfiles", back_populates="meals", lazy="joined")

class MealAndUserProfiles(Base):
    __tablename__ = "mealAndUserProfiles"
    course_id = Column(Integer, ForeignKey('meals.id'), primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True)


