/* 
received data
{
	region: {
	name: "Africa",
	avgAge: 19.7,
	avgDailyIncomeInUSD: 5,
	avgDailyIncomePopulation: 0.71
	},
	periodType: "days",
	timeToElapse: 58,
	reportedCases: 674,
	population: 66622705,
	totalHospitalBeds: 1380614
}

return data
{
	data: {}, // the input data you got
	impact: {}, // your best case estimation
	severeImpact: {} // your severe case estimation
}
*/

let impact = {};
let severeImpact = {};

const estimateInfections = (days) => {
    // compute currentlyInfected values using reportedCases
    impact.currentlyInfected = data.reportedCases * 10;
    severeImpact.currentlyInfected = data.reportedCases * 50;
    // get factor by dividing number of days by 3
    const factor = days/3;
    // compute infectionsByRequestedTime using currentlyInfected and factor
    impact.infectionsByRequestedTime = impact.currentlyInfected * Math.pow(2, factor);
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * Math.pow(2, factor);
}

const estimateSevereCases = () => {
    // compute severeCasesByRequestedTime
    impact.severeCasesByRequestedTime = 0.15 * impact.infectionsByRequestedTime;
    severeImpact.severeCasesByRequestedTime = 0.15 * severeImpact.infectionsByRequestedTime;
    // compute number of available hospital beds
    const bedsAvailable = 0.35 * data.totalHospitalBeds;
    // compute number of available beds for COVID-19
    impact.hospitalBedsByRequestedTime = bedsAvailable - impact.severeCasesByRequestedTime;
    severeImpact.hospitalBedsByRequestedTime = bedsAvailable - severeImpact.severeCasesByRequestedTime;
}

const estimateICUVentilatorEconomy = (days) => {
    // compute casesForICUByRequestedTime
    impact.casesForICUByRequestedTime = 0.05 * impact.infectionsByRequestedTime;
    severeImpact.casesForICUByRequestedTime = 0.05 * severeImpact.infectionsByRequestedTime;
    // compute casesForVentilatorsByRequestedTime
    impact.casesForVentilatorsByRequestedTime = 0.02 * impact.infectionsByRequestedTime;
    severeImpact.casesForVentilatorsByRequestedTime = 0.02 * severeImpact.infectionsByRequestedTime;
    // compute dollarsInFlight
    impact.dollarsInFlight = (impact.infectionsByRequestedTime * data.avgDailyIncomePopulation) * data.avgDailyIncomeInUSD * days;
    severeImpact.dollarsInFlight = (severeImpact.infectionsByRequestedTime * data.avgDailyIncomePopulation) * data.avgDailyIncomeInUSD * days;
}

// const covid19ImpactEstimator = (data) => {
    
//     return data;
// };

const covid19ImpactEstimator = (data) => data;

export default covid19ImpactEstimator;
