cd "$(dirname "$0")"

npm run build

sudo cp -r out/* /var/www/html/