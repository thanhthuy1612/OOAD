from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from flask import request
import ultis

app = Flask(__name__)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/cardType", methods=['GET'])
@cross_origin(origin='*')
def getAllCardType():
    rows = ultis.get_all("SELECT * FROM card_type")
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
    rows = ultis.get_all("SELECT * FROM card")
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
    rows = ultis.get_all("SELECT * FROM log")
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
    rows = ultis.get_all("SELECT * FROM log_detail")
    data = []
    for r in rows:
        data.append({
            "id": r[0],
            "logId": r[1],
            "time": r[2],
            "image": r[3],
            "lisence_number": r[4],
            "staffId": r[5],
        })
    return jsonify({"logDetail": data})

@app.route("/schedule", methods=['GET'])
@cross_origin(origin='*')
def getAllSchedule():
    rows = ultis.get_all("SELECT * FROM schedule")
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
    rows = ultis.get_all("SELECT * FROM staff")
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
    rows = ultis.get_all("SELECT * FROM staff_schedule")
    data = []
    for r in rows:
        data.append({
            "idStaff": r[0],
            "idSchedule": r[1]
        })
    return jsonify({"staffSchedule": data})

if __name__ == "__main__":
    app.run()