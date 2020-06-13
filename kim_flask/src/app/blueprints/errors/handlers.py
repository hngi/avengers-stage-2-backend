from flask import Blueprint, jsonify
from src.app import db


errors_bp = Blueprint('errors', __name__)


@errors_bp.app_errorhandler(400)
def bad_request(error):
    return jsonify({
        "error": 400,
        "message": "Bad request.",
        "success": False
    }), 400


@errors_bp.app_errorhandler(401)
def unauthorized(error, message="Unauthorized"):
    return jsonify({
        "success": False,
        "error": 401,
        "message": message
    }), 401


@errors_bp.app_errorhandler(403)
def permission_not_found(error, message="Access forbidden. You do not have sufficent authorization to access the requested resource."):
    return jsonify({
        "success": False,
        "error": 403,
        "message": message
    }), 403


@errors_bp.app_errorhandler(404)
def not_found(error):
    return jsonify({
        "error": 404,
        "message": "The requested resource does not exist.",
        "success": False
    }), 404


@errors_bp.app_errorhandler(405)
def not_found(error):
    return jsonify({
        "error": 405,
        "message": "Method not allowed",
        "success": False
    }), 405


@errors_bp.app_errorhandler(422)
def unprocessable_entity(error):
    return jsonify({
        "error": 422,
        "message": "The request is unprocessable.",
        "success": False
    }), 422


@errors_bp.app_errorhandler(500)
def internal_serval_error(error):
    db.session.rollback()
    return jsonify({
        "error": 500,
        "message": "Something went wrong on the server.",
        "success": False
    })
    pass
