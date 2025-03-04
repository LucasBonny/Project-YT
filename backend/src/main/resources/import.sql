INSERT INTO sw_perfil (descricao) VALUES ('Administrador');
INSERT INTO sw_perfil (descricao) VALUES ('Funcionário');

INSERT INTO sw_usuario(nome, login, senha, email, perfil_id) VALUES ('Lucas', 'lucas', '$2a$10$O8Xv6lu/.uqhXexWrui1tOo6ZXDk.//jsSn91GtIVHdVkZa08G5oS', 'lucasbonnyb8@gmail.com', 1);
INSERT INTO sw_usuario(nome, login, senha, email, perfil_id) VALUES ('Gabriel', 'gabriellima', '$2a$10$O8Xv6lu/.uqhXexWrui1tOo6ZXDk.//jsSn91GtIVHdVkZa08G5oS', 'gabriellima@gmail.com', 2);

INSERT INTO sw_recurso(nome, chave) VALUES ('Login', '213412');
INSERT INTO sw_recurso(nome, chave) VALUES ('Login1', '2134123');
INSERT INTO sw_recurso(nome, chave) VALUES ('Login2', '2134124');
