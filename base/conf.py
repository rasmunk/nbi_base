# Common configuration
import os
import configparser
from base import app

# Load config.ini
res_path = os.path.abspath("res/config.ini")
config = configparser.SafeConfigParser(allow_no_value=True)
config.read(res_path)

# common static folder path
app.config['STATIC_FOLDER'] = config.get('BASE', 'static_folder')
app.config['UPLOAD_FOLDER'] = config.get('BASE', 'upload_folder')
