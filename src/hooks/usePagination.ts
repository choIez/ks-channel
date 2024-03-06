import { ref } from "vue"


export default function usePagination({ callback, initTotal, initCurrent, initSize }: {
  callback: () => void,
  initTotal?: number,
  initCurrent?: number,
  initSize?: number
}) {
  // 总条数
  const total = ref(initTotal ?? 0)
  
  // 当前页
  const current = ref(initCurrent ?? 1)
  
  // 每页条数
  const size = ref(initSize ?? 10)
  
  // 当前页改变时
  const onCurrentChange = (nowCurrent: number) => {
    current.value = nowCurrent // 更新当前页
    
    callback()
  }
  
  // 每页条数改变时
  const onSizeChange = (nowSize: number) => {
    size.value = nowSize // 更新每页条数
    
    if (current.value > Math.ceil(total.value / size.value)) {
      current.value = Math.ceil(total.value / size.value)
    }
    
    callback()
  }
  
  return {
    pagination: { total, current, size },
    onCurrentChange,
    onSizeChange
  }
}
