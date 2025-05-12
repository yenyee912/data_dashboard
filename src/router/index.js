import Vue from 'vue'
import VueRouter from 'vue-router'

import LandingPage from '../views/welcome/DashboardView.vue'
import HomePage from '../views/welcome/HomePage.vue'
import NotFound from '../views/PageNotFound.vue'

// user
import LoginPage from '../views/user/UserLogin.vue'
import RegisterUser from '../views/user/UserRegister.vue'
import VerifyPage from '../views/user/UserVerifyPage.vue'
import ResetPass from '../views/user/UserReset.vue'
import ForgotPass from '../views/user/UserForgotPass.vue'

// // harvest
import InventoryChart from '../views/harvest/InventoryChart.vue'
// import TransplantRecordTable from '../views/Harvest/TransplantRecordTable.vue'
// import HarvestSchedule from '../views/Harvest/HarvestSchedule.vue'
// import CropOfTheDay from '../views/Harvest/CropOfTheDay.vue'
// import NewHarvest from '../views/Harvest/NewHarvest.vue'
// import NewHarvestEntry from '../views/Harvest/NewHarvestEntry.vue'
// import HarvestEdit from '../views/Harvest/HarvestEdit.vue'
// import EditedHarvestEntry from '../views/Harvest/EditedHarvestEntry.vue'
// import CalendarView from '../views/Harvest/CalendarView.vue'
// import BorrowForm from '../views/Harvest/BorrowForm.vue'

// // cultivar
// import CultivarList from '../views/Cultivar/CultivarList.vue'
// import CultivarForm from '../views/Cultivar/CultivarForm.vue'
// import CultivarEntry from '../views/Cultivar/CultivarEntry.vue'

// // booking
// import BookingList from '../views/Booking/BookingList.vue'
// import DOUpload from '../views/Booking/DOUpload.vue'
// import FulfillBooking from '../views/Booking/FulfillBooking.vue'

// // seedInventory
// import SeedList from '../views/seedInventory/SeedList'
// import EditSeed from '../views/seedInventory/EditSeed'
// import AddSeed from '../views/seedInventory/AddSeed'
// import NewSeedEntry from '../views/seedInventory/NewSeedEntry'
// import EditedSeedEntry from '../views/seedInventory/EditedSeedEntry'
// import HQSeedInv from '../views/seedInventory/HQSeedInv'
// import FarmSeedInv from '../views/seedInventory/FarmSeedInv'
// import ScanHistory from '../views/seedInventory/ScanHistory'
// import ManualEntry from '../views/seedInventory/ManualEntry'
// import HQScan from '../views/seedInventory/HQScan'
// import FarmScan from '../views/seedInventory/FarmScan'
// import NewScanEntry from '../views/seedInventory/NewScanEntry'

// // location
// import LocationList from '../views/Location/LocationList.vue'
// import EditLocation from '../views/Location/EditLocation'
// import EditedLocationEntry from '../views/Location/EditedLocationEntry'


Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'LandingPage',
    component: LandingPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage,
    meta: {
      public: true
    }
  },

  // user
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      public: true
    }
  },
  {
    path: '/user-register',
    name: 'RegisterUser',
    component: RegisterUser,
    meta: {
      public: true
    }
  },
  {
    path: '/verify',
    name: 'VerifyPage',
    component: VerifyPage,
    meta: {
      public: true
    }
  },
  {
    path: '/resetpass',
    name: 'ResetPass',
    component: ResetPass,
    meta: {
      public: true
    }
  },
  {
    path: '/forgotpass',
    name: 'ForgotPass',
    component: ForgotPass,
    meta: {
      public: true
    }
  },
  {
    path: '/inv-chart',
    name: 'InventoryChart',
    component: InventoryChart,
    meta: {
      // requiresAuth: true
      public: true
    }

  },

  // // harvest  
  // {
  //   path: '/harvest/transplant/new',
  //   name: 'NewHarvest',
  //   component: NewHarvest,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/harvest/schedule',
  //   name: 'HarvestSchedule',
  //   component: HarvestSchedule,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/harvest/crop/list',
  //   name: 'CropOfTheDay',
  //   component: CropOfTheDay,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/harvest/transplant/edit',
  //   name: 'HarvestEdit',
  //   component: HarvestEdit,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/harvest/transplant/edit/entry',
  //   name: 'EditedHarvestEntry',
  //   component: EditedHarvestEntry,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/harvest/transplant/new/entry',
  //   name: 'NewHarvestEntry',
  //   component: NewHarvestEntry,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/harvest/transplant/list',
  //   name: 'TransplantRecordTable',
  //   component: TransplantRecordTable,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/harvest/borrow/new',
  //   name: 'BorrowForm',
  //   component: BorrowForm,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/harvest/calendar',
  //   name: 'CalendarView',
  //   component: CalendarView,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // // cultivar

  // {
  //   path: '/cultivar/form',
  //   name: 'CultivarForm',
  //   component: CultivarForm,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/cultivar/list',
  //   name: 'CultivarList',
  //   component: CultivarList,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/cultivar/entry',
  //   name: 'CultivarEntry',
  //   component: CultivarEntry,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // // booking
  // {
  //   path: '/booking/list',
  //   name: 'BookingList',
  //   component: BookingList,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/booking/upload',
  //   name: 'DOUpload',
  //   component: DOUpload,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // // {
  // //   path: '/booking/DO/list',
  // //   name: 'DOUploadList',
  // //   component: DOUploadList,
  // //   meta: {
  // //     requiresAuth: true
  // //   }
  // // },

  // {
  //   path: '/booking/fulfill',
  //   name: 'FulfillBooking',
  //   component: FulfillBooking,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // //----------Inventory-------------------
  // {
  //   path: '/seed/list',
  //   name: 'SeedList',
  //   component: SeedList,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // {
  //   path: '/seed/edit',
  //   name: 'EditSeed',
  //   component: EditSeed,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // {
  //   path: '/seed/edit/entry',
  //   name: 'EditedSeedEntry',
  //   component: EditedSeedEntry,
  //   props: true,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // {
  //   path: '/seed/new',
  //   component: AddSeed,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // {
  //   path: '/seed/new/entry',
  //   name: 'NewSeedEntry',
  //   component: NewSeedEntry,
  //   props: true,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // {
  //   path: '/seed/inventory/hq/scan/',
  //   name: 'HQScan',
  //   component: HQScan,
  //   props: true,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // {
  //   path: '/seed/inventory/farm/scan',
  //   name: 'FarmScan',
  //   component: FarmScan,
  //   props: true,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // {
  //   path: '/seed/inventory/manual',
  //   name: 'ManualEntry',
  //   component: ManualEntry,
  //   props: true,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // {
  //   path: '/seed/inventory/hq/list',
  //   name: 'HQSeedInv',
  //   component: HQSeedInv,
  //   props: true,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // {
  //   path: '/seed/inventory/farm/list',
  //   name: 'FarmSeedInv',
  //   component: FarmSeedInv,
  //   props: true,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // {
  //   path: '/seed/inventory/scan/list',
  //   name: 'ScanHistory',
  //   component: ScanHistory,
  //   props: true,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // {
  //   path: '/seed/inventory/scan/entry/',
  //   name: 'NewScanEntry',
  //   component: NewScanEntry,
  //   props: true,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // {
  //   path: '/location/list',
  //   name: '  LocationList',
  //   component: LocationList,
  //   props: true,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // {
  //   path: '/location/edit',
  //   component: EditLocation,
  //   name: 'EditLocation',
  //   props: true,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // {
  //   path: '/location/edit/entry',
  //   component: EditedLocationEntry,
  //   name: 'EditedLocationEntry',
  //   props: true,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },

  // not to expose the invalid links in address bar, just show /404 instead
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: NotFound
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next(); // Only call next() if no redirect
  }
});

export default router
