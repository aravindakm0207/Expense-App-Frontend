
import PropTypes from 'prop-types';
import ExpenseItem from './ExpenseItem';

export default function ExpensesList(props) {
    const { data } = props;
  
    return (
        <>
            <ul className="list-group">
                {data.map((ele) => (
                    <ExpenseItem 
                        key={ele._id} 
                        id={ele._id} 
                        expenseDate={ele.expenseDate} 
                        amount={ele.amount} 
                        description={ele.description} 
                    />
                ))}
            </ul>
        </>
    );
}

ExpensesList.propTypes = {
    data: PropTypes.array.isRequired
};
/*
import PropTypes from 'prop-types';
import ExpenseItem from './ExpenseItem';

export default function ExpensesList(props) {
    const { data } = props;

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((ele) => (
                        <tr key={ele._id}>
                            <td>{ele.expenseDate}</td>
                            <td>{ele.amount}</td>
                            <td>{ele.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

ExpensesList.propTypes = {
    data: PropTypes.array.isRequired
};
*/
