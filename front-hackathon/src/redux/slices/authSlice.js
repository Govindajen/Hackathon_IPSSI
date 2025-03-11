import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import myAxios from '../../utils/axios';

const login = createAsyncThunk(
    "auth/login", 
        async (values) => {
            try {
                const response = await myAxios.post('/users/login', values)
                return response.data;
            } catch (error) {
                error && console.error(error)
                throw error;
            }

        }
)
const register = createAsyncThunk(
    "auth/register", 
        async (values) => {
            try {
                const response = await myAxios.post('/users/register', values)
                return response.data.data
            } catch (error) {
                error && console.error(error)
                throw error;
            }
        }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,

        users: [],
        matchedUsers: []
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            },
    },
    extraReducers: (builder) => {
        builder
        //login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            })
        //register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            });            
    }
});

export const {  logout } = authSlice.actions;

export { login, register};

export default authSlice.reducer;