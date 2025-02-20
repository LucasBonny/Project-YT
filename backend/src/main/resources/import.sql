INSERT INTO sw_perfil (descricao) VALUES ('Administrador');
INSERT INTO sw_perfil (descricao) VALUES ('Funcionário');

INSERT INTO sw_usuario(nome, login, senha, email, perfil_id) VALUES ('Lucas', 'lucasbonny', '123456', 'lucasbonnyb8@gmail.com', 1);
INSERT INTO sw_usuario(nome, login, senha, email, perfil_id) VALUES ('Gabriel', 'gabriellima', '123456', 'gabriellima@gmail.com', 2);

INSERT INTO sw_recurso(nome, chave) VALUES ('Login', '213412');
INSERT INTO sw_recurso(nome, chave) VALUES ('Login1', '2134123');
INSERT INTO sw_recurso(nome, chave) VALUES ('Login2', '2134124');
