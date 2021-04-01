const covidApi = {
    getSummary: async () => {
        return await fetchRequest(covidApiEndPoints.summary())
    },
    getWorldAllTimeCases: async () => {
        return await fetchRequest(covidApiEndPoints.worldAllTimeCases())
    },
    getCountryAllTimeCases: async (country, status) => {
        return await fetchRequest(covidApiEndPoints.countryAllTimeCases(country, status))
    },
    getWorldDaysCases: async () => {
        return await fetchRequest(covidApiEndPoints.worldDaysCases())
    },
    getCountryDaysCases: async (country, status) => {
        return await fetchRequest(covidApiEndPoints.countryDaysCases(country, status))
    }
}

const covid_api_base = 'https://api.covid19api.com/'

const covidApiEndPoints = {
    summary: () => {
        return getApiPath('summary')
    },
    worldAllTimeCases: () => {
        return getApiPath('world')
    },
    countryAllTimeCases: (country, status) => {
        let end_point = `dayone/country/${country}/status/${status}`
        return getApiPath(end_point)
    },
    countryDaysCases: (country, status) => {
        let date = getDaysRange(30)

        let end_point = `country/${country}/status/${status}?from=${date.start_date}&to=${date.end_date}`

        return getApiPath(end_point)
    },
    worldDaysCases: () => {
        let date = getDaysRange(30)

        let end_point = `world?from=${date.start_date}&to=${date.end_date}`

        return getApiPath(end_point)
    }
}

// get the date at days before today
getDaysRange = (days) => {
    let d = new Date()

    let from_d = new Date(d.getTime() - (days * 24 * 60 * 60 * 1000))

    let to_date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

    let from_date = `${from_d.getFullYear()}-${from_d.getMonth() + 1}-${from_d.getDate()}`

    return {
        start_date: from_date,
        end_date: to_date
    }
}

getApiPath = (end_point) => {
    return covid_api_base + end_point
}