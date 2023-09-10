import React from 'react';
import { Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, deleteTasks } from '../../redux/reducerSlice/todoSlice'
const App = () => {
    const dispatch = useDispatch()
    const { tasks } = useSelector(state => state.tasks)
    const handleEnter = (e) => {
        // console.log(e.target.value)
        dispatch(setTasks(e.target.value))
    }
    const handleDelete = (index) => {
        dispatch(deleteTasks(index))

    }
    return <div>

        <Input placeholder="Enter your tasks" className='mx-64 my-20 w-96' bordered={false} onPressEnter={handleEnter} />
        <div>
            {
                tasks.map((item, index) => {
                    return <div className='flex gap-64 mx-64'>
                        <div>{item}</div>
                        <button onClick={() => handleDelete(index)} className='border-2 rounded-md hover:bg-red-600 hover:cursor-pointer'>Delete</button>
                    </div>
                })
            }
        </div>
    </div>
};
export default App;