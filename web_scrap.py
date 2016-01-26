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

import requests
from bs4 import BeautifulSoup

# 5 URLs to scrap for lift / trail data.
# Order is: Waterville Valley, Cannon Mt, Bretton Woods, Loon Mt & Cranmore Mt
urls = ["http://www.waterville.com/ski-ride/snow-report.html",
        "http://cannonmt.com/trail-lift-report.html",
        "http://brettonwoods.com/alpine_conditions/snow_conditions",
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

# Cannon Mt
def cannon():
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

# Bretton Woods
def bretton_woods():
  print ("NOT DONE.\n")

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
    #waterville()

  if (num == 1):
    cannon()

  if (num == 2):
    bretton_woods()

  if (num == 3):
    loon()

  if (num == 4):
    cranmore()
