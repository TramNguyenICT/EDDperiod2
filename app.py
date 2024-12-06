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
        user='root',
        password='180790',
        autocommit=True,
        charset='utf8mb4',
        collation='utf8mb4_unicode_ci',
    )
    return connection
app = Flask(__name__)
CORS(app)

'''list of route 06/12/2024
/reset_airport
/reset_grinch
/insert_player
/get_player_id
/update_reindeer_to_player
/update_airport
/update_airport_done
/get_airport_data
/get_letter_count
/update_letter_count
/get_letter_change_grinch
/get_question
/get_reindeer_id
/update_final_result
/get_weather_data
/get_question_bank_country_group
'''

# reset all airport to FALSE
@app.route('/reset_airport',methods=['POST'])
def reset_airport():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        sql1 = f"UPDATE airport SET is_finished = 0"
        cursor.execute(sql1)
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"status": "success"})
    except Exception as e:
        app.logger.error(f"Error resetting airport: {e}")
        return jsonify({"error": "Internal server error"}), 500

#reset all grinch id in aiport table to null
@app.route('/reset_grinch',methods=['POST'])
def reset_grinch():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        sql2 = f"UPDATE airport SET grinch_id = NULL"
        cursor.execute(sql2)
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"status": "success"})
    except Exception as e:
        app.logger.error(f"Error resetting grinch: {e}")
        return jsonify({"error": "Internal server error"}), 500


#insert player
@app.route('/insert_player',methods=['POST'])
def insert_player():
    try:
        data = request.json
        player_id = data['player_id']
        connection = get_db_connection()
        cursor = connection.cursor()
        sql3 = f"INSERT INTO player(player_na) VALUES ('{player_name}')"
        cursor.execute(sql3)
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"status": "success"})
    except Exception as e:
        app.logger.error(f"Error inserting player: {e}")
        return jsonify({"error": "Internal server error"}), 500


@app.route('/get_player_id', methods=['GET'])
def get_player_id():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    sql_get_player_id = f"SELECT LAST_INSERT_ID()"
    cursor.execute(sql_get_player_id)
    player_id = cursor.fetchone()[0]

    cursor.close()
    connection.close()

    return jsonify({"player_id": player_id})

@app.route('/update_reindeer_to_player',methods=['POST'])
def update_reindeer_to_player():
    try:
        data = request.json
        player_name = data['player_name']
        reindeer_id = data['reindeer_id']
        connection = get_db_connection()
        cursor = connection.cursor()
        sql3b = f"UPDATE airport SET reindeer_id = '{reindeer_id}' WHERE player_id = '{player_id}'"
        cursor.execute(sql3b)
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"status": "success"})
    except Exception as e:
        app.logger.error(f"Error inserting player: {e}")
        return jsonify({"error": "Internal server error"}), 500

#update current airport
@app.route('/update_airport>',methods=['POST'])
def update_airport():
    try:
        data = request.json
        current_airport = data['current_airport']
        player_id = data['player_id']
        connection = get_db_connection()
        cursor = connection.cursor()
        sql7 = f"UPDATE player SET current_airport = '{current_airport}' WHERE player_id = '{player_id}'"
        cursor.execute(sql7)
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"status": "success"})
    except Exception as e:
        app.logger.error(f"Error updating airport: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/update_airport_done>',methods=['POST'])
def update_airport_done():
    try:
        data = request.json
        current_airport = data['current_airport']
        connection = get_db_connection()
        cursor = connection.cursor()
        sql6 = f"UPDATE airport SET is_finished = '1' WHERE airport_id = '{current_airport}'"
        cursor.execute(sql6)
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"status": "success"})
    except Exception as e:
        app.logger.error(f"Error updating airport done: {e}")
        return jsonify({"error": "Internal server error"}), 500

#get airport greeting
@app.route('/get_airport_data',methods=['GET'])
def get_airport_data():
    try:
        airport_id = request.args.get('airport_id')
        if not airport_id:
            return jsonify({"error": "Missing 'airport_id' parameter"}), 400
        connection = get_db_connection()
        cursor = connection.cursor()
        sql = """
            SELECT airport_name, city_id, country, country_group,
                   greeting, challenge, letter_change, is_finished, grinch_id
            FROM airport
            WHERE airport_id = %s
        """
        cursor.execute(sql, (airport_id,))
        airport_data = cursor.fetchone()

        # Check if the data is found
        if not airport_data:
            return jsonify({"error": "Airport not found"}), 404

        # Prepare the data as a JSON response
        result = {
            "airport_name": airport_data[0],
            "city_id": airport_data[1],
            "country": airport_data[2],
            "country_group": airport_data[3],
            "greeting": airport_data[4],
            "challenge": airport_data[5],
            "letter_change": airport_data[6],
            "is_finished": airport_data[7],
            "grinch_id": airport_data[8]
        }
        cursor.close()
        connection.close()
        return jsonify(result)
    except Exception as e:
        app.logger.error(f"Error retrieving question: {e}")
        return jsonify({"error": "Internal server error"}), 500


#get letter count
@app.route('/get_letter_count', methods=['GET'])
def get_letter_count():
    player_id = request.args.get('player_id')
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    sql14 = f"SELECT letter_count FROM player WHERE player_id = {player_id}"
    cursor.execute(sql14)
    letter_count = cursor.fetchone()

    cursor.close()
    connection.close()

    return jsonify(letter_count)

#update letter count
@app.route('/update_letter_count', methods=['POST'])
def update_letter_count():
    data = request.json
    letter_count = data['letter_count']
    player_id = data['player_id']

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    sql15 = f"UPDATE player SET letter_count = {letter_count} WHERE player_id = '{player_id}'"
    cursor.execute(sql15)
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({"status": "success"})

#get letter of grinch quiz
@app.route('/get_letter_change_grinch', methods=['GET'])
def get_letter_change_grinch():
    grinch_challenge = request.args.get('grinch_challenge')

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    sql16 = f"SELECT letter_change_grinch FROM grinch WHERE grinch_challenge_id = {grinch_challenge}"
    cursor.execute(sql16)
    letter_count_grinch = cursor.fetchone()

    cursor.close()
    connection.close()

    return jsonify(letter_count_grinch)

#get question data
@app.route('/get_question', methods=['GET'])
def get_question():
    try:
        question_id = request.args.get('question_id')

        if not question_id:
            return jsonify({"error": "Missing 'question_id' parameter"}), 400

        connection = get_db_connection()
        cursor = connection.cursor()

        sql = """
            SELECT question_content, right_answer, question_type, country_group,
                   letter_change, win_message, lose_message
            FROM question_bank
            WHERE question_id = %s
        """

        cursor.execute(sql, (question_id,))
        question_data = cursor.fetchone()

        # Check if the data is found
        if not question_data:
            return jsonify({"error": "Question not found"}), 404

        # Prepare the data as a JSON response
        result = {
            "question_content": question_data[0],
            "right_answer": question_data[1],
            "question_type": question_data[2],
            "country_group": question_data[3],
            "letter_change": question_data[4],
            "win_message": question_data[5],
            "lose_message": question_data[6]
        }
        cursor.close()
        connection.close()
        return jsonify(result)

    except Exception as e:
        app.logger.error(f"Error retrieving question: {e}")
        return jsonify({"error": "Internal server error"}), 500


#get reindeer id
@app.route('/get_reindeer_id', methods=['GET'])
def get_reindeer_id():
    try:
        player_id = request.args.get('player_id')
        connection = get_db_connection()
        cursor = connection.cursor()
        sql18 = f"SELECT reindeer_id FROM player WHERE player_id = '{player_id}'"
        cursor.execute(sql18)
        reindeer_id = cursor.fetchone()
        cursor.close()
        connection.close()
        return jsonify(reindeer_id or {})
    except Exception as e:
        app.logger.error(f"Error fetching reindeer id: {e}")
        return jsonify({"error": "Internal server error"}), 500

#update final result to player table
@app.route('/update_final_result', methods=['POST'])
def update_final_result():
    data = request.json
    result = data['result']
    player_id = data['player_id']
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    sql20 = f"UPDATE player SET result = '{result}' WHERE player_id = '{player_id}'"
    cursor.execute(sql20)
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({"status": "success"})


@app.route('/get_weather_data', methods=['GET'])
def get_weather_data():
    airport_id = request.args.get('airport_id')

    if not airport_id:
        return jsonify({"error": "Missing 'airport_id' parameter"}), 400

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    sql237 = f"SELECT city_id FROM airport WHERE airport_id = '{airport_id}'"
    cursor.execute(sql237)
    city_id_data = cursor.fetchone()

    if not city_id_data:
        return jsonify({"error": "Airport not found"}), 404

    city_id = city_id_data['city_id']

    request_url = f"https://api.openweathermap.org/data/2.5/weather?id={city_id}&appid={apikey}"

    try:
        response = requests.get(request_url)

        if response.status_code == 200:
            weather_data = response.json()

            # Prepare the required data
            weather_info = {
                "description": weather_data["weather"][0]["description"],
                "temperature": round(weather_data["main"]["temp"] - 273.15,2)
            }
            cursor.close()
            connection.close()

            return jsonify(weather_info)
        else:
            return jsonify({"error": "Failed to fetch weather data"}), response.status_code

    except requests.exceptions.RequestException as ex:
        return jsonify({"error": f"Request failed: {ex}"}), 500

# Route to get country_group from the question_bank table
@app.route('/get_question_bank_country_group', methods=['GET'])
def get_question_bank_country_group():
    try:
        country_group = request.args.get('country_group')
        if not country_group:
            return jsonify({"status": "error", "message": "Missing country_group parameter"}), 400
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        sql_question_group = "SELECT question_id FROM question_bank WHERE country_group = %s AND done ='0'"
        cursor.execute(sql_question_group, (country_group,))
        all_question_id_in_a_country = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(all_question_id_in_a_country)
    except Exception as e:
        app.logger.error(f"Error fetching country_group from question_bank table: {e}")
        return jsonify({"status": "error", "message": "Could not fetch country_group"}), 500


if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1',port=5000)

    connection = get_db_connection()
    cursor = connection.cursor()
    for i in range(6):
        while True:
            grinch_airport = random.randint(1002, 1059)
            sql4a = f"SELECT grinch_id from airport WHERE airport_id = {grinch_airport}"
            cursor.execute(sql4a)
            grinch_id = cursor.fetchone()
            if grinch_id is None:
                sql4b = f"UPDATE airport SET grinch_id = {i} WHERE airport_id = {grinch_airport}"
                cursor.execute(sql4b)
                connection.commit()
                break
    cursor.close()
    connection.close()
