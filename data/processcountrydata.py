# import json

# with open("regions.json", "r") as f:
# 	region_data = json.dumps(f.read())

# 	with open("country_data.json", "r") as f:
# 		country_counts = json.loads(f.read())

# 	data = {}

# 	data_size = len(region_data)

# 	print data_size

# 	for i in range(0, data_size):
# 		print region_data[i]

# 		#with open('new_data.json', 'w') as outfile:
			
# 	# data_size = len(data)
# 	# for i in range(0, data_size):
# 	# 	for j in range(0, len(data[i]["country"])):
# 	# 		country_to_add = data[i]["country"][j].encode('utf-8')
# 	# 		if(country_to_add not in new_data):
# 	# 			new_data.update({ country_to_add : 1})
# 	# 		else:
# 	# 			new_data[country_to_add] = new_data[country_to_add] + 1

# 	# new_data = collections.OrderedDict(sorted(new_data.items()))

# 	# with open('country_data.json', 'w') as outfile:
# 	# 	json.dump(new_data, outfile)