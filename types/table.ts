import type { Directory } from '@/lib/db/schema/tables/directories'
import type { DirectorySubmission } from '@/lib/db/schema/tables/directory-submissions'
import type { LaunchPlatformSubmission } from '@/lib/db/schema/tables/launch-platform-submissions'
import type { LaunchPlatform } from '@/lib/db/schema/tables/launch-platforms'

export type LaunchPlatformWithSubmissions = LaunchPlatform & {
  submissions: Array<LaunchPlatformSubmission>
}

export type DirectoryWithSubmissions = Directory & {
  submissions: Array<DirectorySubmission>
}
