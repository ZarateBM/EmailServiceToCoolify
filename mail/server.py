from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/email/add', methods=['POST'])
def add_email():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    try:
        # Ejecuta el comando 'setup email add'
        result = subprocess.run(
            ['setup', 'email', 'add', email],
            input=f'{password}\n',
            text=True,
            capture_output=True,
            check=True
        )
        return jsonify({'message': 'Email created successfully', 'output': result.stdout}), 200
    except subprocess.CalledProcessError as e:
        return jsonify({'error': e.stderr.strip()}), 500

@app.route('/email/list', methods=['GET'])
def list_emails():
    try:
        # Ejecuta el comando 'setup email list'
        result = subprocess.run(
            ['setup', 'email', 'list'],
            text=True,
            capture_output=True,
            check=True
        )
        return jsonify({'emails': result.stdout.splitlines()}), 200
    except subprocess.CalledProcessError as e:
        return jsonify({'error': e.stderr.strip()}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
