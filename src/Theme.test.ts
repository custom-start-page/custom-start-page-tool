import chai from 'chai'
import mock from 'mock-fs'

const should = chai.should()

import Theme, { InterfaceMeta } from './Theme'

describe('Theme', () => {
    describe('#getAbout()', () => {
        it('should read file', () => {
            mock({
                './manifest/readme.md': '# Title',
            })

            const html = new Theme()
                .getAbout()

            html.should.include('<h1 id="title">Title</h1>')

            mock.restore()
        })
    })

    describe('#getMeta()', () => {
        it('should read meta', () => {
            const writtenMeta: InterfaceMeta = {
                "version": "1.0.0",
                "name": "Startpage",
                "author": {
                    "name": "author name",
                    "link": "https://github.com/some-repo"
                },
                "features": [
                    "links"
                ]
            }

            mock({
                './manifest/meta.json': JSON.stringify(writtenMeta),
            })

            const readMeta = new Theme()
                .getMeta()

            should.exist(readMeta)

            mock.restore()
        })
    })

    describe('#_anyPathExists()', () => {
        it('should report file exists', () => {
            mock({
                './file.txt': '',
            })

            const result = new Theme()
                ._anyPathExists('./not-existing.txt', './file.txt')

            result.should.equal(true)

            mock.restore()
        })

        it('should report file doesn\'t exist', () => {
            mock({
                './file.txt': '',
            })

            const result = new Theme()
                ._anyPathExists('./not-existing.txt', './also-not-existing.txt')

            result.should.equal(false)

            mock.restore()
        })
    })

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
