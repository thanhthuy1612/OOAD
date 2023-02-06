import sqlite3

def delete_card_type(id):
    conn = sqlite3.connect("./be/data/data.db")
    data = conn.execute("DELETE FROM card_type WHERE id = ?;", [id])
    conn.commit()
    conn.close()
    return data

def delete_card(id):
    conn = sqlite3.connect("./be/data/data.db")
    data = conn.execute("DELETE FROM card WHERE id = ?;", [id])
    conn.commit()
    conn.close()
    return data

def delete_log(id):
    conn = sqlite3.connect("./be/data/data.db")
    data = conn.execute("DELETE FROM log WHERE id = ?;", [id])
    conn.commit()
    conn.close()
    return data

def delete_log_detail(id):
    conn = sqlite3.connect("./be/data/data.db")
    data = conn.execute("DELETE FROM log_detail WHERE id = ?;", [id])
    conn.commit()
    conn.close()
    return data

def delete_schedule(id):
    conn = sqlite3.connect("./be/data/data.db")
    data = conn.execute("DELETE FROM schedule WHERE id = ?;", [id])
    conn.commit()
    conn.close()
    return data

def delete_staff(id):
    conn = sqlite3.connect("./be/data/data.db")
    data = conn.execute("DELETE FROM staff WHERE id = ?;", [id])
    conn.commit()
    conn.close()
    return data

def delete_staff_schedule(idStaff, idSchedule):
    conn = sqlite3.connect("./be/data/data.db")
    data = conn.execute("DELETE FROM staff__schedule WHERE idStaff = ? AND idSchedule = ?;", [idStaff, idSchedule])
    conn.commit()
    conn.close()
    return data

if __name__ == "__main__":
    print(get_all("SELECT * FROM staff"))