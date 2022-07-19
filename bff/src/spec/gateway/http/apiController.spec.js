const { default: axios } = require('axios')
const apiController = require('../../../main/gateways/http/apiController.js')

jest.spyOn(axios, 'get')
jest.spyOn(axios, 'post')
jest.spyOn(axios, 'delete')
jest.spyOn(axios, 'put')

// jest.mock('axios', () => {
//     post: jest.fn()
//     get: jest.fn()
// })

describe('Given apiController', () => {
    const basePath = "http://127.0.0.1:8080/pokemon/"
    const req = {}
    const res = {
        status: jest.fn().mockReturnValue({
            send: jest.fn()
        })
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('When getDetail is called', () => {
        const model = "modelMock"
        const id = "idMock"

        describe('And is successful', () => {
            const pokemon = {
                data: 'pokemon'
            }

            beforeEach(() => {
                axios.get.mockResolvedValue(pokemon)
                apiController.getDetail(req, res, model, id)
            })

            it('Then axios.get is called', () => {
                expect(axios.get).toHaveBeenCalledWith(basePath + model + "/" + id)
            })

            it('Then axios.get is called times', () => {
                expect(axios.get).toHaveBeenCalledTimes(1)
            })

            it('Then res.status is called', () => {
                expect(res.status).toHaveBeenCalledWith(200)
            })

            it('Then res.status().send is called', () => {
                expect(res.status().send).toHaveBeenCalledWith('pokemon')
            })
        })

        describe('And throws an error', () => {
            beforeEach(() => {
                axios.get.mockRejectedValue()
                apiController.getDetail(req, res, model, id)
            })

            it('Then axios.get throws an error', () => {
                axios.get.mockRejectedValue(new Error('error'));
            })

            it('Then res.status is called', () => {
                expect(res.status).toHaveBeenCalledWith(404)
            })

            it('Then res.status().send is called', () => {
                expect(res.status().send).toHaveBeenCalledWith("This pokemon doesn't exist")
            })
        })
    })

    describe('When insertPersonal is called', () => {
        const pokemon = {
            data: "pokemon"
        }
        describe('And is successful', () => {

            beforeEach(() => {
                axios.post.mockResolvedValue(pokemon)
                apiController.insertPersonal(req, res)
            })

            it('Then axios.post is called', () => {
                expect(axios.post).toHaveBeenCalledTimes(1)
            })

            it('Then axios.post is called', () => {
                expect(axios.post).toHaveBeenCalledWith(basePath + 'personal', req.body)
            })

            it('Then res.status is called', () => {
                expect(res.status).toHaveBeenCalledWith(201)
            })

            it('Then res.status().send is called', () => {
                expect(res.status().send).toHaveBeenCalledWith("pokemon")
            })
        })

        describe('And throws an error', () => {

            beforeEach(() => {
                axios.post.mockRejectedValue(new Error('error'))
                apiController.insertPersonal(req, res)
            })

            it('Then res.status is called', () => {
                expect(res.status).toHaveBeenCalledWith(404)
            })

            it('Then res.status().send is called', () => {
                expect(res.status().send).toHaveBeenCalledWith("Error insert Pokemon")
            })
        })
    })

    describe('When deletePersonal is called', () => {
        const id = "idMock"

        describe('And is successful', () => {
            const pokemon = {
                data: "pokemon"
            }

            beforeEach(() => {
                axios.delete.mockResolvedValue(pokemon)
                apiController.deletePersonal(req, res, id)
            })

            it('Then axios.delete is called', () => {
                expect(axios.delete).toHaveBeenCalledWith(basePath + "personal" + "/" + id)
            })

            it('Then axios.delete is called times', () => {
                expect(axios.delete).toHaveBeenCalledTimes(1)
            })

            it('Then res.status is called', () => {
                expect(res.status).toHaveBeenCalledWith(200)
            })

            it('Then res.status().send is called', () => {
                expect(res.status().send).toHaveBeenCalledWith("pokemon")
            })
        })

        describe('And throws an error', () => {
            beforeEach(() => {
                axios.delete.mockRejectedValue()
                apiController.deletePersonal(req, res)
            })

            it('Then axios.get throws an error', () => {
                expect(axios.post).rejects.toThrow(Error)
            })

            it('Then res.status is called', () => {
                expect(res.status).toHaveBeenCalledWith(404)
            })

            it('Then res.status().send is called', () => {
                expect(res.status().send).toHaveBeenCalledWith("Error delete Pokemon")
            })
        })
    })
    describe('When updatePersonal is called', () => {
        const id = "idMock"

        describe('And is successful', () => {
            const pokemon = {
                data: "pokemon"
            }

            beforeEach(() => {
                axios.put.mockResolvedValue(pokemon)
                apiController.updatePersonal(req, res, id)
            })

            it('Then axios.post is called', () => {
                expect(axios.put).toHaveBeenCalledTimes(1)
            })

            it('Then axios.post is called', () => {
                expect(axios.put).toHaveBeenCalledWith(basePath + 'personal' + "/" + id, req.body)
            })

            it('Then res.status is called', () => {
                expect(res.status).toHaveBeenCalledWith(200)
            })

            it('Then res.status().send is called', () => {
                expect(res.status().send).toHaveBeenCalledWith("pokemon")
            })
        })

        describe('And throws an error', () => {

            beforeEach(() => {
                axios.put.mockRejectedValue(new Error('error'))
                apiController.updatePersonal(req, res, id)
            })

            it('Then res.status is called', () => {
                expect(res.status).toHaveBeenCalledWith(404)
            })

            it('Then res.status().send is called', () => {
                expect(res.status().send).toHaveBeenCalledWith("Error update Pokemon")
            })
        })
    })
    describe('When getPokemons is called', () => {
        const model = "modelMock"

        describe('And is successful', () => {
            const pokemon = {
                data: 'pokemon'
            }

            beforeEach(() => {
                axios.get.mockResolvedValue(pokemon)
                apiController.getPokemons(req, res, model)
            })

            it('Then axios.get is called', () => {
                expect(axios.get).toHaveBeenCalledWith(basePath + 'list?model=' + model)
            })

            it('Then axios.get is called times', () => {
                expect(axios.get).toHaveBeenCalledTimes(1)
            })

            it('Then res.status is called', () => {
                expect(res.status).toHaveBeenCalledWith(200)
            })

            it('Then res.status().send is called', () => {
                expect(res.status().send).toHaveBeenCalledWith('pokemon')
            })
        })

        describe('And throws an error', () => {
            beforeEach(() => {
                axios.get.mockRejectedValue()
                apiController.getPokemons(req, res, model)
            })

            it('Then axios.get throws an error', () => {
                axios.get.mockRejectedValue(new Error('error'));
            })

            it('Then res.status is called', () => {
                expect(res.status).toHaveBeenCalledWith(404)
            })

            it('Then res.status().send is called', () => {
                expect(res.status().send).toHaveBeenCalledWith("Error get Pokemons")
            })
        })
    })
})