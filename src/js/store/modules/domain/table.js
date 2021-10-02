import axios from 'axios'
import name from '../../../../assets/table.json'

const state ={
  tableData : [],
  headerData : [],
};
const getters ={
  headerData: (state) => {
    return state.headerData
  },
  tableData: (state) => {
    return state.tableData
  },
};
const mutations ={

 buildTableData: (state , payload)=>{
   state.tableData = payload
 },

  setHeaderData: (state, data) => {
    state.headerData = data
  },

 setIsOpen : (state , payload)=>{
   state.headerData[payload].isOpen = !state.headerData[payload].isOpen;
 },

  setInputType: (state, payload) => {
    let idx = payload.idx;
    state.headerData[idx].inputType = payload.type;
  }

};

const actions ={

  getTableData : (context , params) =>{

    // fields params
    let fields =
      context.state.headerData
        .filter(f => f.isShow)
        .map(m => m.key)
        .toString();

    //
    // let test1
    let searchVal = context.state.headerData
      .filter(f=>f.inputVal !== '')
      .map(m=>{
      return `${m.key}:${m.inputVal}:${m.inputType}`
    }).toString();

    // axios.get("http://localhost:3030/api/admin/user")
    //   .then((res)=> context.commit('buildTableData' , res.data))
    //   .catch(err=>console.log(err))

    axios.get(`/post`)
      .then(res => context.commit('buildTableData', res.data))
      .catch( err => console.log(err))


  },

  createData: (context) => {

    context.state.headerData  = name.map(m=>{
      return {
        key : m.key ,
        name : m.name ,
        isUse : m.isUse ,
        isShow : m.isShow ,
        inputVal : '' ,
        inputType : 'container',
        isOpen : false,
      }
    });

  },


};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  }
