import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    tasks: []
};
const tasksSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTasks(state, actions) {
            const newTask = actions.payload;
            const todos = [...state.tasks, newTask]
            debugger
            state.tasks
            return {
                ...state,
                tasks: todos,
            }

        },
        deleteTasks(state, actions) {
            const index = actions.payload;
            const todos = [...state.tasks]
            todos.splice(index, 1)
            console.log(todos)
            // debugger
            state.tasks
            return {
                ...state,
                tasks: todos,
            }

        },
    },
})

export const { setTasks, deleteTasks } = tasksSlice.actions;
export default tasksSlice.reducer;