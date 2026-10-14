export interface IHeaderNavigation {
  to: string
  name: string
  withGamePrefix?: boolean
}

export interface IFooterNavigation {
  to: `/${string}`
  name: string
  noTranslation?: boolean
}

export interface ISocialsLink {
  icon: string
  link: string
  label: string
}

export interface NavListItem {
  to: string
  name: string
}
