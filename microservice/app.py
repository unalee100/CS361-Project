from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

def get_flag_image(state):
	urlpage = 'https://en.wikipedia.org/wiki/' + state
	response = requests.get(urlpage).text
	soup = BeautifulSoup(response, 'html.parser')

	for raw_img in soup.find_all('img'):
		link = raw_img.get('src')
		if link.find('Flag') != -1:
			return link

@app.route('/getflag/', methods=['GET'])
def respond():
    state = request.args.get("state", None)
    print(f"got name {state}")

    response = {}
    if not state:
        response["ERROR"] = "no state found, please send a state."
    elif str(state).isdigit():
        response["ERROR"] = "state can't be numeric."
    else:
        print(get_flag_image(state))
        response["State Flag Image URL"] = f"{get_flag_image(state)}"

    return jsonify(response)

@app.route('/')
def index():
    return "<h1>Welcome to the server for a state flag image scraping microservice !!</h1>"

if __name__ == '__main__':
    app.run(threaded=True, port=5000)