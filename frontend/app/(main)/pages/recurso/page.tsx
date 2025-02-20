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
import { RecursoService } from '@/service/RecursoService';

const Recurso = () => {
    let recursoVazio: Projeto.Recurso = {
        id: 0,
        nome: '',
        chave: ''
    };

    const [recursos, setRecursos] = useState<Projeto.Recurso[]>([]);
    const [recursoDialog, setRecursoDialog] = useState(false);
    const [deleteRecursoDialog, setDeleteRecursoDialog] = useState(false);
    const [deleteRecursosDialog, setDeleteRecursosDialog] = useState(false);
    const [recurso, setRecurso] = useState<Projeto.Recurso>(recursoVazio);
    const [selectedRecursos, setSelectedRecursos] = useState<Projeto.Recurso[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const recursoService = useMemo(() => new RecursoService(), []);
    const [shouldReloadResources, setShouldReloadResources] = useState(false);

    useEffect(() => {
        const loadResources = async () => {
            try {
                const response = await recursoService.listarTodos();
                setRecursos(response.data);
                setShouldReloadResources(false); 
            } catch (error) {
                console.log(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Falha ao carregar recursos',
                    life: 5000
                });
            }
        };
    
        loadResources();
    }, [recursoService, shouldReloadResources]);

    const openNew = () => {
        setRecurso(recursoVazio);
        setSubmitted(false);
        setRecursoDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setRecursoDialog(false);
    };

    const hideDeleteRecursoDialog = () => {
        setDeleteRecursoDialog(false);
    };

    const hideDeleteRecursosDialog = () => {
        setDeleteRecursosDialog(false);
    };

    const saveRecurso = () => {
        setSubmitted(true);
    
        const requiredFields = ['nome', 'chave']; 
        
        const hasEmptyField = requiredFields.some(field => 
            !recurso[field]?.trim()
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
    
        let _recursos = [...(recursos as any)];
        
        if (recurso.id) {
            recursoService.alterar(recurso)
            toast.current?.show({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Recurso Atualizado',
                life: 5000
            });
            setShouldReloadResources(true);
        } else {
            recursoService.inserir(recurso)
                .then(() => {
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Recurso Criado!',
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
    
        setRecursos(_recursos as any);
        setRecursoDialog(false);
        setRecurso(recursoVazio);
    };
    

    const editRecurso = (recurso: Projeto.Recurso) => {
        setRecurso({ ...recurso });
        setRecursoDialog(true);
    };

    const confirmDeleteRecurso = (recurso: Projeto.Recurso) => {
        setRecurso(recurso);
        setDeleteRecursoDialog(true);
    };

    const deleteRecurso = () => {
        let _recursos = (recursos as any)?.filter((val: any) => val.id !== recurso.id);
        setRecursos(_recursos);
        setDeleteRecursoDialog(false);
        setRecurso(recursoVazio);
        recursoService.excluir(recurso.id)
        .then(() => {
            setShouldReloadResources(true);
            toast.current?.show({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Recurso Deletado',
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
        setDeleteRecursosDialog(true);
    };

    const deleteSelectedRecursos = () => {
        if (!selectedRecursos || selectedRecursos.length === 0) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Nada selecionado',
                detail: 'Selecione pelo menos um recurso para excluir',
                life: 5000
            });
            return;
        }
        selectedRecursos.map((recurso) => {
            let _recursos = (recursos as any)?.filter((val: any) => val.id !== recurso.id);
            setRecursos(_recursos);
            recursoService.excluir(recurso.id)
            .then(() => {
                setShouldReloadResources(true);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Recurso Deletado',
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
        setDeleteRecursosDialog(false);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, nome: string) => {
        const val = (e.target && e.target.value) || '';
        let _recurso = { ...recurso };
        _recurso[`${nome}`] = val;

        setRecurso(_recurso);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Excluir" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedRecursos || !(selectedRecursos as any).length} />
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

    const idBodyTemplate = (rowData: Projeto.Recurso) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    };

    const nomeBodyTemplate = (rowData: Projeto.Recurso) => {
        return (
            <>
                <span className="p-column-title">Nome</span>
                {rowData.nome}
            </>
        );
    };

    const chaveBodyTemplate = (rowData: Projeto.Recurso) => {
        return (
            <>
                <span className="p-column-title">Chave</span>
                {rowData.chave}
            </>
        );
    };

    const actionBodyTemplate = (rowData: Projeto.Recurso) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editRecurso(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteRecurso(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciamento de recursos</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const recursoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={saveRecurso} />
        </>
    );
    const deleteRecursoDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteRecursoDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteRecurso} />
        </>
    );
    const deleteRecursosDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteRecursosDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteSelectedRecursos} />
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
                        value={recursos}
                        selection={selectedRecursos}
                        onSelectionChange={(e) => setSelectedRecursos(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} de {last} com {totalRecords} recursos"
                        globalFilter={globalFilter}
                        emptyMessage="Sem recursos registrados."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="nome" header="Nome" sortable body={nomeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="chave" header="Chave" sortable body={chaveBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={recursoDialog} style={{ width: '450px' }} header="Detalhes do recurso" modal className="p-fluid" footer={recursoDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="nome">Nome</label>
                            <InputText
                                id="nome"
                                value={recurso.nome}
                                onChange={(e) => onInputChange(e, 'nome')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !recurso.nome
                                })}
                            />
                            {submitted && !recurso.nome && <small className="p-invalid">Nome é obrigatório.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="chave">Chave</label>
                            <InputText
                                id="chave"
                                value={recurso.chave}
                                onChange={(e) => onInputChange(e, 'chave')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !recurso.chave
                                })}
                            />
                            {submitted && !recurso.chave && <small className="p-invalid">Chave é obrigatório.</small>}
                        </div>

                    </Dialog>

                    <Dialog visible={deleteRecursoDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRecursoDialogFooter} onHide={hideDeleteRecursoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {recurso && (
                                <span>
                                    Tem certeza de que deseja excluir <b>{recurso.nome}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteRecursosDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRecursosDialogFooter} onHide={hideDeleteRecursosDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {recurso && <span>Tem certeza de que deseja excluir os recursos selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Recurso;
