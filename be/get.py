import sqlite3

def get_all(sql):
    conn = sqlite3.connect("./be/data/data.db")
    data = conn.execute(sql).fetchall()
    conn.close()

    return data

if __name__ == "__main__":
    print(get_all("SELECT * FROM staff"))