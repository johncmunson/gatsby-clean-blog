import { compose } from 'lodash/fp'
import { sortBy, groupBy } from 'lodash'
import { default as _slugify } from '@sindresorhus/slugify'

// function compose() {
//   var fns = arguments
//   return function(result) {
//     for (var i = fns.length - 1; i > -1; i--) {
//       result = fns[i].call(this, result)
//     }
//     return result
//   }
// }

const groupByStartingLetter = arrayOfStrings =>
  groupBy(arrayOfStrings, str => str.substring(0, 1).toLowerCase())

export const sortAndGroupByStartingLetter = compose(
  groupByStartingLetter,
  sortBy
)

export const disableScrollAtTopAndBottom = (e, target) => {
  const { deltaY, deltaX } = e
  const { scrollTop, scrollHeight, offsetHeight } = target
  const delta = deltaY === 0 ? deltaX : deltaY
  if (
    (scrollTop === 0 && delta < 0) ||
    (scrollTop >= scrollHeight - offsetHeight && delta > 0)
  ) {
    e.preventDefault()
  }
}

const small =
  '(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)'
const punct = '([!"#$%&\'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)'

function lower(word) {
  return word.toLowerCase()
}

function upper(word) {
  return word.substr(0, 1).toUpperCase() + word.substr(1)
}

/*
 * Title Case
 *
 * Modified by John Munson - https://twitter.com/curtismunson - 7 January 2019
 * Ported to JavaScript by John Resig - http://ejohn.org/ - 21 May 2008
 * Original by John Gruber - http://daringfireball.net/ - 10 May 2008
 * License: https://opensource.org/licenses/mit-license.php
 */
export const titleCase = str => {
  var parts = [],
    split = /[:.;?!] |(?: |^)["Ò]/g,
    index = 0

  while (true) {
    var m = split.exec(str)

    parts.push(
      str
        .substring(index, m ? m.index : str.length)
        .replace(/\b([A-Za-z][a-z.'Õ]*)\b/g, function(all) {
          return /[A-Za-z]\.[A-Za-z]/.test(all) ? all : upper(all)
        })
        .replace(RegExp('\\b' + small + '\\b', 'ig'), lower)
        .replace(RegExp('^' + punct + small + '\\b', 'ig'), function(
          all,
          punct,
          word
        ) {
          return punct + upper(word)
        })
        .replace(RegExp('\\b' + small + punct + '$', 'ig'), upper)
    )

    index = split.lastIndex

    if (m) parts.push(m[0])
    else break
  }

  return parts
    .join('')
    .replace(/ V(s?)\. /gi, ' v$1. ')
    .replace(/(['Õ])S\b/gi, '$1s')
    .replace(/\b(AT&T|Q&A)\b/gi, function(all) {
      return all.toUpperCase()
    })
}

// Necessary b/c slugify replaces single quotes and apostrophes
// with a dash "-". This differs from how gatsby-remark-autolink-headers
// generates permalinks. W/o the custom replacements below, the visual
// indicator in the table of contents breaks.
export const slugify = str =>
  _slugify(str, {
    customReplacements: [["'", ''], ['’', '']]
  })

export const slugToTitle = slug =>
  slug
    .substr(1)
    .slice(0, -1)
    .replace(/-/g, ' ')

export const slugToTitleCase = compose(
  slugToTitle,
  titleCase
)
