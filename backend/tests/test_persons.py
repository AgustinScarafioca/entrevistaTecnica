def test_get_personas_empty(client):
    r = client.get("/personas")
    assert r.status_code == 200
    assert r.json() == []


def test_create_person_success_and_list(client):
    r = client.post("/personas", json={"nombre": "Agustin", "edad": 27})
    assert r.status_code == 201
    body = r.json()

    assert "id" in body
    assert body["nombre"] == "Agustin"
    assert body["edad"] == 27
    assert "created_at" in body

    r2 = client.get("/personas")
    assert r2.status_code == 200
    arr = r2.json()
    assert len(arr) == 1
    assert arr[0]["nombre"] == "Agustin"


def test_create_person_validation_error_shape(client):
    r = client.post("/personas", json={"nombre": "A", "edad": 200})
    assert r.status_code == 422

    data = r.json()
    assert "error" in data
    assert data["error"]["code"] == "VALIDATION_ERROR"
    assert isinstance(data["error"]["details"], list)
    assert any(d.get("field") in ("nombre", "edad") for d in data["error"]["details"])