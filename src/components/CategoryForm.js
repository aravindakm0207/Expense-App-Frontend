import { useState } from 'react' 
import { startAddCategory, startEditCategory } from '../actions/categories-action'
import { useDispatch, useSelector} from 'react-redux'
export default function CategoryForm(props){
    const { id, toggle } = props 
    const dispatch = useDispatch()
    const serverErrors = useSelector((state) => {
        return state.categories.serverErrors
    })
    const category = useSelector((state) => {
        return state.categories.data.find(ele => ele._id == id )
    })

    const [name,setName] = useState(category ? category.name : '')
    const [clientErrors, setClientErrors] = useState({}) 
    const errors = {} 

    const runClientValidation = () => {
        if(name.trim().length == 0) {
            errors.name = 'Name can not be blank'
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: name 
        }
        runClientValidation() 
        const resetForm = () => {
            setName('')
        }

        if(Object.keys(errors).length == 0) {
            if(category) { // update operation
                dispatch(startEditCategory(category._id, formData, toggle))
            } else { // add operation
                dispatch(startAddCategory(formData, resetForm)) 
                setClientErrors({})     
            }
                 
        } else {
            setClientErrors(errors) 
        }
    }
    return (
        <>
            { serverErrors.length > 0 && (
                <div className='alert alert-danger'>
                    <b>Server Error</b>
                    <ul>
                        { serverErrors.map((ele, i) => {
                            return <li key={i}>{ ele.msg } </li>
                        })} 
                    </ul>
                </div> 
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor='name' className='form-label'>
                        Enter Name
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        className="form-control"    
                    /> 
                </div>
                { clientErrors.name && <p className="text-danger">{ clientErrors.name }</p> }
                <input type="submit" className="btn btn-primary" />
            </form>
        </>
    )
}