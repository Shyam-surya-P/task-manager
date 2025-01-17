import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { toast } from 'react-toastify';

const initalTask = localStorage.getItem('task')
	? JSON.parse(localStorage.getItem('task'))
	: null;

const initialState = {
	TaskData: initalTask,
	AllTasks: {},
};
export const taskSlice = createSlice({
	name: 'Task',
	initialState,

	reducers: {
		taskAddedSuccessfully: (state, action) => {
			state.TaskData = action.payload;
		},
		taskAddFailure: (state) => {
			return state;
		},
		getAllTaskSuccess: (state, action) => {
			state.AllTasks = action.payload;
		},
		getAllTaskFailure: (state) => {
			return state;
		},

        editTaskSuccess: (state, action) => {
            state.TaskData = action.payload;
        },
        editTaskFailure: (state) => {
            return state;
        },

		deleteSuccess: (state, action) => {
			state.TaskData = action.payload;
		},
		deletefail: (state) => {
			return state;
		},
	},
});

export const {
	taskAddFailure,
	taskAddedSuccessfully,
	getAllTaskFailure,
	getAllTaskSuccess,
	deleteSuccess,
	deletefail,
	editTaskSuccess,
	editTaskFailure,
} = taskSlice.actions;

export default taskSlice.reducer;

export const addTask = (task, id) => async (dispatch) => {
	const taskData = {
		task,
		id,
	};
	const response = await axios.post('http://localhost:4000/task/add', taskData);
	if (response) {
		localStorage.setItem('task', JSON.stringify(response.data));

		dispatch(taskAddedSuccessfully(response.data));
		// toast.success('task added successfully');
		window.location.reload();
	} else {
		dispatch(taskAddFailure());
	}
};

export const getAllTasks = (token, id) => async (dispatch) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			id,
		},
	};

	try {
		const response = await axios.get(
			'http://localhost:4000/task/tasks',
			config
		);

		if (response) {
			dispatch(getAllTaskSuccess(response.data));
		}
	} catch (error) {
		if (error.response.status === 400) {
			dispatch(getAllTaskFailure());
		}
	}
};

export const arrowClick = (item, string) => async () => {
	let taskData = {
		id: item._id,
		status: item.status,
		string,
	};

	try {
		let response = await axios.put(
			`http://localhost:4000/task/${taskData.id}`,
			taskData
		);

		if (response) {
			window.location.reload();
		}
	} catch (error) {
		console.log(error);
	}
};

export const deleteItem = (id) => async (dispatch) => {
	let res = await axios.delete(`http://localhost:4000/task/${id}`);

	if (res) {
		dispatch(deleteSuccess());
		// toast.success('task deleted successfully');

		window.location.reload();
	} else {
		dispatch(deletefail());
	}
};

export const editTask = (id, editedTask) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:4000/task/edit/${id}`, { task: editedTask });

        if (response) {
            localStorage.setItem('task', JSON.stringify(response.data));
            dispatch(editTaskSuccess(response.data));
            // Dispatch any success notification if needed
            // toast.success('Task updated successfully');
            window.location.reload(); // Reload the page or update UI accordingly
        }
    } catch (error) {
        console.error('Error editing task:', error);
        dispatch(editTaskFailure());
        // Dispatch any failure notification if needed
        // toast.error('Failed to update task');
    }
};
