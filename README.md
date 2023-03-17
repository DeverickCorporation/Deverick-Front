# StarNavi-Network-Frontend
## In this social network you can find truly highly qualified developers!

## [StarNavi-Network](http://91.218.195.45:8004)
## [Documentation](app.swaggerhub.com/apis/SeniorVolodymyr/StarNavi-Network)
## [API](http://91.218.195.45:8003)

### Server setup
1. `mkdir programs/StarNavi-Network-Frontend`
1. `nano programs/StarNavi-Network-Frontend/docker-compose.yaml`
1. `nano programs/StarNavi-Network-Frontend/.env`
1. `sudo nano //etc/systemd/system/starnavi-network-frontend.service`
1. `sudo systemctl daemon-reload`
1. `sudo systemctl enable starnavi-network-frontend.service`
1. `sudo systemctl start starnavi-network-frontend.service`
1. `sudo systemctl status starnavi-network-frontend.service`

### Dev setup
1. Opt: Install [node.js](https://nodejs.org/en/download)
1. `npm i`
1. `npm start`
