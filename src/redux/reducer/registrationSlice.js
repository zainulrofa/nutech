import { createSlice } from '@reduxjs/toolkit';

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    error: null,
  },
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { updateField, setError, clearError } = registrationSlice.actions;
export default registrationSlice.reducer;
