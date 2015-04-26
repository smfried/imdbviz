# from scrapy.spider import Spider
# from scrapy.selector import Selector

# from imdb.items import Website

# import json

# class FilmSpider(Spider):
#     name = "film"
#     allowed_domains = ["imdb.com"]

#     data = []
#     # with open('war.jl') as f:
#     #     for line in f:
#     #         data.append(json.loads(line))

#     start_urls = []

    #open war.jl

    # def parse(self, response):
    #     sel = Selector(response)

    #     items = []

    #     for url in sel.xpath('//a[contains(@href, "title/tt")]/@href'):
    #         item = Website()
    #         item['url'] = url.extract()
    #         items.append(item)

    #     for item in items:
    #         print item

    #     return items