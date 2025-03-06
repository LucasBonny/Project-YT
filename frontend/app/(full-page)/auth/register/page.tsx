/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useMemo, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { LoginService } from '@/service/LoginService';
import { Toast } from 'primereact/toast';

const RegisterPage = () => {

    let usuarioVazio: Projeto.Usuario = {
            id: 0,
            nome: '',
            login: '',
            senha: '',
            email: '',
            perfil: {
                id: 0,
                descricao: ''
            }
        };

    const [usuario, setUsuario] = useState<Projeto.Usuario>(usuarioVazio);

    const loginService = useMemo(() => new LoginService(), []);
    const toast = useRef<Toast>(null);
    
    const { layoutConfig } = useContext(LayoutContext);
    
    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, nome: string) => {
        const val = (e.target && e.target.value) || '';
        let _usuario = { ...usuario };
        (_usuario as any)[nome] = val;

        setUsuario(_usuario);
    };

    const insertUser = () => {
        loginService.insertUser(usuario).then(() => {
            toast.current?.show({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Usuário Criado!',
                life: 5000
            });
            setUsuario(usuarioVazio);
        }).catch((error) => {
            toast.current?.show({
                severity: 'error',
                summary: 'Erro!',
                detail: error.response.data.content.message,
                life: 5000
            });
        });
    };

    return (
        <div className={containerClassName}>
            <Toast ref={toast} /> 
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Registro</div>
                        </div>

                        <div>
                            <label htmlFor="nome1" className="block text-900 text-xl font-medium mb-2">
                                Nome
                            </label>
                            <InputText id="nome1" value={usuario.nome}
                                onChange={(e) => onInputChange(e, 'nome')} type="text" placeholder="Insira seu nome" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="login1" className="block text-900 text-xl font-medium mb-2">
                                Login
                            </label>
                            <InputText id="login1" value={usuario.login}
                                onChange={(e) => onInputChange(e, 'login')} type="text" placeholder="Insira seu login" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText id="email1" value={usuario.email}
                                onChange={(e) => onInputChange(e, 'email')} type="text" placeholder="Insira seu email" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Senha
                            </label>
                            <Password inputId="password1"value={usuario.senha}
                                onChange={(e) => onInputChange(e, 'senha')} placeholder="Insira sua senha" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" onClick={() => router.push('/auth/login')} style={{ color: 'var(--primary-color)' }}>
                                    Ja sou registrado!
                                </a>
                            </div>
                            <Button label="Registrar" className="w-full p-3 text-xl" onClick={() => insertUser()}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
