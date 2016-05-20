---
layout:     post
title:      "Heat Map of Massachusetts Liquor"
subtitle:   "Never Far from a Drink"
date:       2014-03-27 12:00:00
author:     "Will"
header-img: "img/mapback.png"
---
# Best Laid Plans

When I set out to make a heat map of the Massachusetts liquor licenses I had assumed that getting the data would be the least of my concerns. I was looking forward to a project focused on the design of a heat map, so using a readily available data set would do just the trick. After all, this is public data, what could be difficult about that?

As you might have guessed by the lead up, the punch line is that getting the data in a format that made sense for this project proved to be an enormous pain. 

Massachusetts in all its infinite wisdom has decided, unlike other states, to make their liquor license data as inaccessible as possible. Sure, I could pay $40 for a formal data request, but I'm just making a silly map, so that's not going to happen. Instead I trolled the internet looking for the some fortunate posting that would solve my problem. Fortunately I was able to track down a [CSV off of a GIS forum](http://www.arcgis.com/home/item.html?id=43bbf619300647809ad98c6e80d5cdf2), so everything is in order, right?

Well not quite - it turns out for one reason or another both GIS and Tilemill, which I’d be using for the map data, refused to parse the address data in the CSV, and after many attempts to reconfigure I gave up. You know what doesn’t fail? Latitude and Longitude! Time to geocode me some addresses. 

# Slowly but Surely

Writing own geocoding parser using Google Maps API  ~50-60 Results

Mapbox recommended Google Docs addon ~200-400

Online solutions for using Mapquest API ~ 500 Results

[Google Refine using Google’s Geocoding API](https://opensas.wordpress.com/2013/06/30/using-openrefine-to-geocode-your-data-using-google-and-openstreetmap-api/) ~2000 Results

Final Result (after running Google Refine a few times) - 8500 Results in Lat/Long Format

[Using the Mapbox recommended script to put the results in a GeoJSON](https://github.com/mapbox/geo-googledocs)



# Styling the Data

Since I’m new to working with the heat map tools in GIS I did get a result in the color I wanted, but the map just didn’t feel interactive with that method.

So again taking a page from a [Mapbox post](https://www.mapbox.com/tilemill/docs/guides/designing-heat-maps/) -  I cheated - using transparency to mimic a heat map appearance. Combine that with some zoom specifications and some textures in CartoCSS and we have.

Ta-Da!

![The final Map](/img/finalmap.png)

[Mapbox Map](http://a.tiles.mapbox.com/v3/wjkamovitch.LiquorMap/page.html#10/42.2783/-71.3837)

[Original CSV](/data/data.csv) |
[Excel format with Lat/Long](/data/Every_liquor_license_in_Massachusetts.xlsx) |
[Data in GEOJson format](/data/every_liquor_license_in_massachusetts-1393524410641.geojson)
