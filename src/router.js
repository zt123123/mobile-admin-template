/*
 *路由处理
 */

//My Route
import Personal from './components/personal/List.vue'
import Gamer from './components/gamer/List.vue'
import Divide from './components/divide/List.vue'
import Fortune from './components/fortune/List.vue'
import Cash from './components/cash/List.vue'
import Sale from './components/sale/List.vue'
import Record from './components/record/List.vue'
import Login from './components/login/Login.vue'
import Register from './components/register/Register.vue'
import Home from './components/Home.vue'
import UpdateInfo from './components/common/UpdateInfo.vue'
import Clause from './components/clause/clause.vue'

export default [
  //My Route
  {name: "/", path: '/', component: Home},
  {name: "personal", path: '/personal', component: Personal},
  {name: "gamer", path: '/gamer', component: Gamer},
  {name: "divide", path: '/divide', component: Divide},
  {name: "fortune", path: '/fortune', component: Fortune},
  {name: "cash", path: '/cash', component: Cash},
  {name: "sale", path: '/sale', component: Sale},
  {name: "record", path: '/record', component: Record},
  {name: "login", path: '/login', component: Login},
  {name: "register", path: '/register', component: Register},
  {name: "update", path: '/update', component: UpdateInfo},
  {name: "clause", path: '/clause', component: Clause}
];
