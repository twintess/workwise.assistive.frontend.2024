const HomeView = () => import('@/views/HomeView.vue');
const LoginView = () => import('@/views/LoginView.vue');
const AddEditAccountRequestView = () =>
  import('@/views/ActiveDirectory/AddEditAccountRequestView.vue');
const AllAccountRequestsView = () =>
  import('@/views/ActiveDirectory/AllAccountRequestsView.vue');
const ResetPasswordView = () =>
  import('@/views/ActiveDirectory/ResetPasswordView.vue');
const DomainExplorerView = () =>
  import('@/views/ActiveDirectory/DomainExplorerView.vue');
const AllAccessRequestsView = () =>
  import('@/views/ResourceAccess/AllAccessRequestsView.vue');
const NewAccessRequestView = () =>
  import('@/views/ResourceAccess/NewAccessRequestView.vue');
const AuditResultsView = () =>
  import('@/views/ResourceAccess/AuditResultsView.vue');
const AuditSettingsView = () =>
  import('@/views/ResourceAccess/AuditSettingsView.vue');
const ZabbixServersReportView = () =>
  import('@/views/Zabbix/ZabbixServersReportView.vue');
const ZabbixIncidentsView = () =>
  import('@/views/Zabbix/ZabbixIncidentsView.vue');
const ZabbixStatisticsView = () =>
  import('@/views/Zabbix/ZabbixStatisticsView.vue');
const SurveyReportView = () => import('@/views/Survey/SurveyReportView.vue');
const SurveyInteractionDetailsView = () =>
  import('@/views/Survey/SurveyInteractionDetailsView.vue');
const ProfileView = () => import('@/views/ProfileView.vue');
const SignOutView = () => import('@/views/SignOutView.vue');
const NewLockscreenView = () =>
  import('@/views/Personalization/NewLockscreenView.vue');
const NewLockscreenDistributionView = () =>
  import('@/views/Personalization/NewLockscreenDistributionView.vue');
const AllLockscreensView = () =>
  import('@/views/Personalization/AllLockscreensView.vue');
const AllLockscreenDistributionsView = () =>
  import('@/views/Personalization/AllLockscreenDistributionsView.vue');
const NewPopupView = () => import('@/views/Popups/NewPopupView.vue');
const NewPopupDistributionView = () =>
  import('@/views/Popups/NewPopupDistributionView.vue');
const AllPopupsView = () => import('@/views/Popups/AllPopupsView.vue');
const AllPopupDistributionsView = () =>
  import('@/views/Popups/AllPopupDistributionsView.vue');
const PersonalizationScheduleView = () =>
  import('@/views/Personalization/PersonalizationScheduleView.vue');
const PopupScheduleView = () => import('@/views/Popups/PopupScheduleView.vue');
const AccountRequestDetailsView = () =>
  import('@/views/ActiveDirectory/AccountRequestDetailsView.vue');
const DeleteAccountRequestView = () =>
  import('@/views/ActiveDirectory/DeleteAccountRequestView.vue');
const MfaUserView = () => import('@/views/ActiveDirectory/MfaUserView.vue');
const AccessDeniedView = () => import('@/views/AccessDeniedView.vue');
const ManageUserView = () =>
  import('@/views/Administration/ManageUserView.vue');
const RolesView = () => import('@/views/Administration/RolesView.vue');
const UsersView = () => import('@/views/Administration/UsersView.vue');

export default [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/new-account-request',
    component: AddEditAccountRequestView,
  },
  {
    path: '/all-account-requests',
    component: AllAccountRequestsView,
  },
  {
    path: '/account-request/:id',
    component: AccountRequestDetailsView,
  },
  {
    path: '/edit-account-request/:id',
    component: AddEditAccountRequestView,
  },
  {
    path: '/delete-account-request/:id',
    component: DeleteAccountRequestView,
  },
  {
    path: '/reset-password',
    component: ResetPasswordView,
  },
  {
    path: '/mfa-user-details',
    component: MfaUserView,
  },
  {
    path: '/domain-explorer',
    component: DomainExplorerView,
  },
  {
    path: '/new-access-request',
    component: NewAccessRequestView,
  },
  {
    path: '/all-access-requests',
    component: AllAccessRequestsView,
  },
  {
    path: '/audit-results',
    component: AuditResultsView,
  },
  {
    path: '/audit-settings',
    component: AuditSettingsView,
  },
  {
    path: '/zabbix-servers-report',
    component: ZabbixServersReportView,
  },
  {
    path: '/zabbix-incidents',
    component: ZabbixIncidentsView,
  },
  {
    path: '/zabbix-statistics',
    component: ZabbixStatisticsView,
  },
  {
    path: '/survey-report',
    component: SurveyReportView,
  },
  {
    path: '/survey-interaction-details',
    component: SurveyInteractionDetailsView,
  },
  {
    path: '/new-personalization-lockscreen',
    component: NewLockscreenView,
  },
  {
    path: '/new-personalization-distribution',
    component: NewLockscreenDistributionView,
  },
  {
    path: '/all-personalization-lockscreens',
    component: AllLockscreensView,
  },
  {
    path: '/all-personalization-distributions',
    component: AllLockscreenDistributionsView,
  },
  {
    path: '/personalization-schedule',
    component: PersonalizationScheduleView,
  },
  {
    path: '/new-popup-window',
    component: NewPopupView,
  },
  {
    path: '/new-popup-distribution',
    component: NewPopupDistributionView,
  },
  {
    path: '/all-popup-windows',
    component: AllPopupsView,
  },
  {
    path: '/all-popup-distributions',
    component: AllPopupDistributionsView,
  },
  {
    path: '/popup-schedule',
    component: PopupScheduleView,
  },
  {
    path: '/users',
    component: UsersView,
  },
  {
    path: '/manage-user',
    component: ManageUserView,
  },
  {
    path: '/roles',
    component: RolesView,
  },
  {
    path: '/access-denied',
    component: AccessDeniedView,
  },
  {
    path: '/profile',
    component: ProfileView,
  },
  {
    path: '/sign-out',
    component: SignOutView,
  },
];
