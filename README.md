# Installation and Deployment

# Install dependencies
npm install

# Build and export static site
# This will create a static export in the 'out' directory
npm run build
npm run export

# The static files will be in the 'out' directory
# To deploy to a web server (if you have permissions):
sudo cp -r out/* /var/www/html/

# Or you can serve the out directory using any static file server
# Example using python's built-in server:
# cd out && python3 -m http.server 8000