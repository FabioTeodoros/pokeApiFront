const mockApiController = {
    getPokemons: jest.fn(),
    insertPersonal: jest.fn(),
    deletePersonal: jest.fn(),
    updatePersonal: jest.fn(),
    getDetail: jest.fn()
}
jest.mock('../../../main/gateways/http/apiController', () => (mockApiController))

const router = require('../../../main/gateways/http/router')

const findRoute = (mockRoutes, routeName, callbackIndex = 1, middlewareIndex = 1) => {
    const call = mockRoutes.mock.calls.find(c => c[0].toString() === routeName.toString())
    return { name: call[0], callback: call[callbackIndex], middleware: call[middlewareIndex] }
}

describe('Given router is called', () => {
    let mockContext
    let routerRoute
    const req = {
        params: {
            id: 'idMock',
            model: 'modelMock'
        }
    }
    const res = {}

    beforeEach(() => {
        jest.clearAllMocks()
        mockContext = {
            get: jest.fn(),
            post: jest.fn(),
            delete: jest.fn(),
            put: jest.fn()
        }
        router(mockContext)
    })

    describe('When route /pokemon/:model is called', () => {
        beforeEach(() => {
            routerRoute = findRoute(mockContext.get, '/pokemon/:model')
            routerRoute.callback(req, res)
        })

        it('Then should call apiController.getAllPokemon', () => {
            expect(mockApiController.getPokemons).toHaveBeenCalledWith(req, res, 'modelMock')
        })
    })

    describe('When route /insert is called', () => {
        beforeEach(() => {
            routerRoute = findRoute(mockContext.post, '/insert')
            routerRoute.callback(req, res)
        })

        it('Then should call apiController.insertPersonal', () => {
            expect(mockApiController.insertPersonal).toHaveBeenCalledWith(req, res)
        })
    })

    describe('When route /delete/:id is called', () => {
        beforeEach(() => {
            routerRoute = findRoute(mockContext.delete, '/delete/:id')
            routerRoute.callback(req, res)
        })

        it('Then should call apiController.deletePersonal', () => {
            expect(mockApiController.deletePersonal).toHaveBeenCalledWith(req, res, 'idMock')
        })
    })

    describe('When route /update/:id is called', () => {
        beforeEach(() => {
            routerRoute = findRoute(mockContext.put, '/update/:id')
            routerRoute.callback(req, res)
        })

        it('Then should call apiController.updatePersonal', () => {
            expect(mockApiController.updatePersonal).toHaveBeenCalledWith(req, res, 'idMock')
        })
    })

    describe('When route /pokemon/:model/:id is called', () => {
        beforeEach(() => {
            routerRoute = findRoute(mockContext.get, '/pokemon/:model/:id')
            routerRoute.callback(req, res)
        })

        it('Then should call apiController.getDetail', () => {
            expect(mockApiController.getDetail).toHaveBeenCalledWith(req, res, 'modelMock', 'idMock')
        })
    })

})