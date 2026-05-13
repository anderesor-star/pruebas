from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

app = Flask (__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.sqlite')
db = SQLAlchemy(app)
ma = Marshmallow(app)


class Guide(db.Model):
    id = db.Column(db.Integer, primary_key=True) #primary_key sirve para que no se repitan números
    title = db.Column(db.String(100), unique=False)
    content = db.Column(db.String(114), unique=False)

    def __init__(self, title, content):
        self.title = title
        self.content = content   


class GuideSchema(ma.SQLAlchemyAutoSchema):
    class Meta: 
        model = Guide #marshmallow no encontraba tittle, hay que especificar de donde lo cojo
        fields = ("title", "content")
        load_instance = True


guide_schema = GuideSchema()
guides_schema = GuideSchema(many=True)

#endpoint to create a new guide
@app.route("/guide", methods=["POST"])

def add_guide():
    title = request.json["title"]
    content = request.json["content"]

    new_guide = Guide(title, content)

    db.session.add(new_guide)
    db.session.commit()

    guide = Guide.query.get(new_guide.id)

    return guide_schema.jsonify(guide)


#endpoint to query all guides
@app.route("/guides", methods=["GET"])

def get_guides():
    #all_guides = Guide.query.all(), es legacy, mejor no usar
    all_guides = db.session.execute(db.select(Guide)).scalars().all()
    result = guides_schema.dump(all_guides)
    return jsonify(result)


#endpoint for querying a single guide
@app.route('/guide/<id>', methods=['GET'])
def get_guide(id):
    guide = db.session.get(Guide, id) #antes se usaba Guide.query.get(id)
    return guide_schema.jsonify(guide)


#endpoint for updating a guide
@app.route('/guide/<id>', methods=['PUT'])
def guide_update(id):
    guide = db.session.get(Guide, id)
    title = request.json["title"]
    content = request.json["content"]

    guide.title = title
    guide.content = content

    db.session.commit()
    return guide_schema.jsonify(guide)


#endpoint por deleting a guide
@app.route('/guide/<id>', methods=['DELETE'])
def guide_delete(id):
    guide = db.session.get(Guide, id)
    db.session.delete(guide)
    db.session.commit()

    return 'not found'

if __name__ == '__main__':
    app.run(debug=True)