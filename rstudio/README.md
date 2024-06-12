
# RStudio Web IDE

<p align="center">
  <img width="250" src="/plugins/rstudio/assets/RStudio_logo_flat.svg" onerror="this.src='https://marketplace.thinger.io/plugins/rstudio/assets/RStudio_logo_flat.svg';this.onerror='';" alt="RStudio logo">
</p>

RStudio® is an integrated development environment (IDE) for R, a programming language for statistical computing and graphics. The RStudio Web IDE plugin provides a web-based RStudio Server instance that can be accessed from the Thinger.io console.

Integrating RStudio with Thinger.io can greatly benefit data scientists, IoT developers, and researchers who need to analyze and visualize IoT data effectively. This integration empowers professionals across various domains to make data-driven decisions and optimize their IoT solutions.

<p align="center">
  <img src="/plugins/rstudio/assets/screen-front.png" onerror="this.src='https://marketplace.thinger.io/plugins/rstudio/assets/screen-front.png';this.onerror='';" alt="Thinger.io web console with Node-RED plugin and ad-hoc nodes">
</p>

## Thinger.io and RStudio integration

RStudio can be used alongside Thinger.io for various related tasks:

- Data Analysis: RStudio provides powerful tools for data analysis and visualization, making it ideal for analyzing the data collected from IoT devices connected to Thinger.io
- Statistical Modeling: With RStudio, you can perform statistical modeling and machine learning tasks on IoT data to derive insights, detect patterns, and make predictions.
- Integration: RStudio can be integrated with Thinger.io APIs to directly access and manipulate IoT data within R environment, enabling seamless integration of IoT data into your R-based workflows.
- Automated Reporting: You can automate the generation of reports and summaries based on IoT data using RMarkdown in RStudio. This feature enables the creation of customized reports that can be automatically generated and shared at regular intervals.

Overall, RStudio Plugin complements Thinger.io by providing advanced data analysis, visualization, and modeling capabilities, empowering users to derive valuable insights from IoT data collected and managed through Thinger.io platform.

## Get Started

After installing the RStudio Web IDE Plugin, to start making requests to Thinger.io API, the following environment variables are available:

- THINGER_HOST
- THINGER_USER
- THINGER_TOKEN_RSTUDIO_PLUGIN

With these environment variables, you can make requests to Thinger.io API using httr2 package in R.

Install httr2 package to make HTTP requests to Thinger.io API, in this case to list all the buckets of a user:

```r
TOKEN <- Sys.getenv("THINGER_TOKEN_RSTUDIO_PLUGIN")
USER <- Sys.getenv("THINGER_USER")
HOST <- Sys.getenv("THINGER_HOST")

library(httr2)
req <- request(paste("https://",HOST,"/v1/users/",USER,"/buckets", sep="")) |> req_auth_bearer_token(TOKEN)

resp <- req_perform(req)
resp

```

## Additional Resources

You may refer to the official website of R for additional resources and documentation: [R](https://www.r-project.org/), as well as the official website of RStudio for more information on RStudio IDE: [RStudio](https://www.rstudio.com/).

## License

R is distributed under the GNU GPL v2 license. RStudio is distributed under the AGPL v3 license. For more information, please refer to the official websites of [R](https://www.r-project.org/), the Rocker Dockerfiles used by the plugin are licensed under the GPL 2 or later. [RStudio](https://www.rstudio.com/). RStudio® is a registered trademark of RStudio, Inc.

No affiliation with R, Rocker or RStudio is implied or intended by this plugin.