import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    user: [],
    error: null,
    token: null
}
const loginSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        registerUser: ((state, action) => {
            state.loading = false
            state.error = null
        }),
        registerSuccess: ((state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = null
        }),
        registerFailure: ((state, action) => {
            state.loading = false
            state.user = null
            state.error = action.payload
        }),
        loginUser: ((state, action) => {
            state.loading = false
            state.error = null
        }),
        loginSucess: ((state, action) => {
            state.loading = false
            state.user = action.payload
            state.token = action.payload

        }),
        loginFailure: ((state, action) => {
            state.loading = false
            state.user = null
            state.error = action.payload
        })

    },
})

export const { registerUser, registerSuccess, registerFailure, loginUser, loginSucess, loginFailure } = loginSlice.actions
export default loginSlice.reducer












// with api 
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// export const fetchData = createAsyncThunk('data/fetchData', async () => {
//     console.log("In Slice Reducer")
//     try {
//         const response = await fetch('https://642d4d6dbf8cbecdb4027745.mockapi.io/plane');
//         const data = await response.json();

//         return data;
//     } catch (error) {
//         throw error;
//     }
// });

// export const dataSlice = createSlice({
//     name: 'data',
//     initialState: {
//         data: [],
//         status: 'idle',
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchData.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchData.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.data = action.payload;

//             })
//             .addCase(fetchData.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             });
//     },
// });

// export default dataSlice.reducer;



// 
// without api // ..................................////.........././././././
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = ({
//     loading: false,
//     user: null,
//     error: null,
// })


// const authSlice = createSlice({
//     name: "Auth",
//     initialState,
//     reducers: {
//         registerUser: (state, action) => {
//             state.loading = false,
//                 state.error = null
//         },
//         registerSuccess: (state, action) => {
//             state.loading = false,
//                 state.user = action.payload
//         },
//         registerFailurer: (state, action) => {
//             state.loading = false,
//                 state.error = action.payload
//         }
//     }
// })


// export const { registerUser, registerSuccess, registerFailurer } = authSlice.actions


// export default authSlice.reducer
