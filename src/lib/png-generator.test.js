import assert from 'assert'
import Fs from 'fs'
import Del from 'del'
import Logger from './logger.js'
import PNGGenerator from './png-generator.js'
import FaviconGenerator from './favicon-generator.js'
import ICNSGenerator from './icns-generator.js'
import ICOGenerator from './ico-generator.js'
import Util from './util.js'

/** @test {PNGGenerator} */
describe('PNGGenerator', () => {
  /** @test {PNGGenerator#getRequiredImageSizes} */
  it('getRequiredImageSizes', () => {
    let expected = PNGGenerator.getRequiredImageSizes()
    let actual   = [16, 24, 32, 48, 57, 64, 72, 96, 120, 128, 144, 152, 195, 228, 256, 512, 1024]
    assert.deepEqual(expected, actual)

    expected = PNGGenerator.getRequiredImageSizes(['ico'])
    actual   = ICOGenerator.getRequiredImageSizes()
    assert.deepEqual(expected, actual)

    expected = PNGGenerator.getRequiredImageSizes(['icns'])
    actual   = ICNSGenerator.getRequiredImageSizes()
    assert.deepEqual(expected, actual)

    expected = PNGGenerator.getRequiredImageSizes(['favicon'])
    actual   = FaviconGenerator.getRequiredImageSizes()
    assert.deepEqual(expected, actual)
  })

  /** @test {PNGGenerator#_generetePNG} */
  it('_generetePNG', () => {
    const svg = Fs.readFileSync('./examples/data/sample.svg')
    assert(svg)

    const dir = Util.createWorkDir()
    assert(dir)

    const size = 16
    return PNGGenerator
      ._generatePNG(svg, size, dir, new Logger())
      .then((result) => {
        assert(result.size === size)
        Del.sync([dir], {force: true})
      })
      .catch((err) => {
        console.error(err)
        assert()
        Del.sync([dir], {force: true})
      })
  })
})
