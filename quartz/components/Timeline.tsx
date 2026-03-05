import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Timeline: QuartzComponent = ({ allFiles, fileData, displayClass }: QuartzComponentProps) => {
  if (!fileData.frontmatter?.isTimeline) {
    return null
  }

  // 1. 获取文件并按时间倒序
  const sortedFiles = allFiles
    .filter((f) => !f.frontmatter?.isTimeline) 
    .sort((a, b) => {
      const dateA = a.dates?.created ? a.dates.created.getTime() : 0
      const dateB = b.dates?.created ? b.dates.created.getTime() : 0
      return dateB - dateA 
    })

  // 2. 第一次分组：按“年份+月份”分组
  const groupedFiles: Record<string, typeof sortedFiles> = {}
  sortedFiles.forEach((file) => {
    const date = file.dates?.created
    const groupKey = date ? `${date.getFullYear()}年 ${date.getMonth() + 1}月` : "未知时间"
    
    if (!groupedFiles[groupKey]) {
      groupedFiles[groupKey] = []
    }
    groupedFiles[groupKey].push(file)
  })

  return (
    <div class={`timeline-component ${displayClass ?? ""}`}>
      {Object.entries(groupedFiles).map(([group, files]) => {
        
        // 3. 第二次核心分组：在每个月内部，按“天”将笔记打包
        const daysArray: { day: string, notes: typeof sortedFiles }[] = []
        files.forEach(file => {
          const date = file.dates?.created
          const dayStr = date ? String(date.getDate()).padStart(2, '0') + "日" : "--"
          
          const lastDayGroup = daysArray[daysArray.length - 1]
          // 如果这篇笔记的日期和上一篇一样，就塞进同一个“天”的数组里
          if (lastDayGroup && lastDayGroup.day === dayStr) {
            lastDayGroup.notes.push(file)
          } else {
            // 如果是新的一天，就新建一个“天”的分组
            daysArray.push({ day: dayStr, notes: [file] })
          }
        })

        return (
          <div class="timeline-group">
            <h3 class="timeline-year-month">{group}</h3>
            
            <ul class="timeline-list">
              {/* 这里按天遍历，一天只生成一个时间节点（圆点） */}
              {daysArray.map(({ day, notes }) => (
                <li class="timeline-item">
                  <div class="timeline-date">{day}</div>
                  
                  <div class="timeline-content">
                    {/* 在这一天的节点旁边，渲染当天所有的笔记 */}
                    {notes.map(file => {
                      const metaTitle = file.frontmatter?.title
                      const titleStr = metaTitle ? metaTitle : (file.slug ? String(file.slug).replace(/-/g, ' ') : "未命名")
                      const tags = file.frontmatter?.tags ?? []

                      return (
                        <div class="timeline-note-block" style={{ marginBottom: "1.2rem" }}>
                          <a href={`/${file.slug}`} class="timeline-title">{titleStr}</a>
                          
                          {tags.length > 0 && (
                            <ul class="timeline-tags">
                              {tags.map((tag: string) => (
                                <li>
                                  <a href={`/tags/${tag}`} class="timeline-tag">#{tag}</a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default (() => Timeline) satisfies QuartzComponentConstructor