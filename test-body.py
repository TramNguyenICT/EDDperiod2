from flask import Flask, request, jsonify
import requests
import mysql.connector
import json
import random
from flask_cors import CORS

apikey="c5a5b9f230f4a2ffabacf63e19350867"

def get_db_connection():
    connection = mysql.connector.connect(
        host='127.0.0.1',
        port=3306,
        database='elfdeliverydash',
        user='dokyeom',
        password='seventeen17',
        autocommit=True,
        charset='utf8mb4',
        collation='utf8mb4_unicode_ci',
    )
    return connection
app = Flask(__name__)
CORS(app)

#insert player name
@app.route('/insert_player',methods=['POST'])
def insert_player():
    try:
        data = request.json
        #player_id = data['player_id']
        player_name = data['player_name']

        connection = get_db_connection()
        cursor = connection.cursor()
        sql3 = f"INSERT INTO player (player_name) VALUES (%s)"
        cursor.execute(sql3, (player_name,))
        connection.commit()

        cursor.execute("SELECT LAST_INSERT_ID()")
        player_id = cursor.fetchone()[0]

        cursor.close()
        connection.close()
        return jsonify({"status": "success", "player_id": player_id})

    except Exception as e:
        app.logger.error(f"Error inserting player: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/get_player_id', methods=['GET'])
def get_player_id():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        sql_get_player_id = f"SELECT player_id FROM player ORDER BY player_id DESC LIMIT 1"
        cursor.execute(sql_get_player_id)
        result = cursor.fetchone()
        if result:
            player_id = result['player_id']
            cursor.close()
            connection.close()
            return jsonify({"player_id": player_id})
        else:
            return jsonify({"error": "Player not found"}), 404

    except Exception as e:
        app.logger.error(f"Error getting player ID: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/update_reindeer_to_player',methods=['POST'])
def update_reindeer_to_player():
    try:
        data = request.json
        player_id = data['player_id']
        reindeer_id = data['reindeer_id']

        connection = get_db_connection()
        cursor = connection.cursor()

        sql3b = f"UPDATE player SET reindeer_id = %s WHERE player_id = %s"
        cursor.execute(sql3b, (reindeer_id, player_id))
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"status": "success"})
    except Exception as e:
        app.logger.error(f"Error updating reindeer into player table: {e}")
        return jsonify({"error": "Internal server error"}), 500



if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1',port=5000)

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.close()
    connection.close()