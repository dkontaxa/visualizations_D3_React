Welcome to the Readme for the Lake Powell Storage Volume React App!

Overview
This React app displays two charts of the Lake Powell Storage Volume using reusable components. The two charts used are an area chart with the name "AreaChart.js" and a simple line chart with the name "LineChart". These components pass props of width, data, margin, etc. so that they could be used across the app with different values.

Chart Considerations
The x-axis scale is being set based on the extent of the data, and time aggregation (if applicable). This means that for different time aggregations, the x-axis ticks and labels will be different, but the overall shape of the area chart will remain the same. Additionally, the y-axis scale is being set based on the maximum value in the data, which would also contribute to the consistent shape of the chart.

Technical Details
The app was developed using both React and D3.js. D3.js is a robust and versatile library that provides extensive customization options. However, it can be challenging and time-consuming to work with due to its complexity.
The data was originally intended to be fetched from a government URL but due to CORS origin errors, the JSON data was added as an asset from this project.

How to Use
To use the app, simply download or clone the repository, and run "npm install" to install the required packages. Then run "npm start" to start the app on your local machine. The charts should be displayed automatically.

Thank you for using the Lake Powell Storage Volume React App!
