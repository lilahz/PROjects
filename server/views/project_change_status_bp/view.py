from flask import Blueprint, jsonify, request
# from flask_login import login_required
from server.models.Project import Project
import sys

project_change_status_bp = Blueprint('project_change_status', __name__)


def project_change_status():
    print("!!!!!!!!!!!!!!! enter project_change_status !!!!!!!!!!!!!!!")
    sys.stdout.flush()
    data = request.json
    print("data is " + format(data))
    sys.stdout.flush()
    id = data.get('id')
    status = data.get('status')
    Project.change_project_status(id, status)
    return jsonify({'message': 'project status changed successfully'}), 200


project_change_status_bp.add_url_rule('' , 'project_change_status', project_change_status, methods=['POST'])