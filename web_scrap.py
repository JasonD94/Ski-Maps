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

  trail_list = []
  trail_status = []
  open_trails = []
  closed_trails = []

  #Get the page, then grab just the text and use BeautifulSoup to work some magic on it.
  page = requests.get(urls[1])
  data = page.text
  soup = BeautifulSoup(data, "lxml")

  # Get lift status
  # From stackoverflow:
  # https://stackoverflow.com/questions/13074586/extracting-selected-columns-from-a-table-using-beautifulsoup
  tables = soup.find('table')

  rows = tables.findAll('tr')
  for cells in rows:
    cell = cells.findAll('td')
    trail_list.append(cell[0].text)
    trail_status.append(cell[1].text)

  # Get trail status
  # THIS TRICK COMES FROM STACKOVERFLOW!
  # https://stackoverflow.com/questions/14095511/beautifulsoup-in-python-getting-the-n-th-tag-of-a-type
  tables = soup.findAll('table')[1]

  rows = tables.findAll('tr')
  for cells in rows:
    if (len(cells) == 4):
      cell = cells.findAll('td')
      trail_list.append(cell[0].text)
      trail_status.append(cell[1].text)

  # # Print for debugging purposes.
  # print ("Trails: \n")

  # for trail in trail_list:
  #   print (trail)

  # print ("Status: \n")

  # for status in trail_status:
  #   print (status)

  # Now let's figure out open / closed status for trails!
  list_length = len(trail_list)

  for a in range(list_length):
    if (trail_status[a] == 'open'):
      open_trails.append(trail_list[a])
    else:
      closed_trails.append(trail_list[a])


  # Dump to trails object.
  JSON_trails['cannon_open'] = open_trails
  JSON_trails['cannon_closed'] = closed_trails

# Bretton Woods
def bretton_woods():

  trail_list = []       # List of all the trails, in order on the page.
  trail_status = []     # List of trail status, in order on the page.
  open_trails = []      # All the open trails or lifts
  closed_trails = []    # All the closed trails or lifts

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
      img_src = img.findAll('img')[0].get('src')  # This gets the trail status (by image source)
      trail_status.append(img_src)

  # Now let's figure out open / closed status for trails!
  list_length = len(trail_list)

  for a in range(list_length):
    if (trail_status[a] == open_src):
      open_trails.append(trail_list[a])
    else:
      closed_trails.append(trail_list[a])

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