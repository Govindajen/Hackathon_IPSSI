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
const getUser = createAsyncThunk(
    "auth/getUser", 
        async (value) => {
            try {
                const response = await myAxios.get(`/users/updateUser/${value.userId}/${value.token}`)
                console.log(response.data)
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
                return response.data
            } catch (error) {
                error && console.error(error)
                throw error;
            }
        }
)

const fetchUsers = createAsyncThunk(
    "auth/fetchUsers",
    async () => {
        try {
            const response = await myAxios.get('/users');
            return response.data;
        } catch (error) {
            error && console.error(error);
            throw error;
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        users: [],
        loading: false,
        error: null,
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
            })
        //fetchUsers
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            })
            
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            })
            
            ;
    }
});

export const { logout } = authSlice.actions;

export { login, register, fetchUsers, getUser };

export default authSlice.reducer;