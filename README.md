# How to Set Up
## 1. Install
* Docker Desktop
* Docker extension in Visual Studio Code

## 2. Set up container
1. Make sure Docker Desktop is opened first
2. Open terminal in VSCode
3. Build Docker container
- `docker build -t foodwastage:v1 .`
4. Run container
- `docker run -d -p 80:80 foodwastage:v1`
5. Go to your browser and enter **localhost/login.html**

## To stop container
* Open terminal in VSCode
* Enter `docker ps` and copy the container id
* Enter `docker stop <container id>`
