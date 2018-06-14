import * as request from 'superagent'
import {baseUrl} from '../constants'

export const ADD_STUDENT_SUCCESS = 'ADD_STUDENT_SUCCESS'
export const ADD_STUDENT_FAILED = 'ADD_STUDENT_FAILED'

export const UPDATE_STUDENT_SUCCESS = 'UPDATE_STUDENT_SUCCESS'
export const UPDATE_STUDENT_FAILED = 'UPDATE_STUDENT_FAILED'

export const DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS'
export const DELETE_STUDENT_FAILED = 'DELETE_STUDENT_FAILED'

export const addStudent = (firstName, lastName, picture, batchId) => (dispatch) => {
    console.log(typeof batchId)
	request
		.post(`${baseUrl}/students`)
		.send({ firstName, lastName, picture, batchId, lastRating: null })
		.then(result => {
			dispatch({
				type: ADD_STUDENT_SUCCESS
			})
		})
		.catch(err => {
			if (err.status === 400) {
				dispatch({
					type: ADD_STUDENT_FAILED,
					payload: err.response.body.message || 'Unknown error'
				})
			}
			else {
				console.error(err)
			}
        })
	}
	
export const editStudent = (firstName, lastName, pictureUrl, currentStudent) => (dispatch) => {
	request
		.put(`${baseUrl}/students/${currentStudent}`)
		.send({firstName, lastName, picture: pictureUrl})
		.then(result => {
			dispatch({
				type: UPDATE_STUDENT_SUCCESS
			})
		})
		.catch(err => {
			if (err.status === 400) {
				dispatch({
					type: UPDATE_STUDENT_FAILED,
					payload: err.response.body.message || 'Unknown error'
				})
			}
			else {
				console.error(err)
			}
		})
}

export const deleteStudent = (currentStudent) => (dispatch) => {
	request
		.delete(`${baseUrl}/students/${currentStudent}`)
		.then(result => {
			dispatch({
				type: DELETE_STUDENT_SUCCESS
			})
		})
		.catch(err => {
			if (err.status === 400) {
				dispatch({
					type: DELETE_STUDENT_FAILED,
					payload: err.response.body.message || 'Unknown error'
				})
			}
			else {
				console.error(err)
			}
		})
}