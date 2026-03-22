import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const TimelineLink: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "timeline-text-link")}>
      <a href="/00-Meta/timeline" title="查看完整时间线">Timeline</a>
    </div>
  )
}

TimelineLink.css = `
.timeline-text-link {
  /* 与上方搜索框、下方 Explorer 保持适宜的间距 */
  margin-top: 0.2rem; 
  margin-bottom: 0.2rem;
  padding-left: 0rem;
}

.timeline-text-link a {
  font-family: var(--headerFont);
  font-size: 1.1rem; /* 字体大小和 Explorer 标题接近 */
  font-weight: 600;
  color: var(--darkgray); /* 默认使用较暗的灰色，避免喧宾夺主 */
  text-decoration: none;
  transition: color 0.2s ease, padding-left 0.2s ease;
}

.timeline-text-link a:hover {
  color: var(--tertiary); /* 鼠标悬浮时亮起主题色 */
  padding-left: 0.3rem; /* 悬浮时微微向右缩进，增加交互感 */
}
`

export default (() => TimelineLink) satisfies QuartzComponentConstructor