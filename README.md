# Projeto Concrete

endpoints:

POST - /sign_up

{
    "nome": "nome",
    "email": "email",
    "senha": "senha",
    "telefones": [{"telefone": "999999999", "ddd":"99"}]
}

Telefone com 1 ou mais

POST - /sign_in

Enviar objeto:
{
    "email": "email",
    "senha": "senha"
}

GET - /user/:id

Enviar header: { bearer: seu token }