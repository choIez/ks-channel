import dayjs from "dayjs"

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss"
const DATE_FORMAT = "YYYY-MM-DD"

export const formatToDateTime = (date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string => {
  return dayjs(date).format(format)
}

export const formatToDate = (date?: dayjs.ConfigType, format = DATE_FORMAT): string => {
  return dayjs(date).format(format)
}

// 获取 N 天前的日期
export const beforeNDay = (day: number, format = DATE_FORMAT): string => {
  return dayjs().subtract(day, "day").format(format)
}

// 获取 N 月前的第一天
export const beforeNMonthFirstDay = (month: number, format = DATE_FORMAT): string => {
  return dayjs().subtract(month, "month").startOf("month").format(format)
}

// 获取 N 月前的最后一天
export const beforeNMonthLastDay = (month: number, format = DATE_FORMAT): string => {
  return dayjs().subtract(month, "month").endOf("month").format(format)
}
