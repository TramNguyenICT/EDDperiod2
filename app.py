from flask import Flask, request, jsonify
import requests
import mysql.connector
import json
import random

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


'''list of route
/update_airport
/update_airport_done
/airport_greeting
/get_airport_reindeer_id
/get_letter_count
/update_letter_count
/get_letter_change_grinch
/get_question
/get_reindeer_id
/update_final_result
/get_weather_data
/get_two_random_airports
/get_questions_by_airport
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
        player_name = data['player_name']
        reindeer_id = data['reindeer_id']
        connection = get_db_connection()
        cursor = connection.cursor()
        sql3 = f"INSERT INTO player(player_name, reindeer_id) VALUES ('{player_name}', {reindeer_id})"
        cursor.execute(sql3)
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
@app.route('/airport_greeting',methods=['GET'])
def airport_greeting():
    try:
        airport_id = request.args.get('airport_id')
        connection = get_db_connection()
        cursor = connection.cursor()
        sql12 = f"SELECT greeting FROM airport WHERE airport_id = {airport_id}"
        cursor.execute(sql12)
        greeting = cursor.fetchone()
        cursor.close()
        connection.close()
        return jsonify(greeting)
    except Exception as e:
        app.logger.error(f"Error fetching airport greeting: {e}")
        return jsonify({"error": "Internal server error"}), 500

#get airport reindeer id
@app.route('/get_airport_reindeer_id', methods=['GET'])
def get_airport_reindeer_id():
    airport_id = request.args.get('airport_id')

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    sql13 = f"SELECT reindeer_id FROM airport WHERE airport_id = {airport_id}"
    cursor.execute(sql13)
    reindeer_id = cursor.fetchone()

    cursor.close()
    connection.close()

    return jsonify(reindeer_id)

#get letter count
@app.route('/get_letter_count', methods=['GET'])
def get_letter_count():
    player_id = request.args.get('player_id')

    # Using get_db_connection to establish a new connection
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # Executing the query to get letter_count from player table
    sql14 = f"SELECT letter_count FROM player WHERE player_id = {player_id}"
    cursor.execute(sql14)
    letter_count = cursor.fetchone()

    # Close the cursor and connection after use
    cursor.close()
    connection.close()

    return jsonify(letter_count)

#update letter count
@app.route('/update_letter_count', methods=['POST'])
def update_letter_count():
    data = request.json
    letter_count = data['letter_count']
    player_id = data['player_id']

    # Using get_db_connection to establish a new connection
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # SQL query to update letter_count in player table
    sql15 = f"UPDATE player SET letter_count = {letter_count} WHERE player_id = '{player_id}'"
    cursor.execute(sql15)
    connection.commit()

    # Close the cursor and connection after use
    cursor.close()
    connection.close()

    return jsonify({"status": "success"})

#get letter of grinch quiz
@app.route('/get_letter_change_grinch', methods=['GET'])
def get_letter_change_grinch():
    grinch_challenge = request.args.get('grinch_challenge')

    # Using get_db_connection to establish a new connection
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # SQL query to get letter_change_grinch from grinch table
    sql16 = f"SELECT letter_change_grinch FROM grinch WHERE grinch_challenge_id = {grinch_challenge}"
    cursor.execute(sql16)
    letter_count_grinch = cursor.fetchone()

    # Close the cursor and connection after use
    cursor.close()
    connection.close()

    return jsonify(letter_count_grinch)

#get question data (to a tupple)
@app.route('/get_question', methods=['GET'])
def get_question():
    try:
        # Get the 'question_id' parameter from the query string
        question_id = request.args.get('question_id')

        if not question_id:
            return jsonify({"error": "Missing 'question_id' parameter"}), 400

        # Connect to the database
        connection = get_db_connection()
        cursor = connection.cursor()

        # SQL query to get the question data
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

        # Close the database connection
        cursor.close()
        connection.close()

        # Return the result as a JSON response
        return jsonify(result)

    except Exception as e:
        # Log the error and return an internal server error
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

    # Using get_db_connection to establish a new connection
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # SQL query to update the final result in player table
    sql20 = f"UPDATE player SET result = '{result}' WHERE player_id = '{player_id}'"
    cursor.execute(sql20)
    connection.commit()

    # Close the cursor and connection after use
    cursor.close()
    connection.close()

    return jsonify({"status": "success"})


@app.route('/get_weather_data', methods=['GET'])
def get_weather_data():
    airport_id = request.args.get('airport_id')

    if not airport_id:
        return jsonify({"error": "Missing 'airport_id' parameter"}), 400

    # Use get_db_connection to fetch the city_id
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # Correct the query to use airport_id
    sql237 = f"SELECT city_id FROM airport WHERE airport_id = '{airport_id}'"
    cursor.execute(sql237)
    city_id_data = cursor.fetchone()

    # Check if city_id is found
    if not city_id_data:
        return jsonify({"error": "Airport not found"}), 404

    city_id = city_id_data['city_id']

    # Construct the request to OpenWeather API
    request_url = f"https://api.openweathermap.org/data/2.5/weather?id={city_id}&appid={apikey}"

    try:
        response = requests.get(request_url)

        # Check if the API response is successful
        if response.status_code == 200:
            weather_data = response.json()  # Get the JSON response directly

            # Prepare the required data
            weather_info = {
                "description": weather_data["weather"][0]["description"],
                "temperature": weather_data["main"]["temp"] - 273.15  # Convert temperature to Celsius
            }

            # Close the cursor and connection
            cursor.close()
            connection.close()

            return jsonify(weather_info)
        else:
            return jsonify({"error": "Failed to fetch weather data"}), response.status_code

    except requests.exceptions.RequestException as ex:
        # Handle exception for the request
        return jsonify({"error": f"Request failed: {ex}"}), 500

# Route to get city_id from the airport table
@app.route('/get_city_id', methods=['GET'])
def get_city_id():
    try:
        # Get a new database connection using the helper function
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # SQL query to get airport_id and city_id from the airport table
        sql_city_id = "SELECT airport_id, city_id FROM airport"
        cursor.execute(sql_city_id)

        # Fetch the data
        city_data = cursor.fetchall()

        # Close the cursor and connection
        cursor.close()
        connection.close()

        # Return the result as a JSON response
        return jsonify({"status": "success", "city_ids": city_data})

    except Exception as e:
        # Log the error and return an internal server error response
        app.logger.error(f"Error fetching city_id: {e}")
        return jsonify({"status": "error", "message": "Could not fetch city_id"}), 500

# Route to get country_group from the airport table
@app.route('/get_airport_country_group', methods=['GET'])
def get_airport_country_group():
    try:
        # Get a new database connection using the helper function
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # SQL query to get airport_id and country_group from the airport table
        sql_country_group = "SELECT airport_id, country_group FROM airport"
        cursor.execute(sql_country_group)

        # Fetch the data
        country_group_data = cursor.fetchall()

        # Close the cursor and connection
        cursor.close()
        connection.close()

        # Return the result as a JSON response
        return jsonify({"status": "success", "country_groups": country_group_data})

    except Exception as e:
        # Log the error and return an internal server error response
        app.logger.error(f"Error fetching country_group from airport table: {e}")
        return jsonify({"status": "error", "message": "Could not fetch country_group"}), 500

# Route to get country_group from the question_bank table
@app.route('/get_question_bank_country_group', methods=['GET'])
def get_question_bank_country_group():
    try:
        # Get a new database connection using the helper function
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # SQL query to get question_id and country_group from the question_bank table
        sql_question_group = "SELECT question_id, country_group FROM question_bank"
        cursor.execute(sql_question_group)

        # Fetch the data
        question_group_data = cursor.fetchall()

        # Close the cursor and connection
        cursor.close()
        connection.close()

        # Return the result as a JSON response
        return jsonify({"status": "success", "question_bank_country_groups": question_group_data})

    except Exception as e:
        # Log the error and return an internal server error response
        app.logger.error(f"Error fetching country_group from question_bank table: {e}")
        return jsonify({"status": "error", "message": "Could not fetch country_group"}), 500


if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1',port=5000)

    # update grinch_challenge_id into airport_id
    for i in range(6):
        while True:
            grinch_airport = random.randint(1002, 1059)
            sql4a = f"SELECT grinch_id from airport WHERE airport_id = {grinch_airport}"
            cursor.execute(sql4a)
            grinch_id = cursor.fetchone()["grinch_id"]
            if (grinch_id == None):
                sql4b = f"UPDATE airport SET grinch_id = i WHERE airport_id ={grinch_airport}"
                cursor.execute(sql4b)
                connection.commit()
                break;
