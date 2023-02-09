from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import get, update, delete, post

app = Flask(__name__)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/cardType", methods=['GET'])
@cross_origin(origin='*')
def getAllCardType():
    rows = get.get_all("SELECT * FROM card_type")
    data = []
    for r in rows:
        data.append({
            "id": r[0],
            "name": r[1]
        })
    return jsonify({"card_type": data})

@app.route("/card", methods=['GET'])
@cross_origin(origin='*')
def getAllCard():
    rows = get.get_all("SELECT * FROM card")
    data = []
    for r in rows:
        data.append({
            "id": r[0],
            "code": r[1],
            "base_price": r[2],
            "type": r[3],
            "price_script": r[4],
            "card_type_id": r[5],
        })
    return jsonify({"card": data})

@app.route("/log", methods=['GET'])
@cross_origin(origin='*')
def getAllLog():
    rows = get.get_all("SELECT * FROM log")
    data = []
    for r in rows:
        data.append({
            "id": r[0],
            "total_price": r[1],
            "entry_id": r[2],
            "exit_id": r[3],
            "card_id": r[4]
        })
    return jsonify({"log": data})

@app.route("/logDetail", methods=['GET'])
@cross_origin(origin='*')
def getAllLogDetail():
    rows = get.get_all("SELECT * FROM log_detail")
    data = []
    for r in rows:
        data.append({
            "id": r[0],
            "logId": r[1],
            "time": r[2],
            "type":r[3],
            "image": r[4],
            "lisence_number": r[5],
            "staffId": r[6],
        })
    return jsonify({"logDetail": data})

@app.route("/schedule", methods=['GET'])
@cross_origin(origin='*')
def getAllSchedule():
    rows = get.get_all("SELECT * FROM schedule")
    data = []
    for r in rows:
        data.append({
            "id": r[0],
            "timeStart": r[1],
            "timeEnd": r[2],
            "scheduleName": r[3]
        })
    return jsonify({"schedule": data})

@app.route("/staff", methods=['GET'])
@cross_origin(origin='*')
def getAllStaff():
    rows = get.get_all("SELECT * FROM staff")
    data = []
    for r in rows:
        data.append({
            "id": r[0],
            "name": r[1],
            "email": r[2],
            "phone": r[3],
            "address": r[4],
            "salary": r[5]
        })
    return jsonify({"staff": data})

@app.route("/staffSchedule", methods=['GET'])
@cross_origin(origin='*')
def getAllStaffSchedule():
    rows = get.get_all("SELECT * FROM staff__schedule")
    data = []
    for r in rows:
        data.append({
            "idStaff": r[0],
            "idSchedule": r[1]
        })
    return jsonify({"staffSchedule": data})

@app.route("/cardType", methods=['POST'])
@cross_origin(origin='*')
def postCardType():
    name = request.args.get("name")
    if(name):
        post.post_card_type(name)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/card", methods=['POST'])
@cross_origin(origin='*')
def postCard():
    code = request.args.get("code")
    base_price = request.args.get("base_price")
    type = request.args.get("type")
    price_script = request.args.get("price_script")
    card_type_id = request.args.get("card_type_id")
    if(code):
        post.post_card(code, base_price, type, price_script, card_type_id)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/log", methods=['POST'])
@cross_origin(origin='*')
def postLog():
    total_price = request.args.get("total_price")
    entry_id = request.args.get("entry_id")
    exit_id = request.args.get("exit_id")
    card_id = request.args.get("card_id")
    if(total_price):
        post.post_log(total_price, entry_id, exit_id, card_id)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/logDetail", methods=['POST'])
@cross_origin(origin='*')
def postLogDetail():
    logId = request.args.get("logId")
    time = request.args.get("time")
    type = request.args.get("type")
    image = request.args.get("image")
    staffId = request.args.get("staffId")
    if(logId):
        post.post_log_detail(logId, time, type, image, staffId)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/schedule", methods=['POST'])
@cross_origin(origin='*')
def postSchedule():
    timeStart = request.args.get("timeStart")
    timeEnd = request.args.get("timeEnd")
    scheduleName = request.args.get("scheduleName")
    if(timeStart):
        post.post_schedule(timeStart, timeEnd, scheduleName)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/staff", methods=['POST'])
@cross_origin(origin='*')
def postStaff():
    name = request.args.get("name")
    email = request.args.get("email")
    phone = request.args.get("phone")
    address = request.args.get("address")
    salary = request.args.get("salary")
    if(name):
        post.post_staff(name, email, phone, address, salary)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/staffSchedule", methods=['POST'])
@cross_origin(origin='*')
def postStaffSchedule():
    idStaff = request.args.get("idStaff")
    idSchedule = request.args.get("idSchedule")
    if(idStaff):
        post.post_staff__schedule(idStaff, idSchedule)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/cardType", methods=['PUT'])
@cross_origin(origin='*')
def putCardType():
    name = request.args.get("name")
    id = request.args.get("id")
    if(name):
        update.update_card_type(name, id)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/card", methods=['PUT'])
@cross_origin(origin='*')
def putCard():
    code = request.args.get("code")
    base_price = request.args.get("base_price")
    type = request.args.get("type")
    price_script = request.args.get("price_script")
    card_type_id = request.args.get("card_type_id")
    id = request.args.get("id")
    if(code):
        update.update_card(code, base_price, type, price_script, card_type_id, id)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/log", methods=['PUT'])
@cross_origin(origin='*')
def putLog():
    total_price = request.args.get("total_price")
    entry_id = request.args.get("entry_id")
    exit_id = request.args.get("exit_id")
    card_id = request.args.get("card_id")
    id = request.args.get("id")
    if(total_price):
        update.update_log(total_price, entry_id, exit_id, card_id, id)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/logDetail", methods=['PUT'])
@cross_origin(origin='*')
def putLogDetail():
    logId = request.args.get("logId")
    time = request.args.get("time")
    type = request.args.get("type")
    image = request.args.get("image")
    staffId = request.args.get("staffId")
    id = request.args.get("id")
    if(logId):
        update.update_log_detail(logId, time, type, image, staffId, id)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/schedule", methods=['PUT'])
@cross_origin(origin='*')
def putSchedule():
    timeStart = request.args.get("timeStart")
    timeEnd = request.args.get("timeEnd")
    scheduleName = request.args.get("scheduleName")
    id = request.args.get("id")
    if(timeStart):
        update.update_schedule(timeStart, timeEnd, scheduleName, id)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/staff", methods=['PUT'])
@cross_origin(origin='*')
def putStaff():
    name = request.args.get("name")
    email = request.args.get("email")
    phone = request.args.get("phone")
    address = request.args.get("address")
    salary = request.args.get("salary")
    id = request.args.get("id")
    if(name):
        update.update_staff(name, email, phone, address, salary, id)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/staffSchedule", methods=['PUT'])
@cross_origin(origin='*')
def putStaffSchedule():
    idStaffNew = request.args.get("idStaffNew")
    idScheduleNew = request.args.get("idScheduleNew")
    idStaffCurrent = request.args.get("idStaffCurrent")
    idScheduleCurrent = request.args.get("idScheduleCurrent")
    if(idStaffNew):
        update.update_staff__schedule(idStaffNew, idScheduleNew, idStaffCurrent, idScheduleCurrent)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/cardType", methods=['DELETE'])
@cross_origin(origin='*')
def deleteCardType():
    id = request.args.get("id")
    if(id):
        delete.delete_card_type(id)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/card", methods=['DELETE'])
@cross_origin(origin='*')
def deleteCard():
    id = request.args.get("id")
    if(id):
        delete.delete_card(id)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/log", methods=['DELETE'])
@cross_origin(origin='*')
def deleteLog():
    id = request.args.get("id")
    if(id):
        delete.delete_log(id)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/logDetail", methods=['DELETE'])
@cross_origin(origin='*')
def deleteLogDetail():
    id = request.args.get("id")
    if(id):
        delete.delete_log_detail(id)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/schedule", methods=['DELETE'])
@cross_origin(origin='*')
def deleteSchedule():
    id = request.args.get("id")
    if(id):
        delete.delete_schedule(id)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/staff", methods=['DELETE'])
@cross_origin(origin='*')
def deleteStaff():
    id = request.args.get("id")
    if(id):
        delete.delete_staff(id)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})

@app.route("/staffSchedule", methods=['DELETE'])
@cross_origin(origin='*')
def deleteStaffSchedule():
    idStaff = request.args.get("idStaff")
    idSchedule = request.args.get("idSchedule")
    if(idSchedule):
        delete.delete_staff_schedule(idStaff, idSchedule)
        return jsonify({"status": 1, "message": "Successful"})
    return jsonify({"status": -1, "message": "Fail"})
if __name__ == "__main__":
    app.run()