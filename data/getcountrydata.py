import json

with open("data.json", "r") as f:
	data = json.loads(f.read())

	d = {}

	data_size = len(data)
	for i in range(0, data_size):
		for j in range(0, len(data[i]["country"])):
			country_to_add = data[i]["country"][j].encode('utf-8')
			if(country_to_add not in d):
				d.update({ country_to_add : 1})
			else:
				d[country_to_add] = d[country_to_add] + 1


	#list of individual countries
	#create new json

	# data_size = len(data)
	# for i in range(0, data_size):
	# 	while len(data[i]["title"]) > 1:
	# 		data[i]["title"].pop()

	# 	data[i]["country"] = filter(lambda a: a != "|", data[i]["country"])

	# new_data = json.dumps(d)

	# with open('country_data.json', 'w') as outfile:
	# 	json.dump(new_data, outfile)