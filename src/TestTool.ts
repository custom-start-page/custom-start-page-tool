import fs from 'fs'

export interface TestResult {
    paths: string[]
    exists: boolean
}

export interface TestResults {
    results: TestResult[]
}

export default class TestTool {
    constructor() {

    }
    run(): TestResults {
        return this._checkRequiredFiles()
    }
    public _anyPathExists(...paths: string[]): TestResult {
        let exists = false

        for (const path of paths) {
            exists = fs.existsSync(path)

            if (exists)
                break
        }

        // if (exists == false) {
        //     console.error(`❌ ${paths.join(' or ')} not found.`)
        // } else {
        //     console.log(`✅ ${paths.join(' or ')} found.`)
        // }

        return {
            paths: paths,
            exists: exists,
        }
    }
    private _checkRequiredFiles(): TestResults {
        let testResults: TestResults = {
            results: [],
        }

        testResults.results.push(
            this._anyPathExists('./index.ejs', './index.html')
        )

        testResults.results.push(
            this._anyPathExists('./manifest/defaultData.json')
        )

        testResults.results.push(
            this._anyPathExists('./manifest/meta.json')
        )

        testResults.results.push(
            this._anyPathExists('./manifest/preview.png', './manifest/preview.jpg')
        )

        testResults.results.push(
            this._anyPathExists('./manifest/readme.md')
        )

        testResults.results.push(
            this._anyPathExists('./manifest/schema.json')
        )

        // if (errorFound) {
        //     console.error('❌ Test failed.')
        // } else {
        //     console.log('✅ Test passed.')
        // }

        return testResults
    }
}
