import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk('data/fetchData', async () => {
    console.log("In Slice Reducer")
    try {
        const response = await fetch('https://642d4d6dbf8cbecdb4027745.mockapi.io/plane');
        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
});
export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
        searchTerm: '',
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default dataSlice.reducer;
