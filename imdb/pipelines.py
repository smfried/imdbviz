# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import json
from scrapy.exceptions import DropItem

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

class CleanTitlePipeline(object):
	def process(self, item, spider):
		print item['title'][0]
		item['title'] = item['title'][0]
