import requests
from bs4 import BeautifulSoup

def get_flag_image(state):
	urlpage = 'https://en.wikipedia.org/wiki/' + state
	response = requests.get(urlpage).text
	soup = BeautifulSoup(response.content, 'html.parser')

	for raw_img in soup.find_all('img'):
		link = raw_img.get('src')
		if link.find('Flag') != -1:
			return link