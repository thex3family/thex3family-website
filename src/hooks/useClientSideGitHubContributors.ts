import { join } from "path"

import { useEffect, useState } from "react"

import type { Author, Commit, FileContributorsState } from "@/lib/types"

import {
  CONTENT_DIR,
  GITHUB_COMMITS_URL,
} from "@/lib/constants"

export const gitHubAuthHeaders = {
  headers: new Headers({
    // About personal access tokens https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#about-personal-access-tokens
    Authorization: "Token " + process.env.NEXT_PUBLIC_GITHUB_TOKEN_READ_ONLY,
  }),
}

const fetchGitHubCommits = async (filePath: string): Promise<Commit[]> => {
  const url = new URL(GITHUB_COMMITS_URL)
  url.searchParams.set("path", filePath)

  try {
    const response = await fetch(url, gitHubAuthHeaders)
    if (!response.ok) throw new Error(response.statusText)
    return (await response.json()) as Commit[]
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(filePath, error.message)
    }
    throw error
  }
}
/**
 * Client-side hook to fetch GitHub contributors for a given file
 * @param relativePath Relative path of the file being queried
 * @returns `state` comprise of { loading, data, error } where
 * data is an array of Author objects if successful
 */
export const useClientSideGitHubContributors = (
  relativePath: string
): FileContributorsState => {
  const [state, setState] = useState<FileContributorsState>({ loading: true })
  useEffect(() => {
    ;(async () => {
      const filePath = join(CONTENT_DIR, relativePath, "index.md")

      try {
        const commits = await fetchGitHubCommits(filePath)

        const authorSet = new Set<string>()

        ;[...commits]
        .filter(({ commit }) => commit.author) // Adjusted to check commit.author instead of top-level author
        .forEach(({ commit }) => { // Removed destructuring of author from the parameter
          const entry: Author = {
            name: commit.author.name,
            email: commit.author.email,
            avatarUrl: '', // Placeholder as avatarUrl is not provided in the example
            // user: {
            //   login: '', // Placeholder as login is not provided in the example
            //   url: '', // Placeholder as html_url for the user is not provided in the example
            // },
          }
          // Unique authors only
          authorSet.add(JSON.stringify(entry))
        })
        const authors = Array.from(authorSet).map(
          JSON.parse as (entry: string) => Author
        )

        setState({
          loading: false,
          data: authors,
        })
      } catch (error: unknown) {
        setState({ loading: false, error })
      }
    })()
  }, [relativePath])
  return state
}