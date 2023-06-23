import { getLogger } from '@ps2gg/common/logging'
import request from 'axios'

const logger = getLogger()

export class CensusQuery {
  private _collectionName = ''
  private _awaitingCollection = true
  private _awaitingCondition = false
  private _isFirstParam = true
  baseUrl = `http://census.daybreakgames.com/s:ps2gg/get/ps2:v2/`
  composedUrl = ''

  constructor(baseUrl?: string) {
    if (baseUrl) this.baseUrl = baseUrl
  }

  async get(url = this.composedUrl, retries = 0): Promise<any> {
    return this.fetch(url, retries)
  }

  collection(collection: string): this {
    if (!this._awaitingCollection) throw new Error(`Collection is already set to ${this._collectionName}.`)
    this._collectionName = collection
    this.composedUrl = this.baseUrl + collection
    this._awaitingCollection = false

    return this
  }

  start(start: number): this {
    return this.addParam(`c:start=${start}`)
  }

  limit(limit: number): this {
    return this.addParam(`c:limit=${limit}`)
  }

  show(fields: string): this {
    return this.addParam(`c:show=${this._createParamString(fields)}`)
  }

  hide(fields: string): this {
    return this.addParam(`c:hide=${this._createParamString(fields)}`)
  }

  sort(fields: string): this {
    return this.addParam(`c:sort=${this._createParamString(fields)}`)
  }

  resolve(fields: string): this {
    return this.addParam(`c:resolve=${this._createParamString(fields)}`)
  }

  case(bool: boolean): this {
    return this.addParam(`c:case=${bool}`)
  }

  includeNull(bool: boolean): this {
    return this.addParam(`c:includeNull=${bool}`)
  }

  lang(lang: string): this {
    return this.addParam(`c:lang=${lang}`)
  }

  timing(bool: boolean): this {
    return this.addParam(`c:timing=${bool}`)
  }

  exactMatchFirst(bool: boolean): this {
    return this.addParam(`c:exactMatchFirst=${bool}`)
  }

  distinct(field: string): this {
    return this.addParam(`c:distinct=${field}`)
  }

  retry(bool: boolean): this {
    return this.addParam(`c:retry=${bool}`)
  }

  join(args: JoinArgs): this {
    const joinString = `c:join=${this._createJoinQuery(args)}`
    return this.addParam(joinString)
  }

  private _createJoinQuery(args: JoinArgs): string {
    let joinString = ''
    let isFirst = true

    // for c:join=collection^...
    if (args.collection) {
      joinString += args.collection
      isFirst = false
    }

    for (const key in args) {
      if (key === 'join' || key === 'collection') continue
      if (!isFirst) {
        joinString += '^'
      } else {
        isFirst = false
      }

      // @ts-ignore
      joinString += `${key}:${this._createJoinString(args[key])}`
    }

    if (args.join) {
      joinString += `(${this._createJoinQuery(args.join)})`
    }

    return joinString
  }

  where(field: string): this {
    return this.addParam(field, true)
  }

  compare(operator: string, value: string | number): this {
    return this.addParam(operator + value, false, true)
  }

  equals(value: string | number): this {
    return this.compare('=', value)
  }

  notEquals(value: string | number): this {
    return this.compare('=!', value)
  }

  lessThan(value: string | number): this {
    return this.compare('=<', value)
  }

  lessThanEqual(value: string | number): this {
    return this.compare('=[', value)
  }

  greaterThan(value: string | number): this {
    return this.compare('=>', value)
  }

  greaterThanEqual(value: string | number): this {
    return this.compare('=]', value)
  }

  startsWith(value: string | number): this {
    return this.compare('=^', value)
  }

  contains(value: string | number): this {
    return this.compare('=*', value)
  }

  addParam(param: string, isConditionStart = false, isConditionEnd = false): this {
    if (!this.collection) throw new Error('You need to query a collection first.')
    if (this._awaitingCondition && !isConditionEnd) throw new Error(`Incomplete condition: ${this.composedUrl}.`)
    if (isConditionStart) this._awaitingCondition = true
    if (isConditionEnd) this._awaitingCondition = false

    if (!isConditionEnd) {
      if (this._isFirstParam) {
        this.composedUrl += '?'
        this._isFirstParam = false
      } else {
        this.composedUrl += '&'
      }
    }

    this.composedUrl += param

    return this
  }

  // Some query params can take one or several arguments
  // @ts-ignore
  private _createParamString(obj): string {
    if (typeof obj === 'string') return obj
    else if (obj.constructor === Array) return obj.join(',')
    else if (!isNaN(obj)) return obj.toString() // eslint-disable-line
    else return ''
  }

  // Some join arg values can have multiple values
  // @ts-ignore
  private _createJoinString(obj): string {
    if (typeof obj === 'string') return obj
    else if (obj.constructor === Array) return obj.join("'")
    else if (!isNaN(obj)) return obj.toString() // eslint-disable-line
    else return ''
  }

  async fetch(url: string, retries = 0): Promise<any> {
    if (!url) throw new Error('Census API query URL must not be empty.')

    try {
      const { data } = await request.get<any>(url)

      if (data.error) {
        if (retries >= 3) return data

        logger.warn({ data }, `Request failed, retrying (${retries}/3`)
        return this.get(url, ++retries)
      }

      return data
    } catch (err) {
      if (retries >= 3) {
        throw new CensusException(url)
      }

      logger.warn({ url, err }, `Request failed, retrying (${retries}/3`)
      return this.get(url, ++retries)
    }
  }
}

type JoinArgs = {
  collection?: string
  type?: string
  on?: string
  inject_at?: string
  list?: number
  terms?: string[]
  show?: string[]
  join?: JoinArgs
}

export class CensusException extends Error {
  constructor(url: string) {
    super(`Failed after 3 retries (url: ${url})`)
  }
}
