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

# global JSON object to write only once.
JSON_trails = {}

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

  # Dump to trails object.
  JSON_trails['waterville_open'] = open_trails
  JSON_trails['waterville_closed'] = closed_trails

# Cannon Mt
def cannon():
  print ("NOT DONE.\n");

  open_trails = []
  closed_trails = []

  # Dump to trails object.
  JSON_trails['cannon_open'] = open_trails
  JSON_trails['cannon_closed'] = closed_trails

# Bretton Woods
def bretton_woods():

  trail_list = []
  trail_status = []
  open_trails = []
  closed_trails = []

  open_src = '/images/icons/open-sm.png'
  #closed_src = '/images/icons/closed-sm.png'

  #Get the page, then grab just the text and use BeautifulSoup to work some magic on it.
  page = requests.get(urls[2])
  data = page.text
  soup = BeautifulSoup(data, "lxml")

  # Get an entire div.
  ski_data = soup.findAll('div', {'id' : 'trail-content'})

  # Using this Stackoverflow post to figure out how to get the text I need.
  # https://stackoverflow.com/questions/13202087/beautiful-soup-find-children-for-particular-div
  for tag in ski_data:
    tab = tag.findAll('div', {'class': 'trails-report'})
    for tag2 in tab:
      trail_list.append(tag2.text)      # This gets all the trails by name.

    # Now to get trail conditions
    tab = tag.findAll('div', {'class': 'condition'})
    for img in tab:
      #print (img.findAll('img')[0].get('src'))  # This gets all the image sources that we need!
      img_src = img.findAll('img')[0].get('src')
      trail_status.append(img_src)
      # if (img_src == open_src)
      #   open_trails.append(img_src)     # open trails
      # else
      #   closed_trails.append(img_src)   # closed trails

  # Print all trails
  #print ("All the trails I found are: \n")

  # for trail in trail_list:
  #   print (trail)

  # Now let's print out open / closed status for trails!
  # I HOPE THIS WORKS.
  list_length = len(trail_list)

  # print ("*****************************")
  # print ("* Trail List / Trail Status *")
  # print ("*****************************")

  for a in range(list_length):
    if (trail_status[a] == open_src):
      open_trails.append(trail_list[a])
      say = "open"
    else:
      closed_trails.append(trail_list[a])
      say = "closed"

  # Dump to trails object.
  JSON_trails['bretton_woods_open'] = open_trails
  JSON_trails['bretton_woods_closed'] = closed_trails

  print ("\n")

# Loon Mt
def loon():
  print ("NOT DONE.\n")

  open_trails = []
  closed_trails = []

  # Dump to trails object.
  JSON_trails['loon_open'] = open_trails
  JSON_trails['loon_closed'] = closed_trails

# Cranmore Mt
def cranmore():
  print ("NOT DONE.\n")

  open_trails = []
  closed_trails = []

  # Dump to trails object.
  JSON_trails['cranmore_open'] = open_trails
  JSON_trails['cranmore_closed'] = closed_trails

# Main loop for data gathering
for num in range(0, len(urls)):
  print (mountains[num] + " lift / trail conditions")
  print ("Current URL to check: " + urls[num] + "\n")

  if (num == 0):
    waterville()

  if (num == 1):
    cannon()

  if (num == 2):
    bretton_woods()

  if (num == 3):
    loon()

  if (num == 4):
    cranmore()

# Dump to JSON file now.
# Stackoverflow post this is from:
# https://stackoverflow.com/questions/16267767/python-writing-json-to-file
with open("json/ski.json", "w") as outfile:
  json.dump(JSON_trails, outfile, indent=4)