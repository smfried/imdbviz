import json
import collections
from collections import OrderedDict

with open("data.json", "r") as f:
	data = json.loads(f.read())

	new_data = {}

	data_size = len(data)
	for i in range(0, data_size):
		for j in range(0, len(data[i]["country"])):
			country_to_add = data[i]["country"][j].encode('utf-8')
			if(country_to_add not in new_data):
				new_data.update({ country_to_add : 1})
			else:
				new_data[country_to_add] = new_data[country_to_add] + 1


	new_data = collections.OrderedDict(sorted(new_data.items()))

	with open('country_data.json', 'w') as outfile:
		json.dump(new_data, outfile)