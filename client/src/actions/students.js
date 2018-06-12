import * as request from 'superagent'
import {baseUrl} from '../constants'

export const ADD_STUDENT_SUCCESS = 'ADD_STUDENT_SUCCESS'
export const ADD_STUDENT_FAILED = 'ADD_STUDENT_FAILED'

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