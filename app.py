from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('cards.html')

@app.route('/get_facts', methods=['POST'])
def get_facts():
    number = request.form['number']

    if not number:
        return jsonify({'error': 'Please enter a valid number'})

    try:
        api_url = f'http://numbersapi.com/{number}/trivia'
        response = requests.get(api_url)

        if response.status_code == 200:
            data = response.text
            return jsonify({'fact': data})
        else:
            return jsonify({'error': 'Failed to fetch facts from the API'})

    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'})

    

@app.route('/draw')
def draw_card():
        return render_template('cards.html')


if __name__ == '__main__':
    app.run(debug=True)















































#     @app.route('/draw_two_cards', methods=['GET'])
# def draw_two_cards():
#     try:
#         response = requests.get('https://deckofcardsapi.com/api/deck/new/draw/?count=2')
#         data = response.json()
#         if data['success']:
#             cards = data['cards']
#             card_info = [f"{card['value']} of {card['suit']}" for card in cards]
#             return jsonify({'card_info': card_info})
#         else:
#             return jsonify({'error': 'Failed to draw two cards.'})
#     except Exception as e:
#         return jsonify({'error': f'An error occurred: {str(e)}'})

# @app.route('/draw_cards_from_deck', methods=['GET'])
# def draw_cards_from_deck():
#     try:
#         deck_id = request.args.get('deck_id')
#         if not deck_id:
#             return jsonify({'error': 'Deck ID is required.'})

#         response = requests.get(f'https://deckofcardsapi.com/api/deck/{deck_id}/draw/?count=1')
#         data = response.json()
#         if data['success']:
#             if data['remaining'] > 0:
#                 card = data['cards'][0]
#                 card_info = f"{card['value']} of {card['suit']}"
#                 return jsonify({'card_info': card_info})
#             else:
#                 return jsonify({'message': 'No cards remaining in the deck.'})
#         else:
#             return jsonify({'error': 'Failed to draw a card.'})
#     except Exception as e:
#         return jsonify({'error': f'An error occurred: {str(e)}'})

