# Deverick-Frontend
## In this social network you can find truly highly qualified developers!

## [Deverick](http://91.218.195.45:8004)
## [Documentation](app.swaggerhub.com/apis/SeniorVolodymyr/Deverick)
## [API](http://91.218.195.45:8003)

### Server setup
1. `mkdir programs/Deverick-Frontend`
1. `nano programs/Deverick-Frontend/docker-compose.yaml`
1. `nano programs/Deverick-Frontend/.env`
1. `sudo nano //etc/systemd/system/deverick-frontend.service`
1. `sudo systemctl daemon-reload`
1. `sudo systemctl enable deverick-frontend.service`
1. `sudo systemctl start deverick-frontend.service`
1. `sudo systemctl status deverick-frontend.service`

### Dev setup
1. Opt: Install [node.js](https://nodejs.org/en/download)
1. `npm i`
1. `npm start`
