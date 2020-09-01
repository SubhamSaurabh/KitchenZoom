from flask import request, Blueprint, jsonify
from canteenzoom.models.userModel import User
from canteenzoom.models.menuModel import Meal
from canteenzoom.auth import get_token, validate_token
import datetime
import json
from pytz import timezone

maintainerBP = Blueprint('maintainerApi', __name__)

@maintainerBP.route('/', methods=['GET'])
def get_tomorrows_list():
    '''
        return the list of students, who are enrolled for tomorrows meal.
    '''
    try:
        auth = request.args.get('auth', None, type=str)
        print("auth = ", auth)
    except:
        response={
            "status":"fail",
            "message":"No argument"
        }
        return jsonify(response), 400
    valid_token, usr_ = validate_token({'token':auth})

    if not valid_token or not usr_.role == 'maintainer':
        response_object = {
            'status': 'fail',
            'message': "Invalid maintainer",
        }
        return jsonify(response_object), 300
    tomorrows_date = datetime.datetime.today() + datetime.timedelta(days=1)
    tomorrows_date = tomorrows_date.astimezone(timezone('Asia/Kolkata'))
    # tomorrows_date = datetime.datetime.today() + datetime.timedelta(days=1)
    # tomorrows_date = tomorrows_date.strftime("%d %m %Y")
    # tomorrows_date = datetime.datetime.strptime(tomorrows_date, "%d %m %Y")
    
    from server import SQLSession
    session = SQLSession()

    meals_ = session.query(Meal).filter_by(date=tomorrows_date.date()).all()

    res = [{
        'meal_id':i.id,
        'date':i.date,
        'type':i.type_of_meal,
        'items':i.items,
        'isVeg':i.veg,
        "number_of_users":len([j.id for j in i.attendees])} 
        for i in meals_]
    
    #print(meals_)
    # uc = [i.id for i in meals_.attendees]
    session.close()
    response_object = {
        'status': 'success',
        'message': 'veg and non veg list',
        'payload': res,
        # 'non_veg':nvc
    }
    return jsonify(response_object), 200
    

    