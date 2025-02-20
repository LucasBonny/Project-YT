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
import { PerfilService } from '@/service/PerfilService';

const Perfil = () => {
    let perfilVazio: Projeto.Perfil = {
        id: 0,
        descricao: ''
    };

    const [perfils, setPerfils] = useState<Projeto.Perfil[]>([]);
    const [perfilDialog, setPerfilDialog] = useState(false);
    const [deletePerfilDialog, setDeletePerfilDialog] = useState(false);
    const [deletePerfilsDialog, setDeletePerfilsDialog] = useState(false);
    const [perfil, setPerfil] = useState<Projeto.Perfil>(perfilVazio);
    const [selectedPerfils, setSelectedPerfils] = useState<Projeto.Perfil[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const perfilService = useMemo(() => new PerfilService(), []);
    const [shouldReloadResources, setShouldReloadResources] = useState(false);

    useEffect(() => {
        const loadResources = async () => {
            try {
                const response = await perfilService.listarTodos();
                setPerfils(response.data);
                setShouldReloadResources(false); 
            } catch (error) {
                console.log(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Falha ao carregar perfis',
                    life: 5000
                });
            }
        };
    
        loadResources();
    }, [perfilService, shouldReloadResources]);

    const openNew = () => {
        setPerfil(perfilVazio);
        setSubmitted(false);
        setPerfilDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPerfilDialog(false);
    };

    const hideDeletePerfilDialog = () => {
        setDeletePerfilDialog(false);
    };

    const hideDeletePerfilsDialog = () => {
        setDeletePerfilsDialog(false);
    };

    const savePerfil = () => {
        setSubmitted(true);
    
        const requiredFields = ['descricao']; 
        
        const hasEmptyField = requiredFields.some(field => 
            !perfil[field]?.trim()
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
    
        let _perfils = [...(perfils as any)];
        
        if (perfil.id) {
            perfilService.alterar(perfil)
            toast.current?.show({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Perfil Atualizado',
                life: 5000
            });
            setShouldReloadResources(true);
        } else {
            perfilService.inserir(perfil)
                .then(() => {
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Perfil Criado!',
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
    
        setPerfils(_perfils as any);
        setPerfilDialog(false);
        setPerfil(perfilVazio);
    };
    

    const editPerfil = (perfil: Projeto.Perfil) => {
        setPerfil({ ...perfil });
        setPerfilDialog(true);
    };

    const confirmDeletePerfil = (perfil: Projeto.Perfil) => {
        setPerfil(perfil);
        setDeletePerfilDialog(true);
    };

    const deletePerfil = () => {
        let _perfils = (perfils as any)?.filter((val: any) => val.id !== perfil.id);
        setPerfils(_perfils);
        setDeletePerfilDialog(false);
        setPerfil(perfilVazio);
        perfilService.excluir(perfil.id)
        .then(() => {
            setShouldReloadResources(true);
            toast.current?.show({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Perfil Deletado',
                life: 5000
            });
        }).catch((error) => {
            toast.current?.show({
            severity: 'error',
            summary: 'Erro!',
            detail: error.response.data.message,
            life: 5000
        });
        }
        );
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeletePerfilsDialog(true);
    };

    const deleteSelectedPerfils = () => {
        if (!selectedPerfils || selectedPerfils.length === 0) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Nada selecionado',
                detail: 'Selecione pelo menos um perfil para excluir',
                life: 5000
            });
            return;
        }
        selectedPerfils.map((perfil) => {
            let _perfils = (perfils as any)?.filter((val: any) => val.id !== perfil.id);
            setPerfils(_perfils);
            perfilService.excluir(perfil.id)
            .then(() => {
                setShouldReloadResources(true);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Perfil Deletado',
                    life: 5000
                });
            }).catch((error) => {
                toast.current?.show({
                severity: 'error',
                summary: 'Erro!',
                detail: error.response.data.message,
                life: 5000
            });
            });
        });
        setDeletePerfilsDialog(false);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, nome: string) => {
        const val = (e.target && e.target.value) || '';
        let _perfil = { ...perfil };
        _perfil[`${nome}`] = val;

        setPerfil(_perfil);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Excluir" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedPerfils || !(selectedPerfils as any).length} />
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

    const idBodyTemplate = (rowData: Projeto.Perfil) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    };

    const descricaoBodyTemplate = (rowData: Projeto.Perfil) => {
        return (
            <>
                <span className="p-column-title">Descrição</span>
                {rowData.descricao}
            </>
        );
    };

    const actionBodyTemplate = (rowData: Projeto.Perfil) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editPerfil(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeletePerfil(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciamento de perfis</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const perfilDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={savePerfil} />
        </>
    );
    const deletePerfilDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeletePerfilDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deletePerfil} />
        </>
    );
    const deletePerfilsDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeletePerfilsDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteSelectedPerfils} />
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
                        value={perfils}
                        selection={selectedPerfils}
                        onSelectionChange={(e) => setSelectedPerfils(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} de {last} com {totalRecords} perfis"
                        globalFilter={globalFilter}
                        emptyMessage="Sem perfils registrados."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="descricao" header="Descrição" sortable body={descricaoBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={perfilDialog} style={{ width: '450px' }} header="Detalhes do perfil" modal className="p-fluid" footer={perfilDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="descricao">Descrição</label>
                            <InputText
                                id="descricao"
                                value={perfil.descricao}
                                onChange={(e) => onInputChange(e, 'descricao')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !perfil.descricao
                                })}
                            />
                            {submitted && !perfil.descricao && <small className="p-invalid">Descrição é obrigatório.</small>}
                        </div>

                    </Dialog>

                    <Dialog visible={deletePerfilDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePerfilDialogFooter} onHide={hideDeletePerfilDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {perfil && (
                                <span>
                                    Tem certeza de que deseja excluir <b>{perfil.descricao}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deletePerfilsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePerfilsDialogFooter} onHide={hideDeletePerfilsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {perfil && <span>Tem certeza de que deseja excluir os perfis selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
