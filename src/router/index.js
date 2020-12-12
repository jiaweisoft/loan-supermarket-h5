import Vue from 'vue';
import Router from 'vue-router';
import Loading from '@/pages/app/Loading';
import Home from '@/pages/app/Home';
import Login from '@/pages/app/Login';
import Main from '@/pages/app/Main';
import Temp from '@/pages/app/Temp';
import Tips from '@/pages/app/Tips';

import Organization from '@/pages/app/organization/organization';
import AddOrganization from '@/pages/app/organization/addOrganization';
import EditOrganization from '@/pages/app/organization/editOrganization';
import User from '@/pages/app/system/user';
import Adduser from '@/pages/app/system/addEditUser';
import Role from '@/pages/app/system/role';
import Addrole from '@/pages/app/system/addEditRole';

import Personalinfo from '@/pages/app/person/personalInfo';
import Resetpassword from '@/pages/app/person/resetPassword';
import Loanuser from '@/pages/app/loan/loanUser';
import APIData from '@/pages/app/dataManager/apiData';
import Pagedata from '@/pages/app/dataManager/pageData';
import ApiIncomeCount from '@/pages/app/dataManager/ApiIncomeCount';
import H5IncomeCount from '@/pages/app/dataManager/H5IncomeCount';
import CheckListSourceH5 from '@/pages/app/dataManager/CheckListSourceH5';
import CheckListSourceApi from '@/pages/app/dataManager/CheckListSourceApi';
import NewUserCount from '@/pages/app/dataManager/NewUserCount';

// 营销页管理
import MarketConfig from '@/pages/app/marketManager/MarketConfig';

// h5页面
import AgreementPage from '@/pages/h5/AgreementPage';
import ApplyForLoans from '@/pages/h5/ApplyForLoans';
import RecommendPage from '@/pages/h5/RecommendPage';
import UserInfomation from '@/pages/h5/UserInfomation';
Vue.use(Router);

const router = new Router({

  routes: [
    {
      path: '/main',
      name: 'Main',
      components: {
        default: Main
      },
      children: [
        {
          path: '/home',
          name: 'Home',
          components: {
            default: Home
          }
        },
        {
          path: '/person/personalinfo',
          name: '/person/personalinfo',
          components: {
            default: Personalinfo
          }
        },
        {
          path: '/person/resetpassword',
          name: '/person/resetpassword',
          components: {
            default: Resetpassword
          }
        },
        {
          path: '/system/user',
          name: '/system/user',
          components: {
            default: User
          }
        },
        {
          path: '/system/addEditUser/:id?',
          name: '/system/addEditUser',
          components: {
            default: Adduser
          }
        },
        {
          path: '/system/role',
          name: '/system/role',
          components: {
            default: Role
          }
        },
        {
          path: '/system/addEditRole/:id?',
          name: '/system/addEditRole',
          components: {
            default: Addrole
          }
        },
        {
          path: '/loan/loanuser',
          name: '/loan/loanuser',
          components: {
            default: Loanuser
          }
        },
        {
          path: '/dataManager/apidata',
          name: '/dataManager/apidata',
          components: {
            default: APIData
          }
        },
        {
          path: '/dataManager/newusercount',
          name: '/dataManager/newusercount',
          components: {
            default: NewUserCount
          }
        },
        {
          path: '/dataManager/apiincomecount',
          name: '/dataManager/apiincomecount',
          components: {
            default: ApiIncomeCount
          }
        },
        {
          path: '/dataManager/apiincomecount/checklistsourceapi',
          name: '/dataManager/apiincomecount/checklistsourceapi',
          components: {
            default: CheckListSourceApi
          }
        },
        {
          path: '/dataManager/h5incomecount',
          name: '/dataManager/h5incomecount',
          components: {
            default: H5IncomeCount
          }
        },
        {
          path: '/dataManager/h5incomecount/checklistsourceh5',
          name: '/dataManager/h5incomecount/checklistsourceh5',
          components: {
            default: CheckListSourceH5
          }
        },
        {
          path: '/dataManager/pagedata',
          name: '/dataManager/pagedata',
          components: {
            default: Pagedata
          }
        },

        {
          path: '/organization/organization',
          name: '/organization/organization',
          components: {
            default: Organization
          }
        },
        {
          path: '/organization/addorganization',
          name: '/organization/addorganization',
          components: {
            default: AddOrganization
          }
        },
        {
          path: '/organization/editorganization',
          name: '/organization/editorganization',
          components: {
            default: EditOrganization
          }
        },
        {
          path: '/marketManager/marketconfig',
          name: '/marketManager/marketconfig',
          components: {
            default: MarketConfig
          }
        }
      ]
    },
    {
      path: '/tips',
      name: 'Tips',
      components: {
        default: Tips
      }
    },
    {
      path: '/',
      name: 'Login',
      components: {
        default: Login
      }
    },
    {
      path: '/temp',
      name: 'Temp',
      components: {
        default: Temp
      }
    },
    // h5营销页
    {
      path: '/agreementpage',
      name: 'AgreementPage',
      components: {
        default: AgreementPage
      }
    },
    {
      path: '/applyforloans',
      name: 'ApplyForLoans',
      components: {
        default: ApplyForLoans
      }
    },
    {
      path: '/recommendpage',
      name: 'RecommendPage',
      components: {
        default: RecommendPage
      }
    },
    {
      path: '/userinfomation',
      name: 'UserInfomation',
      components: {
        default: UserInfomation
      }
    }
  ]
});

router.options.routes.forEach(item => {
  item.components.Loading = Loading;
  if (item.name === 'Login') {
    return false;
  }
});

export default router;
