const { default: axios } = require('axios')
const apiController = require('../../../main/gateways/http/apiController.js')

jest.spyOn(axios, 'get')

describe('Given apiController', () => {
    const basePath = "http://localhost:8080/pokemon/"
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

            beforeEach(async() => {
               await axios.get.mockResolvedValue(pokemon)
                apiController.getDetail(req, res, model, id)
            })

            it('Then axios.get is called', () => {
                expect(axios.get).toHaveBeenCalledWith(basePath + "/" + model + "/" + id)
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
                expect(axios.get).rejects.toThrow(Error)
            })

            it('Then res.status is called', () => {
                expect(res.status).toHaveBeenCalledWith(404)
            })

            it('Then res.status().send is called', () => {
                expect(res.status().send).toHaveBeenCalledWith("This pokemon doesn't exist")
            })
        })

        // describe('When insertPersonal is called', () => {
        //     const pokemon = {
        //         data: "pokemon"
        //     }

        //     beforeEach(() => {
        //         axios.post.mockResolvedValue(pokemon)
        //         apiController.insertPersonal(req, res)
        //     })

        //     it('Then axios.get is called', () => {
        //         expect(axios.post).toHaveBeenCalledWith(API + "/insert")
        //     })

        //     it('Then res.status is called', () => {
        //         expect(res.status).toHaveBeenCalledWith(200)
        //     })

        //     it('Then res.status().send is called', () => {
        //         expect(res.status().send).toHaveBeenCalledWith("pokemon")
        //     })
        // })

        // describe('And throws an error', () => {
        //     beforeEach(() => {
        //         axios.post.mockRejectedValue()
        //         apiController.getDetail(req, res)
        //     })

        //     it('Then axios.get throws an error', () => {
        //         expect(axios.post).rejects.toThrow(Error)
        //     })

        //     it('Then res.status is called', () => {
        //         expect(res.status).toHaveBeenCalledWith(404)
        //     })

        //     it('Then res.status().send is called', () => {
        //         expect(res.status().send).toHaveBeenCalledWith("Error insert Pokemon")
        //     })
        // })

        // describe('When deletePersonal is called', () => {
        //     const id = "idMock"

        //     describe('And is successful', () => {
        //         const pokemon = {
        //             data: "pokemonDetailMock"
        //         }

        //     beforeEach(() => {
        //         axios.delete.mockResolvedValue(pokemon)
        //         apiController.deletePersonal(req, res, id)
        //     })

        //     it('Then axios.get is called', () => {
        //         expect(axios.post).toHaveBeenCalledWith(API + "/insert")
        //     })

        //     it('Then res.status is called', () => {
        //         expect(res.status).toHaveBeenCalledWith(200)
        //     })

        //     it('Then res.status().send is called', () => {
        //         expect(res.status().send).toHaveBeenCalledWith("pokemon")
        //     })
        // })

        // describe('And throws an error', () => {
        //     beforeEach(() => {
        //         axios.post.mockRejectedValue()
        //         apiController.getDetail(req, res)
        //     })

        //     it('Then axios.get throws an error', () => {
        //         expect(axios.post).rejects.toThrow(Error)
        //     })

        //     it('Then res.status is called', () => {
        //         expect(res.status).toHaveBeenCalledWith(404)
        //     })

        //     it('Then res.status().send is called', () => {
        //         expect(res.status().send).toHaveBeenCalledWith("Error insert Pokemon")
        //     })
        // })

    })
})