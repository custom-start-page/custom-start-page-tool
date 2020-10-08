import chai from 'chai'
import mock from 'mock-fs'

const should = chai.should()

import TestTool from './TestTool'

describe('test', () => {
    describe('#run()', () => {
        it('should report index file exists', () => {
            console.log('test')

            mock({
                './index.html': '<html></html>',
            })

            const result = new TestTool()
                .run()

            result.results.should.deep.include.members([{
                paths: ['./index.ejs', './index.html'],
                exists: true,
            }])
        })
    })
})
