# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import json
import scrapy
from scrapy.exceptions import DropItem
from scrapy.contrib.pipeline.images import ImagesPipeline

class DuplicatesPipeline(object):

    def __init__(self):
        self.ids_seen = set()

    def process_item(self, item, spider):
        if item['url'] in self.ids_seen:
            raise DropItem("Duplicate item found: %s" % item)
        elif 'vote' in item['url']:
        	raise DropItems("Removing vote url" % item)
        elif 'tt_indev' in item['url']:
        	raise DropItems("Removing tt_indev url" % item)
        else:
            self.ids_seen.add(item['url'])
            return item

# class DownloadImagesPipeline(ImagesPipeline):

#     def get_media_requests(self, item, info):
#         for image_url in item['image']:
#             yield scrapy.Request(image_url)

#     def item_completed(self, results, item, info):
#         image_paths = [x['path'] for ok, x in results if ok]
#         if not image_paths:
#             raise DropItem("Item contains no images")
#         item['image'] = image_paths
#         return item

#not working
class CleanTitlePipeline(object):
	def process(self, item, spider):
		while len(item['title'] > 1):
			item['title'].pop()