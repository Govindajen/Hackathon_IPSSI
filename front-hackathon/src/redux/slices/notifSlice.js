import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import myAxios from '../../utils/axios';

const fetchNotifications = createAsyncThunk(
    "notifications/fetchNotifications", 
    async () => {
        try {
            const response = await myAxios.get('/notifs');
            return response.data;
        } catch (error) {
            error && console.error(error);
            throw error;
        }
    }
);

const addNotification = createAsyncThunk(
    "notifications/addNotification",
    async (id) => {
        try {
            const response = await myAxios.get('/notif/' + id);
            return response.data;
        } catch (error) {
            error && console.error(error);
            throw error;
        }
    }
);

const notifSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearNotifications: (state) => {
            state.notifications = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            })
            .addCase(addNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications.push(action.payload);
            })
            .addCase(addNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            });
    }
});

export const { clearNotifications } = notifSlice.actions;

export { fetchNotifications };

export default notifSlice.reducer;