import fs from 'fs'

export default class Test {
    constructor() {

    }
    run(): void {
        this._checkRequiredFiles();
    }
    private _anyPathExists(...paths: string[]): boolean {
        let exists = false

        for (const path of paths) {
            exists = fs.existsSync(path)

            if (exists)
                break
        }

        if (exists == false) {
            console.error(`❌ ${paths.join(' or ')} not found.`)
        } else {
            console.log(`✅ ${paths.join(' or ')} found.`)
        }

        return exists
    }
    private _checkRequiredFiles():void {
        let errorFound = false

        errorFound = this._anyPathExists('./index.ejs', './index.html')
            ? errorFound
            : true

        errorFound = this._anyPathExists('./manifest/defaultData.json')
            ? errorFound
            : true

        errorFound = this._anyPathExists('./manifest/meta.json')
            ? errorFound
            : true

        errorFound = this._anyPathExists('./manifest/preview.png', './manifest/preview.jpg')
            ? errorFound
            : true

        errorFound = this._anyPathExists('./manifest/readme.md')
            ? errorFound
            : true

        errorFound = this._anyPathExists('./manifest/schema.json')
            ? errorFound
            : true

        if (errorFound) {
            console.error('❌ Test failed.')
        } else {
            console.log('✅ Test passed.')
        }
    }
}
