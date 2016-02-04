###########################################################################################
#   Created by Jason Downing                                                              #
#   Some code originally found at this Stackoverflow Post:                                #
#   https://stackoverflow.com/questions/18966368/python-beautifulsoup-scrape-tables       #
#   Also this page as well:                                                               #
#   http://www.pythonforbeginners.com/python-on-the-web/web-scraping-with-beautifulsoup/  #
#
#   MIT LICENSED - DO WHATEVER YOU WANT WITH THIS CODE.
###########################################################################################

# To setup urllib2 / bs4 (BeautifulSoup)
# Follow this URL: http://linuxconfig.org/how-to-install-python3-beautiful-soup-environment-on-debian-linux
# and run this: pip install requests

import json
import requests
from bs4 import BeautifulSoup

# 5 URLs to scrap for lift / trail data.
# Order is: Waterville Valley, Cannon Mt, Bretton Woods, Loon Mt & Cranmore Mt
urls = ["http://www.waterville.com/ski-ride/snow-report.html",
        "http://cannonmt.com/trail-lift-report.html",
        "http://brettonwoods.com/alpine_trails/trail_report#top",
        "http://www.loonmtn.com/explore/snow-conditions/trail-lift-report",
        "http://www.cranmore.com/winter/snow-grooming-report"]

mountains = ["Waterville Valley", "Cannon Mt", "Bretton Woods",
             "Loon Mt", "Cranmore Mt"]

# Waterville Valley
def waterville():
  open_trails = []
  closed_trails = []

  #Get the page, then grab just the text and use BeautifulSoup to work some magic on it.
  page = requests.get(urls[0])
  data = page.text
  soup = BeautifulSoup(data, "lxml")

  # Get an entire div.
  ski_data = soup.findAll('div', {'class' : 'tabset_content'})

  # Let's get all open trails.
  for each_div in soup.findAll('li', {'class' : 'open'}):
    open_trails.append(each_div.text)

  print ("*** Open lifts / trails: ***\n")
  print (open_trails)

  # Also all closed trails.
  for each_div in soup.findAll('li', {'class' : 'closed'}):
    closed_trails.append(each_div.text)

  print ("\n\n*** Closed lifts / trails: ***\n")
  print (closed_trails)

  print ("\n")

  # Time to write the lists to a JSON file.
  # Stackoverflow post this is from:
  # https://stackoverflow.com/questions/16267767/python-writing-json-to-file
  with open("json/ski.json", "w") as outfile:
    json.dump({'waterville_open': open_trails,
      'waterville_closed': closed_trails}, outfile, indent=4)

# Cannon Mt
def cannon():
  print ("NOT DONE.\n");

# Bretton Woods
def bretton_woods():
  print ("WIP.\n")

  open_trails = []
  closed_trails = []

  #Get the page, then grab just the text and use BeautifulSoup to work some magic on it.
  page = requests.get(urls[2])
  data = page.text
  soup = BeautifulSoup(data, "lxml")

  # Get an entire div.
  ski_data = soup.findAll('div', {'id' : 'trail-content'})

  # print out the open / closed tags, should be in order for us to scrape.
  #print (open_closed_img)

  open_closed = []

  # Get all images in the div 'condition'
  images = soup.select('id.trail-content > a > img')

  for image in images:
    print (image['src'])

  #[div.a for div in
  #      soup.findAll('div', attrs={'class' : 'productName'})]

  # Now I have a list of open and closed, so let's put that in order.
  #for img in img_links:
    #print (img)
    #link = img.a['href']

    # only get open or closed srcs.
    #if (link == '/images/icons/open-sm.png'):
    #  open_closed.append('open')
    #if (link == '/images/icons/closed-sm.png'):
    #  open_closed.append('closed')

  # print out all open / closed trails, should be in order so we can compare
  # against a list of trails in a minute.
  #print ("open + closed trails: \n" + open_closed)


  #//*[@id="trail-content"]/div[4]/div[3]/img[1]

  # Test printing the HTML we got.
  #print (ski_data)

  # Let's get all open trails.
  #for each_div in soup.findAll('li', {'class' : 'open'}):
  #  open_trails.append(each_div.text)

  #print ("*** Open lifts / trails: ***\n")
  #print (open_trails)

  # Also all closed trails.
  #for each_div in soup.findAll('li', {'class' : 'closed'}):
  #  closed_trails.append(each_div.text)

  #print ("\n\n*** Closed lifts / trails: ***\n")
  #print (closed_trails)

  print ("\n")

# Loon Mt
def loon():
  print ("NOT DONE.\n")

# Cranmore Mt
def cranmore():
  print ("NOT DONE.\n")



# Main loop for data gathering
for num in range(0, len(urls)):
  print (mountains[num] + " lift / trail conditions")
  print ("Current URL to check: " + urls[num] + "\n")

  if (num == 0):
    print ("meh")
    #waterville()

  if (num == 1):
    cannon()

  if (num == 2):
    bretton_woods()

  if (num == 3):
    loon()

  if (num == 4):
    cranmore()
