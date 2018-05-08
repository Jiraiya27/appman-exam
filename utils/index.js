const _ = require('lodash');

// WARNING: beware object mutable

/**
 * @params {Object} store
 * @params {String} name
 * @params {Object} scores
 * @params {Number} scores{key}
 */
exports.updateStudentScore = (store, { name, scores }) => {

    const newStore = _.cloneDeep(store)
    Object.keys(scores).map(subject => {
        let foundSubject = false
        const score = scores[subject]
        for (let i = 0; i < newStore.length; i++) {
            const { subject: newStoreSubject, students } = newStore[i];
            if (newStoreSubject === subject) {
                let foundStudent = false
                for (let j = 0; j < students.length; j++) {
                    const { name: newStoreName } = students[j];
                    if (newStoreName === name) {
                        newStore[i]['students'][j].score = score
                        foundStudent = true
                    }
                }

                // new student, insert new entry
                if (!foundStudent) {
                    newStore[i]['students'].push({
                        name,
                        score
                    })
                }

                foundSubject = true
            }
        }
        // new subject, insert new entry
        if (!foundSubject) {
            newStore.push({
                subject,
                students: [
                    {
                        name,
                        score
                    }
                ]
            })
        }
    })

    return newStore
};

/**
 * @params {Object} store
 * @params {String} name
 * @params {String} subject
 */
exports.removeStudentScoreBySubject = (store, { name, subject }) => {
    const newStore = _.cloneDeep(store)
    for (let i = 0; i < newStore.length; i++) {
        const { subject: newStoreSubject, students } = newStore[i];
        if (newStoreSubject === subject) {
            for (let j = 0; j < students.length; j++) {
                const { name: newStoreName } = students[j];
                if (newStoreName === name) {
                    newStore[i]['students'].splice(j, 1)
                }
            }
        }
    }

    return newStore
};

/**
 * @params {Object} store
 */
exports.transformData = store => {
    
    let result = {}

    for (let i = 0; i < store.length; i++) {
        const { subject, students } = store[i];
        for (let j = 0; j < students.length; j++) {
            const { name, score } = students[j]
            if (result[name]) {
                result[name][subject] = score
            } else {
                result[name] = {}
                result[name][subject] = score
            }
        }
    }

    return Object.keys(result).map(student => {
        let studentData = { name: student }
        Object.keys(result[student]).map(subject => {
            studentData[subject] = result[student][subject]
        })
        return studentData
    })
};
