# Common configuration
import os
from nbi_base import app

# common static folder path
app.config['STATIC_FOLDER'] = os.path.abspath("nbi_base/static")
