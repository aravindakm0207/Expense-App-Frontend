import PropTypes from 'prop-types'
import CategoryItem from './CategoryItem'
export default function CategoriesList(props){
    const { data } = props 
    return (
        <>
            <ul className="list-group">
                { data.map((ele) => {
                    return <CategoryItem key={ele._id} id={ele._id} name={ele.name }/>
                })}
            </ul>
        </>
            
        
    )
}

CategoriesList.propTypes = {
    data: PropTypes.array.isRequired
}