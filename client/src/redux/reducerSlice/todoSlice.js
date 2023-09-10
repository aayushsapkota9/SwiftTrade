import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    tasks: ['hello']
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
    },
})

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;