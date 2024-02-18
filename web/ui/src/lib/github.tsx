import useSessionStorage from '@lib/useSessionStorage';
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { tv } from 'tailwind-variants';
import { SessionStorageKeys } from './storageKeys';

export interface Repository {
  id?: number;
  node_id?: string;
  name?: string;
  full_name?: string;
  private?: boolean;
  owner?: Owner;
  html_url?: string;
  description?: string;
  fork?: boolean;
  url?: string;
  forks_url?: string;
  keys_url?: string;
  collaborators_url?: string;
  teams_url?: string;
  hooks_url?: string;
  issue_events_url?: string;
  events_url?: string;
  assignees_url?: string;
  branches_url?: string;
  tags_url?: string;
  blobs_url?: string;
  git_tags_url?: string;
  git_refs_url?: string;
  trees_url?: string;
  statuses_url?: string;
  languages_url?: string;
  stargazers_url?: string;
  contributors_url?: string;
  subscribers_url?: string;
  subscription_url?: string;
  commits_url?: string;
  git_commits_url?: string;
  comments_url?: string;
  issue_comment_url?: string;
  contents_url?: string;
  compare_url?: string;
  merges_url?: string;
  archive_url?: string;
  downloads_url?: string;
  issues_url?: string;
  pulls_url?: string;
  milestones_url?: string;
  notifications_url?: string;
  labels_url?: string;
  releases_url?: string;
  deployments_url?: string;
  created_at?: Date;
  updated_at?: Date;
  pushed_at?: Date;
  git_url?: string;
  ssh_url?: string;
  clone_url?: string;
  svn_url?: string;
  homepage?: string;
  size?: number;
  stargazers_count?: number;
  watchers_count?: number;
  language?: string;
  has_issues?: boolean;
  has_projects?: boolean;
  has_downloads?: boolean;
  has_wiki?: boolean;
  has_pages?: boolean;
  forks_count?: number;
  mirror_url?: null;
  archived?: boolean;
  disabled?: boolean;
  open_issues_count?: number;
  license?: License;
  allow_forking?: boolean;
  is_template?: boolean;
  topics?: string[];
  visibility?: string;
  forks?: number;
  open_issues?: number;
  watchers?: number;
  default_branch?: string;
  temp_clone_token?: null;
  network_count?: number;
  subscribers_count?: number;
}

export interface License {
  key?: string;
  name?: string;
  spdx_id?: string;
  url?: string;
  node_id?: string;
}

export interface Owner {
  login?: string;
  id?: number;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  site_admin?: boolean;
}

const PROJECT_PATH = '42Atomys/stud42';

const starButton = tv({
  slots: {
    link: 'px-2 py-1 bg-slate-300 dark:bg-slate-950 rounded-md border dark:border-slate-700 text-slate-600 dark:text-slate-300',
    star: 'fa-regular fa-star',
    text: 'pl-2 font-medium',
  },

  variants: {
    starred: {
      false: {},
      true: {
        star: 'text-yellow-500 fa-solid',
      },
    },
  },

  defaultVariants: {
    starred: false,
  },
});

/**
 * Star get the repository information from the GitHub API about the stars
 * of the current project and display it like a badge.
 */
export const Star = ({
  starred = false,
}: {
  starred: boolean;
}): JSX.Element => {
  const getRepo = useCallback(async () => {
    try {
      const { data }: { data: Repository } = await axios.get(
        `https://api.github.com/repos/${PROJECT_PATH}`,
      );
      return data;
    } catch {
      return {};
    }
  }, []);

  const [stars, setStars] = useSessionStorage(
    SessionStorageKeys.GithubStars,
    0,
  );
  useEffect(() => {
    getRepo().then(({ stargazers_count }) => {
      setStars(isNaN(Number(stargazers_count)) ? 0 : Number(stargazers_count));
    });
  }, [getRepo, setStars]);

  return (
    <a
      href={`https://github.com/${PROJECT_PATH}`}
      target="_blank"
      className={starButton().link({ starred })}
      rel="noreferrer"
    >
      <i className={starButton().star({ starred })}></i>
      <span className={starButton().text({ starred })}>
        {starred ? 'Thanks' : 'Star'}
      </span>
      <span className={starButton().text({ starred })} suppressHydrationWarning>
        {stars}
      </span>
    </a>
  );
};

/**
 * Display badge to show the number of forks of the current project.
 */
export const Contribute = (): JSX.Element => {
  return (
    <a
      href={`https://github.com/${PROJECT_PATH}`}
      target="_blank"
      className="px-2 py-1 bg-slate-300 dark:bg-slate-950 rounded-md border dark:border-slate-700 text-slate-600 dark:text-slate-300"
      rel="noreferrer"
    >
      <i className="fa-brands fa-github"></i>
      <span className="pl-2 font-medium">Contribute</span>
    </a>
  );
};
