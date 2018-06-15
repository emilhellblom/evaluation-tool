import * as request from 'superagent'
import {baseUrl} from '../constants'

export const ADD_BATCH_SUCCESS = 'ADD_BATCH_SUCCESS'
export const ADD_BATCH_FAILED = 'ADD_BATCH_FAILED'

export const addBatch = (batchId, startDate, endDate) => (dispatch) => {
	request
		.post(`${baseUrl}/batches`)
		.send({ batchId, startDate, endDate })
		.then(result => {
			dispatch({
				type: ADD_BATCH_SUCCESS
			})
		})
		.catch(err => {
			if (err.status === 400) {
				dispatch({
					type: ADD_BATCH_FAILED,
					payload: err.response.body.message || 'Unknown error'
				})
			}
			else {
				console.error(err)
			}
        })
    }