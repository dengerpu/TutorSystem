import Vue from 'vue'
//按需导入组件
import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
    MessageBox,
    Image,
    Select,
    Option,
    DatePicker,
    TimePicker,
    Upload,
    Cascader,
    Link,
    Tag,
    Timeline,
    TimelineItem,
    Drawer,
    Transfer,
    Descriptions,
    DescriptionsItem,
    Divider,
    PageHeader,
    Avatar,
    Radio,
    RadioGroup
} from 'element-ui'
import VueRouter from 'vue-router'


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Main)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Image)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Upload)
Vue.use(Cascader)
Vue.use(Link)
Vue.use(Tag)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Drawer)
Vue.use(Transfer)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Divider)
Vue.use(PageHeader)
Vue.use(Avatar)
Vue.use(Radio)
Vue.use(RadioGroup)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm;