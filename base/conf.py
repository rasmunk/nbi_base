# Common configuration
import os
from base import app

# common static folder path
app.config['STATIC_FOLDER'] = os.path.abspath("projects_base/static")
