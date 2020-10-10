import chai from 'chai'
import mock from 'mock-fs'

const should = chai.should()

import Theme from './Theme'

describe('Theme', () => {
    describe('#_readJsonFromFile()', () => {
        it('should read file', () => {
            const obj = {
                "foo": "bar"
            }

            mock({
                './data.json': JSON.stringify(obj),
            })

            const json = new Theme()
                ._readJsonFromFile('data.json')

            json.should.deep.equal(obj)

            mock.restore()
        })

        it('should return null', () => {
            const json = new Theme()
                ._readJsonFromFile('data.json')

            should.not.exist(json)
        })
    })
})
