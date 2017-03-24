recipe generator

# Requirements
* NodeJS v6.x - v7.x
  * NPM v3.x
* PHP 7.0.x
  * [composer v2.x](https://getcomposer.org/download/)
* nginx 1.10.x

* mongodb 3.x (for saving images)

# Installation

Clone the latest
```bash
git clone git@github.com:martiansf/recipegen.git
```

Install all needed PHP packages
```bash
~/composer.phar install
```
Install [larpug](https://github.com/acidjazz/larpug)'s required modules
```bash
npm i --prefix vendor/acidjazz/larpug/node/
```

Install all needed NPM packages
```bash
npm install
```

Copy either `.env.dev` (or whichever is your preference) to `.env` and modify `APP_EDITOR` to your liking

Optional: (image saving) modify `DB_*` and `S3_*` then run migrations to create tables/etc
```bash
php artisan migrate
```

Suggested `nginx.conf` setup, place `recipegen.conf` in your `/usr/local/etc/nginx/servers` with this content

```nginx
server {

  listen 8080;
  root /Users/k/recipegen/public/;
  try_files $uri $uri/ /index.php?$query_string;
  index index.php;
  server_name recipegen.dev;

  location ~ \.php$ {

  fastcgi_split_path_info ^(.+\.php)(/.+)$;
  fastcgi_pass 127.0.0.1:9000;
  fastcgi_index index.php;
  include fastcgi.conf;

  # dev env settings
  fastcgi_param PHP_VALUE "short_open_tag=on \n display_errors=on \n error_reporting=E_ALL";

  # prod env settings
  # fastcgi_param PHP_VALUE "short_open_tag=on \n display_errors=off \n error_reporting=E_ALL";
  }

}
```
* Replace `/Users/k/recipegen` with the folder you clone the repo to

For BrowserSync support (highly recommended)
* Point recipegen.dev to 127.0.0.1 in your `/etc/hosts` file
* Run `npm run sync`
* test one two
