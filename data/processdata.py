import json

with open("items.json", "r") as f:
	data = json.loads(f.read())

	data_size = len(data)
	for i in range(0, data_size):
		while len(data[i]["title"]) > 1:
			data[i]["title"].pop()

		data[i]["country"] = filter(lambda a: a != "|", data[i]["country"])

	with open('new_data.json', 'w') as outfile:
		json.dump(data, outfile)
