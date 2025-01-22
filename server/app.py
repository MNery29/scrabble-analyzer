from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    board = data['board']
    hand = data['hand']
    # Process board and hand here
    return jsonify({'words': [{'word': 'example', 'score': 45}]})


if __name__ == '__main__':
    app.run(debug=True)
