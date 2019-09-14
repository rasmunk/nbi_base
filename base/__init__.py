from flask import Flask
app = Flask(__name__)

# Load common configuration
import base.conf
import base.views
