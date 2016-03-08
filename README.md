# Ski Maps - Planning ski trips made easy
Ski Maps makes it easy find the current ski conditions at several NH ski resorts.

![alt text](http://downing.io/Ski-Maps/img/demo.png "Demo")

The site will allow users to view the current conditions for the following Ski Resorts:
- Bretton Woods
- Cannon
- Cranmore
- Loon
- Pats Peak
- Waterville Valley

## URLs
A demo of client side programming may be found at the following URL:

http://downing.io/Ski-Maps/

A demo of the full project (with back-end) will be found at the following URL:

http://aws.downing.io/Dynamic-Ski-Maps/
(this should end up being a custom domain at some point)

## Powered by JS & Python
Ski Maps is built using HTML5, along with various CSS / JS libraries.

On the front end, we're using
[Bootstrap](https://getbootstrap.com/),
[jQuery](https://jquery.com/),
[jQuery Maphilight](https://github.com/kemayo/maphilight),
and [Image Map Resizer](https://github.com/davidjbradshaw/image-map-resizer).

On the back end we're planning on just using
[Python](https://www.python.org/),
along with
[BeautifulSoup](http://www.crummy.com/software/BeautifulSoup/)
which is a Python library for web scrapping.

We may consider using a combination of or some of:
[node.js](https://nodejs.org/en/),
[Angular.js](https://angularjs.org/),
and [Django](https://www.djangoproject.com/).

## Running web_scrap.py
To run the Python script, you will need to have Python3 and BeautifulSoup installed.

Install it by running the following command:

```
sudo apt-get install python3-bs4
```

web_scrap.py tested using Ubuntu 14.04 LTS.
