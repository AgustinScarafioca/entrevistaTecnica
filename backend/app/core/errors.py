from typing import Any, Optional

def error_response(code: str, message: str, details: Optional[list[dict[str, Any]]] = None):
    return {
        "error": {
            "code": code,
            "message": message,
            "details": details or [],
        }
    }