declare namespace Projeto {

    type Usuario = {
        id?: number;
        nome: string;
        login: string;
        senha: string;
        email: string;
        perfil: Perfil;
    };

    type Recurso = {
        id?: number;
        nome: string;
        chave: string;
    }

    type Perfil = {
        id?: number;
        descricao: string;
    }

}