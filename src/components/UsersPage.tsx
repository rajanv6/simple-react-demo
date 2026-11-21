import "../css/usersPage.css"
import { ModuleRegistry, AllCommunityModule, type ColDef } from "ag-grid-community"
import { AgGridReact } from "ag-grid-react"
import type { UserInfo } from "./UserForm"
import { useEffect, useState } from "react"
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore"
import { db } from "../firebase/config"
import type { ICellRendererParams } from "ag-grid-community"
import { useNavigate } from "react-router"

ModuleRegistry.registerModules([AllCommunityModule])


const defaultColDef: ColDef = {
    headerClass: 'center-header',
    cellStyle: {textAlign: 'center'}
}

export default function UsersPage() {
    const [rows, setRows] = useState<UserInfo[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const colDefs: ColDef<UserInfo>[] = [
        {field: 'userId'},
        {field: 'firstname'},
        {field: 'lastname'},
        {field: 'age'},
        {field: 'sex'},
        {field: 'email'},
        {field: 'address'},
        {field: 'zipcode'},
        {field: 'city'},
        {field: 'state'},
        {field: 'country'},
        { headerName: 'Actions',
            cellRenderer: (p: ICellRendererParams<UserInfo>) => (
                <div className="row-actions">
                    <button className="link-btn" onClick={() => navigate(`/edit/${p.data?.userId}`)}>Edit</button> 
                    <button className="link-btn" onClick={() => p.data && handleDelete(p.data.userId)}>Delete</button>
                </div>
            )
        }
    ]

    async function handleDelete(userId: string) {
        if (!window.confirm('Delete this user ?')) return
        try {
            await deleteDoc(doc(db, 'users', userId));
            setRows(prev => prev.filter(r => r.userId != userId));
        } catch(error) {
            alert('Could not delete the user: ' + {error})
        }
    }

    useEffect(() => {
            async function load() {
                try {
                    const snapshot = await getDocs(collection(db, 'users'));
                    const data: UserInfo[] = snapshot.docs.map( d => ({
                        ...(d.data() as Omit<UserInfo, 'userId'>), 
                        userId: d.id,
                    }));
                    setRows(data);
                } catch(error) {
                    setError('Could not load users: ' + {error})
                } finally {
                    setLoading(false)
                }
            }
            load();
        }, [])
    if (loading) return <p>Loading</p>
    if (error) return <p>{error}</p>
    if (rows.length === 0) return <p>No users yet</p>
    return (
        <div style={{height: 400}}>
            <AgGridReact rowData={rows} columnDefs={colDefs} defaultColDef={defaultColDef}/>
        </div>
    )
}
