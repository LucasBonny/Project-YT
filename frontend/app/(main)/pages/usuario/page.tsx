'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Projeto } from '@/types';
import { UsuarioService } from '@/service/UsuarioService';
import { PerfilService } from '@/service/PerfilService';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

const Usuario = () => {
    let usuarioVazio: Projeto.Usuario = {
        id: null,
        nome: '',
        login: '',
        senha: '',
        email: '',
        perfil: {
            id: null,
            descricao: ''
        }
    };

    const [usuarios, setUsuarios] = useState<Projeto.Usuario[]>([]);
    const [usuarioDialog, setUsuarioDialog] = useState(false);
    const [deleteUsuarioDialog, setDeleteUsuarioDialog] = useState(false);
    const [deleteUsuariosDialog, setDeleteUsuariosDialog] = useState(false);
    const [usuario, setUsuario] = useState<Projeto.Usuario>(usuarioVazio);
    const [selectedUsuarios, setSelectedUsuarios] = useState<Projeto.Usuario[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const usuarioService = useMemo(() => new UsuarioService(), []);
    const perfilService = useMemo(() => new PerfilService(), []);
    const [perfil, setPerfil] = useState<Projeto.Perfil[]>([]);
    const [shouldReloadResources, setShouldReloadResources] = useState(false);

    useEffect(() => {
        const loadData = () => {
            usuarioService.listarTodos()
                .then((response) => {
                    setShouldReloadResources(false); 
                    setUsuarios(response.data.content);
                })
                .catch((error) => {
                    console.log(error);
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'Falha ao carregar usuários',
                        life: 5000
                    });
                });
        };
        if (shouldReloadResources || usuarios.length === 0) {
            loadData();
        }
    }, [usuarioService, shouldReloadResources, usuarios.length]);

    useEffect(() => {
        if(usuarioDialog) {
            perfilService.listarTodos().then((response) => {
                setPerfil(response.data.content);
                setShouldReloadResources(false);
            }).catch((error) => {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro!',
                    detail: error.response.data.content.message,
                    life: 5000
                });
            });
        }
    }, [perfilService, usuarioDialog]);

    const openNew = () => {
        setUsuario(usuarioVazio);
        setSubmitted(false);
        setUsuarioDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUsuarioDialog(false);
    };

    const hideDeleteUsuarioDialog = () => {
        setDeleteUsuarioDialog(false);
    };

    const hideDeleteUsuariosDialog = () => {
        setDeleteUsuariosDialog(false);
    };

    const saveUsuario = () => {
        setSubmitted(true);
    
        const requiredFields = ['nome', 'login', 'senha', 'email']; 
        
        const hasEmptyField = requiredFields.some(field => 
            !usuario[field]?.trim()
        );
    
        if (hasEmptyField) {
            toast.current?.show({
                severity: 'error',
                summary: 'Erro!',
                detail: 'Preencha todos os campos obrigatórios',
                life: 5000
            });
            return;
        }
    
        let _usuarios = [...(usuarios as any)];
        
        if (usuario.id) {
            usuarioService.alterar(usuario)
            toast.current?.show({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Usuário Atualizado',
                life: 5000
            });
            setShouldReloadResources(true);
        } else {
            usuarioService.inserir(usuario)
                .then(() => {
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Usuário Criado!',
                        life: 5000
                    });
                    setShouldReloadResources(true);
                })
                .catch((error) => {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Erro!',
                        detail: error.response?.data?.message || 'Erro desconhecido',
                        life: 5000
                    });
                });
        }
    
        setUsuarios(_usuarios as any);
        setUsuarioDialog(false);
        setUsuario(usuarioVazio);
    };

    const editUsuario = (usuario: Projeto.Usuario) => {
        setUsuario({ ...usuario });
        setUsuarioDialog(true);
    };

    const onSelectPerfilChange = (perfil: Projeto.Perfil) => {
        let _usuario = { ...usuario };
        _usuario.perfil = perfil;
        setUsuario(_usuario);
    }

    const confirmDeleteUsuario = (usuario: Projeto.Usuario) => {
        setUsuario(usuario);
        setDeleteUsuarioDialog(true);
    };

    const deleteUsuario = () => {
        let _usuarios = (usuarios as any)?.filter((val: any) => val.id !== usuario.id);
        setUsuarios(_usuarios);
        setDeleteUsuarioDialog(false);
        setUsuario(usuarioVazio);
        usuarioService.excluir(usuario.id)
        .then(() => {
            setUsuarios([]);
            toast.current?.show({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Usuário Deletado',
                life: 5000
            });
        }).catch((error) => {
            toast.current?.show({
            severity: 'error',
            summary: 'Erro!',
            detail: 'Erro ao deletar usuário',
            life: 5000
        });
        }
        );
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteUsuariosDialog(true);
    };

    const deleteSelectedUsuarios = () => {
        selectedUsuarios.map((usuario) => {
            let _usuarios = (usuarios as any)?.filter((val: any) => val.id !== usuario.id);
            setUsuarios(_usuarios);
            usuarioService.excluir(usuario.id)
            .then(() => {
                setUsuarios([]);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Usuário Deletado',
                    life: 5000
                });
            }).catch((error) => {
                toast.current?.show({
                severity: 'error',
                summary: 'Erro!',
                detail: error.response.data.content.message,
                life: 5000
            });
            });
        });
        setDeleteUsuariosDialog(false);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, nome: string) => {
        const val = (e.target && e.target.value) || '';
        let _usuario = { ...usuario };
        _usuario[`${nome}`] = val;

        setUsuario(_usuario);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Excluir" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedUsuarios || !(selectedUsuarios as any).length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Importar" className="mr-2 inline-block" />
                <Button label="Exportar" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const idBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    };

    const nomeBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <span className="p-column-title">Nome</span>
                {rowData.nome}
            </>
        );
    };

    const loginBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <span className="p-column-title">Login</span>
                {rowData.login}
            </>
        );
    };

    const emailBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    };

    const descricaoBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <span className="p-column-title">Descrição</span>
                {rowData.perfil.descricao}
            </>
        );
    };

    const actionBodyTemplate = (rowData: Projeto.Usuario) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editUsuario(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteUsuario(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciamento de usuários</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const usuarioDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={saveUsuario} />
        </>
    );
    const deleteUsuarioDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteUsuarioDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteUsuario} />
        </>
    );
    const deleteUsuariosDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteUsuariosDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteSelectedUsuarios} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={usuarios}
                        selection={selectedUsuarios}
                        onSelectionChange={(e) => setSelectedUsuarios(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} de {last} com {totalRecords} usuários"
                        globalFilter={globalFilter}
                        emptyMessage="Sem usuários registrados."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="nome" header="Nome" sortable body={nomeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="login" header="Login" sortable body={loginBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="descricao" header="Descrição" sortable body={descricaoBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={usuarioDialog} style={{ width: '450px' }} header="Detalhes do usuário" modal className="p-fluid" footer={usuarioDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="nome">Nome</label>
                            <InputText
                                id="nome"
                                value={usuario.nome}
                                onChange={(e) => onInputChange(e, 'nome')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !usuario.nome
                                })}
                            />
                            {submitted && !usuario.nome && <small className="p-invalid">Nome é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="login">Login</label>
                            <InputText
                                id="login"
                                value={usuario.login}
                                onChange={(e) => onInputChange(e, 'login')}
                                required
                                className={classNames({
                                    'p-invalid': submitted && !usuario.login
                                })}
                            />
                            {submitted && !usuario.login && <small className="p-invalid">Login é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="senha">Senha</label>
                            <InputText
                                id="senha"
                                value={usuario.senha}
                                onChange={(e) => onInputChange(e, 'senha')}
                                required
                                className={classNames({
                                    'p-invalid': submitted && !usuario.senha
                                })}
                            />
                            {submitted && !usuario.senha && <small className="p-invalid">Senha é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText
                                id="email"
                                value={usuario.email}
                                onChange={(e) => onInputChange(e, 'email')}
                                required
                                className={classNames({
                                    'p-invalid': submitted && !usuario.email
                                })}
                            />
                            {submitted && !usuario.email && <small className="p-invalid">Email é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="descricao">Descrição</label>
                            <Dropdown
                                value={usuario.perfil}
                                options={perfil}
                                onChange={(e: DropdownChangeEvent) => onSelectPerfilChange(e.value)}
                                optionLabel="descricao"
                                placeholder="Selecione um perfil"
                                required
                                className={classNames({
                                    'p-invalid': submitted && !usuario.descricao
                                })}
                            />
                            {submitted && !usuario.descricao && <small className="p-invalid">Perfil obrigatório.</small>}
                        </div>

                    </Dialog>

                    <Dialog visible={deleteUsuarioDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsuarioDialogFooter} onHide={hideDeleteUsuarioDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {usuario && (
                                <span>
                                    Tem certeza de que deseja excluir <b>{usuario.nome}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUsuariosDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUsuariosDialogFooter} onHide={hideDeleteUsuariosDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {usuario && <span>Tem certeza de que deseja excluir os usuários selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Usuario;
