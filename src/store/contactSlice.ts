import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  selectedContact: any
}

const initialState: CounterState = {
    selectedContact: {},
}

export const contactSlice = createSlice({
  name: 'selectedContact',
  initialState,
  reducers: {
    setSelectedContact: (state, action: PayloadAction<any>) => {
        state.selectedContact = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedContact } = contactSlice.actions

export default contactSlice.reducer