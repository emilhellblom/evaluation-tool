import React, {Component} from 'react'
import './ClassSpec.css'

export default class ClassList extends Component {
    state = {
        studentList: [
            {
                id: 1,
                name: 'John Smith',
                classId: 1,
                pictureUrl: '',
                ratings: ['yellow', 'red', 'red']
            },
            {
                id: 2,
                name: 'Andy Holst',
                classId: 1,
                pictureUrl: '',
                ratings: ['green', 'red', 'green']
            },
            {
                id: 3,
                name: 'Joan Jacobs',
                classId: 2,
                pictureUrl: '',
                ratings: ['yellow', 'yellow']
            },
            {
                id: 4,
                name: 'Jared Dunn',
                classId: 2,
                pictureUrl: '',
                ratings: ['red', 'yellow', 'green']
            },
            {
                id: 5,
                name: 'Annie Beck',
                classId: 2,
                pictureUrl: '',
                ratings: ['red', 'yellow', 'yellow']
            },
            {
                id: 6,
                name: 'Inger Kratt',
                classId: 3,
                pictureUrl: '',
                ratings: ['red', 'red', 'green']
            }
        ]
    }

    render() {
        return (
            <div className='batch-page'>
                <h1>Batch #</h1>
                <div className='color-standings'></div>
                <div>
                    {this.state.studentList.map(student => (
                        (student.classId === 2) &&
                            <div key={`student #${student.id}`}>
                                <img src={student.pictureUrl}/>
                                <h2>{student.name}</h2>
                                <div className={`latest-color-${student.ratings[student.ratings.length-1]}`}></div>
                            </div>
                    ))}
                </div>
            </div>
        )
    }
}