from scrapy.spider import Spider
from scrapy.selector import Selector
from scrapy.http import Request

from imdb.items import Website

#need to pause and resume - 403 errors 

#decode unicode

#fix titles? 

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
            req_url = "http://www.imdb.com" + url.extract()
            yield Request(url=req_url, meta={'item': Website(url=req_url)}, callback=self.parse_page)

    def parse_page(self,response):
        item = response.meta['item']
        item['title'] = response.xpath('//td[contains(@id, "overview-top")]//h1//span[contains(@itemprop, "name")]/text()').extract()
        #item['image'] = response.xpath('//td[contains(@id, "img_primary")]//img/@src').extract()
        #item['director'] = response.xpath('//div[contains(@itemprop, "director")]//span/text()').extract()
        #item['year'] = response.xpath('//td[contains(@id, "overview-top")]//h1//span[contains(@class, "nobr")]//a/text()').extract()
        #item['summary'] = response.xpath('//p[contains(@itemprop, "description")]/text()').extract()
        yield item

        #   "www.imdb.com" + url

#then get images to display

#get all data for all urls 
#image- response.xpath('//td[contains(@id, "img_primary")]//img/@src').extract()
#summary - response.xpath('//p[contains(@itemprop, "description")]/text()').extract()
#director - response.xpath('//div[contains(@itemprop, "director")]//span/text()').extract()
#title - response.xpath('//td[contains(@id, "overview-top")]//h1//span[contains(@itemprop, "name")]/text()').extract()
#year - response.xpath('//td[contains(@id, "overview-top")]//h1//span[contains(@class, "nobr")]//a/text()').extract()

#add pipeline to get rid of data with empty fields

#read from war.jl, write to new file - how to do this???
#get correct paths for all data wanted - create list of sites same way 

#by end of today: all data in json, start d3 file
#get all poster to render, then mouseover, then click 
#have posters float around?
#after render, get feedback

#top 5000 films
