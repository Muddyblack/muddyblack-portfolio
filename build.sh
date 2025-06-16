cd "$(dirname "$0")"

git pull

npm run build

sudo cp -r out/* /var/www/html/