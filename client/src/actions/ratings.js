import * as request from 'superagent'
import {baseUrl} from '../constants'

export const ADD_RATING_SUCCESS = 'ADD_RATING_SUCCESS'
export const ADD_RATING_FAILED = 'ADD_RATING_FAILED'
export const UPDATE_RATING_SUCCESS = 'UPDATE_RATING_SUCCESS'
export const UPDATE_RATING_FAILED = 'UPDATE_RATING_FAILED'

export const addRating = (rating) => (dispatch) => {
    const {date, text, colorRating, currentStudent} = rating
    console.log(date, text, colorRating, typeof currentStudent.id)
	request
		.post(`${baseUrl}/ratings`)
		.send({ date, remark: text, color: colorRating, studentId: currentStudent.id })
		.then(result => {
			dispatch({
				type: ADD_RATING_SUCCESS
			})
		})
		.catch(err => {
			if (err.status === 400) {
				dispatch({
					type: ADD_RATING_FAILED,
					payload: err.response.body.message || 'Unknown error'
				})
			}
			else {
				console.error(err)
			}
        })
}

export const updateLastRating = (state) => (dispatch) => {
    const {colorRating, currentStudent} = state

    request
        .put(`${baseUrl}/students/${currentStudent.id}`)
        .send({lastRating: colorRating})
		.then(result => {
			dispatch({
				type: UPDATE_RATING_SUCCESS
			})
		})
		.catch(err => {
			if (err.status === 400) {
				dispatch({
					type: UPDATE_RATING_FAILED,
					payload: err.response.body.message || 'Unknown error'
				})
			}
			else {
				console.error(err)
			}
        })
}

export const updateRating = (state) => (dispatch) => {
    const {colorRating, date, text, currentRating} = state

    request
        .put(`${baseUrl}/ratings/${currentRating}`)
        .send({color: colorRating, date, remark: text})
		.then(result => {
			dispatch({
				type: UPDATE_RATING_SUCCESS
			})
		})
		.catch(err => {
			if (err.status === 400) {
				dispatch({
					type: UPDATE_RATING_FAILED,
					payload: err.response.body.message || 'Unknown error'
				})
			}
			else {
				console.error(err)
			}
        })
}