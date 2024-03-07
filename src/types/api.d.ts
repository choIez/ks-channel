// 接口返回值
interface ResponseResult<T = any> {
  message: string
  code: number
  data: T
  request_id: string
}

// 分页请求参数
interface PageParams {
  page: number // 当前页
  page_size: number // 每页条数
}

// 分页请求参数, 另一个人写的
interface NewPageParams {
  pageNumber: number // 当前页
  pageSize: number // 每页条数
}

// 分页数据
interface PageResult<T = any> {
  page_info: {
    total_count: number // 总条数
    total_page: number // 总页数
    page: number // 当前页
    page_size: number // 每页条数
  }
  list: T[]
}

// 分页数据, 另一个人写的
interface NewPageResult<T = any> {
  list: T[]
  pageNum: number // 当前页
  pageSize: number // 每页条数
  pages: number // 总页数
  total: number // 总条数
}
