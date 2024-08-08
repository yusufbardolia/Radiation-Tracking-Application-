
# Big Data Project - Topic C

  
  

## Name

**Radiation Tracking: Real-Time Monitoring and Visualization System**

  

## Description

**Radiation Tracking** project developed is a interface which **shows and monitors** real time radiation levels in different places. Due to Advent of IoT now it is possible and feasible to monitor radiation in real time and receive **large amount of data** to be monitored. The challenge arises in **processing** this big data and making it visualize on the map to make it easy for the user to understand and know the different radiation levels affecting at difference locations. We used safecast dataset, that comprises of large amount of data comprising of Latitude, Longitude, Radiation Value, and Timestamps etc. This data is useful to process and visualize the large amount of data on the **web UI** which is created.

  

## Badges

![Contributors](https://img.shields.io/badge/contributors-4-blue)



## Visuals

<p>
  <img src="https://collaborating.tuhh.de/e-19/teaching/bd24_project_a8_c/-/raw/main/Images/UI-Snippet.png?ref_type=heads" alt="User Interface" width="500">
  <br>
  
> Web UI for the system showing the radiation Tracking markers and data with configurable viewing speed slider along with map legend and data in a text box showing.
</p>

<p>
  <img src="https://collaborating.tuhh.de/e-19/teaching/bd24_project_a8_c/-/raw/main/Images/Docker-Desktop-UI.png" alt="User Interface" width="500">
  <br>
  
> Docker Desktop showing the docker images running which are already uploaded on the docker hub.
</p>

## Installation

For setting up this project, follow the steps mentioned below.

 1. Install the docker desktop or docker (if not present already).

> https://docs.docker.com/desktop/install/windows-install/

 2. After making sure, docker engine is successfully running and installed on the system, clone this repository
> git clone https://collaborating.tuhh.de/e-19/teaching/bd24_project_a8_c.git

 3. After repository is successfully cloned. Sample root directory looks like this

> B:\Big Data Project\bd24_project_a8_c     

Run the following command in the root directory of the folder. This will run the docker images in the docker engine which can be viewed in the docker desktop.
> docker compose up -d 

 

 4. After making sure that the images are up and running, navigate to the frontend folder from the root directory
> cd frontend
 5. Run  `index.html` file. User interface will appear as shown in the visuals.

 **Running the project on Google Cloud**

 As we were provided with the credits and google cloud Education we deployed our system on Google Cloud VM instance.
The way to access it is as follows. We have already shared a role to one of the consultant to validate.

>Start the instance named "instance-20240708-172605" on gcp.

>Go to the directory named bd24_project_a8_c with the command "cd "bd24_project_a8_c/".

>Now run the docker compose file by "sudo docker compose up -d".


>Run the above command if any of the docker container doesn't start and see the status of the docker containers by running command "sudo docker ps -a".

>If all the containers are up and running  just click on this link "http://34.159.170.164/".

>You will see the data markers on the map after few minutes.

 **Running the project on Google Cloud with Git Clone**
 > Repeat the above mentioned steps; however, for freshly cloned repository run this command `sudo mv frontend/* /var/www/html/` in the root directory of the project folder after cloning the repository so that file is live on the external IP. 

  **Note**: However, VM instance is already set up and only by running `docker compose up -d` it can be accessed by the IP Provided 

## Support

For any type of support you can reach out to us on the following contact address:
<br>
- Muhammad Ibad Saleem (`muhammad.saleem@tuhh.de`)<br>
- Farhan Shariyar (`farhan.farhan.shahriyar@tuhh.de)`<br>
- Muneer Khan (`mohd.khan@tuhh.de)`<br>
- Yusuf Bardolia (`yusuf.bardolia@tuhh.de`)

## Roadmap

Our ideas for future releases is to include BigData handling through cloud platforms to limit the dependency on the systems of the individual. Moreover, our roadmap for future is to release more stress handling system.
  

## Contributing

We are open for contributions and would really like for the contributions regarding the perfection of the markers on the map and including more detailed spread of the value. It would be great to include system for handling large datasets and creating a detailed radiation tracking,

  

## Authors and acknowledgment
#### Acknowledgements

We would like to express our gratitude to the following individuals and organizations for their support and contributions to this project:

-   **Prof. Dr. Stefan Schulte** - For providing a conducive learning environment and supporting our project with the required infrastructure and resources.
-   **Google Cloud Platform for Education** - For providing the necessary cloud resources and services that enabled us to develop and deploy our application efficiently.
-   **Nisal Hemadasa** - For his guidance and mentorship throughout the project, offering valuable insights and suggestions.


Your support has been instrumental in the successful completion of this project. Thank you!
### Authors
This project was developed with contributions from the following individuals:

 1. Muhammad Ibad Saleem
 

> Worked on the frontend part and integration part including websocket and consumer. Published Docker images for the consumer and websocket part.

 2. Farhan Shariyar (Project Co-ordinator)
> Implemented frontend improvements such as better UI/UX design, layout adjustments, bug fixes, and component updates. Also added WebSocket integration for real-time communication.

 4. Muneer Khan

> Worked on Producer part and the connection of Flink streaming and processing. Moreover, published docker images of producer and flink streaming.

 6. Yusuf Bardolia

> Worked on Google Cloud Platform for the deployment of the system. In addition to it, also developed producer for the kafka




  

## License

Most of the libraries and dependencies used are from the open source libraries.
  

## Project status

Currently, the project does all the requirements needed for the implementation of the system. However, theren are still many improvements that could be performed ranging from Data Handling to implementing a smooth pipeline for the implementation of the system.

## Tools and Technologies Used 
<p align="center">
 <img src="https://miro.medium.com/v2/resize:fit:594/1*MLFxdoY6ImiTghX9l0lDTA.png" alt="Docker" height="100">
  <img src="https://miro.medium.com/v2/resize:fit:770/1*Lz_A9oxbKQ8aBbD6djdwkw.png" alt="Docker Desktop" height="100">
   <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" alt="HTML" height="100"> 
   <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" alt="CSS" height="100"> 
   <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" height="100"> 
   <img src="https://miro.medium.com/v2/resize:fit:900/1*TY9uBBO9leUbRtlXmQBiug.png" alt="Node.js" height="100"> 
   <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python" height="100"> 
   <img src="https://media.licdn.com/dms/image/D4D12AQErU_bJy7GugQ/article-cover_image-shrink_600_2000/0/1654708192411?e=2147483647&v=beta&t=28VA7MXUuikbiVnis4oPbStbIAxF5OA3pegHx--Beno" alt="Apache Flink" height="100"> 
   <img src="https://upload.wikimedia.org/wikipedia/commons/0/0a/Apache_kafka-icon.svg" alt="Apache Kafka" height="100"> 
   <img src="https://cloud.google.com/images/social-icon-google-cloud-1200-630.png" alt="Google Cloud Platform" height="100"> 
<img src="https://code.visualstudio.com/assets/images/code-stable.png" alt="Visual Studio Code" height="100"> 
<img src="https://miro.medium.com/v2/resize:fit:1400/1*YjOtv5OOEP744YTdzBxWsw.png" alt="Visual Studio Code" height="100"> 
