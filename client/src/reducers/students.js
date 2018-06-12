import {
	ADD_STUDENT_SUCCESS, ADD_STUDENT_FAILED
} from '../actions/students'

export default function (state = {}, {type, payload}) {
	switch(type) {
    case ADD_STUDENT_SUCCESS:
      return {
        success: true
      }

    case ADD_STUDENT_FAILED:
      return {
        error: payload
      }

		default:
      return state
	}
}