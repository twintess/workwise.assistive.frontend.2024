import roles from '@/utils/roles';
export default [
  {
    id: 1,
    title: 'Active Directory',
    elements: [
      {
        menuTitle: 'Utwórz wniosek na nowe konto',
        path: 'new-account-request',
        role: roles.NEW_ACCOUNT_REQUEST_CONTRIBUTOR,
        icon: 'fa-solid fa-user-plus',
      },
      {
        menuTitle: 'Wszystkie wnioski',
        path: 'all-account-requests',
        role: roles.NEW_ACCOUNT_REQUEST_READER,
        icon: 'fa-solid fa-rectangle-list',
      },
      {
        menuTitle: 'Resetuj hasło',
        path: 'reset-password',
        role: roles.USER_PASSWORD_RESET_OPERATOR,
        icon: 'fa-solid fa-unlock-keyhole',
      },
      {
        menuTitle: 'MFA użytkownika',
        path: 'mfa-user-details',
        role: roles.USER_MFA_DETAILS_READER,
        icon: 'fa-solid fa-user-shield',
      },
      {
        menuTitle: 'Eksplorator obiektów organizacji',
        path: 'domain-explorer',
        role: roles.DOMAIN_READER,
        icon: 'fa-solid fa-magnifying-glass-chart',
      },
    ],
  },
  {
    id: 2,
    title: 'Uprawnienia',
    elements: [
      {
        menuTitle: 'Zgłoś wniosek',
        path: 'new-access-request',
        role: roles.DISK_REQUEST_CONTRIBUTOR,
        icon: 'fa-solid fa-file-circle-plus',
      },
      {
        menuTitle: 'Wszystkie wnioski',
        path: 'all-access-requests',
        role: roles.DISK_REQUEST_READER,
        icon: 'fa-solid fa-folder-open',
      },
      {
        menuTitle: 'Wyniki audytu',
        path: 'audit-results',
        role: roles.AUDIT_READER,
        icon: 'fa-solid fa-square-poll-vertical',
      },
      {
        menuTitle: 'Ustawienia audytu',
        path: 'audit-settings',
        role: roles.AUDIT_SETTINGS_ADMIN,
        icon: 'fa-solid fa-sliders',
      },
    ],
  },
  {
    id: 3,
    title: 'Zabbix',
    elements: [
      {
        menuTitle: 'Raport serwerów',
        path: 'zabbix-servers-report',
        role: roles.ZABBIX_SERVERS_REPORT_READER,
        icon: 'fa-solid fa-chart-line',
      },
      {
        menuTitle: 'Incydenty',
        path: 'zabbix-incidents',
        role: roles.ZABBIX_INCIDENTS_READER,
        icon: 'fa-solid fa-chart-area',
      },
      {
        menuTitle: 'Statystyki',
        path: 'zabbix-statistics',
        role: roles.ZABBIX_STATISTICS_READER,
        icon: 'fa-solid fa-ranking-star',
      },
    ],
  },
  {
    id: 4,
    title: 'Ankiety',
    elements: [
      {
        menuTitle: 'Wyniki ankiety',
        path: 'survey-report',
        role: roles.SURVEY_REPORT_READER,
        icon: 'fa-solid fa-clipboard-question',
      },
      {
        menuTitle: 'Szczegóły zgłoszenia',
        path: 'survey-interaction-details',
        role: roles.SURVEY_INTERACTION_READER,
        icon: 'fa-solid fa-clipboard-list',
      },
    ],
  },
  {
    id: 5,
    title: 'Personalizacja',
    elements: [
      {
        menuTitle: 'Nowy ekran blokady',
        path: 'new-personalization-lockscreen',
        role: roles.PERSONALIZATION_LOCKSCREEN_CONTRIBUTOR,
        icon: 'fa-solid fa-plus',
      },
      {
        menuTitle: 'Nowa dystrybucja',
        path: 'new-personalization-distribution',
        role: roles.PERSONALIZATION_DISTRIBUTION_CONTRIBUTOR,
        icon: 'fa-solid fa-square-plus',
      },
      {
        menuTitle: 'Wszystkie ekrany',
        path: 'all-personalization-lockscreens',
        role: roles.PERSONALIZATION_LOCKSCREEN_READER,
        icon: 'fa-solid fa-window-restore',
      },
      {
        menuTitle: 'Wszystkie dystrybucje',
        path: 'all-personalization-distributions',
        role: roles.PERSONALIZATION_DISTRIBUTION_READER,
        icon: 'fa-solid fa-list-ol',
      },
      {
        menuTitle: 'Harmonogram',
        path: 'personalization-schedule',
        role: roles.PERSONALIZATION_SCHEDULE_READER,
        icon: 'fa-solid fa-calendar-days',
      },
    ],
  },
  {
    id: 6,
    title: 'Komunikaty',
    elements: [
      {
        menuTitle: 'Nowy komunikat',
        path: 'new-popup-window',
        role: roles.POPUP_WINDOW_CONTRIBUTOR,
        icon: 'fa-solid fa-plus',
      },
      {
        menuTitle: 'Nowa dystrybucja',
        path: 'new-popup-distribution',
        role: roles.POPUP_DISTRIBUTION_CONTRIBUTOR,
        icon: 'fa-solid fa-square-plus',
      },
      {
        menuTitle: 'Wszystkie komunikaty',
        path: 'all-popup-windows',
        role: roles.POPUP_WINDOW_READER,
        icon: 'fa-solid fa-window-maximize',
      },
      {
        menuTitle: 'Wszystkie dystrybucje',
        path: 'all-popup-distributions',
        role: roles.POPUP_DISTRIBUTION_READER,
        icon: 'fa-solid fa-list-ol',
      },
      {
        menuTitle: 'Harmonogram',
        path: 'popup-schedule',
        role: roles.POPUP_SCHEDULE_READER,
        icon: 'fa-solid fa-calendar-days',
      },
    ],
  },
  {
    id: 7,
    title: 'Administracja',
    elements: [
      {
        menuTitle: 'Użytkownicy',
        path: 'users',
        role: roles.PORTAL_ADMIN,
        icon: 'fa-solid fa-users',
      },
      {
        menuTitle: 'Zarządzaj użytkownikiem',
        path: 'manage-user',
        role: roles.PORTAL_ADMIN,
        icon: 'fa-solid fa-users',
      },
      {
        menuTitle: 'Role',
        path: 'roles',
        role: roles.PORTAL_ADMIN,
        icon: 'fa-solid fa-user-shield',
      },
    ],
  },
  {
    id: 8,
    title: 'Moje konto',
    elements: [
      {
        menuTitle: 'Profil',
        path: 'profile',
        role: '',
        icon: 'fa-solid fa-user',
      },
      {
        menuTitle: 'Wyloguj',
        path: 'sign-out',
        role: '',
        icon: 'fa-solid fa-right-from-bracket',
      },
    ],
  },
];
