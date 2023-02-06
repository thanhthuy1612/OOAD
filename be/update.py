import sqlite3
import ultis

def update_card_type(name, id):
    conn = sqlite3.connect("./be/data/data.db")
    sql='''
    UPDATE card_type
        SET name = ?
        WHERE id = ?;
    '''
    data = conn.execute(sql, [name, id])
    conn.commit()
    conn.close()
    return data

def update_card(code, base_price, type, price_script, card_type_id, id):
    conn = sqlite3.connect("./be/data/data.db")
    sql='''
    UPDATE card
        SET code = ?,
            base_price = ?,
            type = ?,
            price_script = ?,
            card_type_id = ?
        WHERE id = ?;
    '''
    data = conn.execute(sql, [code, base_price, type, price_script, card_type_id, id])
    conn.commit()
    conn.close()
    return data

def update_log(total_price, entry_id, exit_id, card_id, id):
    conn = sqlite3.connect("./be/data/data.db")
    sql='''
    UPDATE log
        SET total_price = ?,
            entry_id = ?,
            exit_id = ?,
            card_id = ?
        WHERE id = ?;
    '''
    data = conn.execute(sql, [total_price, entry_id, exit_id, card_id, id])
    conn.commit()
    conn.close()
    return data

def update_log_detail(logId, time, type, image, staffId, id):
    conn = sqlite3.connect("./be/data/data.db")
    lisence_number = ultis.license_number(image)
    sql='''
    UPDATE log_detail
        SET logId = ?,
            time = ?,
            type = ?,
            image = ?,
            lisence_number = ?,
            staffId = ?
        WHERE id = ?;
    '''
    data = conn.execute(sql, [logId, time, type, image, lisence_number, staffId, id])
    conn.commit()
    conn.close()
    return data

def update_schedule(timeStart, timeEnd, scheduleName, id):
    conn = sqlite3.connect("./be/data/data.db")
    sql='''
    UPDATE schedule
        SET timeStart = ?,
            timeEnd = ?,
            scheduleName = ?
        WHERE id = ?;
    '''
    data = conn.execute(sql, [timeStart, timeEnd, scheduleName, id])
    conn.commit()
    conn.close()
    return data

def update_staff(name, email, phone, address, salary, id):
    conn = sqlite3.connect("./be/data/data.db")
    sql='''
    UPDATE staff
        SET name = ?,
            email = ?,
            phone = ?,
            address = ?,
            salary = ?
        WHERE id = ?;
    '''
    data = conn.execute(sql, [name, email, phone, address, salary, id])
    conn.commit()
    conn.close()
    return data

def update_staff__schedule(idStaffNew, idScheduleNew, idStaffCurrent, idScheduleCurrent):
    conn = sqlite3.connect("./be/data/data.db")
    sql='''
    UPDATE staff__schedule
        SET idStaff = ?,
            idSchedule = ?
        WHERE idStaff = ? AND 
            idSchedule = ?;
    '''
    data = conn.execute(sql, [idStaffNew, idScheduleNew, idStaffCurrent, idScheduleCurrent])
    conn.commit()
    conn.close()
    return data

if __name__ == "__main__":
    update_card_type('xemay', 1)