import {DEFAULT_CATEGORY} from "src/constants"
import { TPost } from "src/types"

interface FilterPostsParams {
    posts: TPost[]
    q: string
    tag?: string
    category?: string
    order?: string
}

export function filterPosts({
    posts,
    q,
    tag = undefined,
    category = DEFAULT_CATEGORY,
    order = "desc",
}: FilterPostsParams): TPost[] {
    return posts
    .filter((post) => {
        const tagContent = post.tags ? post.tags.join(" ") : ""
        const searchContent = post.title + post.summary + tagContent

        // 기본 카테고리 선택 시 "스터디" 제외 조건 (태그로 검색하지 않은 경우에만)
        const isExcludedInDefaultCategory =
            !tag && category === DEFAULT_CATEGORY && post.category?.includes("📝 스터디")

        return (
            searchContent.toLowerCase().includes(q.toLowerCase()) &&
            (!tag || (post.tags && post.tags.includes(tag))) &&
            (category === DEFAULT_CATEGORY ||
                (post.category && post.category.includes(category))) &&
            !isExcludedInDefaultCategory // 제외 조건 추가
        )
    })
    .sort((a, b) => {
        const dateA = new Date(a.date.start_date).getTime()
        const dateB = new Date(b.date.start_date).getTime()
        return order === "desc" ? dateB - dateA : dateA - dateB
    })
}