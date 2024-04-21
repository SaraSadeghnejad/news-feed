
# news-feed
first change .env.example to .env to have apiKeys and urls
# Docker
Build docker image
docker build -t news-feed .
Run image and add ENV variables to container
docker run -p 8080:8080 news-feed 

Test that your app is running on port 8080 in local browser at http://localhost:8080 and you should see the default screen but the values match ENV variable values passed in your run command.