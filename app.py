# Import necessary modules from Flask
from flask import Flask, render_template, request, jsonify
import time

# Create a Flask web application instance
app = Flask(__name__)

# Define a route for the root URL '/'
@app.route('/')
def home():
    # Render the 'landing.html' template when the root URL is accessed
    return render_template('landing.html')

@app.route('/index.html')
def index():
    # Render the 'index.html' 
    return render_template('index.html')

# Define a route for starting the timer (via POST request)
@app.route('/start_timer', methods=['POST'])
def start_timer():
    # Get the 'notify_time' value from the POST request form data
    notify_time = request.form.get('notify_time')
    
    try:
        # Convert 'notify_time' to an integer
        notify_time = int(notify_time)
        
        # Check if 'notify_time' is less than 1
        if notify_time < 1:
            return jsonify({'error': 'Notification time should be a positive integer.'}), 400
    except ValueError:
        # Handle the case where 'notify_time' is not a valid integer
        return jsonify({'error': 'Invalid notification time format.'}), 400

    # Record the current time as the timer start time
    start_time = time.time()
    
    # Return a JSON response indicating that the timer has started
    return jsonify({'message': 'Timer started.', 'start_time': start_time})

# Define a route for stopping the timer (via POST request)
@app.route('/stop_timer', methods=['POST'])
def stop_timer():
    # Return a JSON response indicating that the timer has stopped
    return jsonify({'message': 'Timer stopped.'})

# Define a route for resetting the timer (via POST request)
@app.route('/reset_timer', methods=['POST'])
def reset_timer():
    # Return a JSON response indicating that the timer has been reset
    return jsonify({'message': 'Timer reset.'})

# Start the Flask application in debug mode if executed directly
if __name__ == '__main__':
    app.run(debug=True)
