from scrapy.spider import Spider
from scrapy.selector import Selector

from imdb.items import Website

class ImdbSpider(Spider):
    print "hello"
    name = "imdb"
    allowed_domains = ["imdb.com"]
    start_urls = []
    start_urls.append("http://www.imdb.com/search/title?at=0&genres=war&sort=user_rating&title_type=feature")
    start_urls.append("http://www.imdb.com/search/title?at=0&genres=war&sort=user_rating&start=51&title_type=feature")

    # for i in range(1, 127):
    #     index = (50*i) + 1
    #     url = "http://www.imdb.com/search/title?at=0&genres=war&sort=user_rating&start=" + str(index) + "&title_type=feature"
    #     start_urls.append(url)

    def parse(self, response):
        sel = Selector(response)

        items = []

        for url in sel.xpath('//a[contains(@href, "title/tt")]/@href'):
            item = Website()
            item['url'] = "www.imdb.com" + url.extract()
            req_url = "www.imdb.com" + url.extract()
            print req_url
            #request = scrapy.Request(req_url,
            #                 callback=self.parse_page)
            #request.meta['item'] = item
            items.append(item)

        return items

    def parse_page(self,response):
        item = response.meta['item']

        item['title'] = "test"

        return item

        #   "www.imdb.com" + url

#chain callback, store rest of data 
#then get images to display

#get all data for all urls 
#image- response.xpath('//td[contains(@id, "img_primary")]//img/@src').extract()
#summary - response.xpath('//p[contains(@itemprop, "description")]/text()').extract()
#director - response.xpath('//div[contains(@itemprop, "director")]//span/text()').extract()
#title - response.xpath('//td[contains(@id, "overview-top")]//h1//span[contains(@itemprop, "name")]/text()').extract()
#year - response.xpath('//td[contains(@id, "overview-top")]//h1//span[contains(@class, "nobr")]//a/text()').extract()

# class FilmSpider(Spider):
#     name = "film"
#     allowed_domains = ["imdb.com"]

#drop data with empty fields

#add pipeline to get rid of empty fields

#read from war.jl, write to new file - how to do this???
#get correct paths for all data wanted - create list of sites same way 

#by end of today: all data in json, start d3 file
#get all poster to render, then mouseover, then click 
#have posters float around?
#after render, get feedback

#top 5000 films
