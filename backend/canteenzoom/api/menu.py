from flask import request, Blueprint, jsonify
from canteenzoom.models.userModel import User
from canteenzoom.models.menuModel import FixedMenu, Meal
from canteenzoom.auth import get_token, validate_token
import uuid
import datetime
import json
from pytz import timezone

menuBP = Blueprint('menuApi', __name__)

@menuBP.route('/', methods=['GET'])
def get_tomorrows_menu():
    try:
        auth = request.args.get('auth', None, type=str)
        print("auth = ", auth)
    except:
        response={
            "status":"fail",
            "message":"No argument"
        }
        return jsonify(response), 400
    valid_token, urs_ = validate_token({'token':auth})
    if not valid_token:
        response={
            "status":"fail",
            "message":"Not a valid token/user. please login again."
        }
        return jsonify(response), 400
    tomorrows_date = datetime.datetime.today() + datetime.timedelta(days=1)
    tomorrows_date = tomorrows_date.astimezone(timezone('Asia/Kolkata'))
    # tomorrows_date = timezone('Asia/Kolkata').localize(tomorrows_date)
    from server import SQLSession
    session = SQLSession()
    # query_date = tomorrows_date.strftime('%d %m %Y')

    m_ = session.query(Meal).filter_by(date=tomorrows_date.date()).all()
    print("QUERY FROM MEAL to see is present is complete")
    print(m_)
    if len(m_)==0:
        # session.close()
        # print("does not exist. adding menu")
        tomorrows_date_str = tomorrows_date.strftime("%d %m %Y")
        status = add_daily_menu_from_fixed_menu(tomorrows_date_str)
        if not status:
            session.close()
            response_object = {
                'status': 'fail',
                'message': "error in saving the meal",
            }
            return jsonify(response_object), 400
        else:
            print("Writing done")
    
    # query_date = datetime.datetime.strptime(tomorrows_date, "%d %m %Y")
    
    print(tomorrows_date)
    menu = session.query(Meal).filter_by(date=tomorrows_date.date()).all()
    day = tomorrows_date.strftime("%A")
    print(type(tomorrows_date))
    print(day)
    general_meal = session.query(FixedMenu).filter_by(day=day).all()
    session.close()
    
   
    res = [{
            'meal_id':i.id,
            'date':i.date,
            'type':i.type_of_meal,
            'items':i.items,
            'isVeg':i.veg,
            'time': i.time_limit,
            'avail':urs_.id in [j.id for j in i.attendees]
        } for i in menu]
    veg_foods = []
    non_veg_foods = []
    for i in res:
        if i['isVeg']:
            veg_foods.append(i)
        else:
            non_veg_foods.append(i)
    

    general_meal_res = [[{
            'meal_id':i.id,
            'day':i.day,
            'veg':i.veg,
            'time':'breakfast',
            'items':i.breakfast,
        },
        {
            'meal_id':i.id,
            'day':i.day,
            'veg':i.veg,
            'time':'lunch',
            'items':i.lunch,
        },
        {
            'meal_id':i.id,
            'day':i.day,
            'veg':i.veg,
            'time':'dinner',
            'items':i.dinner,
        }] for i in general_meal]
    
    general_veg_foods = []
    general_non_veg_foods = []
    for i in general_meal_res:
        for j in i:
            if j['veg']:
                general_veg_foods.append(j)
            else:
                general_non_veg_foods.append(j)    

    response_object = {
        'status': 'success',
        'message': 'all meals data',
        'veg_food': veg_foods,
        'non_veg_food': non_veg_foods,
        'general_non_veg_foods':general_non_veg_foods,
        'general_veg_foods':general_veg_foods
    }
    return jsonify(response_object), 200



def add_daily_menu_from_fixed_menu(date):
    from server import SQLSession
    session = SQLSession()
    str_date = date
    date = datetime.datetime.strptime(date, "%d %m %Y")
    date = date.astimezone(timezone('Asia/Kolkata'))
    print(date)
    
    day = date.strftime("%A")
    print(day)
    todays_menu = session.query(FixedMenu).filter_by(day=day).all()
    try:
        for i in todays_menu:
            d = {'breakfast':i.breakfast, 'lunch':i.lunch, 'dinner':i.dinner}
            for j in d:
                if d[j] == 'breakfast':
                    t = '7:30 AM - 9:30 AM'
                elif d[j] == 'lunch':
                    t = '11:45 AM -2:00 PM'
                else:
                    t = '8:30 PM - 9:30 PM'
                meal_ = Meal(
                    date = date,
                    type_of_meal = j,
                    items = d[j],
                    veg = i.veg,
                    time_limit = t
                )
                session.add(meal_)
        session.commit()
        session.close()
        return True
    except Exception as e:
        session.close()
        print(str(e))
        return False


@menuBP.route('/setfixmenu', methods=['POST'])
def setfixedmenu():
    data = request.json
    from server import SQLSession
    session = SQLSession()
    m_ = session.query(FixedMenu).filter_by(day=data['day']).all()
    l = [(i.id, i.veg) for i in m_]
    if len(l)==2:
        session.close()
        response_object = {
            'status': 'fail',
            'message': '{} menu already exist, apply for change'.format(data['day']),
        }
        return jsonify(response_object), 400
    if len(l)>0:
        if l[0][1] == data['veg']:
            if(data['veg']==True):
                veg_="veg"
            else:
                veg_="non-veg"
            response_object = {
                'status': 'fail',
                'message': '{} menu already exist for {}, apply for change'.format(veg_, data['day']),
            }
            return jsonify(response_object), 400
    new_men = FixedMenu(
        day=data['day'],
        breakfast=data['breakfast'],
        lunch=data['lunch'],
        dinner=data['dinner'],
        veg=data['veg']
    )
    try:
        session.add(new_men)
        session.commit()
        session.close()
        response_object = {
            'status': 'success',
            'message': 'saved the menu',
        }
        return jsonify(response_object), 200
    except Exception as e:
        session.close()
        response_object = {
            'status': 'fail',
            'message': str(e),
        }
        return jsonify(response_object), 500

@menuBP.route('/dailymenu', methods=['GET'])
def get_daily_fixed_menu():
    from server import SQLSession
    session = SQLSession()
    try:
        menu_ = session.query(FixedMenu).all()
        session.close()
        res = [{
            "day":i.day,
            "id":i.id,
            "breakfast":i.breakfast,
            "lunch":i.lunch,
            "dinner":i.dinner,
            "veg":i.veg
        } for i in menu_]
        veg_foods = []
        non_veg_foods = []
        for i in res:
            if i['veg']:
                veg_foods.append(i)
            else:
                non_veg_foods.append(i)

        response_object = {
            'status': 'success',
            'message': 'all meals data',
            'veg_food': sorted(veg_foods, key = lambda i: i['id']),
            'non_veg_food': sorted(non_veg_foods, key = lambda i: i['id'])
        }
        return jsonify(response_object), 200
    except Exception as e:
        session.close()
        response_object = {
            'status': 'fail',
            'message': str(e),
        }
        return jsonify(response_object), 500


@menuBP.route('/change', methods=['POST'])
def change_fixed_menu():
    pass
