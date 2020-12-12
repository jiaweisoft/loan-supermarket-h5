/**
 * Created by mapbar_front on 2018/12/25.
 */
import { valideConvergeName, valideEnConvergeName, valideConverAddress } from '@/utils/validate.js';
const checkedItems = [
  {label: 'ifLoanName', name: '姓名'},
  {label: 'ifMobile', name: '手机号码'},
  {label: 'ifSalary', name: '月收入'},
  {label: 'ifSmallLoan', name: '有微粒贷'},
  {label: 'ifSociety', name: '有社保'},
  {label: 'ifInsurance', name: '有人寿保单'},
  {label: 'ifCar', name: '有车'},
  {label: 'ifBorrow', name: '有借呗'},
  {label: 'ifFunds', name: '有公积金'},
  {label: 'ifHouse', name: '有房'},
  {label: 'ifCredit', name: '芝麻信用超过600'},
  {label: 'ifIdNo', name: '身份证号码'}
];

const rules = {
  name: [
    {required: true, message: '请输入机构中文名称', trigger: 'blur'},
    { validator: valideConvergeName, trigger: 'blur' }
  ],
  companyCode: [
    { validator: valideEnConvergeName, trigger: 'blur' }
  ],
  companySubject: [
    {required: true, message: '请填写机构主体名称', trigger: 'blur'}
  ],
  url: [
    { validator: valideConverAddress, trigger: 'blur' }
  ],
  enabled: [
    {required: true, message: '请选择机构状态', trigger: 'blur'}
  ],
  checkedDatas: [
    {type: 'array', required: true, message: '请至少选择一项数据', trigger: 'change'}
  ]
};

export default {
  checkedItems,
  rules
};
