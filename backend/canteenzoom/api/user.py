from flask import request, Blueprint, jsonify
from canteenzoom.models.userModel import User
from canteenzoom.models.menuModel import Meal
from canteenzoom.auth import get_token, validate_token, get_staff_token
import uuid
import datetime
import json

userBP = Blueprint('userApi', __name__)

@userBP.route('/register', methods=['POST'])
def useraction():
    if request.method == 'POST':
        data = request.json
        print(data)
        return save_new_user(data=data)
    else:
        response_object = {
            'status': 'fail',
            'message': 'method not allowed',
        }
        return jsonify(response_object), 400


def save_new_user(data):
    from server import SQLSession
    session = SQLSession()
    print(data)
    user = session.query(User).filter_by(email=data['email']).first()
    if not user:
        new_user = User(
            public_id=str(uuid.uuid4()),
            email=data['email'],
            username=data['name'],
            veg=data['isVeg'],
            reg_id=data['reg_id'],
            sic_id=data['sic_id'],
            role=data['role'],
            password=data['password'],
            registered_on=datetime.datetime.utcnow(),
            last_updated_on=datetime.datetime.utcnow()
        )
        try:
            session.add(new_user)
            session.commit()
            session.close()
            response_object = {
                'status': 'Ok',
                'message': 'User Created Successful',
            }
            return jsonify(response_object), 200
            
        except Exception as e:
            session.close()
            response_object = {
                'status': 'fail',
                'message': 'Problem saving in db',
                'error': str(e)
            }
            return jsonify(response_object), 500
    else:
        session.close()
        response_object = {
            'status': 'fail',
            'message': 'User already exists. Please Log in. or try another email',
        }
        return jsonify(response_object), 400


@userBP.route('/login', methods=['POST'])
def login():
    data = request.json
    return get_token(data)

@userBP.route('/stafflogin', methods=['POST'])
def stafflogin():
    data = request.json
    return get_staff_token(data)

@userBP.route('/', methods=['POST'])
def get_my_detail():
    data = request.json
    valid_token, usr_ = validate_token(data)
    if valid_token:
        result = {
            "name": usr_.username,
            "email": usr_.email, 
            "phone":usr_.phone, 
            "veg":usr_.veg, 
            "reg_id":usr_.reg_id, 
            "sic_id":usr_.sic_id, 
            "role":usr_.role, 
            "created_on":usr_.registered_on, 
            "last_update":usr_.last_updated_on
        }

        response_object = {
            'status': 'success',
            'message': 'detail of the user',
            'payload': result
        }
        return jsonify(response_object), 200

    else:
        response_object = {
            'status': 'fail',
            'message': 'invalid token',
        }
        return jsonify(response_object), 300


@userBP.route('/update', methods=['POST'])
def update():
    data = request.json

    valid_token, usr_ = validate_token(data)
    from server import SQLSession
    session = SQLSession()
    if(valid_token):
        usr = session.query(User).filter_by(email=usr_.email).first()
        if data['isVeg'] is not None:
            usr.veg = data['isVeg']
        if data['phone'] is not None:
            usr.phone = data['phone']
        if data['name'] is not None:
            usr.username = data['name']
        if data['password'] is not None:
            usr.password = data['password']
        usr.last_updated_on = datetime.datetime.utcnow()
        try:
            session.commit()
            session.close()
            return jsonify({
                "status": "success",
                "message": "updated detail",
            }), 200
        except:
            session.close()
            return jsonify({
                "status": "fail",
                "message": "cannot save changes"
            }), 400
    else:
        session.close()
        response_object = {
            'status': 'fail',
            'message': 'Invalid token',
        }
        return jsonify(response_object), 400


@userBP.route('/avail', methods=['POST'])
def avail_meal():
    data = request.json

    valid_token, usr_ = validate_token(data)
    from server import SQLSession
    session = SQLSession()
    if(not valid_token):
        session.close()
        response_object = {
            'status': 'fail',
            'message': 'Invalid token',
        }
        return jsonify(response_object), 300
    try:
        user_ = session.query(User).filter_by(id=usr_.id).first()
        list_of_meals_already_avail = [i.id for i in user_.meals]
        lits_of_types_of_meal = [i.type_of_meal for i in user_.meals]
        for m_id in data['meal_id']:
            if m_id in list_of_meals_already_avail:
                session.close()
                response_object = {
                    'status': 'fail',
                    'message': 'already enrolled',
                'meals': list_of_meals_already_avail
                }
                return jsonify(response_object), 400
            
            meal_ = session.query(Meal).filter_by(id=m_id).first()
            print(m_id)
            print(meal_)
            
            if not meal_:
                session.close()
                response_object = {
                    'status': 'fail',
                    'message': 'No such meal',
                }
                return jsonify(response_object), 400
            
            if meal_.type_of_meal in lits_of_types_of_meal:
                session.close()
                response_object = {
                    'status': 'fail',
                    'message': 'already enrolled in {}'.format(meal_.type_of_meal),
                    'meals': lits_of_types_of_meal
                }
                return jsonify(response_object), 400
        
            user_.meals.append(meal_)
        session.commit()
        session.close()
        response_object = {
            'status': 'success',
            'message': 'meal added'
        }
        return jsonify(response_object), 200
    except Exception as e:
        session.close()
        response_object = {
            'status': 'fail',
            'message': str(e),
        }
        return jsonify(response_object), 500

@userBP.route('/bill', methods=['GET'])
def last_month_meals():
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
        return jsonify(response), 300
    
    from server import SQLSession
    session = SQLSession()

    m_ = session.query(User).filter_by(id = urs_.id).first()
    session.close()
    total_meals_till_date = []
    todays_date = datetime.datetime.today()

    this_month_meal = []
    for i in m_.meals:
        total_meals_till_date.append({
            "date": i.date,
            "type_of_meal": i.type_of_meal
        })
        if i.date.month == todays_date.month:
            this_month_meal.append({
                "date": i.date,
                "type_of_meal": i.type_of_meal
            })
        
    response={
        "status":"success",
        "message":"Bills",
        "total_meals":total_meals_till_date,
        "month_meals":this_month_meal
    }
    return jsonify(response), 200
    
