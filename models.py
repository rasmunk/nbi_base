import shelve
import uuid
import fnmatch
from nbi_base import app

class ShelveObject():

    def __init__(self):
        self._id = str(uuid.uuid4())

    def save(self):
        with shelve.open(app.config['DB']) as db:
            db[self._id] = {key: self.__dict__[key] for key in self.__dict__.keys()}
        return self._id

    # Returns a new instance of the calling class with the same _shelve id.
    @classmethod
    def get(cls, id):
        with shelve.open(app.config['DB']) as db:
            return cls(**db[id])

    # Returns a list of instances of the calling class
    @classmethod
    def get_all(cls):
        with shelve.open(app.config['DB']) as db:
            return [cls.get(key) for key in db.keys()]

    @classmethod
    def remove(cls, shelve_id):
        with shelve.open(app.config['DB']) as db:
            db.pop(shelve_id)

    @staticmethod
    def clear():
        with shelve.open(app.config['DB']) as db:
            db.clear()
            db.sync()

    @classmethod
    def get_with_search(cls, key, value):
        result = []
        search = "*" + value + "*"
        objects = cls.get_all()
        for obj in objects:
            if hasattr(obj, key):
                if len(fnmatch.filter([obj.__dict__[key].lower()], search.lower())) > 0:
                    result.append(obj)
        return result

    @classmethod
    def get_with_first(cls, key, value):
        objects = cls.get_all()
        for obj in objects:
            if hasattr(obj, key):
                if obj.__dict__[key] == value:
                    return obj
        return None
