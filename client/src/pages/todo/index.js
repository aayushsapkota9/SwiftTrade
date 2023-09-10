import React from 'react';
import { Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks } from '../../redux/reducerSlice/todoSlice'
const App = () => {
    const dispatch = useDispatch()
    const { tasks } = useSelector(state => state.tasks)
    const handleEnter = (e) => {
        // console.log(e.target.value)
        dispatch(setTasks(e.target.value))
    }
    return <div>

        <Input placeholder="Enter your tasks" className='mx-64 my-20 w-96' bordered={false} onPressEnter={handleEnter} />
        <div>{JSON.stringify(tasks)}</div>
    </div>
};
export default App;