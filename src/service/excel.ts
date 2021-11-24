import { saveAs } from 'file-saver'
import XLSX, { WorkBook, WorkSheet } from 'xlsx'

class Workbook implements WorkBook {
  SheetNames: string[] = []
  Sheets: { [sheet: string]: WorkSheet } = {}
}

// TODO:弄清楚在干什么
const s2ab = (s: string) => {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF
  }
  return buf
}

export const exportJson2Excel = (header: string[], data: any, filename = 'excel-list', multiHeader: string[][] = [], merges: any[] = [], autoWidth = true, bookType = 'xlsx') => {
  data = [...data]
  console.log('data' + data)
  data.unshift(header)
  console.log('unshift' + data)
  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i])
  }

  const wsName = 'SheetJS'
  const wb = new Workbook()
  // TODO:对data做一个处理变成表的内容
  const ws = data
  console.log(merges.length)

  if (merges.length > 0) {
    if (!ws['!merges']) {
      ws['!merges'] = []
    }
    merges.forEach(item => {
      ws['!merges'].push(XLSX.utils.decode_range(item))
    })
  }

  if (autoWidth) {
    // 设置worksheet每列的最大宽度
    const colWidth = data.map((row: any) => row.map((val: any) => {
      // 先判断是否为 null/undefined
      if (val == null) {
        return {
          wch: 10
        }
        // 再判断是否为中文
      } else if (val.toString().charCodeAt(0) > 255) {
        return {
          wch: val.toString().length * 2
        }
      } else {
        return {
          wch: val.toString().length
        }
      }
    }))
    // 以第一行为初始值
    const result = colWidth[0]
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j].wch < colWidth[i][j].wch) {
          result[j].wch = colWidth[i][j].wch
        }
      }
    }
    ws['!cols'] = result
  }
  console.log(22222222222)

  // Add worksheet to workbook
  wb.SheetNames.push(wsName)
  wb.Sheets[wsName] = ws
  console.log(333333333331)

  const wbout = XLSX.write(wb, {
    bookType: bookType as any,
    bookSST: false,
    type: 'binary'
  })

  // saveAs(new Blob([s2ab(wbout)], {
  //   type: 'application/octet-stream'
  // }), `${filename}.${bookType}`)
}