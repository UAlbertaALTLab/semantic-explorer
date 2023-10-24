import React from 'react'
import { render, fireEvent, screen, user} from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import SearchAppBar from '../../components/SearchAppBar/SearchAppBar'
import '@testing-library/jest-dom/extend-expect'

describe('Testing Search App Bar', () => {
    it('check if Search App Bar and its components display', () => {
        const {getByTestId} = render(<Router><SearchAppBar/></Router>)
        const AppBar = getByTestId('AppBar')
        const logo = getByTestId('logo')
        const searchInput = getByTestId('searchInput')
        expect(AppBar).toBeInTheDocument()
        expect(logo).toBeInTheDocument()
        expect(searchInput).toBeInTheDocument()
    })

    it('check if search input works', () => {
        const {getByTestId} = render(<Router><SearchAppBar/></Router>)
        const searchInput = getByTestId('searchInput')
        fireEvent.change(searchInput, {target: {value: 'test'}})
        expect(searchInput.value).toBe('test')
    })
})