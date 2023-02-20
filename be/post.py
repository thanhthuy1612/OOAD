import sqlite3
import ultis

def post_card_type(name):
    conn = sqlite3.connect("./be/data/data.db")
    data = conn.execute("INSERT INTO card_type (name) VALUES ( ? )", [name])
    conn.commit()
    conn.close()
    return data

def post_card(code, base_price, type, price_script, card_type_id):
    conn = sqlite3.connect("./be/data/data.db")
    data = conn.execute("INSERT INTO card (code, base_price, type, price_script, card_type_id) VALUES ( ?, ? ,? ,? ,? )", [code, base_price, type, price_script, card_type_id])
    conn.commit()
    conn.close()
    return data

def post_log(total_price, entry_id, exit_id, card_id):
    conn = sqlite3.connect("./be/data/data.db")
    data = conn.execute("INSERT INTO log (total_price, entry_id, exit_id, card_id) VALUES ( ?, ?, ?, ? )", [total_price, entry_id, exit_id, card_id])
    conn.commit()
    conn.close()
    return data

def post_log_detail(logId, time, type, image, staffId):
    conn = sqlite3.connect("./be/data/data.db")
    lisence_number = ultis.license_number(image)
    data = conn.execute("INSERT INTO log_detail (logId, time, type, image, lisence_number, staffId) VALUES ( ?, ?, ?, ?, ?, ? )", [logId, time, type, image, lisence_number, staffId])
    conn.commit()
    conn.close()
    return data

def post_license_number(image):
    conn = sqlite3.connect("./be/data/data.db")
    license_number = ultis.license_number(image)
    data = conn.execute("INSERT INTO license_number (license_number, image) VALUES ( ?, ?)", [license_number, image])
    conn.commit()
    conn.close()
    return data

def post_schedule(timeStart, timeEnd, scheduleName):
    conn = sqlite3.connect("./be/data/data.db")
    data = conn.execute("INSERT INTO schedule (timeStart, timeEnd, scheduleName) VALUES ( ?, ?, ? )", [timeStart, timeEnd, scheduleName])
    conn.commit()
    conn.close()
    return data

def post_staff(name, email, phone, address, salary):
    conn = sqlite3.connect("./be/data/data.db")
    data = conn.execute("INSERT INTO staff (name, email, phone, address, salary) VALUES ( ?, ?, ?, ?, ? )", [name, email, phone, address, salary])
    conn.commit()
    conn.close()
    return data

def post_staff__schedule(idStaff, idSchedule):
    conn = sqlite3.connect("./be/data/data.db")
    data = conn.execute("INSERT INTO staff__schedule (idStaff, idSchedule) VALUES ( ?, ? )", [idStaff, idSchedule])
    conn.commit()
    conn.close()
    return data

if __name__ == "__main__":
    print(post_card_type('test'))