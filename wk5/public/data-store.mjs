const SERVER = 'http://localhost:8080'

class DataStore {
    constructor () {
        this.data = []
    }

    async getAll () {
        const response = await fetch(`${SERVER}/temperature-records`)
        if (!response.ok) {
            throw response
        } else {
            this.data = await response.json()
        }
    }

    async addOne (item) {
        const response = await fetch(`${SERVER}/temperature-records`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        if (!response.ok) {
            throw response
        } else {
            await this.getAll()
        }
    }
}

const store = new DataStore()

export default {
    store
}