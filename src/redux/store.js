import {configureStore} from '@reduxjs/toolkit'
import firstFour from './firstFourSlice'

export const store = configureStore({
    reducer: {
        'firstFour' : firstFour
    }
})

