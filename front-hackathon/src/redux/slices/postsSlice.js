import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import myAxios from '../../utils/axios';

const createPost = createAsyncThunk(
    "posts/createPost", 
    async (values) => {
        try {
            const response = await myAxios.post('/tweets/', values);
            return response.data;
        } catch (error) {
            error && console.error(error);
            throw error;
        }
    }
);

const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async () => {
        try {
            const response = await myAxios.get('/tweets/');
            return response.data;
        } catch (error) {
            error && console.error(error);
            throw error;
        }
    }
);

const repost = createAsyncThunk(
    "posts/repost",
    async (values) => {
        try {
            const response = await myAxios.post(`/tweets/retweet`, values);
            return response.data;
        } catch (error) {
            error && console.error(error);
            throw error;
        }
    }
);

const likePost = createAsyncThunk(
    "posts/likePost",
    async ({ id, userId, unlike }) => {
        console.log({ id, userId, unlike });
        try {
            const response = await myAxios.put(`/tweets/${id}/like`, { userId, unlike });
            return { id, likes: response.data.likes };
        } catch (error) {
            error && console.error(error);
            throw error;
        }
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // createPost
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            })

            // fetchPosts
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            })

            // repost
            .addCase(repost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(repost.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loading = false;
                state.posts.push(action.payload);
            })
            .addCase(repost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            })

            
            .addCase(likePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.posts.findIndex(post => post.id === action.meta.arg.id);
                if (index !== -1) {
                    state.posts[index].likes = action.payload.likes;
                }
            })
            .addCase(likePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred";
            });
            }
});



export { createPost, fetchPosts, repost, likePost };
export default postsSlice.reducer;