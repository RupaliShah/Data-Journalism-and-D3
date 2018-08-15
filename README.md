# Data Journalism with D3

Correlation between Poverty and hysical Activity, each measured state by state and taken from different data sources is visualized with a scatter plot, and the graphic is embedded into an .html file.

<p align="center">
  <img width="600" height="300" src="images/scatter plot.png">
</p>

## Dataset

* The poverty data is obtained from the [American FactFinder](http://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml) and downloaded as a .csv file.

  * Topics -> Dataset -> 2014 ACS 1-year estimates

  * Geographies -> Select a geographic type -> State - 040 -> All States within United States and Puerto Rico

* Data on physical activity is obtained from the [Behavioral Risk Factor Surveillance System](https://chronicdata.cdc.gov/Behavioral-Risk-Factors/BRFSS-2014-Overall/5ra3-ixqq) and downloaded as a .csv file.

## Data Formatting and Visualizing

* Data is merged and formatted in excel with appropriate header names.To ensure a moderate correlation, data is tested with Excel's =CORREL() function for a value either less than -0.5 or more than 0.5.

* The Scatter Plot is embedded with an iframe.

* Tooltips are created using a plugin 'd3-tip.js' developed by [Justin Palmer](https://github.com/Caged). Clicking on the circles displays a tooltip with the data that the user has selected.