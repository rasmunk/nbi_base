from flask import Flask
app = Flask(__name__)

# Load common configuration
import nbi_base.conf
import nbi_base.views
