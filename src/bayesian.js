const causes = {
    "flu": ["fever", "sore throat", "headache", "nausea"],
    "cold": ["sore throat"],
    "migraine": ["headache", "nausea"]
}

function getAllPossibleSymptoms(causes) {
    let symptoms = new Set();
    let keys = Object.keys(causes)
    for (var i = 0 ; i < keys.length; i++){
        let causeSymptoms = causes[keys[i]];
        for (var j = 0 ; j < causeSymptoms.length ; j++){
            symptoms.add(causeSymptoms[j]);
        }
    }
    return symptoms;
}

export const possibleSymptoms = getAllPossibleSymptoms(causes);
const pCause = 1.0 / Object.keys(causes).length;

function classifyCause(cause, symptomsPresent) {
    let expectedSymptoms = new Set(causes[cause]);
    let probabilities = [];

    for (var possibleSymptom of possibleSymptoms) {
        let testedPositive = symptomsPresent.has(possibleSymptom);
        let isExpectedSymptom = expectedSymptoms.has(possibleSymptom);
        if (testedPositive && isExpectedSymptom) {
            probabilities.push(0.7);
        } else if (!testedPositive && isExpectedSymptom){
            probabilities.push(0.3);
        } else if (testedPositive && !isExpectedSymptom){
            probabilities.push(0.2);
        } else {
            probabilities.push(0.8);
        }
    }

    return pCause * probabilities.reduce((acc, curr) => acc*curr);
}

export function classify(symptomsPresent) {
    let classifiedCauses = [];
    var total = 0.0;
    let symptomsPresentSet = new Set(symptomsPresent)

    for (var cause of Object.keys(causes)){
        let classifiedCause = { 
            "name" : cause,
            "probability" : classifyCause(cause, symptomsPresentSet)
        }
        total += classifiedCause.probability
        classifiedCauses.push(classifiedCause);
    }

    for (var classifiedCause of classifiedCauses){
        classifiedCause.probability = classifiedCause.probability/total;
    }

    classifiedCauses.sort((a, b) => b.probability - a.probability);

    return classifiedCauses;
}

