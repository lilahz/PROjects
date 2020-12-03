from flask import Blueprint, render_template

from .auth_junior import junior_register, junior_login, junior_logout, hello
from .auth_company import company_register, company_login, company_logout

auth_bp = Blueprint('auth', __name__, template_folder="templates")

auth_bp.add_url_rule('/junior_register', 'junior_register', junior_register, methods=['POST'])
auth_bp.add_url_rule('/junior_login', 'junior_login', junior_login, methods=['POST'])
auth_bp.add_url_rule('/junior_logout', 'junior_logout', junior_logout, methods=['POST'])

auth_bp.add_url_rule('/company_register', 'company_register', company_register, methods=['POST'])
auth_bp.add_url_rule('/company_login', 'company_login', company_login, methods=['POST'])
auth_bp.add_url_rule('/company_logout', 'company_logout', company_logout, methods=['POST'])