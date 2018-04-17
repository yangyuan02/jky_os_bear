# 教科院 - 后台管理
# 开发环境
cp config/index.js.example config/index.js
docker network create thrive_jky_bear
docker-compose build
docker-compose run app yarn install
docker-compose up -d

访问浏览器地址 http://127.0.0.1:8080
